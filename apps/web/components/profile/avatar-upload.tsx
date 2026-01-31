"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onUploadComplete?: (url: string) => void;
}

export function AvatarUpload({ currentAvatar, onUploadComplete }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/auth/avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (onUploadComplete) {
          onUploadComplete(data.avatarUrl);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Upload failed");
      }
    } catch {
      setError("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#1F2329] bg-[#151A20]">
          {preview ? (
            <Image
              src={preview}
              alt="Avatar preview"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl text-[#6F7681]">
              ?
            </div>
          )}
        </div>
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#0B0D0F]/80">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1F2329] border-t-[#B8FF00]"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="avatar-upload"
        />
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-2 text-sm font-medium text-[#EDEDED] hover:bg-[#1F2329] transition-colors"
        >
          Choose image
        </label>
        {preview && preview !== currentAvatar && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="rounded-lg bg-[#B8FF00] px-4 py-2 text-sm font-semibold text-[#0B0D0F] hover:bg-[#B8FF00]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <p className="text-xs text-[#6F7681]">JPG, PNG or GIF. Max 5MB.</p>
    </div>
  );
}
