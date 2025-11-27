interface SectionTabsProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'content', label: 'Content' },
  { id: 'nearby', label: 'Nearby' },
];

export function SectionTabs({ activeSection, onSectionChange }: SectionTabsProps) {
  return (
    <div className="sticky top-[73px] z-20 bg-white border-b border-gray-200 flex-shrink-0">
      <div className="flex gap-1 px-6 overflow-x-auto scrollbar-hide">
        {SECTIONS.map((section, index) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            style={{ animationDelay: `${index * 40}ms` }}
            className={`relative px-4 py-3 font-medium text-sm whitespace-nowrap
                     transition-all duration-200 animate-fade-in ${
                       activeSection === section.id
                         ? 'text-coral-600'
                         : 'text-gray-600 hover:text-gray-900'
                     }`}
          >
            {section.label}
            {activeSection === section.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral-500 animate-scale-in" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
