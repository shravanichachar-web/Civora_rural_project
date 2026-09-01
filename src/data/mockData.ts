import {
  Citizen,
  Employee,
  Complaint,
  NotificationItem,
  Bill,
  CertificateRequest,
  WaterScheduleItem,
  GarbageScheduleItem,
  UserProfile,
} from '../types';

export const initialCitizens: Citizen[] = Array.from({ length: 100 }, (_, i) => {
  const idNum = i + 1;
  const names = [
    'Rohan Kumbhar', 'Priya Patil', 'Sanjay Deshmukh', 'Aniket Shinde', 'Sneha Jadhav',
    'Vikram Chougule', 'Sunita Gaikwad', 'Amit Kulkarni', 'Meena Kadam', 'Rajesh Bhosale',
    'Amol Salunkhe', 'Kavita More', 'Sachin Pawashe', 'Deepak Kamble', 'Swati Mane',
    'Nitin Powar', 'Pooja Mohite', 'Mahesh Chavan', 'Pankaj Vadar', 'Aarti Shete',
  ];
  const areas = [
    'Kasba Bawada Main Road',
    'Shivaji Nagar',
    'Rajarampuri 2nd Lane',
    'Market Area - Mandai',
    'Bus Stand Area',
    'Line Bazar - Kasba Bawada',
    'Sugar Factory Road, Bawada',
    'Tarabai Park',
    'Shahupuri 3rd Lane',
    'Mangalwar Peth',
  ];

  return {
    id: `C${idNum < 10 ? '00' : idNum < 100 ? '0' : ''}${idNum}`,
    name: names[i % names.length] + (i >= names.length ? ` (${Math.floor(i / names.length) + 1})` : ''),
    area: areas[i % areas.length],
    mobile: `982${Math.floor(1000000 + Math.random() * 9000000)}`,
    email: `citizen${idNum}@kolhapur.gov.in`,
    address: `House No. ${10 + i}, ${areas[i % areas.length]}, Kasba Bawada, Kolhapur`,
  };
});

export const initialEmployees: Employee[] = [
  {
    id: 'EMP001',
    name: 'Suresh More (Supervisor)',
    department: 'Water Works',
    mobile: '9822100001',
    role: 'Field Supervisor',
    assignedArea: 'Kasba Bawada Main Road',
    activeComplaints: 2,
    status: 'Active',
    rating: 4.8,
    completedCount: 42,
    gpsLocation: { lat: 16.7214, lng: 74.2488 },
  },
  {
    id: 'EMP002',
    name: 'Ganesh Shinde',
    department: 'Sanitation',
    mobile: '9822100002',
    role: 'Sanitation Inspector',
    assignedArea: 'Shivaji Nagar',
    activeComplaints: 1,
    status: 'On Field',
    rating: 4.7,
    completedCount: 38,
    gpsLocation: { lat: 16.718, lng: 74.245 },
  },
  {
    id: 'EMP003',
    name: 'Vijay Patil',
    department: 'Roads & Paving',
    mobile: '9822100003',
    role: 'Senior Engineer',
    assignedArea: 'Rajarampuri',
    activeComplaints: 3,
    status: 'Active',
    rating: 4.9,
    completedCount: 55,
    gpsLocation: { lat: 16.715, lng: 74.249 },
  },
  {
    id: 'EMP004',
    name: 'Prakash Kadam',
    department: 'Electrical & Lighting',
    mobile: '9822100004',
    role: 'Line Worker',
    assignedArea: 'Market Area',
    activeComplaints: 1,
    status: 'On Field',
    rating: 4.6,
    completedCount: 29,
    gpsLocation: { lat: 16.722, lng: 74.241 },
  },
  {
    id: 'EMP005',
    name: 'Ramesh Chougule',
    department: 'Drainage & Sewerage',
    mobile: '9822100005',
    role: 'Drainage Technician',
    assignedArea: 'Bus Stand Area',
    activeComplaints: 2,
    status: 'Active',
    rating: 4.5,
    completedCount: 31,
    gpsLocation: { lat: 16.719, lng: 74.243 },
  },
  ...Array.from({ length: 45 }, (_, i) => {
    const idNum = i + 6;
    const depts = ['Water Works', 'Sanitation', 'Roads & Paving', 'Electrical & Lighting', 'Drainage & Sewerage', 'Health & Hygiene'];
    const roles = ['Junior Engineer', 'Field Officer', 'Inspector', 'Technician', 'Crew Supervisor'];
    const areas = ['Kasba Bawada Main Road', 'Shivaji Nagar', 'Rajarampuri', 'Market Area', 'Bus Stand Area', 'Line Bazar'];
    return {
      id: `EMP${idNum < 10 ? '00' : '0'}${idNum}`,
      name: `Officer ${['Anil', 'Sunil', 'Mahesh', 'Santosh', 'Dattatray', 'Pandurang'][i % 6]} ${['Jadhav', 'Pawar', 'Kamble', 'Patil', 'Kulkarni'][i % 5]}`,
      department: depts[i % depts.length],
      mobile: `98221${10000 + idNum}`,
      role: roles[i % roles.length],
      assignedArea: areas[i % areas.length],
      activeComplaints: Math.floor(Math.random() * 4),
      status: (i % 7 === 0 ? 'On Leave' : i % 2 === 0 ? 'On Field' : 'Active') as 'On Field' | 'Active' | 'On Leave',
      rating: +(4.2 + (i % 8) * 0.1).toFixed(1),
      completedCount: 15 + (i * 3) % 40,
      gpsLocation: { lat: 16.718 + (i % 10) * 0.002, lng: 74.245 + (i % 8) * 0.002 },
    };
  }),
];

export const initialComplaints: Complaint[] = [
  {
    id: 'CMP101',
    referenceNo: 'CMP101',
    category: 'Water Pipeline Leakage',
    description: 'Major water pipe breakdown near Line Bazar, Kasba Bawada causing water logging on main street.',
    location: 'Line Bazar, Kasba Bawada Main Road, Kolhapur',
    ward: 'Kasba Bawada Ward Command',
    coordinates: { lat: 16.7218, lng: 74.2485 },
    photoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
    beforePhotoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80',
    aiAnalysis: {
      category: 'Water Leakage',
      confidence: 96,
      priority: 'High',
      department: 'Water Works Department',
      estimatedResolutionTime: '12 Hours',
      suggestedDescription: 'Underground municipal water supply pipe leak producing continuous surface runoff.',
      detectedObjects: ['Burst Pipe', 'Water Stream', 'Pavement Runoff'],
      severityLevel: 'Severe',
    },
    status: 'In Progress',
    workProgressStage: 'In Progress',
    priority: 'High',
    department: 'Water Works',
    assignedTo: 'Suresh More (Supervisor)',
    assignedEmployeeId: 'EMP001',
    adminRemark: 'Priority repairs dispatched with KMC mobile water crew.',
    employeeRemark: 'Pipeline junction located. Excavation in progress.',
    estimatedResolutionTime: 'Today by 4:00 PM',
    submittedAt: '23 Jul 2026, 08:30 AM',
    updatedAt: '23 Jul 2026, 10:15 AM',
    activityLog: [
      { title: 'Work In Progress', description: 'Excavation started by KMC Water Works Crew.', timestamp: '10:15 AM', actor: 'Suresh More (Supervisor)' },
      { title: 'Work Accepted', description: 'Assigned worker accepted task.', timestamp: '09:00 AM', actor: 'Suresh More (Supervisor)' },
      { title: 'Complaint Registered', description: 'Submitted by Rohan Kumbhar via Civora Portal.', timestamp: '08:30 AM', actor: 'Rohan Kumbhar' },
    ],
    comments: [],
  },
  {
    id: 'CMP102',
    referenceNo: 'CMP102',
    category: 'Garbage Overflow & Waste',
    description: 'Uncleared garbage bin overflowing near Chhatrapati Shivaji Statue Chowk, Shivaji Nagar.',
    location: 'Shivaji Chowk, Shivaji Nagar, Kolhapur',
    ward: 'Shivaji Nagar Ward',
    coordinates: { lat: 16.7182, lng: 74.2451 },
    photoUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
    aiAnalysis: {
      category: 'Garbage Overflow',
      confidence: 97,
      priority: 'High',
      department: 'Sanitation Department',
      estimatedResolutionTime: '24 Hours',
      suggestedDescription: 'Severe municipal garbage overflow accumulated near roadside bin container.',
      detectedObjects: ['Overflowing Garbage Bin', 'Plastic Bags', 'Street Litter'],
      severityLevel: 'Severe',
    },
    status: 'Pending',
    priority: 'Medium',
    department: 'Sanitation',
    submittedAt: '23 Jul 2026, 09:10 AM',
    updatedAt: '23 Jul 2026, 09:10 AM',
    estimatedResolutionTime: 'Within 24 Hours',
    activityLog: [
      { title: 'Complaint Registered', description: 'Ticket submitted into system.', timestamp: '09:10 AM', actor: 'Priya Patil' },
    ],
    comments: [],
  },
  {
    id: 'CMP103',
    referenceNo: 'CMP103',
    category: 'Street Light Fault',
    description: '3 street lights non-functional along Sugar Factory Road, Kasba Bawada causing safety concerns at night.',
    location: 'Sugar Factory Road, Kasba Bawada, Kolhapur',
    ward: 'Kasba Bawada Ward Command',
    coordinates: { lat: 16.7235, lng: 74.2512 },
    photoUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80',
    beforePhotoUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80',
    aiAnalysis: {
      category: 'Street Light Not Working',
      confidence: 94,
      priority: 'Medium',
      department: 'Electrical Department',
      estimatedResolutionTime: '24 Hours',
      suggestedDescription: 'Damaged street light fixture resulting in dark unsafe zone at night.',
      detectedObjects: ['Pole Fixture', 'Faulty Luminaire'],
      severityLevel: 'Moderate',
    },
    status: 'Resolved',
    workProgressStage: 'Completed',
    priority: 'Normal' as any,
    department: 'Electrical & Lighting',
    assignedTo: 'Prakash Kadam',
    assignedEmployeeId: 'EMP004',
    adminRemark: 'Bulbs replaced with 45W energy efficient LED fixtures.',
    citizenRating: 5,
    citizenFeedback: 'Prompt resolution! Street lights fixed the same day.',
    submittedAt: '22 Jul 2026, 06:15 PM',
    updatedAt: '23 Jul 2026, 08:00 AM',
    activityLog: [
      { title: 'Ticket Resolved', description: 'All LED lights tested and working.', timestamp: '08:00 AM', actor: 'Prakash Kadam' },
      { title: 'Work In Progress', description: 'Elevated hydraulic ladder dispatched.', timestamp: '07:00 AM', actor: 'Prakash Kadam' },
    ],
    comments: [],
  },
  ...Array.from({ length: 97 }, (_, i) => {
    const idNum = i + 104;
    const refNo = `CMP${idNum}`;
    const categories = [
      'Pothole & Damaged Road', 'Water Pipeline Leakage', 'Garbage Overflow & Waste',
      'Street Light Fault', 'Drainage Blockage', 'Public Park Maintenance', 'Stray Animal Risk',
    ];
    const depts = ['Roads & Paving', 'Water Works', 'Sanitation', 'Electrical & Lighting', 'Drainage & Sewerage', 'Health & Hygiene'];
    const statuses: Complaint['status'][] = ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Rejected'];
    const status = statuses[i % statuses.length];
    const priorities: Complaint['priority'][] = ['Low', 'Medium', 'High', 'Emergency'];
    const emp = initialEmployees[i % initialEmployees.length];
    const areas = ['Kasba Bawada Main Road', 'Shivaji Nagar', 'Rajarampuri', 'Market Area', 'Bus Stand Area'];
    const area = areas[i % areas.length];

    return {
      id: refNo,
      referenceNo: refNo,
      category: categories[i % categories.length],
      description: `Issue regarding ${categories[i % categories.length].toLowerCase()} at ${area}, Ward ${1 + (i % 5)}. Requires immediate municipal intervention.`,
      location: `${area}, Kasba Bawada, Kolhapur`,
      ward: `Ward ${1 + (i % 5)} - Kasba Bawada`,
      coordinates: { lat: 16.715 + (i % 12) * 0.0015, lng: 74.242 + (i % 10) * 0.0015 },
      photoUrl: `https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80`,
      beforePhotoUrl: `https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80`,
      afterPhotoUrl: status === 'Resolved' ? `https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80` : undefined,
      aiAnalysis: {
        category: categories[i % categories.length] === 'Pothole & Damaged Road' ? 'Road Pothole' : categories[i % categories.length] === 'Water Pipeline Leakage' ? 'Water Leakage' : categories[i % categories.length] === 'Garbage Overflow & Waste' ? 'Garbage Overflow' : categories[i % categories.length] === 'Street Light Fault' ? 'Street Light Not Working' : categories[i % categories.length] === 'Drainage Blockage' ? 'Drainage Blockage' : 'Other',
        confidence: 91 + (i % 8),
        priority: priorities[i % priorities.length],
        department: depts[i % depts.length],
        estimatedResolutionTime: `${12 + (i % 3) * 12} Hours`,
        suggestedDescription: `Automated AI Detection for ${categories[i % categories.length]} at ${area}.`,
        detectedObjects: ['Civil Hazard', 'Municipal Obstruction'],
        severityLevel: (priorities[i % priorities.length] === 'Emergency' ? 'Critical' : priorities[i % priorities.length] === 'High' ? 'Severe' : 'Moderate') as 'Severe' | 'Critical' | 'Moderate' | 'Minor',
      },
      status,
      workProgressStage: (status === 'Resolved' ? 'Completed' : status === 'In Progress' ? 'In Progress' : 'Assigned') as 'In Progress' | 'Assigned' | 'Rejected' | 'Completed' | 'Work Accepted' | 'Work Started',
      priority: priorities[i % priorities.length],
      department: depts[i % depts.length],
      assignedTo: status !== 'Pending' ? emp.name : undefined,
      assignedEmployeeId: status !== 'Pending' ? emp.id : undefined,
      adminRemark: status !== 'Pending' ? `Assigned to ${emp.name} for field inspection.` : undefined,
      estimatedResolutionTime: 'Within 24 to 48 Hours',
      submittedAt: `${23 - (i % 5)} Jul 2026, 10:${10 + (i % 45)} AM`,
      updatedAt: `${23 - (i % 5)} Jul 2026, 11:${10 + (i % 45)} AM`,
      activityLog: [
        { title: `Status: ${status}`, description: `Action taken by KMC department.`, timestamp: '11:00 AM', actor: 'KMC Officer' },
        { title: 'Ticket Created', description: 'Submitted via Civora App.', timestamp: '10:00 AM', actor: 'Citizen' },
      ],
      comments: [],
    };
  }),
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'water',
    title: '💧 Morning Water Supply Schedule - Kasba Bawada',
    message: 'Water supply active in Kasba Bawada Main Road & Sugar Factory Road from 06:00 AM to 08:30 AM.',
    area: 'Kasba Bawada Main Road',
    timestamp: new Date().toISOString(),
    date: '23 Jul 2026',
    time: '06:00 AM',
    timeAgo: '10 mins ago',
    priority: 'High Priority',
    read: false,
    categoryTag: 'Water Supply',
  },
  {
    id: 'n2',
    type: 'garbage',
    title: '🚛 Garbage Van Approaching Shivaji Nagar',
    message: 'Vehicle KMC-G002 is on route and currently 1.2 km away. Prepare dry and wet waste bins.',
    area: 'Shivaji Nagar',
    timestamp: new Date().toISOString(),
    date: '23 Jul 2026',
    time: '07:45 AM',
    timeAgo: '30 mins ago',
    priority: 'Normal',
    read: false,
    categoryTag: 'Sanitation',
  },
  {
    id: 'n3',
    type: 'emergency',
    title: '🚨 Emergency Heavy Rain & Drainage Alert',
    message: 'KMC Disaster Cell issues advisory for low-lying areas near Panchganga River Bank. Helplines active.',
    area: 'All Areas',
    timestamp: new Date().toISOString(),
    date: '23 Jul 2026',
    time: '08:00 AM',
    timeAgo: '1 hour ago',
    priority: 'High Priority',
    read: false,
    categoryTag: 'Emergency',
  },
  ...Array.from({ length: 97 }, (_, i) => {
    const idNum = i + 4;
    const types: NotificationItem['type'][] = ['water', 'garbage', 'emergency', 'announcement', 'system', 'maintenance'];
    const type = types[i % types.length];
    const priorities: NotificationItem['priority'][] = ['High Priority', 'Normal', 'Info'];
    const areas = ['Kasba Bawada Main Road', 'Shivaji Nagar', 'Rajarampuri', 'Market Area', 'All Areas'];

    return {
      id: `n${idNum}`,
      type,
      title: `${type === 'water' ? '💧 Water Alert' : type === 'garbage' ? '🚛 Waste Van Update' : type === 'emergency' ? '🚨 Road Advisory' : '📢 KMC Announcement'} #${idNum}`,
      message: `Scheduled update from Kolhapur Municipal Corporation for citizens of ${areas[i % areas.length]}.`,
      area: areas[i % areas.length],
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      date: `${23 - (i % 7)} Jul 2026`,
      time: '09:30 AM',
      timeAgo: `${i + 2} hours ago`,
      priority: priorities[i % priorities.length],
      read: i > 3,
      categoryTag: type.toUpperCase(),
    };
  }),
];

export const initialBills: Bill[] = [
  {
    id: 'BILL001',
    type: 'Property Tax',
    accountNo: 'KMC-PROP-98241',
    period: 'FY 2026-27 (Q1)',
    amount: 2450,
    dueDate: '15 Aug 2026',
    status: 'Due',
  },
  {
    id: 'BILL002',
    type: 'Water Bill',
    accountNo: 'KMC-WAT-44120',
    period: 'June 2026',
    amount: 380,
    dueDate: '30 Jul 2026',
    status: 'Due',
  },
  {
    id: 'BILL003',
    type: 'Sanitation Fee',
    accountNo: 'KMC-SAN-10928',
    period: 'Q2 2026',
    amount: 150,
    dueDate: '10 Jul 2026',
    status: 'Paid',
    paidDate: '08 Jul 2026',
    receiptNo: 'REC-KMC-99212',
    paymentMethod: 'UPI (GPay)',
  },
  ...Array.from({ length: 47 }, (_, i) => {
    const idNum = i + 4;
    const types: Bill['type'][] = ['Property Tax', 'Water Bill', 'Sanitation Fee', 'Street Light Tax', 'Waste Management', 'Electricity'];
    const type = types[i % types.length];
    const isPaid = i % 2 === 0;

    return {
      id: `BILL${idNum < 10 ? '00' : '0'}${idNum}`,
      type,
      accountNo: `KMC-${type.substring(0, 3).toUpperCase()}-${10000 + i * 3}`,
      period: 'Q2 2026',
      amount: 120 + (i * 85) % 3000,
      dueDate: `${10 + (i % 20)} Aug 2026`,
      status: (isPaid ? 'Paid' : i % 3 === 0 ? 'Overdue' : 'Due') as 'Pending' | 'Paid' | 'Due' | 'Overdue',
      paidDate: isPaid ? `${1 + (i % 15)} Jul 2026` : undefined,
      receiptNo: isPaid ? `REC-KMC-${70000 + i}` : undefined,
      paymentMethod: isPaid ? 'UPI / NetBanking' : undefined,
    };
  }),
];

export const initialCertificates: CertificateRequest[] = [
  {
    id: 'cert-1',
    type: 'Residence Certificate',
    applicantName: 'Rohan Kumbhar',
    referenceNo: 'KMC-CERT-RESI-2026-881',
    appliedDate: '20 Jul 2026',
    status: 'Approved',
    downloadUrl: '#',
    remarks: 'Verified by Ward Officer. Certificate ready for download.',
  },
  {
    id: 'cert-2',
    type: 'Birth Certificate',
    applicantName: 'Rohan Kumbhar',
    referenceNo: 'KMC-CERT-BIRT-2026-904',
    appliedDate: '22 Jul 2026',
    status: 'Pending Verification',
    remarks: 'Document verification under process at Kasba Bawada Ward Office.',
  },
  ...Array.from({ length: 48 }, (_, i) => {
    const idNum = i + 3;
    const types: CertificateRequest['type'][] = [
      'Birth Certificate', 'Death Certificate', 'Marriage Certificate',
      'Income Certificate', 'Residence Certificate', 'Senior Citizen Certificate', 'Trade License',
    ];
    const statuses: CertificateRequest['status'][] = ['Pending Verification', 'Processing', 'Approved', 'Issued', 'Rejected'];

    return {
      id: `cert-${idNum}`,
      type: types[i % types.length],
      applicantName: initialCitizens[i % initialCitizens.length].name,
      referenceNo: `KMC-CERT-${types[i % types.length].substring(0, 4).toUpperCase()}-2026-${100 + i}`,
      appliedDate: `${15 + (i % 8)} Jul 2026`,
      status: statuses[i % statuses.length],
      downloadUrl: statuses[i % statuses.length] === 'Approved' ? '#' : undefined,
      remarks: 'Submitted via Civora Portal',
    };
  }),
];

export const initialWaterSchedules: WaterScheduleItem[] = [
  { id: 'w1', area: 'Kasba Bawada Main Road', time: '6:00 AM – 8:30 AM', days: 'Daily', status: 'Active' },
  { id: 'w2', area: 'Shivaji Nagar', time: '8:30 AM – 11:00 AM', days: 'Daily', status: 'Active' },
  { id: 'w3', area: 'Rajarampuri', time: '5:00 PM – 7:30 PM', days: 'Daily', status: 'Active' },
  { id: 'w4', area: 'Market Area', time: '6:00 AM – 9:00 AM', days: 'Mon, Wed, Fri, Sun', status: 'Active' },
  { id: 'w5', area: 'Bus Stand Area', time: '2:00 PM – 4:30 PM', days: 'Tue, Thu, Sat', status: 'Active' },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `w${i + 6}`,
    area: `Ward ${i + 1} - Kasba Bawada Sector ${Math.floor(i / 3) + 1}`,
    time: `${6 + (i % 5)}:00 AM – ${8 + (i % 5)}:30 AM`,
    days: i % 2 === 0 ? 'Daily' : 'Mon, Wed, Fri',
    status: (i % 4 === 0 ? 'Maintenance' : 'Active') as any,
  })),
];

export const initialGarbageSchedules: GarbageScheduleItem[] = [
  { id: 'g1', area: 'Kasba Bawada Main Road', time: '07:30 AM', vehicle: 'KMC-G001 (Electric Tipper)', status: 'On Route' },
  { id: 'g2', area: 'Shivaji Nagar', time: '08:15 AM', vehicle: 'KMC-G002 (Compact Van)', status: 'On Route' },
  { id: 'g3', area: 'Rajarampuri', time: '09:00 AM', vehicle: 'KMC-G003 (Dry Waste Van)', status: 'Scheduled' },
  { id: 'g4', area: 'Market Area', time: '06:45 AM', vehicle: 'KMC-G004 (Commercial Van)', status: 'Completed' },
  { id: 'g5', area: 'Bus Stand Area', time: '10:00 AM', vehicle: 'KMC-G005 (Bio Waste Truck)', status: 'Scheduled' },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `g${i + 6}`,
    area: `Ward ${i + 1} Sector ${Math.floor(i / 2) + 1}`,
    time: `0${7 + (i % 4)}:${15 * (i % 4)} AM`,
    vehicle: `KMC-G0${10 + i}`,
    status: (i % 3 === 0 ? 'Completed' : 'On Route') as any,
  })),
];
