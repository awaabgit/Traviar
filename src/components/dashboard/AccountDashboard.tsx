import { useState } from 'react';
import { AccountDashboardSidebar, DashboardPage } from './AccountDashboardSidebar';
import { DashboardOverview } from './DashboardOverview';
import { MyItinerariesManager } from './MyItinerariesManager';
import { AccountSettings } from './AccountSettings';
import { EditProfilePage } from './EditProfilePage';
import { MediaManagerPage } from './MediaManagerPage';
import { SalesDashboardPage } from './SalesDashboardPage';
import { AnalyticsOverviewPage } from './AnalyticsOverviewPage';
import { CollectionsManagerPage } from './CollectionsManagerPage';
import { PricingDiscountsPage } from './PricingDiscountsPage';
import { ReviewsRatingsPage } from './ReviewsRatingsPage';
import { AudienceInsightsPage } from './AudienceInsightsPage';
import { PrivacySettingsPage } from './PrivacySettingsPage';
import { SecurityLoginPage } from './SecurityLoginPage';
import { NotificationsPage } from './NotificationsPage';
import { PayoutMethodsPage } from './PayoutMethodsPage';
import { TransactionHistoryPage } from './TransactionHistoryPage';
import { TaxInformationPage } from './TaxInformationPage';
import { HelpCenterPage } from './HelpCenterPage';
import { MessagesDrawer } from './MessagesDrawer';
import { ViewMode } from '../../types';

interface AccountDashboardProps {
  onBackToApp: (mode: ViewMode) => void;
}

export function AccountDashboard({ onBackToApp }: AccountDashboardProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('overview');
  const [showMessages, setShowMessages] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <DashboardOverview
            onCreateItinerary={() => onBackToApp('itinerary')}
            onUploadVideo={() => setCurrentPage('media-manager')}
            onOpenMessages={() => setShowMessages(true)}
            onViewAnalytics={() => setCurrentPage('analytics-overview')}
          />
        );
      case 'my-itineraries':
        return <MyItinerariesManager />;
      case 'account-settings':
        return <AccountSettings />;
      case 'edit-profile':
        return <EditProfilePage />;
      case 'media-manager':
        return <MediaManagerPage />;
      case 'sales-dashboard':
        return <SalesDashboardPage />;
      case 'analytics-overview':
        return <AnalyticsOverviewPage />;
      case 'collections-manager':
        return <CollectionsManagerPage />;
      case 'pricing-discounts':
        return <PricingDiscountsPage />;
      case 'reviews-ratings':
        return <ReviewsRatingsPage />;
      case 'audience-insights':
        return <AudienceInsightsPage />;
      case 'privacy-settings':
        return <PrivacySettingsPage />;
      case 'security-settings':
        return <SecurityLoginPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'payout-methods':
        return <PayoutMethodsPage />;
      case 'transaction-history':
        return <TransactionHistoryPage />;
      case 'tax-information':
        return <TaxInformationPage />;
      case 'help-center':
        return <HelpCenterPage />;
      case 'revenue-reports':
        return <TransactionHistoryPage />;
      default:
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-gray-600">This page is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <AccountDashboardSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onBackToTraviar={() => onBackToApp('profile')}
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>

      <MessagesDrawer isOpen={showMessages} onClose={() => setShowMessages(false)} />
    </div>
  );
}
