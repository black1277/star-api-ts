import React from 'react';

import './spinner.css';

const Spinner: React.FC = () => {
  return (
      <div className="wr-spin">
          <div className="lds-ripple">
              <div />
              <div />
          </div>
      </div>
  );
};

export default Spinner;
