import './Tabs.css';

export interface TabItem {
  value: string;
  label: string;
  badge?: number;
}

interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'contained' | 'line';
}

export function Tabs({ tabs, value, onChange, variant = 'contained' }: TabsProps) {
  return (
    <div className={`tabs--${variant}`}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`tabs__tab ${value === tab.value ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className="tabs__badge">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
