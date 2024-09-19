/* global Country: readonly, PaginationLink: readonly, CountriesData: readonly */
import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';

interface PaginationHook {
  slicedData: Country[];
  pagination: PaginationLink[];
  filteredData: Country[];
  prevPage: (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  nextPage: (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  changePage: (
    page: number,
    event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  setFilteredData: (data: Country[]) => void;
  setSearching: (state: boolean) => void;
}

const usePagination = (initialState: CountriesData): PaginationHook => {
  const { itemsPerPage, data, startFrom } = initialState;
  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(filteredData.length / perPage);
  const pagination: PaginationLink[] = [];

  const [currentPage, setCurrentPage] = useState(
    startFrom && startFrom <= pages ? startFrom : 1
  );
  const [slicedData, setSlicedData] = useState(
    [...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage)
  );

  useEffect(() => {
    setSlicedData(
      [...filteredData].slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      )
    );
    if (searching) {
      setCurrentPage(1);
      setSearching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData, currentPage]);

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

  const changePage = (
    page: number,
    event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
    }
  };

  const goToPrevPage = (
    event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
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

  const goToNextPage = (
    event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
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
    filteredData,
    prevPage: goToPrevPage,
    nextPage: goToNextPage,
    changePage,
    setFilteredData,
    setSearching
  };
};

export default usePagination;
