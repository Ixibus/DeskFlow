import type { HttpClient } from "@/data/api/HttpClient";
import axios from "axios";

axios.defaults.withCredentials = true;

export class AxiosHttpClient implements HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const headers = this.buildHeaders();
    const response = await axios.get<T>(`${this.baseUrl}${path}`, { headers });
    return response.data;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const headers = this.buildHeaders();
    try {
      const response = await axios.post<T>(`${this.baseUrl}${path}`, body, {
        headers,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logoutPost<T>(path: string): Promise<T> {
    const headers = this.buildHeaders();
    try {
      const response = await axios.post<T>(`${this.baseUrl}${path}`, null, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    const headers = this.buildHeaders();
    const response = await axios.put<T>(`${this.baseUrl}${path}`, body, {
      headers,
    });
    return response.data;
  }
  private buildHeaders() {
    const headers: Record<string, string> = { Accept: "application/json" };
    const authHeader = buildOptionalBasicAuthHeader();
    if (authHeader) {
      headers.Authorization = authHeader;
    }
    return headers;
  }
}

function buildOptionalBasicAuthHeader(): string | null {
  const user = import.meta.env.VITE_API_BASIC_USER;
  const password = import.meta.env.VITE_API_BASIC_PASSWORD;

  if (!user || !password) {
    return null;
  }

  return `Basic ${btoa(`${user}:${password}`)}`;
}
