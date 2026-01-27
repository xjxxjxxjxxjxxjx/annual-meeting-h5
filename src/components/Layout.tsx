'use client';

import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  backgroundImage,
  className = '',
}) => {
  return (
    <div className={`page-container ${className}`}>
      {backgroundImage && (
        <div 
          className="bg-container"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
