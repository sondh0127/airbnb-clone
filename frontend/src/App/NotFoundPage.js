import React from 'react';

const NotFoundPage = ({ location }) => {
  return (
    <div style={{ position: 'absolute', top: '80px' }}>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

export default NotFoundPage;
