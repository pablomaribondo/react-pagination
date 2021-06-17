/* global Country: readonly */
import { FC, useState } from 'react';

import countries from './data/countries.json';
import Header from './components/Header';
import Countries from './components/Countries';

const App: FC = () => {
  const [data] = useState(countries as Country[]);
  return (
    <>
      <Header title="ReactJS pagination using custom hook" />
      <div className="container px2">
        <Countries data={data} itemsPerPage={15} />
      </div>
    </>
  );
};

export default App;
