"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { ProfileForm } from "@/components/profile/profile-form";
import { AccountDeletion } from "@/components/profile/account-deletion";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#EDEDED]">Profile</h1>
            <p className="mt-2 text-sm text-[#9AA0A6]">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="space-y-8">
            {/* Avatar Section */}
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-8">
              <h2 className="mb-6 text-lg font-semibold text-[#EDEDED]">Profile Picture</h2>
              <AvatarUpload currentAvatar={user?.avatar || null} />
            </div>

            {/* Profile Information */}
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-8">
              <h2 className="mb-6 text-lg font-semibold text-[#EDEDED]">Profile Information</h2>
              <ProfileForm />
            </div>

            {/* Account Status */}
            <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-8">
              <h2 className="mb-6 text-lg font-semibold text-[#EDEDED]">Account Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9AA0A6]">Email Verified</span>
                  <span
                    className={`text-sm font-medium ${user?.emailVerified ? "text-[#B8FF00]" : "text-red-400"}`}
                  >
                    {user?.emailVerified ? "Verified" : "Not verified"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9AA0A6]">Member since</span>
                  <span className="text-sm text-[#EDEDED]">
                    {user?.emailVerified ? new Date().toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Deletion */}
            <AccountDeletion />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
