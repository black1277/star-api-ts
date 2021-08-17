import React from 'react';

import './spinner.css';

const Spinner: React.FC = () => {
  return (
      <div className="lds-ripple">
          <div />
          <div />
      </div>
  );
};

export default Spinner;
