import {
    Boxes,
    FileCheck2,
    Globe2,
    Landmark,
    Network,
    ReceiptText,
    ShieldCheck,
  } from 'lucide-react';

export const slides = [
    {
      eyebrow: 'TAJIN / BUSINESS PARTNERS',
      heading: 'Building Stronger Businesses Across Borders',
      subheading:
        'Professional accounting, auditing, taxation, and business advisory services backed by experienced teams across the Middle East and India.',
      button: 'Get Started',
      action: '/contact-us',
      index: '01',
      accent: 'ACCOUNTING · TAX · ADVISORY',
    },
    {
      eyebrow: 'TAJIN / DIGITAL OPERATIONS',
      heading: 'Transform Operations with Smart ERP Solutions',
      subheading:
        'Automate finance, inventory, sales, procurement, and reporting with a scalable ERP platform designed for modern businesses.',
      button: 'Discover ERP',
      action: '/erp',
      index: '02',
      accent: 'ERP · SOFTWARE · DATA',
    },
    {
      eyebrow: 'TAJIN / ONE EXPERIENCED TEAM',
      heading: 'Where Financial Expertise Meets Technology',
      subheading:
        'A multidisciplinary team of Chartered Accountants, Auditors, and Technology Experts delivering measurable business results.',
      button: 'Contact Us',
      action: '/contact-us',
      index: '03',
      accent: 'PEOPLE · PROCESS · PROGRESS',
    },
  ];
  
  export const services = [
    {
      id: 'finance',
      number: '01',
      title: 'Accounting back office',
      description: 'A dependable finance desk for accurate books, timely closing, and decisions you can stand behind.',
      icon: ReceiptText,
    },
    {
      id: 'tax',
      number: '02',
      title: 'Tax & consultation',
      description: 'Clear advice for complex tax landscapes, from compliance and planning to cross-border questions.',
      icon: Landmark,
    },
    {
      id: 'audit',
      number: '03',
      title: 'Audit & assurance',
      description: 'Independent perspective, robust controls, and reporting that gives stakeholders confidence.',
      icon: FileCheck2,
    },
    {
      id: 'erp',
      number: '04',
      title: 'ERP & software',
      description: 'Practical systems that connect finance, inventory, sales, and operations without the friction.',
      icon: Boxes,
    },
    {
      id: 'growth',
      number: '05',
      title: 'Growth infrastructure',
      description: 'E-commerce, company formation, and custom technology support for your next market.',
      icon: Globe2,
    },
  ];
  
  export const offices = [
    { city: 'Mumbai', country: 'India', code: 'IN' },
    { city: 'Manama', country: 'Bahrain', code: 'BH' },
    { city: 'Riyadh', country: 'Saudi Arabia', code: 'SA' },
    { city: 'Muscat', country: 'Oman', code: 'OM' },
    { city: 'Dubai', country: 'United Arab Emirates', code: 'AE' },
  ];
  
 export const successMetrics = [
    { value: 7, label: 'Countries', suffix: '' },
    { value: 50, label: 'Clients served', suffix: '+' },
    { value: 98, label: 'Customer satisfaction', suffix: '%' },
    { value: 50, label: 'Personnel', suffix: '+' },
  ];
  
export const erpFeatureGroups = [
    {
      number: '01',
      title: 'Sell with control',
      text: 'Point of sale, item sales, bulk sales, quotations, delivery challans, and serial-number based items in one connected workflow.',
      features: ['Point of sale', 'Bulk sale', 'Quotations', 'Delivery challan', 'Serial number items'],
      icon: ReceiptText,
    },
    {
      number: '02',
      title: 'Buy and move faster',
      text: 'Manage purchasing, expenses, and payment movement without losing the detail your accounts depend on.',
      features: ['Bulk purchase', 'Purchase orders', 'Expenses', 'Payment in', 'Payment out'],
      icon: Landmark,
    },
    {
      number: '03',
      title: 'Know your stock',
      text: 'Keep items visible from one location to the next with stock transfers, summaries, and movement history.',
      features: ['Stock transfer', 'Stock summary', 'Stock detail', 'Stock movement', 'Item-wise profit'],
      icon: Boxes,
    },
    {
      number: '04',
      title: 'Govern the whole business',
      text: 'Set up the way your organization actually works, from journaling and roles to multiple branches and companies.',
      features: ['Multi-company', 'Multi-branch', 'Multi-user', 'Role management', 'Journaling'],
      icon: Network,
    },
  ];
  
 export const erpReports = [
    'Sale report',
    'Purchase report',
    'Sale return report',
    'Purchase return report',
    'Expense report',
    'Transaction statement',
    'Tax reports',
    'Stock summary report',
    'Stock detail report',
    'Item-wise profit report',
    'Stock movement report',
    'Account statement',
    'Receivable report',
    'Payable report',
    'Trial balance',
    'Balance sheet',
    'Profit and loss report',
    'Daily summary report',
  ];
  
 export const erpWorkflows = [
    {
      number: '01',
      title: 'Create your business structure',
      text: 'Set up companies, branches, users, roles, accounts, items, tax settings, and opening balances around the way you operate.',
      tags: ['Company setup', 'Branches', 'Users', 'Roles'],
    },
    {
      number: '02',
      title: 'Sell from the front line',
      text: 'Move from quotation to sale, delivery, payment, and return while keeping item, customer, and account details connected.',
      tags: ['Quotation', 'POS', 'Delivery challan', 'Sale return'],
    },
    {
      number: '03',
      title: 'Control purchases and stock',
      text: 'Follow purchasing from order to receipt, track serial-number items, add expenses, and transfer stock between branches.',
      tags: ['Purchase order', 'Stock transfer', 'Expenses', 'Serial numbers'],
    },
    {
      number: '04',
      title: 'Close the day with confidence',
      text: 'Review payments, journals, receivables, payables, daily summaries, and financial statements from one connected view.',
      tags: ['Payment in/out', 'Journaling', 'Trial balance', 'Daily summary'],
    },
  ];
  
 export const erpUserViews = [
    ['Business owners', 'See sales, purchases, expenses, stock, profit, and cash position without waiting for separate spreadsheets.'],
    ['Accountants', 'Keep ledgers, journals, tax reporting, receivables, payables, and statements organized in one workflow.'],
    ['Sales teams', 'Create quotations, process POS and bulk sales, manage delivery challans, and track customer payments.'],
    ['Operations teams', 'Follow purchase orders, stock movement, branch transfers, serial numbers, and item-level performance.'],
  ];
  
 export const zatcaCapabilities = [
    {
      title: 'FATOORA integration path',
      text: 'Prepare your e-invoicing workflow for connection with ZATCA’s FATOORA platform as your business moves through its assigned integration wave.',
      icon: Network,
    },
    {
      title: 'Clearance and reporting workflows',
      text: 'Support the different workflows for standard tax invoices and simplified invoices, with records organized for the required next step.',
      icon: ReceiptText,
    },
    {
      title: 'Structured Saudi e-invoices',
      text: 'Keep required invoice information and additional fields connected to customers, tax details, items, and transactions.',
      icon: FileCheck2,
    },
    {
      title: 'Implementation support',
      text: 'Work with TAJIN specialists on configuration, testing, onboarding, and operational readiness for your team.',
      icon: ShieldCheck,
    },
  ];
  
 export const roles = [
    { title: 'Senior Audit Associate', place: 'Mumbai, India', type: 'Full-time' },
    { title: 'ERP Implementation Consultant', place: 'Dubai, UAE', type: 'Full-time' },
    { title: 'Tax Advisory Manager', place: 'Riyadh, Saudi Arabia', type: 'Full-time' },
  ];
  