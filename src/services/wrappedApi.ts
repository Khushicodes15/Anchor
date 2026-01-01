// src/services/wrappedApi.ts

import { WrappedResponse } from "@/types/wrapped";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getLatestWrapped(
  idToken: string
): Promise<WrappedResponse> {
  const res = await fetch(`${API_BASE_URL}/wrapped/latest`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // wrapped is snapshot, but auth-based
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Anchor Wrapped");
  }

  return res.json();
}
