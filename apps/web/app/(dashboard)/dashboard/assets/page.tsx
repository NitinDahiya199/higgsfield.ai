"use client";

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

interface Asset {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  size: number;
  createdAt: Date;
  projectId?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/assets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAssets(data);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/assets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAssets(assets.filter((a) => a.id !== id));
        if (selectedAsset?.id === id) {
          setSelectedAsset(null);
        }
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#EDEDED]">Assets</h1>
              <p className="mt-1 text-sm text-[#9AA0A6]">
                Manage your images, videos, and media files
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#B8FF00] px-4 py-2 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Upload Asset
            </button>
          </div>

          {/* Filters and View Toggle */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9AA0A6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-sm border border-[#1F2329] bg-[#151A20] py-2 pl-10 pr-4 text-sm text-[#EDEDED] placeholder:text-[#9AA0A6] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F]"
                />
              </div>
              <div className="flex items-center gap-2 rounded-sm border border-[#1F2329] bg-[#151A20] p-1">
                <button
                  onClick={() => setFilterType("all")}
                  className={`rounded-sm px-3 py-1 text-xs font-medium transition-colors ${
                    filterType === "all"
                      ? "bg-[#111418] text-[#B8FF00]"
                      : "text-[#9AA0A6] hover:text-[#EDEDED]"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType("image")}
                  className={`rounded-sm px-3 py-1 text-xs font-medium transition-colors ${
                    filterType === "image"
                      ? "bg-[#111418] text-[#B8FF00]"
                      : "text-[#9AA0A6] hover:text-[#EDEDED]"
                  }`}
                >
                  Images
                </button>
                <button
                  onClick={() => setFilterType("video")}
                  className={`rounded-sm px-3 py-1 text-xs font-medium transition-colors ${
                    filterType === "video"
                      ? "bg-[#111418] text-[#B8FF00]"
                      : "text-[#9AA0A6] hover:text-[#EDEDED]"
                  }`}
                >
                  Videos
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-[#1F2329] bg-[#151A20] p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-sm p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#111418] text-[#B8FF00]"
                    : "text-[#9AA0A6] hover:text-[#EDEDED]"
                }`}
                aria-label="Grid view"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-sm p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-[#111418] text-[#B8FF00]"
                    : "text-[#9AA0A6] hover:text-[#EDEDED]"
                }`}
                aria-label="List view"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Assets Grid/List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-[#9AA0A6]">Loading assets...</div>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-[#1F2329] bg-[#111418] py-12 text-center">
              <svg
                className="h-12 w-12 text-[#6F7681] mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-[#9AA0A6] mb-2">
                {searchQuery || filterType !== "all" ? "No assets found" : "No assets yet"}
              </p>
              <p className="text-xs text-[#6F7681]">
                {searchQuery || filterType !== "all"
                  ? "Try adjusting your filters"
                  : "Upload your first asset to get started!"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="group relative cursor-pointer overflow-hidden rounded-sm border border-[#1F2329] bg-[#151A20] transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <div className="aspect-square overflow-hidden bg-[#111418]">
                    {asset.thumbnail ? (
                      <img
                        src={asset.thumbnail}
                        alt={asset.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : asset.type === "image" ? (
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-12 w-12 text-[#6F7681]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-[#EDEDED]">{asset.name}</p>
                    <div className="mt-1 flex items-center justify-between text-xs text-[#9AA0A6]">
                      <span className="capitalize">{asset.type}</span>
                      <span>{formatFileSize(asset.size)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAsset(asset.id);
                    }}
                    className="absolute right-2 top-2 rounded-sm bg-[#0B0D0F]/80 p-1.5 text-[#9AA0A6] opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                    aria-label="Delete asset"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="group flex items-center gap-4 rounded-sm border border-[#1F2329] bg-[#151A20] p-4 transition-all hover:border-[#B8FF00]"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-[#111418]">
                    {asset.thumbnail ? (
                      <img
                        src={asset.thumbnail}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                      />
                    ) : asset.type === "image" ? (
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <svg
                          className="h-6 w-6 text-[#6F7681]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[#EDEDED]">{asset.name}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-[#9AA0A6]">
                      <span className="capitalize">{asset.type}</span>
                      <span>{formatFileSize(asset.size)}</span>
                      <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAsset(asset.id);
                    }}
                    className="rounded-sm p-2 text-[#9AA0A6] opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                    aria-label="Delete asset"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Asset Preview Modal */}
        {selectedAsset && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F]/90 p-4"
            onClick={() => setSelectedAsset(null)}
          >
            <div className="relative max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute -right-12 top-0 rounded-sm bg-[#151A20] p-2 text-[#EDEDED] transition-colors hover:text-red-400"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {selectedAsset.type === "image" ? (
                <img
                  src={selectedAsset.url}
                  alt={selectedAsset.name}
                  className="max-h-[90vh] max-w-full rounded-lg object-contain"
                />
              ) : (
                <video
                  src={selectedAsset.url}
                  controls
                  className="max-h-[90vh] max-w-full rounded-lg"
                />
              )}
              <div className="mt-4 rounded-lg border border-[#1F2329] bg-[#151A20] p-4">
                <h3 className="mb-2 text-lg font-semibold text-[#EDEDED]">{selectedAsset.name}</h3>
                <div className="flex items-center gap-4 text-sm text-[#9AA0A6]">
                  <span className="capitalize">{selectedAsset.type}</span>
                  <span>{formatFileSize(selectedAsset.size)}</span>
                  <span>{new Date(selectedAsset.createdAt).toLocaleString()}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href={selectedAsset.url}
                    download
                    className="rounded-sm bg-[#B8FF00] px-4 py-2 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => handleDeleteAsset(selectedAsset.id)}
                    className="rounded-sm border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
