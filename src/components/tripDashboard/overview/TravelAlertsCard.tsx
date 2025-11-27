import { useState } from 'react';
import { AlertTriangle, FileText, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface TravelAlertsCardProps {
  destination: string;
}

const MOCK_ALERTS = [
  {
    type: 'visa',
    title: 'Visa Requirements',
    description: 'US citizens can enter visa-free for up to 90 days. Ensure your passport is valid for at least 6 months.',
    severity: 'info',
  },
  {
    type: 'warning',
    title: 'Travel Advisory',
    description: 'Exercise normal precautions. Check local COVID-19 requirements before travel.',
    severity: 'warning',
  },
];

export function TravelAlertsCard({ destination }: TravelAlertsCardProps) {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set([0]));

  const toggleAlert = (index: number) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAlerts(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'closure':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6
                    hover:shadow-soft-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Alerts</h3>

      <div className="space-y-3">
        {MOCK_ALERTS.map((alert, index) => {
          const isExpanded = expandedAlerts.has(index);
          return (
            <div
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className="border border-gray-200 rounded-xl overflow-hidden animate-slide-up-fade
                       hover:border-gray-300 transition-colors duration-200"
            >
              <button
                onClick={() => toggleAlert(index)}
                className="w-full flex items-center justify-between p-4 text-left
                         hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getIcon(alert.type)}</div>
                  <span className="font-medium text-gray-900">{alert.title}</span>
                </div>
                <div className="flex-shrink-0 transition-transform duration-200">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 animate-slide-in-down">
                  <p className="text-sm text-gray-600 leading-relaxed">{alert.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
