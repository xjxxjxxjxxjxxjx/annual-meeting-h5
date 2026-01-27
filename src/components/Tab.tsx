'use client';

import React, { useState } from 'react';

interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  defaultActiveKey?: string;
  className?: string;
}

const Tab: React.FC<TabProps> = ({
  tabs,
  defaultActiveKey = tabs[0]?.key,
  className = '',
}) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab导航 */}
      <div className="flex overflow-x-auto whitespace-nowrap mb-4 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={`
              px-4
              py-2
              mx-1
              rounded-full
              text-sm
              font-medium
              transition-all
              duration-300
              whitespace-nowrap
              ${activeKey === tab.key
                ? 'bg-primary text-white'
                : 'bg-white/80 text-gray-700 hover:bg-primary/20'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab内容 */}
      <div className="bg-white/90 rounded-lg p-4 shadow-md overflow-y-auto max-h-[60vh]">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`transition-all duration-300 ease-in-out ${
              activeKey === tab.key ? 'block' : 'hidden'
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;
