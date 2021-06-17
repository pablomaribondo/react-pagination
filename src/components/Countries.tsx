/* global CountriesData: readonly */
import { FC } from 'react';

import usePagination from '../hooks/usePagination';

const Countries: FC<CountriesData> = ({ data, itemsPerPage, startFrom }) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

  return (
    <>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital</th>
            <th>Code</th>
            <th>Currency</th>
            <th>Phone Code</th>
          </tr>
        </thead>

        <tbody>
          {slicedData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.capital}</td>
              <td>{item.iso2}</td>
              <td>{item.currency}</td>
              <td>{item.phone_code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="pagination">
        <a href="/#" className="pagination-previous" onClick={prevPage}>
          Previous
        </a>
        <a href="/#" className="pagination-next" onClick={nextPage}>
          Next
        </a>
        <ul className="pagination-list">
          {pagination.map(page => {
            if (page.ellipsis) {
              return (
                <li key={page.id}>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
              );
            }

            return (
              <li key={page.id}>
                <a
                  href="/#"
                  className={
                    page.current
                      ? 'pagination-link is-current'
                      : 'pagination-link'
                  }
                  onClick={event => changePage(page.id, event)}
                >
                  {page.id}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Countries;
