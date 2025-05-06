import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/">← Back to Home</a>
    </div>
  );
};

export default NotFound;
