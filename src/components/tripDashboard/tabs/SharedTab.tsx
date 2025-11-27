import { Users, DollarSign, MessageSquare, Activity } from 'lucide-react';

interface SharedTabProps {
  tripId: string;
}

export function SharedTab({ tripId }: SharedTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Trip Members</h3>
          <button
            className="px-4 py-2 rounded-lg bg-coral-500 hover:bg-coral-600 text-white
                     text-sm font-medium transition-all duration-200
                     transform hover:scale-105 active:scale-95"
          >
            Invite Member
          </button>
        </div>

        <div className="flex items-center gap-3">
          {[1, 2, 3].map((member, index) => (
            <div
              key={member}
              style={{ animationDelay: `${index * 75}ms` }}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-200
                       hover:border-gray-300 hover:shadow-sm transition-all duration-200
                       animate-slide-up-fade"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-400 to-coral-600
                            flex items-center justify-center text-white font-semibold">
                M{member}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">Member {member}</div>
                <div className="text-xs text-gray-500">Editor</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6 animate-slide-up-fade"
             style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Cost Splitter</h3>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p>Cost splitting coming soon</p>
          </div>
        </div>

        <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6 animate-slide-up-fade"
             style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((activity, index) => (
              <div
                key={activity}
                style={{ animationDelay: `${index * 50}ms` }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50
                         transition-colors duration-200 animate-fade-in"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">Member {activity} added an activity</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[18px] shadow-soft border border-gray-100 p-6 animate-slide-up-fade"
           style={{ animationDelay: '250ms' }}>
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Trip Chat</h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p>Chat coming soon</p>
        </div>
      </div>
    </div>
  );
}
