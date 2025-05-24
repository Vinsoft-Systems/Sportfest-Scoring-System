import { useEffect, useState } from 'react';
import { ApiProvider, useApi } from 'fastapi-rtk';
import { MatchesHeader } from '@/common/components/Matches/MatchesHeader.jsx';

function MatchesContent() {
  const {loading: isLoading, data } = useApi();
  const [matches, setMatches] = useState(null);
  const [organizedMatches, setOrganizedMatches] = useState({});

  useEffect(() => {
    setMatches(data);
    if (data && data.result) {
      const matchesByDate = {};

      data.result.forEach((match, index) => {
        if (!match.id && data.ids) {
          match.id = data.ids[index];
        }

        const matchDate = new Date(match.date).toLocaleDateString();

        if (!matchesByDate[matchDate]) {
          matchesByDate[matchDate] = [];
        }

        matchesByDate[matchDate].push(match);
      });

      setOrganizedMatches(matchesByDate);
    }
    }
  , [data]);

  if (isLoading) return <p>Loading matches...</p>;
  if (!matches) return <p>No match data available</p>;

  const tabs = Object.keys(organizedMatches).map((date) => ({
    value: date,
    label: date,
  }));

  return (
    <>
      <MatchesHeader tabs={tabs} matches={organizedMatches} />
    </>
  );
}

function Matches() {
  return (
    <ApiProvider resource_name="match" initialQueryParams={{page_size:10000}}>
      <MatchesContent />
    </ApiProvider>
  );
}

export default Matches;
