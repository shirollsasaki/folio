'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useAuth } from '@clerk/nextjs';

interface Tab {
  label: string;
  href: string;
  /** If true, only show when user is signed in */
  authRequired?: boolean;
}

interface AppShellProps {
  children: React.ReactNode;
  /** Optional tabs to show. If not provided, uses default tabs */
  tabs?: Tab[];
  /** If true, shows centered content layout (no sidebar) */
  centered?: boolean;
  /** Current active tab href (auto-detected from pathname if not provided) */
  activeTab?: string;
  /** Hide tabs entirely (for landing page) */
  hideTabs?: boolean;
}

const defaultTabs: Tab[] = [
  { label: 'Home', href: '/' },
  { label: 'Build', href: '/build', authRequired: true },
  { label: 'Dashboard', href: '/dashboard', authRequired: true },
];

export function AppShell({ 
  children, 
  tabs = defaultTabs, 
  centered = false,
  activeTab,
  hideTabs = false,
}: AppShellProps) {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const currentActiveTab = activeTab || pathname;
  
  const isTabActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className="app-frame">
      {!hideTabs && (
        <div className="app-tabs">
          {tabs.map((tab, index) => {
            if (tab.authRequired && !isSignedIn) {
              return null;
            }
            
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`app-tab ${isTabActive(tab.href) ? 'active' : ''}`}
                style={{ zIndex: tabs.length - index }}
              >
                {tab.label}
              </Link>
            );
          })}
          
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '20px' }}>
            {isSignedIn ? (
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: { width: 32, height: 32 }
                  }
                }}
              />
            ) : (
              <Link href="/sign-in" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
      
      <div className="app-body">
        {centered ? (
          <div className="app-main-centered">
            {children}
          </div>
        ) : (
          <div className="app-main">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/** Step indicator for multi-step flows (build wizard) */
interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 3 }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className={`step-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              {isCompleted ? '✓' : step}
            </div>
            {step < totalSteps && <div className="step-line" />}
          </div>
        );
      })}
    </div>
  );
}

export default AppShell;
