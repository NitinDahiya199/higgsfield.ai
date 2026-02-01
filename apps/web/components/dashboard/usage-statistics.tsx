"use client";

interface UsageStatisticsProps {
  totalProjects?: number;
  creditsUsed?: number;
  storageUsed?: number;
  creditsLimit?: number;
  storageLimit?: number;
}

export function UsageStatistics({
  totalProjects = 0,
  creditsUsed = 0,
  storageUsed = 0,
  creditsLimit = 100,
  storageLimit = 1000,
}: UsageStatisticsProps) {
  const creditsPercentage = (creditsUsed / creditsLimit) * 100;
  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <div className="rounded-lg border border-[#1F2329] bg-[#111418] p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#EDEDED]">Usage Statistics</h2>
      <div className="space-y-4">
        {/* Total Projects */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#9AA0A6]">Total Projects</span>
            <span className="text-sm font-semibold text-[#EDEDED]">{totalProjects}</span>
          </div>
        </div>

        {/* Credits */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#9AA0A6]">Credits Used</span>
            <span className="text-sm font-semibold text-[#EDEDED]">
              {creditsUsed} / {creditsLimit}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#151A20]">
            <div
              className="h-full bg-[#B8FF00] transition-all"
              style={{ width: `${Math.min(creditsPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Storage */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-[#9AA0A6]">Storage Used</span>
            <span className="text-sm font-semibold text-[#EDEDED]">
              {storageUsed.toFixed(1)} MB / {storageLimit} MB
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#151A20]">
            <div
              className="h-full bg-[#7C8BFF] transition-all"
              style={{ width: `${Math.min(storagePercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
