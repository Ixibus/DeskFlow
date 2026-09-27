import { AxiosHttpClient } from "@/data/api/AxiosHttpClient";
import type { HttpClient } from "@/data/api/HttpClient";

export function createHttpClient(): HttpClient {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_URL is not defined");
  }

  return new AxiosHttpClient(baseUrl.replace(/\/$/, ""));
}
