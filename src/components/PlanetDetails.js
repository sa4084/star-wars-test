import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const PlanetDetails = ({ planetUrl }) => {
  const [planet, setPlanet] = useState(null);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const response = await axios.get(planetUrl);
        setPlanet(response.data);
        await fetchResidentNames(response.data.residents);
      } catch (error) {
        console.error('Error fetching planet:', error);
      }
    };

    const fetchResidentNames = async (residentUrls) => {
      try {
        const residentPromises = residentUrls.map((residentUrl) => axios.get(residentUrl));
        const residentResponses = await Promise.all(residentPromises);
        const residentNames = residentResponses.map((residentResponse) => residentResponse.data.name);
        setResidents(residentNames);
      } catch (error) {
        console.error('Error fetching resident names:', error);
      }
    };

    fetchPlanet();
  }, [planetUrl]);

  if (!planet) {
    return <div>Loading planet details...</div>;
  }

  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  return (
    <div className="planet-list-container">
      <h2 className="planet-list-heading">{planet.name}</h2>
      <p className="planet-item">Climate: {planet.climate}</p>
      <p className="planet-item">Terrain: {planet.terrain}</p>
      <p className="planet-item">Population: {planet.population}</p>
      <p className="planet-item">Diameter: {planet.diameter}</p>
      <p className="planet-item">Gravity: {planet.gravity}</p>
      <p className="planet-item">Rotation_period: {planet.rotation_period}</p>
      <p className="planet-item">Orbital_period: {planet.orbital_period}</p>
      <p className="planet-item">Surface_water: {planet.surface_water}</p>
      <h3 className="planet-list-heading">Residents:</h3>
      {residents.length > 0 ? (
        <ul>
          {residents.map((resident) => (
            <li className="planet-resident" key={resident}>
              {resident}
            </li>
          ))}
        </ul>
      ) : (
        <p className="planet-item">No residents</p>
      )}
      <Button onClick={handleRefreshButtonClick} variant="contained">
        Back to List
      </Button>
    </div>
  );
};

export default PlanetDetails;
