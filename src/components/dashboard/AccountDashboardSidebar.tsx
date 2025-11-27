import { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Image,
  Layers,
  FileText,
  TrendingUp,
  DollarSign,
  Star,
  BarChart3,
  Users,
  FileBarChart,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { ViewMode } from '../../types';

export type DashboardPage =
  | 'overview'
  | 'edit-profile'
  | 'media-manager'
  | 'collections-manager'
  | 'my-itineraries'
  | 'sales-dashboard'
  | 'pricing-discounts'
  | 'reviews-ratings'
  | 'analytics-overview'
  | 'audience-insights'
  | 'revenue-reports'
  | 'account-settings'
  | 'privacy-settings'
  | 'security-settings'
  | 'notifications'
  | 'payout-methods'
  | 'transaction-history'
  | 'tax-information'
  | 'help-center';

interface AccountDashboardSidebarProps {
  currentPage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
  onBackToTraviar: () => void;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  id: DashboardPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Dashboard',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Profile & Content',
    items: [
      { id: 'edit-profile', label: 'Edit Profile', icon: User },
      { id: 'media-manager', label: 'Media Manager', icon: Image },
      { id: 'collections-manager', label: 'Collections', icon: Layers },
    ],
  },
  {
    title: 'Marketplace & Sales',
    items: [
      { id: 'my-itineraries', label: 'My Itineraries', icon: FileText },
      { id: 'sales-dashboard', label: 'Sales Dashboard', icon: TrendingUp },
      { id: 'pricing-discounts', label: 'Pricing & Discounts', icon: DollarSign },
      { id: 'reviews-ratings', label: 'Reviews & Ratings', icon: Star },
    ],
  },
  {
    title: 'Business & Analytics',
    items: [
      { id: 'analytics-overview', label: 'Analytics Overview', icon: BarChart3 },
      { id: 'audience-insights', label: 'Audience Insights', icon: Users },
      { id: 'revenue-reports', label: 'Revenue Reports', icon: FileBarChart },
    ],
  },
  {
    title: 'Account & Security',
    items: [
      { id: 'account-settings', label: 'Account Settings', icon: Settings },
      { id: 'privacy-settings', label: 'Privacy Settings', icon: Shield },
      { id: 'security-settings', label: 'Security & Login', icon: Shield },
      { id: 'notifications', label: 'Notifications', icon: Bell },
    ],
  },
  {
    title: 'Payouts & Billing',
    items: [
      { id: 'payout-methods', label: 'Payout Methods', icon: CreditCard },
      { id: 'transaction-history', label: 'Transaction History', icon: Receipt },
      { id: 'tax-information', label: 'Tax Information', icon: FileSpreadsheet },
    ],
  },
  {
    title: 'Help & Support',
    items: [
      { id: 'help-center', label: 'Help Center', icon: HelpCircle },
    ],
  },
];

export function AccountDashboardSidebar({
  currentPage,
  onPageChange,
  onBackToTraviar,
}: AccountDashboardSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Dashboard',
    'Profile & Content',
    'Marketplace & Sales',
  ]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onBackToTraviar}
          className="flex items-center gap-2 text-sm font-medium text-gray-700
                   hover:text-coral-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Traviar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {NAV_SECTIONS.map((section) => {
          const isExpanded = expandedSections.includes(section.title);

          return (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-2 py-1.5
                         text-xs font-semibold text-gray-500 uppercase tracking-wider
                         hover:text-gray-700 transition-colors"
              >
                {section.title}
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>

              {isExpanded && (
                <div className="mt-1 space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => onPageChange(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
                                 text-sm font-medium transition-all ${
                                   isActive
                                     ? 'bg-coral-50 text-coral-700'
                                     : 'text-gray-700 hover:bg-gray-50'
                                 }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral-400 to-coral-600
                        flex items-center justify-center text-white text-xs font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
            <p className="text-xs text-gray-500">Creator Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
