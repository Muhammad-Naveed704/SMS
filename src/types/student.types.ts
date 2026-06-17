export type StudentStatus = "active" | "inactive" | "graduated" | "transferred";

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  classId: string;
  className?: string;
  section?: string;
  parentId?: string;
  status: StudentStatus;
  enrollmentDate: string;
  avatarUrl?: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentListItem extends Pick<
  Student,
  | "id"
  | "studentId"
  | "firstName"
  | "lastName"
  | "className"
  | "section"
  | "status"
  | "enrollmentDate"
> {}
