// src/pages/Study/components/StudyFilters.tsx
import React from "react";
import type { StudyFilter } from "../../pages/Study/types/study.types";


interface StudyFiltersProps {
  filters: StudyFilter;
  setFilters: React.Dispatch<React.SetStateAction<StudyFilter>>;
}

export default function StudyFilters({ filters, setFilters }: StudyFiltersProps) {
  const handleClear = () => {
    setFilters({
      search: "",
      sortBy: "date",
      order: "desc",
      dateFrom: "",
      dateTo: "",
      minHours: "",
      maxHours: "",
    });
  };

  return (
    <div className="mb-8 rounded-2xl border border-gray-800/50 bg-gray-900/60 p-5 backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <input
          type="text"
          placeholder="Search subject, description, notes..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none"
        />

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none"
        >
          <option value="date">Sort by Date</option>
          <option value="subject">Sort by Subject</option>
          <option value="hours">Sort by Hours</option>
          <option value="created_at">Sort by Created</option>
        </select>

        <select
          value={filters.order}
          onChange={(e) => setFilters((prev) => ({ ...prev, order: e.target.value as any }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 focus:outline-none"
        >
          <option value="desc">Descending ↓</option>
          <option value="asc">Ascending ↑</option>
        </select>

        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
        />

        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
        />

        <input
          type="number"
          placeholder="Min hours"
          value={filters.minHours}
          onChange={(e) => setFilters((prev) => ({ ...prev, minHours: e.target.value }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
        />

        <input
          type="number"
          placeholder="Max hours"
          value={filters.maxHours}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxHours: e.target.value }))}
          className="rounded-xl border border-gray-700 bg-gray-800/70 px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
        />

        <button
          onClick={handleClear}
          className="rounded-xl border border-red-800/50 bg-red-900/60 px-5 py-3 font-medium text-red-200 transition hover:bg-red-800/80"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}