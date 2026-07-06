'use client';

import { CampaignSettingsCard } from './campaign-workshop-settings';
import { KeywordsPanel } from './campaign-workshop-keywords';
import { PreviewBar } from './campaign-workshop-preview';

export function CampaignWorkshop() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Campaign Settings */}
        <CampaignSettingsCard />

        {/* Right: Keywords Panel */}
        <KeywordsPanel />
      </div>

      {/* Bottom: Preview Bar */}
      <PreviewBar />
    </div>
  );
}
