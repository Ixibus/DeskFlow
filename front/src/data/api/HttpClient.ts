/** HTTP client contract — implemented in data/api/FetchHttpClient.ts */
export interface HttpClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: unknown): Promise<T>;
  logoutPost<T>(path: string): Promise<T>;
  put<T>(path: string, body: unknown): Promise<T>;
}
