import { Search, Book, MessageCircle, Mail, FileText, Video, DollarSign, Shield, Settings, TrendingUp } from 'lucide-react';

export function HelpCenterPage() {
  const popularTopics = [
    {
      icon: TrendingUp,
      title: 'Getting Started as a Creator',
      description: 'Learn how to set up your profile and start selling',
      articles: 12,
    },
    {
      icon: DollarSign,
      title: 'Pricing & Payouts',
      description: 'Understand how payments and fees work',
      articles: 8,
    },
    {
      icon: Shield,
      title: 'Account Security',
      description: 'Keep your account safe and secure',
      articles: 6,
    },
    {
      icon: FileText,
      title: 'Creating Itineraries',
      description: 'Best practices for building great travel guides',
      articles: 15,
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      articles: 10,
    },
    {
      icon: Video,
      title: 'Content Guidelines',
      description: 'What you can and can\'t post on Traviar',
      articles: 7,
    },
  ];

  const faqs = [
    {
      question: 'How do I start selling itineraries?',
      answer: 'To start selling, complete your creator profile, set up your payout method, and create your first itinerary. Once published, it will be available in the marketplace.',
    },
    {
      question: 'When will I receive my payouts?',
      answer: 'Payouts are processed monthly on the last day of each month. You can also set up bi-weekly or manual payouts in your payout settings.',
    },
    {
      question: 'What fees does Traviar charge?',
      answer: 'Traviar charges a 2.5% platform fee on all sales. This covers payment processing, hosting, and platform maintenance.',
    },
    {
      question: 'How do I handle refunds?',
      answer: 'You can issue refunds from the sales dashboard within 30 days of purchase. The platform fee is also refunded when you issue a refund.',
    },
    {
      question: 'Can I edit my itinerary after publishing?',
      answer: 'Yes, you can edit your itinerary at any time. Updates are reflected immediately and customers who have purchased will see the updated version.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">Find answers and get support</p>
      </div>

      <div className="bg-gradient-to-br from-coral-500 to-coral-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">How can we help you?</h2>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for articles, topics, or questions..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-coral-500 transition-all text-left group">
          <div className="w-12 h-12 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
            <Book className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Browse Articles</h3>
          <p className="text-sm text-gray-600">
            Explore our comprehensive knowledge base
          </p>
        </button>

        <button className="p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-coral-500 transition-all text-left group">
          <div className="w-12 h-12 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center mb-4 transition-colors">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600">
            Chat with our support team in real-time
          </p>
        </button>

        <button className="p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-coral-500 transition-all text-left group">
          <div className="w-12 h-12 rounded-lg bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center mb-4 transition-colors">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
          <p className="text-sm text-gray-600">
            Send us a message and we'll respond within 24 hours
          </p>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Popular Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTopics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <button
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-coral-500 hover:bg-coral-50 transition-all text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-coral-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{topic.description}</p>
                    <span className="text-xs text-coral-600 font-medium">
                      {topic.articles} articles →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group p-4 rounded-lg border border-gray-200 hover:border-coral-300 transition-colors"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <span className="text-coral-600 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Getting Started', duration: '5:32' },
            { title: 'Creating Your First Itinerary', duration: '8:45' },
            { title: 'Pricing Strategies', duration: '6:12' },
          ].map((video, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-lg bg-gray-100 overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all">
                  <Video className="w-8 h-8 text-coral-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-semibold text-sm">{video.title}</p>
                <p className="text-white/80 text-xs">{video.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2">Still need help?</h3>
            <p className="text-sm text-blue-800 mb-4">
              Our support team is here to help you Monday through Friday, 9am-5pm EST
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
                Contact Support
              </button>
              <button className="px-4 py-2 rounded-lg bg-white hover:bg-gray-50 text-blue-900 text-sm font-medium">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Community Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="p-4 rounded-lg border border-gray-200 hover:border-coral-500 hover:bg-coral-50 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="font-semibold text-gray-900 mb-1">Creator Community Forum</p>
              <p className="text-sm text-gray-600">Connect with other travel creators</p>
            </div>
            <span className="text-coral-600 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href="#"
            className="p-4 rounded-lg border border-gray-200 hover:border-coral-500 hover:bg-coral-50 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="font-semibold text-gray-900 mb-1">Creator Blog</p>
              <p className="text-sm text-gray-600">Tips and success stories</p>
            </div>
            <span className="text-coral-600 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
