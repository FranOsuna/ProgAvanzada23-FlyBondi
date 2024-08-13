import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

// Creación del contexto FlyContext
const FlyContext = createContext();

// Componente proveedor del contexto FlyProvider
const FlyProvider = ({ children }) => {
    // Estados para la categoría, datos de vuelo, página actual y total de vuelos
    const [categoria, setCategoria] = useState('general');
    const [fly, setFly] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalFly, setTotalFly] = useState(0);

    // Efecto secundario para cargar datos de vuelo al cambiar la categoría
    useEffect(() => {
        const consultarApi = async () => {
            try {
                // URL de la API
                const url = 'https://raw.githubusercontent.com/erneledesma/dev-challenge-flybondi/master/dataset.json';
                // Petición GET con axios
                const { data } = await axios.get(url);

                // Actualización de estados con los datos de la API
                setFly(data.articles);
                setTotalFly(data.totalResults);
                setPagina(1);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        // Llamada a la función para cargar datos al cambiar la categoría
        consultarApi();
    }, [categoria]);

    // Función para cambiar la categoría seleccionada
    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value);
    };

    // Función para cambiar la página actual
    const handleChangePagina = (e, valor) => {
        setPagina(valor);
    };

    // Proveedor de contexto que expone estados y funciones necesarios
    return (
        <FlyContext.Provider
            value={{
                categoria,
                fly,
                totalFly,
                pagina,
                handleChangeCategoria,
                handleChangePagina
            }}
        >
            {children}
        </FlyContext.Provider>
    );
};

// Exportación del proveedor y del contexto
export { FlyProvider, FlyContext };
