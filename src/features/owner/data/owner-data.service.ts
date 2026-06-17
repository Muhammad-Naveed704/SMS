import type {
  AnalyticsData,
  BillingData,
  CreateSchoolPayload,
  OwnerSchool,
  OwnerSettings,
  OwnerUser,
  SystemActivity,
} from "@/types/owner.types";

const now = new Date();

export const MOCK_SCHOOLS: OwnerSchool[] = [
  {
    id: "1",
    name: "Springfield Academy",
    slug: "springfield-academy",
    email: "info@springfield.edu",
    phone: "+1 555-0101",
    address: "123 Education Blvd",
    city: "Springfield",
    country: "USA",
    ownerName: "School Admin",
    ownerEmail: "schooladmin@sms.local",
    plan: "professional",
    studentCount: 842,
    teacherCount: 48,
    classCount: 32,
    revenue: 9900,
    status: "active",
    createdAt: "2025-11-15T10:00:00Z",
    subscriptionStart: "2025-11-15",
    subscriptionExpiry: "2026-11-15",
  },
  {
    id: "2",
    name: "Green Valley High",
    slug: "green-valley-high",
    email: "contact@greenvalley.edu",
    phone: "+1 555-0102",
    address: "45 Oak Street",
    city: "Austin",
    country: "USA",
    ownerName: "Maria Garcia",
    ownerEmail: "maria@greenvalley.edu",
    plan: "enterprise",
    studentCount: 1240,
    teacherCount: 72,
    classCount: 48,
    revenue: 24900,
    status: "active",
    createdAt: "2025-10-20T08:00:00Z",
    subscriptionStart: "2025-10-20",
    subscriptionExpiry: "2026-10-20",
  },
  {
    id: "3",
    name: "Riverside International",
    slug: "riverside-intl",
    email: "admin@riverside.edu",
    phone: "+44 20 7946 0958",
    address: "10 Thames Road",
    city: "London",
    country: "UK",
    ownerName: "James Wilson",
    ownerEmail: "james@riverside.edu",
    plan: "professional",
    studentCount: 620,
    teacherCount: 38,
    classCount: 28,
    revenue: 9900,
    status: "active",
    createdAt: "2026-01-08T14:00:00Z",
    subscriptionStart: "2026-01-08",
    subscriptionExpiry: "2027-01-08",
  },
  {
    id: "4",
    name: "Sunrise Primary",
    slug: "sunrise-primary",
    email: "hello@sunrise.edu",
    phone: "+1 555-0104",
    address: "88 Maple Ave",
    city: "Denver",
    country: "USA",
    ownerName: "Lisa Chen",
    ownerEmail: "lisa@sunrise.edu",
    plan: "starter",
    studentCount: 180,
    teacherCount: 14,
    classCount: 12,
    revenue: 4900,
    status: "trial",
    createdAt: "2026-02-01T09:00:00Z",
    subscriptionStart: "2026-02-01",
    subscriptionExpiry: "2026-05-01",
  },
  {
    id: "5",
    name: "Heritage School",
    slug: "heritage-school",
    email: "info@heritage.edu",
    phone: "+1 555-0105",
    address: "200 Heritage Lane",
    city: "Boston",
    country: "USA",
    ownerName: "Robert Kim",
    ownerEmail: "robert@heritage.edu",
    plan: "starter",
    studentCount: 95,
    teacherCount: 8,
    classCount: 6,
    revenue: 4900,
    status: "suspended",
    createdAt: "2025-08-12T11:00:00Z",
    subscriptionStart: "2025-08-12",
    subscriptionExpiry: "2026-02-12",
  },
  {
    id: "6",
    name: "Metro Public School",
    slug: "metro-public",
    email: "admin@metro.edu",
    phone: "+1 555-0106",
    address: "500 Central Plaza",
    city: "Chicago",
    country: "USA",
    ownerName: "Angela Davis",
    ownerEmail: "angela@metro.edu",
    plan: "enterprise",
    studentCount: 2100,
    teacherCount: 120,
    classCount: 80,
    revenue: 24900,
    status: "active",
    createdAt: "2025-06-01T07:00:00Z",
    subscriptionStart: "2025-06-01",
    subscriptionExpiry: "2026-06-01",
  },
];

export const MOCK_USERS: OwnerUser[] = [
  { id: "1", name: "School Admin", email: "schooladmin@sms.local", role: "school_admin", schoolId: "1", schoolName: "Springfield Academy", status: "active", lastLogin: "2026-06-15T10:00:00Z" },
  { id: "2", name: "Maria Garcia", email: "maria@greenvalley.edu", role: "school_admin", schoolId: "2", schoolName: "Green Valley High", status: "active", lastLogin: "2026-06-14T16:30:00Z" },
  { id: "3", name: "James Wilson", email: "james@riverside.edu", role: "school_admin", schoolId: "3", schoolName: "Riverside International", status: "active", lastLogin: "2026-06-13T09:15:00Z" },
  { id: "4", name: "Teacher User", email: "teacher@sms.local", role: "teacher", schoolId: "1", schoolName: "Springfield Academy", status: "active", lastLogin: "2026-06-15T08:00:00Z" },
  { id: "5", name: "Student User", email: "student@sms.local", role: "student", schoolId: "1", schoolName: "Springfield Academy", status: "active", lastLogin: "2026-06-14T14:00:00Z" },
  { id: "6", name: "Parent User", email: "parent@sms.local", role: "parent", schoolId: "1", schoolName: "Springfield Academy", status: "active", lastLogin: "2026-06-12T19:00:00Z" },
  { id: "7", name: "Lisa Chen", email: "lisa@sunrise.edu", role: "school_admin", schoolId: "4", schoolName: "Sunrise Primary", status: "active", lastLogin: "2026-06-10T11:00:00Z" },
  { id: "8", name: "Robert Kim", email: "robert@heritage.edu", role: "school_admin", schoolId: "5", schoolName: "Heritage School", status: "inactive", lastLogin: "2026-01-20T10:00:00Z" },
  { id: "9", name: "Sarah Johnson", email: "sarah@springfield.edu", role: "teacher", schoolId: "1", schoolName: "Springfield Academy", status: "active", lastLogin: "2026-06-15T07:30:00Z" },
  { id: "10", name: "Angela Davis", email: "angela@metro.edu", role: "school_admin", schoolId: "6", schoolName: "Metro Public School", status: "active", lastLogin: "2026-06-15T06:00:00Z" },
];

export const MOCK_ACTIVITY: SystemActivity[] = [
  { id: "1", type: "school_registered", message: "Sunrise Primary registered on the platform", actor: "System", timestamp: new Date(now.getTime() - 3600000).toISOString() },
  { id: "2", type: "user_created", message: "New teacher account created for Sarah Johnson", actor: "School Admin", timestamp: new Date(now.getTime() - 7200000).toISOString() },
  { id: "3", type: "subscription_updated", message: "Green Valley High upgraded to Enterprise plan", actor: "Maria Garcia", timestamp: new Date(now.getTime() - 86400000).toISOString() },
  { id: "4", type: "school_suspended", message: "Heritage School suspended due to payment failure", actor: "System", timestamp: new Date(now.getTime() - 172800000).toISOString() },
  { id: "5", type: "school_registered", message: "Riverside International joined the platform", actor: "James Wilson", timestamp: new Date(now.getTime() - 259200000).toISOString() },
];

export const MOCK_BILLING: BillingData = {
  monthlyRevenue: 78500,
  yearlyRevenue: 892000,
  activePlans: 5,
  expiredSubscriptions: 1,
  revenueByMonth: [
    { month: "Jan", revenue: 62000 },
    { month: "Feb", revenue: 65500 },
    { month: "Mar", revenue: 68200 },
    { month: "Apr", revenue: 71000 },
    { month: "May", revenue: 74800 },
    { month: "Jun", revenue: 78500 },
  ],
  subscriptions: MOCK_SCHOOLS.map((s) => ({
    id: `sub-${s.id}`,
    schoolId: s.id,
    schoolName: s.name,
    plan: s.plan,
    amount: s.revenue,
    startDate: s.subscriptionStart ?? s.createdAt,
    expiryDate: s.subscriptionExpiry ?? s.createdAt,
    status: s.status === "active" ? "active" : s.status === "trial" ? "trial" : s.status === "suspended" ? "expired" : "cancelled",
  })),
  invoices: [
    { id: "INV-001", schoolName: "Green Valley High", amount: 24900, date: "2026-06-01", status: "paid" },
    { id: "INV-002", schoolName: "Metro Public School", amount: 24900, date: "2026-06-01", status: "paid" },
    { id: "INV-003", schoolName: "Springfield Academy", amount: 9900, date: "2026-06-01", status: "paid" },
    { id: "INV-004", schoolName: "Heritage School", amount: 4900, date: "2026-05-01", status: "overdue" },
    { id: "INV-005", schoolName: "Sunrise Primary", amount: 4900, date: "2026-06-01", status: "pending" },
  ],
};

export const MOCK_ANALYTICS: AnalyticsData = {
  schoolGrowth: [
    { label: "Jan", value: 12 }, { label: "Feb", value: 18 }, { label: "Mar", value: 24 },
    { label: "Apr", value: 31 }, { label: "May", value: 38 }, { label: "Jun", value: 45 },
  ],
  studentGrowth: [
    { label: "Jan", value: 3200 }, { label: "Feb", value: 3800 }, { label: "Mar", value: 4100 },
    { label: "Apr", value: 4500 }, { label: "May", value: 4900 }, { label: "Jun", value: 5200 },
  ],
  revenueGrowth: [
    { label: "Jan", value: 62000 }, { label: "Feb", value: 65500 }, { label: "Mar", value: 68200 },
    { label: "Apr", value: 71000 }, { label: "May", value: 74800 }, { label: "Jun", value: 78500 },
  ],
  activeUsers: [
    { label: "Mon", value: 420 }, { label: "Tue", value: 480 }, { label: "Wed", value: 510 },
    { label: "Thu", value: 495 }, { label: "Fri", value: 460 }, { label: "Sat", value: 120 }, { label: "Sun", value: 85 },
  ],
};

export const MOCK_SETTINGS: OwnerSettings = {
  companyName: "School Management System",
  timezone: "America/New_York",
  supportEmail: "support@sms.local",
  emailFrom: "noreply@sms.local",
  smtpHost: "smtp.example.com",
  smtpPort: "587",
  notifyNewSchool: true,
  notifyPayment: true,
  twoFactorRequired: false,
  sessionTimeout: 30,
};

let schoolsStore = [...MOCK_SCHOOLS];
let usersStore = [...MOCK_USERS];
let settingsStore = { ...MOCK_SETTINGS };

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const ownerDataService = {
  async getSchools() {
    await delay();
    return [...schoolsStore];
  },

  async getSchool(id: string) {
    await delay();
    const school = schoolsStore.find((s) => s.id === id);
    if (!school) throw new Error("School not found");
    return school;
  },

  async createSchool(payload: CreateSchoolPayload) {
    await delay(500);
    const school: OwnerSchool = {
      id: String(Date.now()),
      name: payload.schoolName,
      slug: payload.schoolName.toLowerCase().replace(/\s+/g, "-"),
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
      city: payload.city,
      country: payload.country,
      ownerName: payload.adminName,
      ownerEmail: payload.adminEmail,
      plan: payload.plan,
      studentCount: 0,
      teacherCount: 0,
      classCount: 0,
      revenue: payload.plan === "enterprise" ? 24900 : payload.plan === "professional" ? 9900 : 4900,
      status: "active",
      createdAt: new Date().toISOString(),
      subscriptionStart: payload.startDate,
      subscriptionExpiry: payload.expiryDate,
    };
    schoolsStore = [school, ...schoolsStore];
    return school;
  },

  async updateSchoolStatus(id: string, status: OwnerSchool["status"]) {
    await delay();
    schoolsStore = schoolsStore.map((s) => (s.id === id ? { ...s, status } : s));
    return schoolsStore.find((s) => s.id === id)!;
  },

  async deleteSchool(id: string) {
    await delay();
    schoolsStore = schoolsStore.filter((s) => s.id !== id);
  },

  async getUsers() {
    await delay();
    return [...usersStore];
  },

  async updateUserStatus(id: string, status: OwnerUser["status"]) {
    await delay();
    usersStore = usersStore.map((u) => (u.id === id ? { ...u, status } : u));
    return usersStore.find((u) => u.id === id)!;
  },

  async getBilling() {
    await delay();
    return MOCK_BILLING;
  },

  async getAnalytics() {
    await delay();
    return MOCK_ANALYTICS;
  },

  async getSettings() {
    await delay();
    return { ...settingsStore };
  },

  async updateSettings(data: Partial<OwnerSettings>) {
    await delay();
    settingsStore = { ...settingsStore, ...data };
    return settingsStore;
  },

  getActivity() {
    return MOCK_ACTIVITY;
  },
};
