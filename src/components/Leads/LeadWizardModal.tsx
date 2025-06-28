import React, { useState } from 'react';
import { mockProducts } from '../../data/mockData';
import jsPDF from 'jspdf';
import 'jspdf/dist/polyfills.es.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// TypeScript declaration for jsPDF.html plugin
import type { HTMLOptions, HTMLWorker } from 'jspdf';
declare module 'jspdf' {
  interface jsPDF {
    html: (src: string | HTMLElement, options?: HTMLOptions) => HTMLWorker;
  }
}

const steps = [
  'Company Info',
  'Contact Person',
  'Document Type',
  'Document Details & Preview',
  'Follow-Up Setup',
  'Send & Complete',
];

// Add LeadWizardData type
interface LeadWizardData {
  company: {
    name: string;
    countryCode: string;
    phone: string;
    email: string;
    postalAddress: string;
    physicalAddress: string;
    country: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    designation: string;
    leadSource: string;
  };
  documentType: string;
  documentDetails: {
    items: { description: string; details?: string; price: string; quantity: number; tax?: string }[];
    notes: string;
    terms?: string;
    discount?: string;
    discountType?: string;
  };
  proposal: {
    subject: string;
    body: string;
    includeQuotation: boolean;
    attachments: {
      companyProfile: File | null;
      portfolio: File[];
    };
    formatting: {
      fontSize: number;
      fontFamily: string;
      textAlign: 'left' | 'center' | 'right' | 'justify';
    };
  };
  followUp: {
    mode: 'manual' | 'automatic';
    manualDates: string[];
    automaticEnabled: boolean;
    notifications: {
      email: boolean;
      sms: boolean;
    };
    workingDaysOnly: boolean;
    customMessage: string;
    expiryAction: 'close-lost' | 'extend' | 'manual-review';
  };
}

const initialData: LeadWizardData = {
  company: {
    name: '',
    countryCode: '+267',
    phone: '',
    email: '',
    postalAddress: '',
    physicalAddress: '',
    country: 'Botswana',
  },
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+267',
    designation: '',
    leadSource: 'Website',
  },
  documentType: '',
  documentDetails: {
    items: [{ description: '', details: '', price: '', quantity: 1, tax: '0' }],
    notes: '',
    terms: '',
    discount: '0',
    discountType: '%',
  },
  proposal: {
    subject: '',
    body: '',
    includeQuotation: false,
    attachments: {
      companyProfile: null,
      portfolio: [],
    },
    formatting: {
      fontSize: 12,
      fontFamily: 'Arial',
      textAlign: 'left',
    },
  },
  followUp: {
    mode: 'manual',
    manualDates: [],
    automaticEnabled: false,
    notifications: {
      email: false,
      sms: false,
    },
    workingDaysOnly: false,
    customMessage: '',
    expiryAction: 'close-lost',
  },
};

// Add a reusable input class
const inputClass = "w-full px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:border-gray-300";

const LeadWizardModal = ({ open, onClose, onComplete }: { open: boolean; onClose: () => void; onComplete: (data: LeadWizardData) => void }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<LeadWizardData>(initialData);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  // Only allow valid section keys
  type SectionKey = keyof LeadWizardData;
  const handleChange = (section: SectionKey, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const handleItemChange = (idx: number, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      documentDetails: {
        ...prev.documentDetails,
        items: prev.documentDetails.items.map((item, i) => i === idx ? { ...item, [field]: value } : item)
      }
    }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      documentDetails: {
        ...prev.documentDetails,
        items: [...prev.documentDetails.items, { description: '', details: '', price: '', quantity: 1, tax: '0' }]
      }
    }));
  };

  const removeItem = (idx: number) => {
    if (data.documentDetails.items.length > 1) {
      setData(prev => ({
        ...prev,
        documentDetails: {
          ...prev.documentDetails,
          items: prev.documentDetails.items.filter((_, i) => i !== idx)
        }
      }));
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleComplete = () => {
    onComplete(data);
    onClose();
  };

  // Validation logic for each step
  const isStepValid = () => {
    switch (step) {
      case 0:
        return (
          data.company.name &&
          data.company.phone &&
          data.company.email &&
          data.company.postalAddress &&
          data.company.physicalAddress &&
          data.company.country
        );
      case 1:
        return (
          data.contact.firstName &&
          data.contact.lastName &&
          data.contact.email &&
          data.contact.phone &&
          data.contact.designation &&
          data.contact.leadSource
        );
      case 2:
        return data.documentType;
      case 3:
        if (data.documentType === 'Proposal') {
          return data.proposal.subject && data.proposal.body;
        } else {
        return data.documentDetails.items.every(item => item.description && item.price && item.quantity > 0);
        }
      case 4:
        return data.followUp.mode === 'manual' ? data.followUp.manualDates.length > 0 : data.followUp.automaticEnabled;
      case 5:
        return true; // Final step is always valid
      default:
        return true;
    }
  };

  const handleDownloadPDF = async () => {
    if (data.documentType === 'Proposal') {
      generateProposalPDF();
    } else {
      generateQuotationPDF();
    }
  };

  // Generate Proposal PDF
  const generateProposalPDF = () => {
    const pdf = new jsPDF({ 
      orientation: 'portrait', 
      unit: 'mm', 
      format: 'a4' 
    });
    
    // A4 dimensions in mm
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const footerHeight = 30;
    let yPosition = margin;
    let pageNum = 1;

    // Helper: Render footer at the bottom of the page
    const renderFooter = () => {
      const footerY = pageHeight - footerHeight;
      pdf.line(margin, footerY, pageWidth - margin, footerY);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Thank you for considering our proposal!', pageWidth / 2, footerY + 8, { align: 'center' });
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('For any questions, please contact us at info@orizoncrm.com or +267 123 4567', 
        pageWidth / 2, footerY + 15, { align: 'center' });
      // Optionally, add page number
      pdf.setFontSize(8);
      pdf.text(`Page ${pageNum}`, pageWidth - margin, footerY + 22, { align: 'right' });
    };

    // Helper: Ensure enough space, else add new page
    const ensureSpace = (neededHeight = 10, renderHeader?: () => void) => {
      if (yPosition + neededHeight > pageHeight - footerHeight) {
        renderFooter();
        pdf.addPage();
        pageNum++;
        yPosition = margin;
        if (renderHeader) renderHeader();
      }
    };

    // Helper function to add text with word wrapping and page breaks
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10;
      const fontStyle = options.fontStyle || 'normal';
      const align = options.align || 'left';
      const maxWidth = options.maxWidth || contentWidth;
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      if (text.length === 0) return y;
      const lines = pdf.splitTextToSize(text, maxWidth);
      let localY = y;
      lines.forEach((line: string, index: number) => {
        ensureSpace(fontSize * 0.4 + 2);
        pdf.text(line, x, localY, { align });
        localY += fontSize * 0.4;
        yPosition = localY;
      });
      return localY + 3;
    };

    // Company Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, pageWidth, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    yPosition = addText('BUSINESS PROPOSAL', margin, 18, { fontSize: 24, fontStyle: 'bold' });
    addText('Professional Business Proposal', margin, 25, { fontSize: 12 });
    pdf.setTextColor(0, 0, 0);
    yPosition = 40;

    // Proposal Subject
    ensureSpace(18 + 10);
    yPosition = addText(data.proposal.subject, margin, yPosition, { fontSize: 18, fontStyle: 'bold', maxWidth: contentWidth });
    yPosition += 10;

    // Client Information Box
    ensureSpace(35 + 10);
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition, contentWidth, 35, 'F');
    pdf.setDrawColor(229, 231, 235);
    pdf.rect(margin, yPosition, contentWidth, 35, 'S');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PREPARED FOR:', margin + 5, yPosition + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${data.company.name}`, margin + 5, yPosition + 15);
    pdf.text(`${data.contact.firstName} ${data.contact.lastName}`, margin + 5, yPosition + 22);
    pdf.text(`${data.contact.email} | ${data.contact.phone}`, margin + 5, yPosition + 29);
    yPosition += 45;

    // Proposal Body
    ensureSpace(12 + 8);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PROPOSAL DETAILS:', margin, yPosition);
    yPosition += 8;
    // Render the proposal body as HTML using jsPDF's html method
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.proposal.body || '';
    tempDiv.style.fontFamily = data.proposal.formatting.fontFamily;
    tempDiv.style.fontSize = `${data.proposal.formatting.fontSize}px`;
    tempDiv.style.textAlign = data.proposal.formatting.textAlign;
    tempDiv.style.wordBreak = 'break-word';
    tempDiv.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(tempDiv);
    // Use jsPDF's html method to render the content
    pdf.html(tempDiv, {
      x: margin,
      y: yPosition,
      width: contentWidth,
      windowWidth: contentWidth * 4, // scale for better rendering
      callback: function () {
        document.body.removeChild(tempDiv);
        // After rendering the HTML, just render the footer and save the PDF
        renderFooter();
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `Proposal_${data.company.name.replace(/\s+/g, '_')}_${timestamp}.pdf`;
        pdf.save(filename);
      }
    });
    return;

    // Include quotation if selected
    if (data.proposal.includeQuotation && data.documentDetails.items.length > 0) {
      // Table header renderer
      const renderTableHeader = () => {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('QUOTATION BREAKDOWN:', margin, yPosition);
        yPosition += 10;
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin, yPosition, contentWidth, 8, 'F');
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Description', margin + 2, yPosition + 5);
        pdf.text('Qty', margin + 100, yPosition + 5);
        pdf.text('Price', margin + 120, yPosition + 5);
        pdf.text('Amount', margin + 150, yPosition + 5);
        yPosition += 10;
      };
      renderTableHeader();
      // Table rows
      data.documentDetails.items.forEach((item, index) => {
        ensureSpace(8, renderTableHeader);
        const rowY = yPosition;
        const amount = Number(item.price || 0) * Number(item.quantity || 0);
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(margin, rowY - 2, contentWidth, 8, 'F');
        }
        pdf.setFont('helvetica', 'normal');
        pdf.text(item.description, margin + 2, rowY + 3);
        pdf.text(item.quantity.toString(), margin + 100, rowY + 3);
        pdf.text(`P${Number(item.price || 0).toFixed(2)}`, margin + 120, rowY + 3);
        pdf.text(`P${amount.toFixed(2)}`, margin + 150, rowY + 3);
        yPosition += 8;
      });
      // Totals
      const subtotal = data.documentDetails.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
      const discount = Number(data.documentDetails.discount || 0);
      const discountType = data.documentDetails.discountType || '%';
      const discountValue = discountType === '%' ? subtotal * (discount / 100) : discount;
      const taxable = subtotal - discountValue;
      const tax = taxEnabled ? taxable * 0.14 : 0;
      const total = taxable + tax;
      ensureSpace(35);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Subtotal: P${subtotal.toFixed(2)}`, margin + 120, yPosition);
      yPosition += 6;
      pdf.text(`Discount: P${discountValue.toFixed(2)}`, margin + 120, yPosition);
      yPosition += 6;
      pdf.text(`Tax (14%): P${tax.toFixed(2)}`, margin + 120, yPosition);
      yPosition += 8;
      pdf.setFontSize(12);
      pdf.text(`Total: P${total.toFixed(2)}`, margin + 120, yPosition);
      yPosition += 15;
    }

    // Attachments section
    if (data.proposal.attachments.companyProfile || data.proposal.attachments.portfolio.length > 0) {
      ensureSpace(12 + 8);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ATTACHMENTS:', margin, yPosition);
      yPosition += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      if (data.proposal.attachments.companyProfile) {
        ensureSpace(6);
        pdf.text(`• Company Profile: ${data.proposal.attachments.companyProfile.name}`, margin, yPosition);
        yPosition += 6;
      }
      if (data.proposal.attachments.portfolio.length > 0) {
        ensureSpace(6 + 6 * data.proposal.attachments.portfolio.length);
        pdf.text('• Portfolio Files:', margin, yPosition);
        yPosition += 6;
        data.proposal.attachments.portfolio.forEach(file => {
          pdf.text(`  - ${file.name}`, margin + 5, yPosition);
          yPosition += 6;
        });
      }
    }

    // Always render footer on last page
    renderFooter();

    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `Proposal_${data.company.name.replace(/\s+/g, '_')}_${timestamp}.pdf`;
    pdf.save(filename);
  };

  // Generate Quotation PDF (multi-page, footer-protected)
  const generateQuotationPDF = () => {
    const pdf = new jsPDF({ 
      orientation: 'portrait', 
      unit: 'mm', 
      format: 'a4' 
    });
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const footerHeight = 30;
    let yPosition = margin;
    let pageNum = 1;

    // Helper: Render footer at the bottom of the page
    const renderFooter = () => {
      const footerY = pageHeight - footerHeight;
      pdf.line(margin, footerY, pageWidth - margin, footerY);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Thank you for your business!', pageWidth / 2, footerY + 8, { align: 'center' });
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('For any questions, please contact us at info@orizoncrm.com or +267 123 4567', 
        pageWidth / 2, footerY + 15, { align: 'center' });
      pdf.setFontSize(8);
      pdf.text(`Page ${pageNum}`, pageWidth - margin, footerY + 22, { align: 'right' });
    };

    // Helper: Ensure enough space, else add new page
    const ensureSpace = (neededHeight = 10, renderHeader?: () => void) => {
      if (yPosition + neededHeight > pageHeight - footerHeight) {
        renderFooter();
        pdf.addPage();
        pageNum++;
        yPosition = margin;
        if (renderHeader) renderHeader();
      }
    };

    // Helper function to add text with word wrapping and page breaks
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10;
      const fontStyle = options.fontStyle || 'normal';
      const align = options.align || 'left';
      const maxWidth = options.maxWidth || contentWidth;
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      if (text.length === 0) return y;
      const lines = pdf.splitTextToSize(text, maxWidth);
      let localY = y;
      lines.forEach((line: string, index: number) => {
        ensureSpace(fontSize * 0.4 + 2);
        pdf.text(line, x, localY, { align });
        localY += fontSize * 0.4;
        yPosition = localY;
      });
      return localY + 3;
    };

    // Company Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    pdf.setTextColor(255, 255, 255);
    yPosition = addText('Orizon CRM', margin, 15, { fontSize: 20, fontStyle: 'bold' });
    addText('Business Management Software Solutions', margin, 20, { fontSize: 10 });
    pdf.setTextColor(0, 0, 0);
    yPosition = 35;
    yPosition = addText('Email: info@orizoncrm.com | Phone: +267 123 4567', margin, yPosition, { fontSize: 9 });
    yPosition = addText('Postal Address: P.O. Box 123, Gaborone, Botswana', margin, yPosition, { fontSize: 9 });
    yPosition = addText('Physical Address: Plot 123, Central Business District, Gaborone', margin, yPosition, { fontSize: 9 });
    yPosition = addText('Website: www.orizoncrm.com', margin, yPosition, { fontSize: 9 });
    addText(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, 35, { fontSize: 9, align: 'right' });
    yPosition += 10;
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    ensureSpace(18 + 5);
    yPosition = addText(data.documentType || 'Quotation', margin, yPosition, { fontSize: 18, fontStyle: 'bold' });
    yPosition += 5;
    const quoteNumber = `QT-${Date.now().toString().slice(-6)}`;
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();
    yPosition = addText(`Quote #: ${quoteNumber}`, margin, yPosition, { fontSize: 10, fontStyle: 'bold' });
    yPosition = addText(`Valid Until: ${validUntil}`, margin, yPosition, { fontSize: 10 });
    yPosition = addText(`Lead Source: ${data.contact.leadSource}`, margin, yPosition, { fontSize: 10 });
    yPosition += 5;
    const followUpMode = data.followUp.mode === 'manual' ? 'Manual Schedule' : 'Automatic Schedule';
    const notifications = [
      data.followUp.notifications.email ? 'Email' : '',
      data.followUp.notifications.sms ? 'SMS' : ''
    ].filter(Boolean).join(' + ') || 'None';
    yPosition = addText(`Follow-Up Mode: ${followUpMode}`, margin, yPosition, { fontSize: 10 });
    yPosition = addText(`Notifications: ${notifications}`, margin, yPosition, { fontSize: 10 });
    yPosition += 10;
    ensureSpace(12 + 3 + 25);
    yPosition = addText('Bill To:', margin, yPosition, { fontSize: 12, fontStyle: 'bold' });
    yPosition += 3;
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition, contentWidth, 25, 'F');
    pdf.setFillColor(255, 255, 255);
    const clientY = yPosition + 5;
    addText(data.company.name || 'Company Name', margin + 5, clientY, { fontSize: 11, fontStyle: 'bold' });
    addText(`Contact: ${data.contact.firstName} ${data.contact.lastName}`, margin + 5, clientY + 5, { fontSize: 9 });
    addText(`Email: ${data.contact.email}`, margin + 5, clientY + 9, { fontSize: 9 });
    addText(`Phone: ${data.company.countryCode} ${data.company.phone}`, margin + 5, clientY + 13, { fontSize: 9 });
    addText(`Company Email: ${data.company.email}`, margin + 5, clientY + 17, { fontSize: 9 });
    const addressX = margin + (contentWidth / 2) + 5;
    addText('Physical Address:', addressX, clientY, { fontSize: 9, fontStyle: 'bold' });
    addText(data.company.physicalAddress, addressX, clientY + 4, { fontSize: 9, maxWidth: contentWidth / 2 - 10 });
    addText(data.company.country, addressX, clientY + 8, { fontSize: 9 });
    addText('Postal Address:', addressX, clientY + 13, { fontSize: 9, fontStyle: 'bold' });
    addText(data.company.postalAddress, addressX, clientY + 17, { fontSize: 9, maxWidth: contentWidth / 2 - 10 });
    yPosition += 30;
    // Table header renderer
    const renderTableHeader = () => {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, yPosition, contentWidth, 8, 'F');
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Description', margin + 2, yPosition + 5);
      pdf.text('Qty', margin + 100, yPosition + 5);
      pdf.text('Unit Price', margin + 120, yPosition + 5);
      pdf.text('Total', margin + 150, yPosition + 5);
      yPosition += 10;
    };
    renderTableHeader();
    data.documentDetails.items.forEach((item, idx) => {
      ensureSpace(12, renderTableHeader);
      const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);
      const rowHeight = 12;
      if (idx % 2 === 1) {
        pdf.setFillColor(252, 252, 252);
        pdf.rect(margin, yPosition - 2, contentWidth, rowHeight, 'F');
        pdf.setFillColor(255, 255, 255);
      }
      let descY = addText(item.description || 'Item description', margin + 2, yPosition + 3, { fontSize: 9, fontStyle: 'bold', maxWidth: 100 - 4 });
      if (item.details) {
        descY = addText(item.details, margin + 2, descY + 1, { fontSize: 8, maxWidth: 100 - 4 });
      }
      addText(String(item.quantity || 1), margin + 100 + 10, yPosition + 3, { fontSize: 9, align: 'center', maxWidth: 20 });
      addText(`P${Number(item.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, margin + 120 + 28, yPosition + 3, { fontSize: 9, align: 'right', maxWidth: 30 });
      addText(`P${itemTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, margin + 150 + 28, yPosition + 3, { fontSize: 9, align: 'right', fontStyle: 'bold', maxWidth: 30 });
      yPosition = Math.max(descY, yPosition + rowHeight);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 3;
    });
    yPosition += 5;
    const totalsX = pageWidth - margin - 60;
    const subtotal = data.documentDetails.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
    const discount = Number(data.documentDetails.discount || 0);
    const discountType = data.documentDetails.discountType || '%';
    const discountValue = discountType === '%' ? subtotal * (discount / 100) : discount;
    const taxable = subtotal - discountValue;
    const tax = taxEnabled ? taxable * 0.14 : 0;
    const total = taxable + tax;
    ensureSpace(50);
    yPosition = addText('Sub Total:', totalsX - 50, yPosition, { fontSize: 10 });
    addText(`P${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, totalsX + 50, yPosition - 3, { fontSize: 10, align: 'right' });
    yPosition = addText(`Discount (${discountType === '%' ? `${discount}%` : 'Fixed'}):`, totalsX - 50, yPosition + 2, { fontSize: 10 });
    addText(`-P${discountValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, totalsX + 50, yPosition - 3, { fontSize: 10, align: 'right' });
    yPosition = addText('Tax (14%):', totalsX - 50, yPosition + 2, { fontSize: 10 });
    addText(`P${tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, totalsX + 50, yPosition - 3, { fontSize: 10, align: 'right' });
    pdf.line(totalsX - 50, yPosition + 2, totalsX + 50, yPosition + 2);
    yPosition = addText('Total Amount:', totalsX - 50, yPosition + 8, { fontSize: 12, fontStyle: 'bold' });
    addText(`P${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, totalsX + 50, yPosition - 3, { fontSize: 12, fontStyle: 'bold', align: 'right' });
    yPosition += 15;
    if (data.documentDetails.notes) {
      ensureSpace(11 + 2 + 5);
      yPosition = addText('Notes:', margin, yPosition, { fontSize: 11, fontStyle: 'bold' });
      yPosition = addText(data.documentDetails.notes, margin, yPosition + 2, { fontSize: 9, maxWidth: contentWidth });
      yPosition += 5;
    }
    if (data.documentDetails.terms) {
      ensureSpace(11 + 2 + 5);
      yPosition = addText('Terms & Conditions:', margin, yPosition, { fontSize: 11, fontStyle: 'bold' });
      yPosition = addText(data.documentDetails.terms, margin, yPosition + 2, { fontSize: 9, maxWidth: contentWidth });
      yPosition += 5;
    }
    renderFooter();
    pdf.save(`${data.documentType || 'quotation'}-${Date.now().toString().slice(-6)}.pdf`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Modern Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-1">Add New Lead</h2>
              <p className="text-blue-100 text-sm">Create and send professional quotations</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modern Stepper */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {steps.map((stepName, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-bold transition-all duration-300 ${
                  idx <= step 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}>
                  {idx < step ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="ml-3">
                  <div className={`text-sm font-medium transition-colors duration-200 ${
                    idx <= step ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {stepName}
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                    idx < step ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area with Modern Styling */}
        <div className="flex-1 p-8 overflow-y-auto">
          {(step as number) === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h3>
                <p className="text-gray-600">Tell us about the company you're creating a lead for</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Company Name*</label>
                  <input className={inputClass} placeholder="Enter company name" value={data.company.name} onChange={e => handleChange('company', 'name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Company Phone Number*</label>
                  <div className="flex rounded-xl overflow-hidden shadow-sm">
                    <select
                      className="border border-gray-200 border-r-0 px-3 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium"
                      value={data.company.countryCode}
                      onChange={e => handleChange('company', 'countryCode', e.target.value)}
                      style={{ maxWidth: 90 }}
                    >
                      <option value="+267">+267</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+27">+27</option>
                      <option value="+91">+91</option>
                      <option value="+86">+86</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      className="flex-1 px-4 py-3 text-base border border-gray-200 border-l-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Local number"
                      value={data.company.phone}
                      onChange={e => handleChange('company', 'phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Company Email Address*</label>
                  <input className={inputClass} placeholder="Enter company email" value={data.company.email} onChange={e => handleChange('company', 'email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Postal Address*</label>
                  <input className={inputClass} placeholder="Enter postal address" value={data.company.postalAddress} onChange={e => handleChange('company', 'postalAddress', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Physical Address*</label>
                  <input className={inputClass} placeholder="Enter physical address" value={data.company.physicalAddress} onChange={e => handleChange('company', 'physicalAddress', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Country*</label>
                  <select className={inputClass} value={data.company.country} onChange={e => handleChange('company', 'country', e.target.value)}>
                    <option value="Botswana">Botswana</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>
            </div>
          )}

          {(step as number) === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Person</h3>
                <p className="text-gray-600">Who is the main contact at this company?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">First Name*</label>
                  <input className={inputClass} placeholder="Enter first name" value={data.contact.firstName} onChange={e => handleChange('contact', 'firstName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Last Name*</label>
                  <input className={inputClass} placeholder="Enter last name" value={data.contact.lastName} onChange={e => handleChange('contact', 'lastName', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address*</label>
                  <input className={inputClass} placeholder="Enter email address" value={data.contact.email} onChange={e => handleChange('contact', 'email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number*</label>
                  <div className="flex rounded-xl overflow-hidden shadow-sm">
                    <select
                      className="border border-gray-200 border-r-0 px-3 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-medium"
                      value={data.contact.countryCode}
                      onChange={e => handleChange('contact', 'countryCode', e.target.value)}
                      style={{ maxWidth: 90 }}
                    >
                      <option value="+267">+267</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+27">+27</option>
                      <option value="+91">+91</option>
                      <option value="+86">+86</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      className="flex-1 px-4 py-3 text-base border border-gray-200 border-l-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Local number"
                      value={data.contact.phone}
                      onChange={e => handleChange('contact', 'phone', e.target.value)}
                    />
                </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Designation*</label>
                  <input className={inputClass} placeholder="e.g. CEO, Manager, Pharmacist" value={data.contact.designation} onChange={e => handleChange('contact', 'designation', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Lead Source*</label>
                  <select className={inputClass} value={data.contact.leadSource} onChange={e => handleChange('contact', 'leadSource', e.target.value)}>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Email Campaign">Email Campaign</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {(step as number) === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Document Type</h3>
                <p className="text-gray-600">What type of document would you like to send?</p>
              </div>
              <div className="flex justify-center space-x-6">
                <button
                  className={`px-8 py-4 rounded-2xl border-2 transition-all duration-200 font-semibold text-lg ${
                    data.documentType === 'Quotation' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                  onClick={() => setData(prev => ({ ...prev, documentType: 'Quotation' }))}
                >
                  Quotation
                </button>
                <button
                  className={`px-8 py-4 rounded-2xl border-2 transition-all duration-200 font-semibold text-lg ${
                    data.documentType === 'Proposal' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/25' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:shadow-md'
                  }`}
                  onClick={() => setData(prev => ({ ...prev, documentType: 'Proposal' }))}
                >
                  Proposal
                </button>
              </div>
            </div>
          )}

          {(step as number) === 3 && data.documentType === 'Quotation' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Document Details & Preview</h3>
                <p className="text-gray-600">Add items and see your professional quotation preview</p>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Item Entry */}
                <div className="flex-1 space-y-6">
                  {/* Product Selector */}
                  <div className="mb-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={''}
                      onChange={e => {
                        const productId = e.target.value;
                        if (!productId) return;
                        const product = mockProducts.find(p => p.id === productId);
                        if (product) {
                          setData(prev => ({
                            ...prev,
                            documentDetails: {
                              ...prev.documentDetails,
                              items: [
                                ...prev.documentDetails.items,
                                {
                                  description: product.name,
                                  details: product.description,
                                  price: product.price.toString(),
                                  quantity: 1
                                }
                              ]
                            }
                          }));
                        }
                      }}
                    >
                      <option value="">Select a product</option>
                      {mockProducts.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* Item Table */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-0 overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="bg-gray-50 text-gray-700 text-sm">
                          <th className="p-3 font-semibold text-left">Description</th>
                          <th className="p-3 font-semibold text-center w-24">Quantity</th>
                          <th className="p-3 font-semibold text-center w-32">Unit Price</th>
                          <th className="p-3 font-semibold text-right w-32">Amount</th>
                          <th className="p-3 font-semibold text-center w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.documentDetails.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="p-2 align-top">
                              <input
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Item Name"
                                value={item.description}
                                onChange={e => handleItemChange(idx, 'description', e.target.value)}
                              />
                              <textarea
                                className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                                placeholder="Enter Description (optional)"
                                rows={1}
                                value={item.details || ''}
                                onChange={e => handleItemChange(idx, 'details', e.target.value)}
                              />
                            </td>
                            <td className="p-2 align-top text-center">
                              <input
                                className="w-16 px-2 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                              />
                            </td>
                            <td className="p-2 align-top text-center">
                              <input
                                className="w-24 px-2 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                min={0}
                                value={item.price}
                                onChange={e => handleItemChange(idx, 'price', e.target.value)}
                              />
                            </td>
                            <td className="p-2 align-top text-right font-semibold">
                              {(() => {
                                const price = Number(item.price || 0);
                                const qty = Number(item.quantity || 0);
                                const amount = price * qty;
                                return `P${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                              })()}
                            </td>
                            <td className="p-2 align-top text-center">
                              <button
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all duration-200 disabled:opacity-50"
                                onClick={() => removeItem(idx)}
                                disabled={data.documentDetails.items.length === 1}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-4">
                      <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all duration-200"
                        onClick={addItem}
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                  {/* Notes and Terms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Note For The Recipient</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="e.g. Thank you for your business"
                        rows={3}
                        value={data.documentDetails.notes}
                        onChange={e => setData(prev => ({ ...prev, documentDetails: { ...prev.documentDetails, notes: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Terms and Conditions</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Thank you for your business."
                        rows={3}
                        value={data.documentDetails.terms || ''}
                        onChange={e => handleItemChange(0, 'terms', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                {/* Right: Summary Card */}
                <div className="w-full md:w-96 flex-shrink-0">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                    <div className="text-lg font-bold text-gray-900 mb-4">Summary</div>
                    {(() => {
                      const subtotal = data.documentDetails.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
                      const discount = Number(data.documentDetails.discount || 0);
                      const discountType = data.documentDetails.discountType || '%';
                      const discountValue = discountType === '%' ? subtotal * (discount / 100) : discount;
                      const taxable = subtotal - discountValue;
                      const tax = taxEnabled ? taxable * 0.14 : 0;
                      const total = taxable + tax;
                      return (
                        <>
                          <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200">
                            <span>Sub Total:</span>
                            <span>P{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200 items-center">
                            <span>Discount:</span>
                            <span>
                              <input
                                type="number"
                                min={0}
                                className="w-16 px-2 py-1 border border-gray-200 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={discount}
                                onChange={e => setData(prev => ({ ...prev, documentDetails: { ...prev.documentDetails, discount: e.target.value } }))}
                              />
                              <select
                                className="ml-1 px-1 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={discountType}
                                onChange={e => setData(prev => ({ ...prev, documentDetails: { ...prev.documentDetails, discountType: e.target.value } }))}
                              >
                                <option value="%">%</option>
                                <option value="amt">Amt</option>
                              </select>
                            </span>
                          </div>
                          <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200 items-center">
                            <span>Tax (14%):</span>
                            <span className="flex items-center gap-2">
                              <span>P{tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              <button
                                type="button"
                                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${taxEnabled ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
                                onClick={() => setTaxEnabled(v => !v)}
                              >
                                {taxEnabled ? 'On' : 'Off'}
                              </button>
                            </span>
                          </div>
                          <div className="flex justify-between py-3 text-base font-bold text-gray-900 border-t-2 border-gray-300">
                            <span>Total:</span>
                            <span>P{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(step as number) === 3 && data.documentType === 'Proposal' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Proposal Editor</h3>
                <p className="text-gray-600">Create your professional proposal with rich text formatting</p>
              </div>
              
              {/* Proposal Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Proposal Subject*</label>
                <input 
                  className={inputClass} 
                  placeholder="Enter proposal subject/title" 
                  value={data.proposal.subject} 
                  onChange={e => handleChange('proposal', 'subject', e.target.value)}
                />
              </div>

              {/* Formatting Toolbar */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Text Formatting Buttons */}
                  <div className="flex items-center space-x-1 border-r border-gray-200 pr-4">
                    <button
                      type="button"
                      className={`px-3 py-2 rounded font-bold transition-colors ${
                        textFormatting.bold ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTextFormatting(prev => ({ ...prev, bold: !prev.bold }))}
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-2 rounded italic transition-colors ${
                        textFormatting.italic ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTextFormatting(prev => ({ ...prev, italic: !prev.italic }))}
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-2 rounded underline transition-colors ${
                        textFormatting.underline ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setTextFormatting(prev => ({ ...prev, underline: !prev.underline }))}
                      title="Underline"
                    >
                      U
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-semibold text-gray-700">Font:</label>
                    <select 
                      className="px-3 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.proposal.formatting.fontFamily}
                      onChange={e => handleChange('proposal', 'formatting', { ...data.proposal.formatting, fontFamily: e.target.value })}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-semibold text-gray-700">Size:</label>
                    <select 
                      className="px-3 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.proposal.formatting.fontSize}
                      onChange={e => handleChange('proposal', 'formatting', { ...data.proposal.formatting, fontSize: Number(e.target.value) })}
                    >
                      <option value={10}>10px</option>
                      <option value={12}>12px</option>
                      <option value={14}>14px</option>
                      <option value={16}>16px</option>
                      <option value={18}>18px</option>
                      <option value={20}>20px</option>
                      <option value={24}>24px</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-semibold text-gray-700">Align:</label>
                    <div className="flex border border-gray-200 rounded overflow-hidden">
                      {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                        <button
                          key={align}
                          type="button"
                          className={`px-3 py-1 text-sm transition-colors ${
                            data.proposal.formatting.textAlign === align 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => handleChange('proposal', 'formatting', { ...data.proposal.formatting, textAlign: align })}
                        >
                          {align.charAt(0).toUpperCase() + align.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Proposal Body*</label>
                  <ReactQuill
                    theme="snow"
                    value={data.proposal.body || ''}
                    onChange={value => handleChange('proposal', 'body', value)}
                    modules={{
                      toolbar: [
                        [{ 'font': [] }],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'script': 'sub'}, { 'script': 'super' }],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                        [{ 'align': [] }],
                        ['link', 'image'],
                        ['clean']
                      ]
                    }}
                    formats={[
                      'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
                      'script', 'header', 'list', 'bullet', 'indent', 'align', 'link', 'image'
                    ]}
                    className="bg-white border border-gray-200 rounded-xl min-h-[350px] max-h-[400px] overflow-y-auto quill-proposal-body"
                    style={{
                      fontFamily: data.proposal.formatting.fontFamily,
                      fontSize: `${data.proposal.formatting.fontSize}px`,
                      textAlign: data.proposal.formatting.textAlign,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      padding: '1rem'
                    }}
                  />
                </div>
              </div>

              {/* Include Quotation Option */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <input
                    type="checkbox"
                    id="includeQuotation"
                    checked={data.proposal.includeQuotation}
                    onChange={e => handleChange('proposal', 'includeQuotation', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="includeQuotation" className="text-sm font-semibold text-gray-700">
                    Include Quotation Section
                  </label>
                </div>
                {data.proposal.includeQuotation && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded border">
                    <div className="flex items-start justify-between">
                      <div>
                        A detailed quotation will be automatically added to your proposal with the items you've configured.
                        {data.documentDetails.items.length === 0 && (
                          <div className="mt-2 text-amber-600 font-medium">
                            Note: Please add items in the quotation section to include pricing details.
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={addItem}
                        className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                      >
                        Add Item
                      </button>
                    </div>
                    {data.documentDetails.items.length > 0 && (
                      <div className="mt-3 text-xs text-gray-500">
                        {data.documentDetails.items.length} item(s) configured for quotation
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quotation Items Section - Only show when Include Quotation is checked */}
              {data.proposal.includeQuotation && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">Quotation Items</h4>
                      <p className="text-sm text-gray-600">Configure pricing details for your proposal</p>
                    </div>
                  </div>
                  {/* Product Selector */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Product</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={''}
                      onChange={e => {
                        const productId = e.target.value;
                        if (!productId) return;
                        const product = mockProducts.find(p => p.id === productId);
                        if (product) {
                          setData(prev => ({
                            ...prev,
                            documentDetails: {
                              ...prev.documentDetails,
                              items: [
                                ...prev.documentDetails.items,
                                {
                                  description: product.name,
                                  details: product.description,
                                  price: product.price.toString(),
                                  quantity: 1
                                }
                              ]
                            }
                          }));
                        }
                      }}
                    >
                      <option value="">Select a product</option>
                      {mockProducts.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Items Table */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-0 overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="bg-gray-50 text-gray-700 text-sm">
                          <th className="p-3 font-semibold text-left">Description</th>
                          <th className="p-3 font-semibold text-center w-24">Quantity</th>
                          <th className="p-3 font-semibold text-center w-32">Unit Price</th>
                          <th className="p-3 font-semibold text-right w-32">Amount</th>
                          <th className="p-3 font-semibold text-center w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.documentDetails.items.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="p-2 align-top">
                              <input
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Item Name"
                                value={item.description}
                                onChange={e => handleItemChange(idx, 'description', e.target.value)}
                              />
                              <textarea
                                className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                                placeholder="Enter Description (optional)"
                                rows={1}
                                value={item.details || ''}
                                onChange={e => handleItemChange(idx, 'details', e.target.value)}
                              />
                            </td>
                            <td className="p-2 align-top text-center">
                              <input
                                className="w-16 px-2 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                min={1}
                                value={item.quantity}
                                onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                              />
                            </td>
                            <td className="p-2 align-top text-center">
                              <input
                                className="w-24 px-2 py-2 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                min={0}
                                value={item.price}
                                onChange={e => handleItemChange(idx, 'price', e.target.value)}
                              />
                            </td>
                            <td className="p-2 align-top text-right font-semibold">
                              {(() => {
                                const price = Number(item.price || 0);
                                const qty = Number(item.quantity || 0);
                                const amount = price * qty;
                                return `P${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                              })()}
                            </td>
                            <td className="p-2 align-top text-center">
                              <button
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all duration-200 disabled:opacity-50"
                                onClick={() => removeItem(idx)}
                                disabled={data.documentDetails.items.length === 1}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-4">
                      <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all duration-200"
                        onClick={addItem}
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>

                  {/* Quotation Summary */}
                  <div className="mt-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-lg font-bold text-gray-900 mb-4">Quotation Summary</div>
                      {(() => {
                        const subtotal = data.documentDetails.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
                        const discount = Number(data.documentDetails.discount || 0);
                        const discountType = data.documentDetails.discountType || '%';
                        const discountValue = discountType === '%' ? subtotal * (discount / 100) : discount;
                        const taxable = subtotal - discountValue;
                        const tax = taxEnabled ? taxable * 0.14 : 0;
                        const total = taxable + tax;
                        return (
                          <>
                            <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200">
                              <span>Sub Total:</span>
                              <span>P{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200 items-center">
                              <span>Discount:</span>
                              <span>
                                <input
                                  type="number"
                                  min={0}
                                  className="w-16 px-2 py-1 border border-gray-200 rounded text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={discount}
                                  onChange={e => setData(prev => ({ ...prev, documentDetails: { ...prev.documentDetails, discount: e.target.value } }))}
                                />
                                <select
                                  className="ml-1 px-1 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={discountType}
                                  onChange={e => setData(prev => ({ ...prev, documentDetails: { ...prev.documentDetails, discountType: e.target.value } }))}
                                >
                                  <option value="%">%</option>
                                  <option value="amt">Amt</option>
                                </select>
                              </span>
                            </div>
                            <div className="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-200 items-center">
                              <span>Tax (14%):</span>
                              <span className="flex items-center gap-2">
                                <span>P{tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                <button
                                  type="button"
                                  className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 ${taxEnabled ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-600 border-gray-300'}`}
                                  onClick={() => setTaxEnabled(v => !v)}
                                >
                                  {taxEnabled ? 'On' : 'Off'}
                                </button>
                              </span>
                            </div>
                            <div className="flex justify-between py-3 text-base font-bold text-gray-900 border-t-2 border-gray-300">
                              <span>Total:</span>
                              <span>P{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Notes and Terms for Quotation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Note For The Recipient</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="e.g. Thank you for your business"
                        rows={3}
                        value={data.documentDetails.notes}
                        onChange={e => setData(prev => ({ ...prev, documentDetails: { ...prev.documentDetails, notes: e.target.value } }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Terms and Conditions</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Thank you for your business."
                        rows={3}
                        value={data.documentDetails.terms || ''}
                        onChange={e => handleItemChange(0, 'terms', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* File Attachments */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Profile */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Company Profile</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="companyProfile"
                        onChange={e => {
                          const file = e.target.files?.[0] || null;
                          handleChange('proposal', 'attachments', { ...data.proposal.attachments, companyProfile: file });
                        }}
                      />
                      <label htmlFor="companyProfile" className="cursor-pointer">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {data.proposal.attachments.companyProfile ? data.proposal.attachments.companyProfile.name : 'Upload Company Profile'}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Portfolio/Previous Work</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        multiple
                        className="hidden"
                        id="portfolio"
                        onChange={e => {
                          const files = Array.from(e.target.files || []);
                          handleChange('proposal', 'attachments', { ...data.proposal.attachments, portfolio: files });
                        }}
                      />
                      <label htmlFor="portfolio" className="cursor-pointer">
                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {data.proposal.attachments.portfolio.length > 0 ? `${data.proposal.attachments.portfolio.length} files selected` : 'Upload Portfolio Files'}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">Multiple files: PDF, DOC, DOCX, JPG, PNG</p>
                      </label>
                    </div>
                    {data.proposal.attachments.portfolio.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {data.proposal.attachments.portfolio.map((file, index) => (
                          <div key={index} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            <span>{file.name}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const newFiles = data.proposal.attachments.portfolio.filter((_, i) => i !== index);
                                handleChange('proposal', 'attachments', { ...data.proposal.attachments, portfolio: newFiles });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(step as number) === 4 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Follow-Up Setup</h3>
                <p className="text-gray-600">Configure automated follow-up reminders and notifications</p>
              </div>
              
              {/* Follow-up Mode Selection */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow-Up Mode</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      data.followUp.mode === 'manual' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleChange('followUp', 'mode', 'manual')}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="followUpMode"
                        checked={data.followUp.mode === 'manual'}
                        onChange={() => handleChange('followUp', 'mode', 'manual')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Manual Schedule</div>
                        <div className="text-sm text-gray-600">Set specific follow-up dates</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      data.followUp.mode === 'automatic' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleChange('followUp', 'mode', 'automatic')}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="followUpMode"
                        checked={data.followUp.mode === 'automatic'}
                        onChange={() => handleChange('followUp', 'mode', 'automatic')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Automatic Schedule</div>
                        <div className="text-sm text-gray-600">Use default sequence (3, 7, 14, 21, 25, 30 days)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manual Follow-up Dates */}
              {data.followUp.mode === 'manual' && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Manual Follow-Up Dates</h4>
                  <div className="space-y-4">
                    {data.followUp.manualDates.map((date, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="date"
                          className={inputClass}
                          value={date}
                          onChange={(e) => {
                            const newDates = [...data.followUp.manualDates];
                            newDates[index] = e.target.value;
                            handleChange('followUp', 'manualDates', newDates);
                          }}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <button
                          className="text-red-500 hover:text-red-700 p-2"
                          onClick={() => {
                            const newDates = data.followUp.manualDates.filter((_, i) => i !== index);
                            handleChange('followUp', 'manualDates', newDates);
                          }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                      onClick={() => {
                        const newDates = [...data.followUp.manualDates, ''];
                        handleChange('followUp', 'manualDates', newDates);
                      }}
                    >
                      + Add Follow-Up Date
                    </button>
                  </div>
                </div>
              )}

              {/* Automatic Schedule Preview */}
              {data.followUp.mode === 'automatic' && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Automatic Schedule Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[3, 7, 14, 21, 25, 30].map((days, index) => {
                      const followUpDate = new Date();
                      followUpDate.setDate(followUpDate.getDate() + days);
                      return (
                        <div key={days} className="bg-gray-50 p-3 rounded-lg border">
                          <div className="text-sm font-semibold text-gray-900">Day {days}</div>
                          <div className="text-xs text-gray-600">{followUpDate.toLocaleDateString()}</div>
                          {index === 5 && (
                            <div className="text-xs text-red-600 mt-1">⚠️ Quote expires</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={data.followUp.automaticEnabled}
                        onChange={(e) => handleChange('followUp', 'automaticEnabled', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Enable automatic follow-up schedule</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Notification Preferences */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={data.followUp.notifications.email}
                        onChange={(e) => handleChange('followUp', 'notifications', { ...data.followUp.notifications, email: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Email Notifications</div>
                        <div className="text-sm text-gray-600">Send follow-up emails to {data.contact.email}</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={data.followUp.notifications.sms}
                        onChange={(e) => handleChange('followUp', 'notifications', { ...data.followUp.notifications, sms: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">SMS Notifications</div>
                        <div className="text-sm text-gray-600">Send SMS to {data.company.countryCode} {data.company.phone}</div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={data.followUp.workingDaysOnly}
                        onChange={(e) => handleChange('followUp', 'workingDaysOnly', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">Working Days Only</div>
                        <div className="text-sm text-gray-600">Skip weekends and holidays</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Custom Message */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Custom Follow-Up Message (Optional)</h4>
                <textarea
                  className={inputClass}
                  rows={4}
                  placeholder="Add a personalized message for follow-up communications..."
                  value={data.followUp.customMessage}
                  onChange={(e) => handleChange('followUp', 'customMessage', e.target.value)}
                />
              </div>

              {/* Expiry Action */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Quote Expiry Action</h4>
                <div className="space-y-3">
                  {[
                    { value: 'close-lost', label: 'Close as Lost', desc: 'Automatically mark lead as lost after 30 days' },
                    { value: 'extend', label: 'Extend Quote', desc: 'Automatically extend quote validity by 30 days' },
                    { value: 'manual-review', label: 'Manual Review', desc: 'Flag for manual review before taking action' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="expiryAction"
                        value={option.value}
                        checked={data.followUp.expiryAction === option.value}
                        onChange={(e) => handleChange('followUp', 'expiryAction', e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">Follow-Up Summary</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <div><strong>Contact:</strong> {data.contact.firstName} {data.contact.lastName}</div>
                      <div><strong>Email:</strong> {data.contact.email}</div>
                      <div><strong>Phone:</strong> {data.company.countryCode} {data.company.phone}</div>
                      <div><strong>Mode:</strong> {data.followUp.mode === 'manual' ? 'Manual Schedule' : 'Automatic Schedule'}</div>
                      <div><strong>Notifications:</strong> 
                        {data.followUp.notifications.email ? 'Email' : ''}
                        {data.followUp.notifications.email && data.followUp.notifications.sms ? ' + ' : ''}
                        {data.followUp.notifications.sms ? 'SMS' : ''}
                        {!data.followUp.notifications.email && !data.followUp.notifications.sms ? 'None selected' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(step as number) === 5 && (
            <div className="flex flex-col items-center">
              <div className="mb-6 flex space-x-4">
              <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
                onClick={handleDownloadPDF}
              >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
              </button>
                <button
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
                  onClick={handleComplete}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send {data.documentType}</span>
                </button>
                </div>
              
              <div className="flex-1 bg-white rounded-2xl border border-gray-300 shadow-lg overflow-hidden max-w-4xl w-full">
                <div className={`text-white px-8 py-6 ${data.documentType === 'Proposal' ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
                  <div className="font-bold text-xl">Final {data.documentType} Preview</div>
                  <div className={`text-sm ${data.documentType === 'Proposal' ? 'text-green-100' : 'text-blue-100'}`}>A4 Format - Ready for PDF Generation</div>
                </div>
                <div className="p-8 overflow-visible" id="quotation-preview" style={{ minHeight: 'auto' }}>
                  {data.documentType === 'Proposal' ? (
                    // Proposal Preview
                    <>
                      {/* Company Header - Enhanced for A4 */}
                      <div className="mb-8 border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">Orizon CRM</div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Business Management Software Solutions</div>
                              <div>Email: info@orizoncrm.com | Phone: +267 123 4567</div>
                              <div>Postal Address: P.O. Box 123, Gaborone, Botswana</div>
                              <div>Physical Address: Plot 123, Central Business District, Gaborone</div>
                              <div>Website: www.orizoncrm.com</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Proposal Date</div>
                            <div className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>

                      {/* Proposal Subject */}
                  <div className="mb-8">
                        <div className="text-2xl font-bold text-gray-900 mb-4">{data.proposal.subject || 'Proposal Subject'}</div>
                      </div>

                      {/* Client Information */}
                      <div className="mb-8">
                        <div className="text-lg font-semibold text-gray-700 mb-3">Prepared For:</div>
                        <div className="bg-gray-50 p-4 rounded border">
                          <div className="font-medium text-gray-900 text-lg mb-2">{data.company.name || 'Company Name'}</div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><span className="font-semibold">Contact:</span> {data.contact.firstName} {data.contact.lastName}</div>
                            <div><span className="font-semibold">Email:</span> {data.contact.email}</div>
                            <div><span className="font-semibold">Phone:</span> {data.company.countryCode} {data.company.phone}</div>
                          </div>
                        </div>
                      </div>

                      {/* Proposal Body */}
                      <div className="mb-8">
                        <div className="text-lg font-semibold text-gray-700 mb-3">Proposal Details:</div>
                        <div 
                          className="text-sm text-gray-800 bg-gray-50 p-6 rounded border leading-relaxed whitespace-pre-wrap min-h-[200px]"
                          style={{
                            fontFamily: data.proposal.formatting.fontFamily,
                            fontSize: `${data.proposal.formatting.fontSize}px`,
                            textAlign: data.proposal.formatting.textAlign,
                            fontWeight: textFormatting.bold ? 'bold' : 'normal',
                            fontStyle: textFormatting.italic ? 'italic' : 'normal',
                            textDecoration: textFormatting.underline ? 'underline' : 'none'
                          }}
                        >
                          {data.proposal.body || 'Your proposal content will appear here...'}
                        </div>
                      </div>

                      {/* Include Quotation Section */}
                      {data.proposal.includeQuotation && data.documentDetails.items.length > 0 && (
                        <div className="mb-8">
                          <div className="text-lg font-semibold text-gray-700 mb-3">Quotation Breakdown:</div>
                          
                          {/* Items Table */}
                          <table className="w-full border border-gray-200 mb-4">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left p-4 text-sm font-semibold text-gray-700">Description</th>
                                <th className="text-center p-4 text-sm font-semibold text-gray-700 w-20">Qty</th>
                                <th className="text-right p-4 text-sm font-semibold text-gray-700 w-28">Unit Price</th>
                                <th className="text-right p-4 text-sm font-semibold text-gray-700 w-28">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.documentDetails.items.map((item, idx) => {
                                const total = Number(item.price || 0) * Number(item.quantity || 0);
                                return (
                                  <tr key={idx} className="border-b border-gray-100">
                                    <td className="p-4 text-sm text-gray-800 align-top">
                                      <div className="font-medium mb-1">{item.description || 'Item description'}</div>
                                      {item.details && (
                                        <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                                          {item.details}
                                        </div>
                                      )}
                                    </td>
                                    <td className="p-4 text-sm text-gray-600 text-center align-top">{item.quantity || 1}</td>
                                    <td className="p-4 text-sm text-gray-600 text-right align-top">P{Number(item.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="p-4 text-sm text-gray-800 text-right font-medium align-top">P{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>

                          {/* Totals */}
                          <div className="flex justify-end">
                            <div className="w-80">
                              {(() => {
                                const subtotal = data.documentDetails.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
                                const discount = Number(data.documentDetails.discount || 0);
                                const discountType = data.documentDetails.discountType || '%';
                                const discountValue = discountType === '%' ? subtotal * (discount / 100) : discount;
                                const taxable = subtotal - discountValue;
                                const tax = taxEnabled ? taxable * 0.14 : 0;
                                const total = taxable + tax;
                                return (
                                  <>
                                    <div className="flex justify-between py-3 text-sm text-gray-600 border-b border-gray-200">
                                      <span>Sub Total:</span>
                                      <span>P{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm text-gray-600 border-b border-gray-200">
                                      <span>Discount ({discountType === '%' ? `${discount}%` : 'Fixed'}):</span>
                                      <span>-P{discountValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between py-3 text-sm text-gray-600 border-b border-gray-200">
                                      <span>Tax (14%):</span>
                                      <span>P{tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between py-4 text-lg font-bold text-gray-900 border-t-2 border-gray-300 bg-gray-50 px-3 rounded">
                                      <span>Total Amount:</span>
                                      <span>P{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Attachments */}
                      {(data.proposal.attachments.companyProfile || data.proposal.attachments.portfolio.length > 0) && (
                        <div className="mb-8">
                          <div className="text-lg font-semibold text-gray-700 mb-3">Attachments:</div>
                          <div className="bg-gray-50 p-4 rounded border">
                            {data.proposal.attachments.companyProfile && (
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-semibold">Company Profile:</span> {data.proposal.attachments.companyProfile.name}
                              </div>
                            )}
                            {data.proposal.attachments.portfolio.length > 0 && (
                    <div className="text-sm text-gray-600">
                                <span className="font-semibold">Portfolio Files:</span>
                                <ul className="mt-1 ml-4">
                                  {data.proposal.attachments.portfolio.map((file, index) => (
                                    <li key={index} className="list-disc">{file.name}</li>
                                  ))}
                                </ul>
                    </div>
                            )}
                  </div>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <div className="text-sm text-gray-600 mb-2">Thank you for considering our proposal!</div>
                        <div className="text-xs text-gray-500">For any questions, please contact us at info@orizoncrm.com or +267 123 4567</div>
                      </div>
                    </>
                  ) : (
                    // Quotation Preview (existing)
                    <>
                      {/* Company Header - Enhanced for A4 */}
                      <div className="mb-8 border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start">
                    <div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">Orizon CRM</div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Business Management Software Solutions</div>
                              <div>Email: info@orizoncrm.com | Phone: +267 123 4567</div>
                              <div>Postal Address: P.O. Box 123, Gaborone, Botswana</div>
                              <div>Physical Address: Plot 123, Central Business District, Gaborone</div>
                              <div>Website: www.orizoncrm.com</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Quote Date</div>
                            <div className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>

                  {/* Document Title & Info - Enhanced */}
                  <div className="mb-8">
                    <div className="text-2xl font-bold text-gray-900 mb-4">{data.documentType || 'Quotation'}</div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                          <span className="font-semibold">Quote #:</span> QT-{Date.now().toString().slice(-6)}
                      </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Valid Until:</span> {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Lead Source:</span> {data.contact.leadSource}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Follow-Up Mode:</span> {data.followUp.mode === 'manual' ? 'Manual Schedule' : 'Automatic Schedule'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Notifications:</span> {data.followUp.notifications.email ? 'Email' : ''}{data.followUp.notifications.email && data.followUp.notifications.sms ? ' + ' : ''}{data.followUp.notifications.sms ? 'SMS' : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Client Information - Enhanced with all details */}
                  <div className="mb-8">
                    <div className="text-lg font-semibold text-gray-700 mb-3">Bill To:</div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="bg-gray-50 p-4 rounded border">
                        <div className="font-medium text-gray-900 text-lg mb-2">{data.company.name || 'Company Name'}</div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div><span className="font-semibold">Contact:</span> {data.contact.firstName} {data.contact.lastName}</div>
                          <div><span className="font-semibold">Email:</span> {data.contact.email}</div>
                          <div><span className="font-semibold">Phone:</span> {data.company.countryCode} {data.company.phone}</div>
                          <div><span className="font-semibold">Company Email:</span> {data.company.email}</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded border">
                        <div className="text-sm text-gray-600 space-y-1">
                          <div><span className="font-semibold">Physical Address:</span></div>
                      <div>{data.company.physicalAddress}</div>
                      <div>{data.company.country}</div>
                          <div className="mt-3">
                            <div><span className="font-semibold">Postal Address:</span></div>
                            <div>{data.company.postalAddress}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items Table - Enhanced for A4 with full descriptions */}
                  <div className="mb-8">
                    <table className="w-full border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left p-4 text-sm font-semibold text-gray-700">Description</th>
                          <th className="text-center p-4 text-sm font-semibold text-gray-700 w-20">Qty</th>
                          <th className="text-right p-4 text-sm font-semibold text-gray-700 w-28">Unit Price</th>
                          <th className="text-right p-4 text-sm font-semibold text-gray-700 w-28">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.documentDetails.items.map((item, idx) => {
                          const total = Number(item.price || 0) * Number(item.quantity || 0);
                          return (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="p-4 text-sm text-gray-800 align-top">
                                <div className="font-medium mb-1">{item.description || 'Item description'}</div>
                                {item.details && (
                                  <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap">
                                    {item.details}
                                  </div>
                                )}
                              </td>
                              <td className="p-4 text-sm text-gray-600 text-center align-top">{item.quantity || 1}</td>
                              <td className="p-4 text-sm text-gray-600 text-right align-top">P{Number(item.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                              <td className="p-4 text-sm text-gray-800 text-right font-medium align-top">P{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Section - Enhanced to always show all values */}
                  <div className="flex justify-end mb-8">
                    <div className="w-80">
                      {(() => {
                        const subtotal = data.documentDetails.items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
                        const discount = Number(data.documentDetails.discount || 0);
                        const discountType = data.documentDetails.discountType || '%';
                        const discountValue = discountType === '%' ? subtotal * (discount / 100) : discount;
                        const taxable = subtotal - discountValue;
                        const tax = taxEnabled ? taxable * 0.14 : 0;
                        const total = taxable + tax;
                        return (
                          <>
                            <div className="flex justify-between py-3 text-sm text-gray-600 border-b border-gray-200">
                              <span>Sub Total:</span>
                              <span>P{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between py-3 text-sm text-gray-600 border-b border-gray-200">
                              <span>Discount ({discountType === '%' ? `${discount}%` : 'Fixed'}):</span>
                              <span>-P{discountValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between py-3 text-sm text-gray-600 border-b border-gray-200">
                              <span>Tax (14%):</span>
                              <span>P{tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between py-4 text-lg font-bold text-gray-900 border-t-2 border-gray-300 bg-gray-50 px-3 rounded">
                              <span>Total Amount:</span>
                              <span>P{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Notes - Enhanced */}
                  {data.documentDetails.notes && (
                    <div className="mb-8">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Notes:</div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded border leading-relaxed whitespace-pre-wrap">
                        {data.documentDetails.notes}
                      </div>
                    </div>
                  )}

                  {/* Terms & Conditions - Enhanced */}
                  {data.documentDetails.terms && (
                    <div className="mb-8">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Terms & Conditions:</div>
                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded border leading-relaxed whitespace-pre-wrap">
                        {data.documentDetails.terms}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <div className="text-sm text-gray-600 mb-2">Thank you for your business!</div>
                        <div className="text-xs text-gray-500">For any questions, please contact us at info@orizoncrm.com or +267 123 4567</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modern Navigation - sticky footer */}
        <div className="sticky bottom-0 left-0 right-0 z-10 flex justify-between items-center px-8 py-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <button 
            onClick={handleBack} 
            disabled={step === 0} 
            className="flex items-center px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 disabled:opacity-50 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Step {step + 1} of {steps.length}</span>
          </div>

          {step < steps.length - 1 ? (
            <button 
              onClick={handleNext} 
              disabled={!isStepValid()} 
              className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button 
              onClick={handleComplete} 
              className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105"
            >
              Finish & Send
            </button>
          )}

          <button 
            onClick={onClose} 
            className="px-6 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadWizardModal; 