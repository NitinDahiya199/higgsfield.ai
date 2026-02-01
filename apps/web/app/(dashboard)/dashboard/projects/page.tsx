"use client";

import { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Project } from "@shared/types/project";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

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
              <h1 className="text-3xl font-semibold text-[#EDEDED]">Projects</h1>
              <p className="mt-1 text-sm text-[#9AA0A6]">Manage all your AI creation projects</p>
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
                {searchQuery ? "Try a different search term" : "Start creating your first project!"}
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "space-y-3"
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
              ))}
            </div>
          )}

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
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
