export type TeacherStatus = "active" | "inactive" | "on_leave";

export interface Teacher {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  department?: string;
  qualification?: string;
  joinDate: string;
  status: TeacherStatus;
  avatarUrl?: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherListItem extends Pick<
  Teacher,
  | "id"
  | "employeeId"
  | "firstName"
  | "lastName"
  | "subject"
  | "department"
  | "status"
  | "joinDate"
> {}
