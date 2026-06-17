import type {
  AnalyticsData,
  BillingData,
  CreateSchoolPayload,
  OwnerDashboardData,
  OwnerSchool,
  OwnerSettings,
  OwnerUser,
} from "@/types/owner.types";
import { ownerApi } from "@/services/api/owner.api";
import { ownerDataService } from "@/features/owner/data/owner-data.service";

export async function fetchOwnerDashboard(): Promise<OwnerDashboardData> {
  try {
    const api = await ownerApi.getDashboardStats();
    const schools = await ownerDataService.getSchools();
    const totalStudents = schools.reduce((s, sc) => s + sc.studentCount, 0);
    const totalTeachers = schools.reduce((s, sc) => s + sc.teacherCount, 0);

    return {
      totalSchools: api.totalSchools,
      activeSchools: api.activeSchools,
      totalStudents,
      totalTeachers,
      monthlyRevenue: api.monthlyRevenue,
      activeSubscriptions: api.subscriptionStats.starter + api.subscriptionStats.professional + api.subscriptionStats.enterprise,
      totalRevenue: api.totalRevenue,
      revenueGrowth: api.revenueGrowth,
      activeUsers: api.activeUsers,
      totalUsers: api.totalUsers,
      subscriptionStats: api.subscriptionStats,
      revenueByMonth: api.revenueByMonth,
      schoolsGrowth: api.schoolsGrowth,
      userActivity: [
        { month: "Jan", users: 280 }, { month: "Feb", users: 320 },
        { month: "Mar", users: 380 }, { month: "Apr", users: 420 },
        { month: "May", users: 460 }, { month: "Jun", users: api.activeUsers },
      ],
      recentSchools: api.recentSchools.map((s) => {
        const full = schools.find((sc) => sc.id === s.id);
        return {
          id: s.id,
          name: s.name,
          admin: full?.ownerName ?? "—",
          plan: s.plan,
          students: full?.studentCount ?? 0,
          status: s.status,
          createdAt: s.createdAt,
        };
      }),
      systemActivity: ownerDataService.getActivity(),
    };
  } catch {
    const schools = await ownerDataService.getSchools();
    return {
      totalSchools: schools.length,
      activeSchools: schools.filter((s) => s.status === "active").length,
      totalStudents: schools.reduce((s, sc) => s + sc.studentCount, 0),
      totalTeachers: schools.reduce((s, sc) => s + sc.teacherCount, 0),
      monthlyRevenue: 78500,
      activeSubscriptions: schools.filter((s) => s.status === "active" || s.status === "trial").length,
      totalRevenue: 892000,
      revenueGrowth: 12.4,
      activeUsers: 510,
      totalUsers: 680,
      subscriptionStats: { starter: 2, professional: 2, enterprise: 2 },
      revenueByMonth: [
        { month: "Jan", revenue: 62000 }, { month: "Feb", revenue: 65500 },
        { month: "Mar", revenue: 68200 }, { month: "Apr", revenue: 71000 },
        { month: "May", revenue: 74800 }, { month: "Jun", revenue: 78500 },
      ],
      schoolsGrowth: [
        { month: "Jan", schools: 12 }, { month: "Feb", schools: 18 },
        { month: "Mar", schools: 24 }, { month: "Apr", schools: 31 },
        { month: "May", schools: 38 }, { month: "Jun", schools: 45 },
      ],
      userActivity: [
        { month: "Jan", users: 280 }, { month: "Feb", users: 320 },
        { month: "Mar", users: 380 }, { month: "Apr", users: 420 },
        { month: "May", users: 460 }, { month: "Jun", users: 510 },
      ],
      recentSchools: schools.slice(0, 5).map((s) => ({
        id: s.id, name: s.name, admin: s.ownerName, plan: s.plan,
        students: s.studentCount, status: s.status, createdAt: s.createdAt,
      })),
      systemActivity: ownerDataService.getActivity(),
    };
  }
}

export const ownerQueries = {
  dashboard: () => fetchOwnerDashboard(),
  schools: () => ownerDataService.getSchools(),
  school: (id: string) => ownerDataService.getSchool(id),
  users: () => ownerDataService.getUsers(),
  billing: () => ownerDataService.getBilling(),
  analytics: () => ownerDataService.getAnalytics(),
  settings: () => ownerDataService.getSettings(),
  createSchool: (p: CreateSchoolPayload) => ownerDataService.createSchool(p),
  updateSchoolStatus: (id: string, status: OwnerSchool["status"]) =>
    ownerDataService.updateSchoolStatus(id, status),
  deleteSchool: (id: string) => ownerDataService.deleteSchool(id),
  updateUserStatus: (id: string, status: OwnerUser["status"]) =>
    ownerDataService.updateUserStatus(id, status),
  updateSettings: (d: Partial<OwnerSettings>) => ownerDataService.updateSettings(d),
};

export type { AnalyticsData, BillingData };
