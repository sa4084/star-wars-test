import React, { useState } from 'react';
import PlanetList from './components/PlanetList';
import PlanetDetails from './components/PlanetDetails';
import { Container } from '@mui/material';

const App = () => {
  const [selectedPlanetUrl, setSelectedPlanetUrl] = useState(null);

  const handlePlanetClick = (planetUrl) => {
    setSelectedPlanetUrl(planetUrl);
  };

  return (
    <Container maxWidth="sm">
      {selectedPlanetUrl ? (
        <PlanetDetails planetUrl={selectedPlanetUrl} />
      ) : (
        <PlanetList onPlanetClick={handlePlanetClick} />
      )}
    </Container>
  );
};


export default App;
