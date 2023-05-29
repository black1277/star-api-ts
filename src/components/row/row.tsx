import React from 'react';
import { IContent } from '../../type'

const Row = ({ left, right }: IContent) => {
  return (
    <div className="row mt-2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  );
};

export default Row