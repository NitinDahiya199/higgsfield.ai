"use client";

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProjectCard } from "@/components/dashboard/project-card";
import { UsageStatistics } from "@/components/dashboard/usage-statistics";
import { Project } from "@shared/types/project";
import { useAuth } from "@/contexts/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newProjectName }),
      });

      if (response.ok) {
        const project = await response.json();
        setProjects([project, ...projects]);
        setNewProjectName("");
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#EDEDED]">Dashboard</h1>
              <p className="mt-1 text-sm text-[#9AA0A6]">
                Welcome back, {user?.name || user?.email || "User"}! Ready to create something
                amazing?
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#B8FF00] px-4 py-2 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Project
            </button>
          </div>

          {/* Stats and Usage */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Total Projects</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-3xl font-semibold text-[#EDEDED]">{projects.length}</p>
            </div>
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Credits Used</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-semibold text-[#EDEDED]">0</p>
            </div>
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Storage Used</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <p className="text-3xl font-semibold text-[#EDEDED]">0 MB</p>
            </div>
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#9AA0A6]">Account Status</span>
                <svg
                  className="h-5 w-5 text-[#B8FF00]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[#B8FF00]">
                {user?.emailVerified ? "Verified" : "Unverified"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content - Projects */}
            <div className="lg:col-span-2">
              {/* Search and View Toggle */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-sm border border-[#1F2329] bg-[#151A20] py-2 pl-10 pr-4 text-sm text-[#EDEDED] placeholder:text-[#9AA0A6] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F]"
                  />
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

              {/* Projects Grid/List */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-[#9AA0A6]">Loading projects...</div>
                </div>
              ) : filteredProjects.length === 0 ? (
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <p className="text-sm text-[#9AA0A6] mb-2">
                    {searchQuery ? "No projects found" : "No projects yet"}
                  </p>
                  <p className="text-xs text-[#6F7681]">
                    {searchQuery
                      ? "Try a different search term"
                      : "Start creating your first project!"}
                  </p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"
                  }
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={handleDeleteProject}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - Usage Statistics */}
            <div>
              <UsageStatistics
                totalProjects={projects.length}
                creditsUsed={0}
                storageUsed={0}
                creditsLimit={100}
                storageLimit={1000}
              />
            </div>
          </div>
        </div>

        {/* Create Project Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0F]/80 p-4">
            <div className="w-full max-w-md rounded-lg border border-[#1F2329] bg-[#151A20] p-6">
              <h2 className="mb-4 text-xl font-semibold text-[#EDEDED]">Create New Project</h2>
              <input
                type="text"
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateProject();
                  }
                }}
                className="mb-4 w-full rounded-sm border border-[#1F2329] bg-[#111418] px-4 py-2 text-sm text-[#EDEDED] placeholder:text-[#9AA0A6] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#151A20]"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={handleCreateProject}
                  className="flex-1 rounded-sm bg-[#B8FF00] px-4 py-2 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewProjectName("");
                  }}
                  className="flex-1 rounded-sm border border-[#1F2329] bg-[#111418] px-4 py-2 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
