/**
 * Shared API hook utilities — feature hooks live under features/*/hooks/
 * and call domain queries that wrap typed API clients in services/api/.
 */
export { USE_MOCK_DATA } from "@/lib/env";
export type { ApiResponse, PaginatedResult } from "@/services/api/types";
export { apiGet, apiPost, apiPatch, apiDelete } from "@/services/api/client";
