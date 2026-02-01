"use client";

import Link from "next/link";
import { Project } from "@shared/types/project";

interface ProjectCardProps {
  project: Project;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && confirm("Are you sure you want to delete this project?")) {
      onDelete(project.id);
    }
  };

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="group relative block rounded-sm border border-[#1F2329] bg-[#151A20] transition-all hover:border-[#B8FF00] hover:shadow-lg hover:shadow-[#B8FF00]/10"
    >
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden rounded-t-sm bg-[#111418]">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="flex-1 text-sm font-semibold text-[#EDEDED] line-clamp-2">
            {project.name}
          </h3>
          {onDelete && (
            <button
              onClick={handleDelete}
              className="rounded-sm p-1 text-[#9AA0A6] opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
              aria-label="Delete project"
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
          )}
        </div>
        <p className="text-xs text-[#9AA0A6]">{new Date(project.updatedAt).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
