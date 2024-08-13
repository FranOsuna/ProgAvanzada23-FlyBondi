// Importación de componentes y estilos
import { Container, Grid, Typography } from '@mui/material';
import './App.css';
import Search from './components/Search';
import { FlyProvider } from './context/FlyProvider';

function App() {
  return (
    // Proveedor del contexto de vuelo
    <FlyProvider>
      {/* Contenedor principal */}
      <Container className='container'>
        {/* Encabezado */}
        <header>
          <Typography align='center' marginY={5} component="h1" variant='h3'>
            Buscador de vuelos
          </Typography>
        </header>

        {/* Cuadrícula */}
        <Grid>
          {/* Elemento de cuadrícula para la imagen y la búsqueda */}
          <Grid item xs={10} md={6} lg={4}>
            {/* Imagen del logotipo de FlyBondi */}
            <img className='flight-image' src="https://camo.githubusercontent.com/87c0241be85ca2be42708cc329284aead15b9844a06450a4e4f333ea8c55abbb/68747470733a2f2f666c79626f6e64692e636f6d2f6173736574732f696d616765732f6c6f676f2e737667" alt="FlyBondi Logo" />
            {/* Componente de búsqueda */}
            <Search />
          </Grid>
        </Grid>
      </Container>
    </FlyProvider>
  );
}

export default App;

