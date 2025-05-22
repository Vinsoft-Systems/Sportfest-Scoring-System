import { useEffect, useState } from 'react';
import { ApiProvider, useApi } from 'fastapi-rtk';
import './KnockoutTable.css';
import { JsonInput } from '@mantine/core';

const COLUMNS = {
  Futsal: [],
  Voli: [],
  Basket: [],
  'Badminton Ganda Putra': [],
  'Badminton Ganda Campuran': [],
};

function KnockoutCard({ sportBranch = 'Futsal' }) {
  const [activeSport, setActiveSport] = useState(sportBranch);
  const {data, setQueryParams, loading} = useApi();

  useEffect(() => {
    setQueryParams({ filters: [{col: "competition", opr: "rel_o_m", value: "1"}, {col: "sport_branch", opr: "eq", value: activeSport}]});
  }, [activeSport]);

  const sportBranches = Object.keys(COLUMNS);

  return (
    <div className="container">
      <h1 className="header">Sports Competition Knockout</h1>
      <div className="sportSelector">
        {sportBranches.map((sport) => (
          <button
            key={sport}
            className={activeSport === sport ? "activeButton" : "button"}
            onClick={() => setActiveSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>
      <div className="standingsContainer">
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>
          {activeSport} Knockout
        </h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>Loading...</div>
        ) : <JsonInput autosize value={JSON.stringify(data, null, 2)}  /> }
      </div>
    </div>
  );
}

function Knockout() {
  return (
    <ApiProvider resource_name="bracket">
      <KnockoutCard />
    </ApiProvider>
  );
}

export default Knockout;