import React from 'react';

const CodeSnippet: React.FC = () => {
  return (
    <div
      className="absolute top-24 left-8 hidden lg:block"
      style={{ opacity: 0.8 }}
    >
      <div className="code-snippet bg-gradient-to-r from-zinc-100 to-zinc-200">
        <div style={{ color: '#9CA3AF' }}>
          // routes/web.php
        </div>
        <div>
          <span style={{ color: '#EC4899' }}>Route</span>
          <span style={{ color: '#6B7280' }}>::</span>
          <span style={{ color: '#3B82F6' }}>get</span>
          <span style={{ color: '#6B7280' }}>(</span>
          <span style={{ color: '#10B981' }}>'/'</span>
          <span style={{ color: '#6B7280' }}>,</span>
          <span style={{ color: '#8B5CF6' }}>HomeController</span>
          <span style={{ color: '#6B7280' }}>::class);</span>
        </div>
      </div>
    </div>
  );
}

export default CodeSnippet;
