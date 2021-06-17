import { useState } from 'react';

import './App.css';
import countries from './data/countries.json';
import Header from './components/Header';
import Countries from './components/Countries';

const App = () => {
  const [data] = useState(countries);

  return (
    <>
      <Header title="ReactJS pagination using custom hook" />
      <div className="container px2">
        <Countries data={data} itemsPerPage={10} />
        <Countries data={data} itemsPerPage={5} startFrom={25} />
      </div>
    </>
  );
};

export default App;
