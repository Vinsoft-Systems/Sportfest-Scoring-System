import React from 'react';

export default function StandingsTableRow({
  team,
  teamStats,
  index,
  rowClass,
  hoveredRow,
  setHoveredRow,
  activeSport,
}) {
  const rowKey = team.id || team.value || team.label;
  return (
    <tr
      key={rowKey}
      className={rowClass}
      onMouseEnter={() => setHoveredRow(rowKey)}
      onMouseLeave={() => setHoveredRow(null)}
    >
      <td className="td">{index + 1}</td>
      <td className="td">{team.label}</td>
      {activeSport === 'Futsal' && (
        <>
          <td className="td">{teamStats.played || 0}</td>
          <td className="td">{teamStats.win || 0}</td>
          <td className="td">{teamStats.draw || 0}</td>
          <td className="td">{teamStats.loss || 0}</td>
          <td className="td">{teamStats.ga || 0}</td>
          <td className="td">{teamStats.gf || 0}</td>
          <td className="td">{teamStats.gd || 0}</td>
          <td className="td">{teamStats.points || 0}</td>
        </>
      )}
      {activeSport === 'Voli' && (
        <>
          <td className="td">{teamStats.played || 0}</td>
          <td className="td">{teamStats.win || 0}</td>
          <td className="td">{teamStats.draw || 0}</td>
          <td className="td">{teamStats.loss || 0}</td>
          <td className="td">{teamStats.sw || 0}</td>
          <td className="td">{teamStats.sl || 0}</td>
          <td className="td">{teamStats.sd || 0}</td>
          <td className="td">{teamStats.pf || 0}</td>
          <td className="td">{teamStats.pa || 0}</td>
          <td className="td">{teamStats.pd || 0}</td>
          <td className="td">{teamStats.points || 0}</td>
        </>
      )}
      {activeSport === 'Basket' && (
        <>
          <td className="td">{teamStats.played || 0}</td>
          <td className="td">{teamStats.win || 0}</td>
          <td className="td">{teamStats.loss || 0}</td>
          <td className="td">{teamStats.pf || 0}</td>
          <td className="td">{teamStats.pa || 0}</td>
          <td className="td">{teamStats.pd || 0}</td>
          <td className="td">{teamStats.points || 0}</td>
        </>
      )}
      {(activeSport === 'Badminton Ganda Putra' || activeSport === 'Badminton Ganda Campuran') && (
        <>
          <td className="td">{teamStats.played || 0}</td>
          <td className="td">{teamStats.win || 0}</td>
          <td className="td">{teamStats.draw || 0}</td>
          <td className="td">{teamStats.loss || 0}</td>
          <td className="td">{teamStats.sw || 0}</td>
          <td className="td">{teamStats.sl || 0}</td>
          <td className="td">{teamStats.sd || 0}</td>
          <td className="td">{teamStats.pf || 0}</td>
          <td className="td">{teamStats.pa || 0}</td>
          <td className="td">{teamStats.pd || 0}</td>
          <td className="td">{teamStats.points || 0}</td>
        </>
      )}
    </tr>
  );
}