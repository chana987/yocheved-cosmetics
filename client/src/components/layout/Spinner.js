import React from 'react';
import Loader from 'react-loader-spinner'

const Spinner = () => {
  return (
    <Loader className="spinner"
      type="Grid"
      color="rgba(73, 39, 74, 1)"
      height={30}
      width={30}
    />
  );
}

export default Spinner
