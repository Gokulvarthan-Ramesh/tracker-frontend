// src/pages/Study/hooks/useStudyData.ts
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import api from "../../services/api";
import type { StudyApiResponse, StudyFilter, StudySession } from "../../pages/Study/types/study.types";



export function useStudyData(filters: StudyFilter) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  // Reset on filter change
  useEffect(() => {
    setSessions([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.search.trim()) params.append("search", filters.search.trim());
    if (filters.sortBy) params.append("sort_by", filters.sortBy);
    if (filters.order) params.append("order", filters.order);
    if (filters.dateFrom) params.append("date_from", filters.dateFrom);
    if (filters.dateTo) params.append("date_to", filters.dateTo);
    if (filters.minHours) params.append("min_hours", filters.minHours);
    if (filters.maxHours) params.append("max_hours", filters.maxHours);
    params.append("page", page.toString());
    return params.toString();
  }, [filters, page]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (page === 1) setLoading(true);
        else setLoadingMore(true);
        setError(null);

        const res = await api.get<StudyApiResponse>(`/study?${queryParams}`);

        // IMPORTANT: adjust path according to your real API structure
        // If it's response.data.data.data → change to res.data.data.data
        const newSessions = res.data.data || [];

        if (!isMounted) return;

        setSessions((prev) => (page === 1 ? newSessions : [...prev, ...newSessions]));

        const { current_page, last_page } = res.data.pagination || {};
        setHasMore(!!last_page && current_page < last_page);
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || "Failed to load sessions");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [queryParams]);

  const lastSessionRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingMore, hasMore]
  );

  return {
    sessions,
    setSessions,
    loading,
    loadingMore,
    error,
    hasMore,
    lastSessionRef,
  };
}