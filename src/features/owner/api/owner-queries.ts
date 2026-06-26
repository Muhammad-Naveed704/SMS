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
import { USE_MOCK_DATA } from "@/lib/env";

async function withMockFallback<T>(apiFn: () => Promise<T>, mockFn: () => T | Promise<T>): Promise<T> {
  try {
    return await apiFn();
  } catch {
    if (USE_MOCK_DATA) return mockFn();
    throw new Error("API request failed");
  }
}

export async function fetchOwnerDashboard(): Promise<OwnerDashboardData> {
  return withMockFallback(
    async () => {
      const [api, schoolsResult] = await Promise.all([
        ownerApi.getDashboardStats(),
        ownerApi.getSchools({ page: 1, limit: 100 }),
      ]);
      const schools = schoolsResult.data;
      const totalStudents = schools.reduce((s, sc) => s + sc.studentCount, 0);
      const totalTeachers = schools.reduce((s, sc) => s + sc.teacherCount, 0);

      return {
        totalSchools: api.totalSchools,
        activeSchools: api.activeSchools,
        totalStudents,
        totalTeachers,
        monthlyRevenue: api.monthlyRevenue,
        activeSubscriptions:
          api.subscriptionStats.starter +
          api.subscriptionStats.professional +
          api.subscriptionStats.enterprise,
        totalRevenue: api.totalRevenue,
        revenueGrowth: api.revenueGrowth,
        activeUsers: api.activeUsers,
        totalUsers: api.totalUsers,
        subscriptionStats: api.subscriptionStats,
        revenueByMonth: api.revenueByMonth,
        schoolsGrowth: api.schoolsGrowth,
        userActivity: [
          { month: "Jan", users: 280 },
          { month: "Feb", users: 320 },
          { month: "Mar", users: 380 },
          { month: "Apr", users: 420 },
          { month: "May", users: 460 },
          { month: "Jun", users: api.activeUsers },
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
        systemActivity: api.systemActivity ?? [],
      };
    },
    async () => {
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
  );
}

export const ownerQueries = {
  dashboard: () => fetchOwnerDashboard(),

  schools: () =>
    withMockFallback(
      async () => (await ownerApi.getSchools({ page: 1, limit: 100 })).data,
      () => ownerDataService.getSchools()
    ),

  school: (id: string) =>
    withMockFallback(
      () => ownerApi.getSchool(id),
      () => ownerDataService.getSchool(id)
    ),

  users: () =>
    withMockFallback(
      async () => (await ownerApi.getUsers({ page: 1, limit: 200 })).data,
      () => ownerDataService.getUsers()
    ),

  billing: () =>
    withMockFallback(() => ownerApi.getBilling(), () => ownerDataService.getBilling()),

  analytics: () =>
    withMockFallback(() => ownerApi.getAnalytics(), () => ownerDataService.getAnalytics()),

  settings: () =>
    withMockFallback(() => ownerApi.getSettings(), () => ownerDataService.getSettings()),

  createSchool: (p: CreateSchoolPayload) => ownerDataService.createSchool(p),
  updateSchoolStatus: (id: string, status: OwnerSchool["status"]) =>
    ownerDataService.updateSchoolStatus(id, status),
  deleteSchool: (id: string) => ownerDataService.deleteSchool(id),
  updateUserStatus: (id: string, status: OwnerUser["status"]) =>
    ownerDataService.updateUserStatus(id, status),
  updateSettings: (d: Partial<OwnerSettings>) =>
    withMockFallback(
      () => ownerApi.updateSettings(d),
      () => ownerDataService.updateSettings(d)
    ),
};

export type { AnalyticsData, BillingData };
