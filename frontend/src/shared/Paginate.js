import React from 'react';
import ReactPaginate from 'react-paginate';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import './pagination.scss';

const Paginate = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={
        <NavigateBefore
          style={{
            fontSize: 32,
            border: '1px solid #008489 ',
            borderRadius: '50%',
            fill: '#008489',
          }}
        />
      }
      nextLabel={
        <NavigateNext
          style={{
            fontSize: 32,
            border: '1px solid #008489 ',
            borderRadius: '50%',
            fill: '#008489',
          }}
        />
      }
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={'pagination'}
      subContainerClassName={'sub-container'}
      activeClassName={'active'}
    />
  );
};

export default Paginate;
