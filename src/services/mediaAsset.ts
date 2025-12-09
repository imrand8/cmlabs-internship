"use client";

import { apiFetch } from "./http";

interface UploadResultItem {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
  size?: number;
}

interface UploadResponse {
  items: UploadResultItem[];
}

export async function uploadAssets(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return apiFetch<UploadResponse>("/media-assets/upload", {
    method: "POST",
    body: formData,
  });
}

export async function deleteAsset(id: string) {
  return apiFetch<{ success: boolean }>(`/media-assets/${id}`, {
    method: "DELETE",
  });
}

