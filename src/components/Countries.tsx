/* global CountriesData: readonly */
import { FC, FormEvent, useState } from 'react';

import usePagination from '../hooks/usePagination';

const Countries: FC<CountriesData> = ({
  data,
  itemsPerPage,
  startFrom,
  searchByData
}) => {
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState(
    searchByData && searchByData.length > 0 ? searchByData[0].value : ''
  );
  const [searchFor, setSearchFor] = useState('');
  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
    setFilteredData,
    setSearching
  } = usePagination({ itemsPerPage, data, startFrom });

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    setSearching(true);

    const copiedData = [...data];
    const filtered = copiedData.filter(country => {
      let searchKey = 'name';
      if (searchByData && searchByData.length > 0) {
        searchKey = searchBy;
      }

      return country[searchKey]
        .toLowerCase()
        .includes(search.trim().toLowerCase());
    });
    setFilteredData(filtered);
    setSearchFor(search);
  };

  const renderPagination = (
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
  );

  const renderResults = (
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
  );

  return (
    <div className="wrapper">
      <form
        className="mt-3 mb-3 is-flex"
        style={{ justifyContent: 'center' }}
        onSubmit={submitHandler}
      >
        {searchByData && searchByData.length && (
          <div className="select mr-2">
            <select
              value={searchBy}
              onChange={event => setSearchBy(event.target.value)}
            >
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
            <input
              type="text"
              className="input"
              placeholder="Search..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="button is-link">
          Search
        </button>
      </form>
      {searchFor && (
        <h2 className="mb-6 has-text-centered is-size-2">
          Search results for: &quot;{searchFor}&quot;
        </h2>
      )}
      {slicedData.length > 0 ? (
        <>
          {renderResults}
          {renderPagination}
        </>
      ) : (
        <div className="message is-link">
          <div className="message-body has-text-centered">No results</div>
        </div>
      )}
    </div>
  );
};

export default Countries;
