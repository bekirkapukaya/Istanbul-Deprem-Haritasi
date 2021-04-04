import React from 'react';
import { Container, Row } from 'reactstrap';
import Header from './Header';
import Map from './Map';

const App = () => {
  return (
    <>
      <Container fluid >
        <Row>
          <Header />
        </Row>
        <Row>
          <Map />
        </Row>
      </Container>
    </>
  );
};

export default App;
