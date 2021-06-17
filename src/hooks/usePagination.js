import { useState } from 'react';

const usePagination = initialState => {
  const { itemsPerPage, data, startFrom } = initialState;
  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(data.length / perPage);
  const pagination = [];

  const [currentPage, setCurrentPage] = useState(
    startFrom <= pages ? startFrom : 1
  );
  const [slicedData, setSlicedData] = useState(
    [...data].slice((currentPage - 1) * perPage, currentPage * perPage)
  );

  let ellipsisLeft = false;
  let ellipsisRight = false;

  for (let i = 1; i <= pages; i++) {
    if (i === currentPage) {
      pagination.push({ id: i, current: true, ellipsis: false });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (
        i < 2 ||
        i > pages - 1 ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pagination.push({
          id: i,
          current: false,
          ellipsis: false
        });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({
          id: i,
          current: false,
          ellipsis: true
        });

        ellipsisLeft = true;
      } else if (i < pages && i > currentPage && !ellipsisRight) {
        pagination.push({
          id: i,
          current: false,
          ellipsis: true
        });

        ellipsisRight = true;
      }
    }
  }

  const changePage = (page, event) => {
    event.preventDefault();

    if (page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
    }
  };

  const goToPrevPage = event => {
    event.preventDefault();

    setCurrentPage(prevValue =>
      prevValue - 1 === 0 ? prevValue : prevValue - 1
    );

    if (currentPage !== 1) {
      setSlicedData(
        [...data].slice(
          (currentPage - 2) * perPage,
          (currentPage - 1) * perPage
        )
      );
    }
  };

  const goToNextPage = event => {
    event.preventDefault();

    setCurrentPage(prevValue =>
      prevValue === pages ? prevValue : prevValue + 1
    );

    if (currentPage !== pages) {
      setSlicedData(
        [...data].slice(currentPage * perPage, (currentPage + 1) * perPage)
      );
    }
  };

  return {
    slicedData,
    pagination,
    prevPage: goToPrevPage,
    nextPage: goToNextPage,
    changePage
  };
};

export default usePagination;
