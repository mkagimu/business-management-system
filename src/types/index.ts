export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';
  source: string;
  value: number;
  createdAt: string;
  lastContact: string;
  notes: string;
  tags: string[];
  assignedTo: string;
  owner?: string;
  nextAction?: string;
  lastActivity?: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  status: 'planning' | 'requirements' | 'design' | 'development' | 'review' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  description: string;
  team: string[];
  tasks: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  address: string;
  postalAddress?: string;
  designation?: string;
  projects: string[];
  totalValue: number;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActivity: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  rating: number;
  reviews: number;
  featured: boolean;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive';
  avatar: string;
  skills: string[];
  projects: string[];
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
  projectId?: string;
  clientId?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  items: { description: string; quantity: number; rate: number; amount: number }[];
}

export interface Owner {
  id: string;
  name: string;
  email: string;
}

export interface Tag {
  id: string;
  label: string;
  color: string;
}