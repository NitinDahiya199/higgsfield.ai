"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function AccountDeletion() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requiredText = "DELETE";

  const handleDelete = async () => {
    if (confirmText !== requiredText) {
      setError(`Please type "${requiredText}" to confirm`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/auth/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await logout();
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete account. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-8">
      <h2 className="mb-2 text-lg font-semibold text-[#EDEDED]">Delete Account</h2>
      <p className="mb-6 text-sm text-[#9AA0A6]">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg border border-red-500/50 bg-transparent px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          Delete account
        </button>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="mb-2 text-sm font-medium text-red-400">
              Warning: This action cannot be undone
            </p>
            <ul className="mb-4 space-y-1 text-xs text-[#9AA0A6]">
              <li>• All your projects and data will be permanently deleted</li>
              <li>• Your account and profile information will be removed</li>
              <li>• You will lose access to all your assets and history</li>
              <li>• Any active subscriptions will be cancelled</li>
            </ul>
          </div>

          <div>
            <label
              htmlFor="confirm-delete"
              className="block text-sm font-medium text-[#EDEDED] mb-2"
            >
              Type <span className="font-mono text-red-400">{requiredText}</span> to confirm:
            </label>
            <input
              id="confirm-delete"
              type="text"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                setError("");
              }}
              placeholder={requiredText}
              className="w-full rounded-lg border border-[#1F2329] bg-[#151A20] px-4 py-3 text-[#EDEDED] placeholder:text-[#6F7681] focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={handleDelete}
              disabled={loading || confirmText !== requiredText}
              className="rounded-lg border border-red-500 bg-red-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#0B0D0F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "Delete my account"}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setConfirmText("");
                setError("");
              }}
              disabled={loading}
              className="rounded-lg border border-[#1F2329] bg-[#151A20] px-6 py-3 text-sm font-medium text-[#EDEDED] transition-colors hover:bg-[#1F2329] focus:outline-none focus:ring-2 focus:ring-[#1F2329] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
