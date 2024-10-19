import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Link to="/aptos">Connect to M1</Link>
      <Link to="/sui">Connect to M2</Link>
      <Link to="/mevm">Connect to MEVM</Link>
    </>
  );
};

export default Home;
