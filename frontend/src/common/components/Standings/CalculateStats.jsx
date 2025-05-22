function calculateStats(teams, matches, activeSport) {
  const stats = {};
  teams.forEach(team => {
    stats[Number(team.value)] = {
      ...team,
      played: 0,
      win: 0,
      draw: 0,
      loss: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0,
      sw: 0,
      sl: 0,
      sd: 0,
      pf: 0,
      pa: 0,
      pd: 0,
    };
  });

  matches
    .filter(match => match.status === 'In Progress' || match.status === 'Completed')
    .forEach(match => {
      const { team_a, team_b, score_list } = match;
      if (!team_a || !team_b || !score_list || score_list.length === 0) return;

      const teamAId = Number(team_a.id);
      const teamBId = Number(team_b.id);

      if (
        activeSport === 'Volleyball' ||
        activeSport === 'Badminton Ganda Putra' ||
        activeSport === 'Badminton Ganda Campuran'
      ) {
        let setWinA = 0;
        let setWinB = 0;
        let pfA = 0, pfB = 0;

        score_list.forEach(scoreStr => {
          const [a, b] = scoreStr.split(/[-:]/).map(Number);
          if (isNaN(a) || isNaN(b)) return;
          pfA += a;
          pfB += b;
          if (a > b) {
            setWinA += 1;
            if (stats[teamAId]) stats[teamAId].sw += 1;
            if (stats[teamBId]) stats[teamBId].sl += 1;
          } else if (a < b) {
            setWinB += 1;
            if (stats[teamBId]) stats[teamBId].sw += 1;
            if (stats[teamAId]) stats[teamAId].sl += 1;
          }
        });

        if (stats[teamAId]) {
          stats[teamAId].played += 1;
          stats[teamAId].sd = stats[teamAId].sw - stats[teamAId].sl;
          stats[teamAId].pf += pfA;
          stats[teamAId].pa += pfB;
          stats[teamAId].pd = stats[teamAId].pf - stats[teamAId].pa;
        }
        if (stats[teamBId]) {
          stats[teamBId].played += 1;
          stats[teamBId].sd = stats[teamBId].sw - stats[teamBId].sl;
          stats[teamBId].pf += pfB;
          stats[teamBId].pa += pfA;
          stats[teamBId].pd = stats[teamBId].pf - stats[teamBId].pa;
        }

        // Volleyball: win = 3 pts, draw = 1 pt, loss = 0 pts
        // Badminton: win = 1 pt, draw = 1 pt, loss = 0 pts
        let winPoints = 3;
        if (
          activeSport === 'Badminton Ganda Putra' ||
          activeSport === 'Badminton Ganda Campuran'
        ) {
          winPoints = 1;
        }

        if (setWinA > setWinB) {
          if (stats[teamAId]) {
            stats[teamAId].win += 1;
            stats[teamAId].points += winPoints;
          }
          if (stats[teamBId]) stats[teamBId].loss += 1;
        } else if (setWinA < setWinB) {
          if (stats[teamBId]) {
            stats[teamBId].win += 1;
            stats[teamBId].points += winPoints;
          }
          if (stats[teamAId]) stats[teamAId].loss += 1;
        } else {
          // Draw: both teams get +1 draw and +1 point
          if (stats[teamAId]) {
            stats[teamAId].draw += 1;
            stats[teamAId].points += 1;
          }
          if (stats[teamBId]) {
            stats[teamBId].draw += 1;
            stats[teamBId].points += 1;
          }
        }
      } else if (activeSport === 'Basketball') {
        const [scoreA, scoreB] = score_list[score_list.length - 1]
          .split(/[-:]/)
          .map(Number);

        if (stats[teamAId]) stats[teamAId].played += 1;
        if (stats[teamBId]) stats[teamBId].played += 1;

        if (stats[teamAId]) {
          stats[teamAId].gf += scoreA;
          stats[teamAId].ga += scoreB;
          stats[teamAId].gd = stats[teamAId].gf - stats[teamAId].ga;
          stats[teamAId].pf += scoreA;
          stats[teamAId].pa += scoreB;
          stats[teamAId].pd = stats[teamAId].pf - stats[teamAId].pa;
        }
        if (stats[teamBId]) {
          stats[teamBId].gf += scoreB;
          stats[teamBId].ga += scoreA;
          stats[teamBId].gd = stats[teamBId].gf - stats[teamBId].ga;
          stats[teamBId].pf += scoreB;
          stats[teamBId].pa += scoreA;
          stats[teamBId].pd = stats[teamBId].pf - stats[teamBId].pa;
        }

        if (scoreA > scoreB) {
          if (stats[teamAId]) {
            stats[teamAId].win += 1;
            stats[teamAId].points += 1;
          }
          if (stats[teamBId]) stats[teamBId].loss += 1;
        } else if (scoreA < scoreB) {
          if (stats[teamBId]) {
            stats[teamBId].win += 1;
            stats[teamBId].points += 1;
          }
          if (stats[teamAId]) stats[teamAId].loss += 1;
        }
      } else if (activeSport === 'Futsal') {
        const [scoreA, scoreB] = score_list[score_list.length - 1]
          .split(/[-:]/)
          .map(Number);

        if (stats[teamAId]) stats[teamAId].played += 1;
        if (stats[teamBId]) stats[teamBId].played += 1;

        if (stats[teamAId]) {
          stats[teamAId].gf += scoreA;
          stats[teamAId].ga += scoreB;
          stats[teamAId].gd = stats[teamAId].gf - stats[teamAId].ga;
        }
        if (stats[teamBId]) {
          stats[teamBId].gf += scoreB;
          stats[teamBId].ga += scoreA;
          stats[teamBId].gd = stats[teamBId].gf - stats[teamBId].ga;
        }

        if (scoreA > scoreB) {
          if (stats[teamAId]) {
            stats[teamAId].win += 1;
            stats[teamAId].points += 3;
          }
          if (stats[teamBId]) stats[teamBId].loss += 1;
        } else if (scoreA < scoreB) {
          if (stats[teamBId]) {
            stats[teamBId].win += 1;
            stats[teamBId].points += 3;
          }
          if (stats[teamAId]) stats[teamAId].loss += 1;
        } else {
          if (stats[teamAId]) {
            stats[teamAId].draw += 1;
            stats[teamAId].points += 1;
          }
          if (stats[teamBId]) {
            stats[teamBId].draw += 1;
            stats[teamBId].points += 1;
          }
        }
      }
    });

  return stats;
}

export default calculateStats;