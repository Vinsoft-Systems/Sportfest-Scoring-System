import { Bracket } from 'react-brackets';
// FORMAT ROUNDS LIST:
// const rounds = [
//   {
//     title: 'Round one',
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [{ name: 'Team A' }, { name: 'Team B' }],
//       },
//       {
//         id: 2,
//         date: new Date().toDateString(),
//         teams: [{ name: 'Team C' }, { name: 'Team D' }],
//       },
//     ],
//   },
//   {
//     title: 'Round one',
//     seeds: [
//       {
//         id: 3,
//         date: new Date().toDateString(),
//         teams: [{ name: 'Team A' }, { name: 'Team C' }],
//       },
//     ],
//   },
// ];

const BracketComponent = (rounds) => {
  return <Bracket rounds={rounds} />;
};

export default BracketComponent;