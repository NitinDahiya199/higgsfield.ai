"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Project } from "@shared/types/project";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState("");

  const fetchProject = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProject(data);
        setProjectName(data.name);
      } else if (response.status === 404) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId, fetchProject]);

  const handleUpdate = async () => {
    if (!projectName.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: projectName }),
      });

      if (response.ok) {
        const updated = await response.json();
        setProject(updated);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
            <div className="text-center text-[#9AA0A6]">Loading project...</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!project) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
            <div className="text-center text-[#9AA0A6]">Project not found</div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex-1">
              {isEditing ? (
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUpdate();
                      } else if (e.key === "Escape") {
                        setIsEditing(false);
                        setProjectName(project.name);
                      }
                    }}
                    className="rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-2xl font-semibold text-[#EDEDED] focus:border-[#B8FF00] focus:outline-none focus:ring-2 focus:ring-[#B8FF00] focus:ring-offset-2 focus:ring-offset-[#0B0D0F]"
                    autoFocus
                  />
                  <button
                    onClick={handleUpdate}
                    className="rounded-sm bg-[#B8FF00] px-4 py-2 text-sm font-medium text-[#0B0D0F] transition-opacity hover:opacity-90"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setProjectName(project.name);
                    }}
                    className="rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h1 className="text-3xl font-semibold text-[#EDEDED]">{project.name}</h1>
              )}
              <p className="mt-1 text-sm text-[#9AA0A6]">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="rounded-sm border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
                <h2 className="mb-4 text-lg font-semibold text-[#EDEDED]">Project Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#9AA0A6]">Project Name</label>
                    <p className="text-sm font-medium text-[#EDEDED]">{project.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#9AA0A6]">Created</label>
                    <p className="text-sm font-medium text-[#EDEDED]">
                      {new Date(project.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-[#9AA0A6]">Last Updated</label>
                    <p className="text-sm font-medium text-[#EDEDED]">
                      {new Date(project.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
                <h2 className="mb-4 text-lg font-semibold text-[#EDEDED]">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-left text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]">
                    Open Editor
                  </button>
                  <button className="w-full rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-left text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]">
                    View Assets
                  </button>
                  <button className="w-full rounded-sm border border-[#1F2329] bg-[#151A20] px-4 py-2 text-left text-sm font-medium text-[#EDEDED] transition-colors hover:border-[#B8FF00] hover:text-[#B8FF00]">
                    View Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
