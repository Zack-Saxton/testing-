import React from 'react';
import { Grid, Container } from '@material-ui/core';
const Home = () => {
  return (
    <div>
      <main>
      <Grid container spacing={2}  justify="center" mt={20} style={{ paddingTop: 100 }}>
        
        <Grid item xs={5} mt={10}>
          <Container maxWidth="md">
            <h2> Successfully Signed In </h2>
            <h2> Page Under Construction </h2>
          </Container>
        </Grid>
      </Grid>
     </main>
    </div>
  );
};

export default Home;
