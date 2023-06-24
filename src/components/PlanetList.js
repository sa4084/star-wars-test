import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import '../../src/styles.css'; 

const planetListCache = {};

const PlanetList = ({ onPlanetClick }) => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        let planetListData = getCachedPlanetListData(page);
        if (!planetListData) {
          const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
          planetListData = {
            results: response.data.results,
            count: response.data.count,
          };
          cachePlanetListData(page, planetListData);
        }
        setPlanets(planetListData.results);
        setCount(Math.ceil(planetListData.count / 10));
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, [page]);

  if (!planets) {
    return <div>Loading Planet List...</div>;
  }

  return (
    <div className="planet-list-container">
      <h2 className="planet-list-heading">Star Wars Planets </h2>
      <ul className="planet-list">
        {planets.map((planet) => (
          <li
            key={planet.name}
            onClick={() => onPlanetClick(planet.url)}
            className="planet-item"
          >
            <strong>{planet.name}</strong>
          </li>
        ))}
      </ul>
      <div className='pages'>
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        color='primary'
        />
    </div>
    </div>
  );
};

export default PlanetList;

const getCachedPlanetListData = (page) => {
  return planetListCache[page];
};

const cachePlanetListData = (page, data) => {
  planetListCache[page] = data;
};
