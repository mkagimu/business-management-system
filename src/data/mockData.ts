import { Lead, Project, Task, Client, Product, Order, Employee, Transaction, Invoice } from '../types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    status: 'qualified',
    source: 'Website',
    value: 15000,
    createdAt: '2024-01-15',
    lastContact: '2024-01-20',
    notes: 'Interested in complete website redesign and e-commerce integration. Has budget approved.',
    tags: ['Website', 'E-commerce', 'High Value'],
    assignedTo: 'John Doe',
    owner: 'John Doe',
    nextAction: 'Send contract',
    lastActivity: '2024-01-20',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@startupco.com',
    phone: '+1 (555) 987-6543',
    company: 'StartupCo',
    status: 'proposal',
    source: 'Referral',
    value: 25000,
    createdAt: '2024-01-10',
    lastContact: '2024-01-18',
    notes: 'Looking for mobile app development and backend services. Needs proposal by end of month.',
    tags: ['Mobile App', 'Backend', 'Urgent'],
    assignedTo: 'Jane Smith',
    owner: 'Jane Smith',
    nextAction: 'Follow up call',
    lastActivity: '2024-01-18',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@retailplus.com',
    phone: '+1 (555) 456-7890',
    company: 'RetailPlus',
    status: 'contacted',
    source: 'LinkedIn',
    value: 8000,
    createdAt: '2024-01-12',
    lastContact: '2024-01-19',
    notes: 'Small business looking for inventory management system. Price sensitive.',
    tags: ['Inventory', 'Small Business'],
    assignedTo: 'Mike Johnson',
    owner: 'Mike Johnson',
    nextAction: 'Demo scheduled',
    lastActivity: '2024-01-19',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@healthtech.com',
    phone: '+1 (555) 321-9876',
    company: 'HealthTech Solutions',
    status: 'new',
    source: 'Cold Email',
    value: 35000,
    createdAt: '2024-01-22',
    lastContact: '2024-01-22',
    notes: 'Healthcare startup needing HIPAA-compliant patient management system.',
    tags: ['Healthcare', 'HIPAA', 'Large Project'],
    assignedTo: 'Alice Brown',
    owner: 'Alice Brown',
    nextAction: 'Initial meeting',
    lastActivity: '2024-01-22',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa@edulearn.com',
    phone: '+1 (555) 654-3210',
    company: 'EduLearn Platform',
    status: 'converted',
    source: 'Google Ads',
    value: 18000,
    createdAt: '2024-01-05',
    lastContact: '2024-01-15',
    notes: 'Educational platform requiring LMS integration. Project started.',
    tags: ['Education', 'LMS', 'Converted'],
    assignedTo: 'Bob Wilson',
    owner: 'Bob Wilson',
    nextAction: 'Onboarding',
    lastActivity: '2024-01-15',
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    clientId: '1',
    clientName: 'TechCorp Inc.',
    status: 'development',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    budget: 15000,
    spent: 9750,
    description: 'Complete e-commerce solution with payment integration, inventory management, and admin dashboard',
    team: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    tasks: ['1', '3', '5'],
    milestones: [
      { id: '1', title: 'Requirements Gathering', dueDate: '2024-01-25', completed: true, description: 'Complete project requirements and specifications' },
      { id: '2', title: 'Design Phase', dueDate: '2024-02-10', completed: true, description: 'UI/UX design and wireframes' },
      { id: '3', title: 'Development Phase', dueDate: '2024-03-01', completed: false, description: 'Core development and features' },
      { id: '4', title: 'Testing & Launch', dueDate: '2024-03-15', completed: false, description: 'Quality assurance and deployment' }
    ]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    clientId: '2',
    clientName: 'StartupCo',
    status: 'design',
    progress: 35,
    startDate: '2024-01-20',
    endDate: '2024-04-20',
    budget: 25000,
    spent: 8750,
    description: 'iOS and Android app with backend API, user authentication, and real-time features',
    team: ['Alice Brown', 'Bob Wilson', 'Carol Davis'],
    tasks: ['2', '6'],
    milestones: [
      { id: '5', title: 'Market Research', dueDate: '2024-01-30', completed: true, description: 'Competitive analysis and user research' },
      { id: '6', title: 'App Design', dueDate: '2024-02-15', completed: false, description: 'Mobile UI/UX design' },
      { id: '7', title: 'Backend Development', dueDate: '2024-03-15', completed: false, description: 'API and database setup' },
      { id: '8', title: 'Mobile Development', dueDate: '2024-04-10', completed: false, description: 'iOS and Android development' }
    ]
  },
  {
    id: '3',
    name: 'Website Redesign',
    clientId: '3',
    clientName: 'RetailPlus',
    status: 'completed',
    progress: 100,
    startDate: '2023-12-01',
    endDate: '2024-01-15',
    budget: 8000,
    spent: 7800,
    description: 'Modern website redesign with CMS integration and SEO optimization',
    team: ['David Lee', 'Emma White'],
    tasks: ['4'],
    milestones: [
      { id: '9', title: 'Content Audit', dueDate: '2023-12-10', completed: true, description: 'Review existing content and structure' },
      { id: '10', title: 'New Design', dueDate: '2023-12-20', completed: true, description: 'Create new visual design' },
      { id: '11', title: 'Development', dueDate: '2024-01-10', completed: true, description: 'Build new website' },
      { id: '12', title: 'Launch', dueDate: '2024-01-15', completed: true, description: 'Deploy and go live' }
    ]
  },
  {
    id: '4',
    name: 'Healthcare Management System',
    clientId: '4',
    clientName: 'HealthTech Solutions',
    status: 'planning',
    progress: 15,
    startDate: '2024-01-25',
    endDate: '2024-06-25',
    budget: 35000,
    spent: 5250,
    description: 'HIPAA-compliant patient management system with appointment scheduling and billing',
    team: ['Alice Brown', 'Frank Miller', 'Grace Chen'],
    tasks: ['7'],
    milestones: [
      { id: '13', title: 'Compliance Review', dueDate: '2024-02-05', completed: false, description: 'HIPAA compliance assessment' },
      { id: '14', title: 'System Architecture', dueDate: '2024-02-20', completed: false, description: 'Technical architecture design' },
      { id: '15', title: 'Core Development', dueDate: '2024-05-15', completed: false, description: 'Main system development' },
      { id: '16', title: 'Security Testing', dueDate: '2024-06-15', completed: false, description: 'Security audit and testing' }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create wireframes and visual design for the new homepage layout with modern UI elements',
    projectId: '1',
    projectName: 'E-commerce Platform',
    assignee: 'Jane Smith',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-25',
    createdAt: '2024-01-20',
    estimatedHours: 16,
    actualHours: 12,
    tags: ['Design', 'UI/UX', 'Homepage']
  },
  {
    id: '2',
    title: 'API Development',
    description: 'Build REST API endpoints for user authentication, data management, and real-time features',
    projectId: '2',
    projectName: 'Mobile App Development',
    assignee: 'John Doe',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-01-28',
    createdAt: '2024-01-18',
    estimatedHours: 40,
    tags: ['Backend', 'API', 'Authentication']
  },
  {
    id: '3',
    title: 'Database Schema Review',
    description: 'Review and optimize database schema for performance and scalability',
    projectId: '1',
    projectName: 'E-commerce Platform',
    assignee: 'Mike Johnson',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-01-22',
    createdAt: '2024-01-15',
    estimatedHours: 8,
    actualHours: 6,
    tags: ['Database', 'Performance', 'Schema']
  },
  {
    id: '4',
    title: 'Client Feedback Integration',
    description: 'Implement changes based on client feedback from last review meeting',
    projectId: '3',
    projectName: 'Website Redesign',
    assignee: 'Alice Brown',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-01-12',
    createdAt: '2024-01-08',
    estimatedHours: 12,
    actualHours: 14,
    tags: ['Feedback', 'Revisions', 'Client']
  },
  {
    id: '5',
    title: 'Payment Gateway Integration',
    description: 'Integrate Stripe payment processing with order management system',
    projectId: '1',
    projectName: 'E-commerce Platform',
    assignee: 'Bob Wilson',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-30',
    createdAt: '2024-01-22',
    estimatedHours: 24,
    actualHours: 8,
    tags: ['Payment', 'Integration', 'Stripe']
  },
  {
    id: '6',
    title: 'Mobile UI Components',
    description: 'Create reusable UI components for iOS and Android applications',
    projectId: '2',
    projectName: 'Mobile App Development',
    assignee: 'Carol Davis',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-02-05',
    createdAt: '2024-01-20',
    estimatedHours: 32,
    tags: ['Mobile', 'UI Components', 'React Native']
  },
  {
    id: '7',
    title: 'HIPAA Compliance Documentation',
    description: 'Prepare comprehensive HIPAA compliance documentation and security protocols',
    projectId: '4',
    projectName: 'Healthcare Management System',
    assignee: 'Frank Miller',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-02-01',
    createdAt: '2024-01-25',
    estimatedHours: 20,
    actualHours: 5,
    tags: ['HIPAA', 'Compliance', 'Documentation']
  }
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    projects: ['1'],
    totalValue: 15000,
    status: 'active',
    joinDate: '2024-01-15',
    lastActivity: '2024-01-20'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@startupco.com',
    company: 'StartupCo',
    phone: '+1 (555) 987-6543',
    address: '456 Innovation Ave, Austin, TX 78701',
    projects: ['2'],
    totalValue: 25000,
    status: 'active',
    joinDate: '2024-01-20',
    lastActivity: '2024-01-22'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@retailplus.com',
    company: 'RetailPlus',
    phone: '+1 (555) 456-7890',
    address: '789 Commerce Blvd, Miami, FL 33101',
    projects: ['3'],
    totalValue: 8000,
    status: 'active',
    joinDate: '2023-12-01',
    lastActivity: '2024-01-15'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@healthtech.com',
    company: 'HealthTech Solutions',
    phone: '+1 (555) 321-9876',
    address: '321 Medical Center Dr, Boston, MA 02101',
    projects: ['4'],
    totalValue: 35000,
    status: 'active',
    joinDate: '2024-01-25',
    lastActivity: '2024-01-25'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Website Development Package',
    description: 'Complete website development with modern design, CMS integration, and SEO optimization',
    price: 2500,
    category: 'Web Development',
    stock: 10,
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg',
    rating: 4.8,
    reviews: 24,
    featured: true
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'iOS and Android app development with backend API integration and cloud deployment',
    price: 5000,
    category: 'Mobile Development',
    stock: 5,
    image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
    rating: 4.9,
    reviews: 18,
    featured: true
  },
  {
    id: '3',
    name: 'SEO Optimization Service',
    description: 'Complete SEO audit and optimization for better search rankings and organic traffic',
    price: 800,
    category: 'Digital Marketing',
    stock: 20,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
    rating: 4.7,
    reviews: 32,
    featured: false
  },
  {
    id: '4',
    name: 'Brand Identity Design',
    description: 'Logo design, brand guidelines, business cards, and complete marketing materials',
    price: 1200,
    category: 'Design',
    stock: 15,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    rating: 4.6,
    reviews: 28,
    featured: false
  },
  {
    id: '5',
    name: 'E-commerce Platform',
    description: 'Full e-commerce solution with payment gateway integration, inventory management, and analytics',
    price: 3500,
    category: 'Web Development',
    stock: 8,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    rating: 4.9,
    reviews: 15,
    featured: true
  },
  {
    id: '6',
    name: 'Social Media Management',
    description: 'Monthly social media content creation, posting schedule, and engagement management',
    price: 600,
    category: 'Digital Marketing',
    stock: 25,
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    rating: 4.5,
    reviews: 41,
    featured: false
  },
  {
    id: '7',
    name: 'Cloud Infrastructure Setup',
    description: 'AWS/Azure cloud infrastructure setup with security, monitoring, and backup solutions',
    price: 1800,
    category: 'DevOps',
    stock: 12,
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    rating: 4.8,
    reviews: 19,
    featured: false
  },
  {
    id: '8',
    name: 'Database Design & Optimization',
    description: 'Database architecture design, performance optimization, and migration services',
    price: 1500,
    category: 'Backend Development',
    stock: 18,
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    rating: 4.7,
    reviews: 22,
    featured: false
  }
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Full Stack Developer',
    department: 'Engineering',
    joinDate: '2022-03-15',
    salary: 95000,
    status: 'active',
    avatar: 'JD',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    projects: ['1', '2']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    phone: '+1 (555) 987-6543',
    position: 'Senior UI/UX Designer',
    department: 'Design',
    joinDate: '2022-06-01',
    salary: 85000,
    status: 'active',
    avatar: 'JS',
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
    projects: ['1', '3']
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    phone: '+1 (555) 456-7890',
    position: 'Project Manager',
    department: 'Management',
    joinDate: '2021-11-20',
    salary: 90000,
    status: 'active',
    avatar: 'MJ',
    skills: ['Agile', 'Scrum', 'Project Planning', 'Risk Management'],
    projects: ['1', '4']
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@company.com',
    phone: '+1 (555) 321-9876',
    position: 'Backend Developer',
    department: 'Engineering',
    joinDate: '2023-01-10',
    salary: 80000,
    status: 'active',
    avatar: 'AB',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis'],
    projects: ['2', '4']
  },
  {
    id: '5',
    name: 'Bob Wilson',
    email: 'bob@company.com',
    phone: '+1 (555) 654-3210',
    position: 'Frontend Developer',
    department: 'Engineering',
    joinDate: '2023-04-15',
    salary: 75000,
    status: 'active',
    avatar: 'BW',
    skills: ['React', 'Vue.js', 'CSS', 'JavaScript', 'Tailwind'],
    projects: ['1', '3']
  },
  {
    id: '6',
    name: 'Carol Davis',
    email: 'carol@company.com',
    phone: '+1 (555) 789-0123',
    position: 'Mobile Developer',
    department: 'Engineering',
    joinDate: '2023-07-01',
    salary: 82000,
    status: 'active',
    avatar: 'CD',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store'],
    projects: ['2']
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    description: 'Payment from TechCorp Inc. - E-commerce Platform',
    amount: 7500,
    date: '2024-01-20',
    category: 'Project Payment',
    projectId: '1',
    clientId: '1'
  },
  {
    id: '2',
    type: 'expense',
    description: 'Software Licenses - Adobe Creative Suite',
    amount: 299,
    date: '2024-01-19',
    category: 'Software'
  },
  {
    id: '3',
    type: 'income',
    description: 'Payment from StartupCo - Mobile App Development',
    amount: 12500,
    date: '2024-01-18',
    category: 'Project Payment',
    projectId: '2',
    clientId: '2'
  },
  {
    id: '4',
    type: 'expense',
    description: 'Office Supplies and Equipment',
    amount: 450,
    date: '2024-01-17',
    category: 'Office Expenses'
  },
  {
    id: '5',
    type: 'income',
    description: 'Payment from RetailPlus - Website Redesign',
    amount: 8000,
    date: '2024-01-16',
    category: 'Project Payment',
    projectId: '3',
    clientId: '3'
  },
  {
    id: '6',
    type: 'expense',
    description: 'AWS Cloud Services',
    amount: 180,
    date: '2024-01-15',
    category: 'Infrastructure'
  },
  {
    id: '7',
    type: 'expense',
    description: 'Marketing and Advertising',
    amount: 750,
    date: '2024-01-14',
    category: 'Marketing'
  },
  {
    id: '8',
    type: 'income',
    description: 'SEO Service Package - Multiple Clients',
    amount: 2400,
    date: '2024-01-12',
    category: 'Service Payment'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    clientId: '1',
    clientName: 'TechCorp Inc.',
    amount: 7500,
    status: 'paid',
    issueDate: '2024-01-15',
    dueDate: '2024-01-30',
    items: [
      { description: 'E-commerce Platform Development - Phase 1', quantity: 1, rate: 7500, amount: 7500 }
    ]
  },
  {
    id: 'INV-002',
    clientId: '2',
    clientName: 'StartupCo',
    amount: 12500,
    status: 'sent',
    issueDate: '2024-01-20',
    dueDate: '2024-02-05',
    items: [
      { description: 'Mobile App Development - Initial Phase', quantity: 1, rate: 12500, amount: 12500 }
    ]
  },
  {
    id: 'INV-003',
    clientId: '3',
    clientName: 'RetailPlus',
    amount: 8000,
    status: 'paid',
    issueDate: '2024-01-10',
    dueDate: '2024-01-25',
    items: [
      { description: 'Website Redesign - Complete Project', quantity: 1, rate: 8000, amount: 8000 }
    ]
  },
  {
    id: 'INV-004',
    clientId: '4',
    clientName: 'HealthTech Solutions',
    amount: 5250,
    status: 'overdue',
    issueDate: '2024-01-05',
    dueDate: '2024-01-20',
    items: [
      { description: 'Healthcare System - Planning Phase', quantity: 1, rate: 5250, amount: 5250 }
    ]
  },
  {
    id: 'INV-005',
    clientId: '1',
    clientName: 'TechCorp Inc.',
    amount: 2250,
    status: 'draft',
    issueDate: '2024-01-22',
    dueDate: '2024-02-06',
    items: [
      { description: 'Additional Features and Modifications', quantity: 1, rate: 2250, amount: 2250 }
    ]
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    clientId: '1',
    clientName: 'TechCorp Inc.',
    items: [
      { productId: '1', productName: 'Website Development Package', quantity: 1, price: 2500 },
      { productId: '3', productName: 'SEO Optimization Service', quantity: 1, price: 800 }
    ],
    total: 3300,
    status: 'completed',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 'ORD-002',
    clientId: '2',
    clientName: 'StartupCo',
    items: [
      { productId: '2', productName: 'Mobile App Development', quantity: 1, price: 5000 }
    ],
    total: 5000,
    status: 'processing',
    orderDate: '2024-01-18'
  },
  {
    id: 'ORD-003',
    clientId: '3',
    clientName: 'RetailPlus',
    items: [
      { productId: '4', productName: 'Brand Identity Design', quantity: 1, price: 1200 },
      { productId: '6', productName: 'Social Media Management', quantity: 3, price: 600 }
    ],
    total: 3000,
    status: 'pending',
    orderDate: '2024-01-20'
  }
];

export const mockOwners = [
  { id: '1', name: 'John Doe', email: 'john@crm.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@crm.com' },
  { id: '3', name: 'Mike Johnson', email: 'mike@crm.com' },
  { id: '4', name: 'Alice Brown', email: 'alice@crm.com' },
  { id: '5', name: 'Bob Wilson', email: 'bob@crm.com' },
];

export const mockTags = [
  { id: '1', label: 'High Value', color: 'bg-yellow-100 text-yellow-800' },
  { id: '2', label: 'Urgent', color: 'bg-red-100 text-red-800' },
  { id: '3', label: 'Healthcare', color: 'bg-green-100 text-green-800' },
  { id: '4', label: 'Education', color: 'bg-blue-100 text-blue-800' },
  { id: '5', label: 'Converted', color: 'bg-purple-100 text-purple-800' },
];