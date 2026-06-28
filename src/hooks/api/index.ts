/**
 * Shared API hook utilities — feature hooks live under features/*/
export { USE_MOCK_DATA } from "@/lib/env";
export type { ApiResponse, PaginatedResult } from "@/services/api/types";
export { apiGet, apiPost, apiPatch, apiDelete } from "@/services/api/client";
