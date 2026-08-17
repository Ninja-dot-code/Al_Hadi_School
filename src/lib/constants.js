/**
 * Application Constants and Enums
 */

export const ROLE = Object.freeze({
  ADMIN: "admin",
  TEACHER: "teacher",
});

export const MARK_STATUS = Object.freeze({
  DRAFT: "draft",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
});

export const RESULT_STATUS = Object.freeze({
  PASS: "pass",
  FAIL: "fail",
});

export const ADMISSION_STATUS = Object.freeze({
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

export const STUDENT_STATUS = Object.freeze({
  ACTIVE: "active",
  LEFT: "left",
  INACTIVE: "inactive",
});

export const TEACHER_STATUS = Object.freeze({
  ACTIVE: "active",
  INACTIVE: "inactive",
});

export const EXAM_STATUS = Object.freeze({
  DRAFT: "draft",
  ACTIVE: "active",
  COMPLETED: "completed",
});

export const STORAGE_BUCKETS = Object.freeze({
  SCHOOL: "school",
  STUDENT_PHOTOS: "student-photos",
  TEACHER_PHOTOS: "teacher-photos",
});

export const DEFAULT_RESULT_WEIGHTS = Object.freeze({
  ACADEMIC_WEIGHT: 80,
  LSA_WEIGHT: 20,
});
