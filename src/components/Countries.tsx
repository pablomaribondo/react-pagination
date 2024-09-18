/* global CountriesData: readonly */
import { FC } from 'react';

import usePagination from '../hooks/usePagination';

const Countries: FC<CountriesData> = ({
  data,
  itemsPerPage,
  startFrom,
  searchByData
}) => {
  const { slicedData, pagination, prevPage, nextPage, changePage } =
    usePagination({ itemsPerPage, data, startFrom });

  return (
    <div className="wrapper">
      <form className="mt-3 mb-3 is-flex" style={{ justifyContent: 'center' }}>
        {searchByData && searchByData.length && (
          <div className="select mr-2">
            <select>
              {searchByData.map(data => (
                <option key={data.value} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="field mr-2">
          <div className="control">
            <input type="text" className="input" placeholder="Search..." />
          </div>
        </div>
        <button type="submit" className="button is-link">
          Search
        </button>
      </form>
      <h2 className="mb-6 has-text-centered is-size-2">
        Search results for: &quot;search value&quot;
      </h2>
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
    </div>
  );
};

export default Countries;
