// src/pages/Study/types/study.types.ts
export interface StudySession {
  id: number;
  user_id: number;
  subject: string;
  description: string;
  date: string; // YYYY-MM-DD
  hours: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface StudyApiResponse {
  status: string;
  code: number;
  message: string;
  data: StudySession[];
  pagination: Pagination;
}

export type SortField = "date" | "subject" | "hours" | "created_at";
export type SortOrder = "asc" | "desc";

export interface StudyFilter {
  search: string;
  sortBy: SortField;
  order: SortOrder;
  dateFrom: string;
  dateTo: string;
  minHours: string;
  maxHours: string;
}