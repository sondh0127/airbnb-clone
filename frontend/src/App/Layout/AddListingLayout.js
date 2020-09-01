import React from 'react';
import AddLisitingHeader from './AddLisitingHeader';

const AddListingLayout = (props) => {
  return (
    <>
      <AddLisitingHeader />
      {props.children}
    </>
  );
};

export default AddListingLayout;
