/* global Country: readonly */
import { FC, useState } from 'react';

import countries from './data/countries.json';
import Header from './components/Header';
import Countries from './components/Countries';
import './App.css';

const App: FC = () => {
  const [data] = useState(countries as Country[]);
  return (
    <>
      <Header title="ReactJS pagination using custom hook" />
      <div className="container px2">
        <Countries
          data={data}
          itemsPerPage={15}
          searchByData={[
            { label: 'Search by country', value: 'name' },
            { label: 'Search by capital', value: 'capital' },
            { label: 'Search by country code', value: 'iso2' },
            { label: 'Search by currency', value: 'currency' },
            { label: 'Search by phone code', value: 'phone_code' }
          ]}
        />
      </div>
    </>
  );
};

export default App;
