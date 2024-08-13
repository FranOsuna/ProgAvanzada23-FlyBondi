import React, { useState, useEffect } from 'react';

const Search = () => {
    // Estado para almacenar la lista de vuelos original
    const [vuelos, setVuelos] = useState([]);
    // Estado para almacenar los filtros de búsqueda
    const [filters, setFilters] = useState({
        destination: '',
        origin: '',
        date: '',
        availability: '',
        price: '',
    });
    // Estado para almacenar los resultados filtrados
    const [filteredResults, setFilteredResults] = useState([]);

    // URL de la API
    const api = "https://raw.githubusercontent.com/erneledesma/dev-challenge-flybondi/master/dataset.json";

    // Función para obtener datos de la API
    const getApi = async () => {
        try {
            const data = await fetch(api);

            if (!data.ok) {
                throw new Error(`Error: ${data.status} - ${data.statusText}`);
            }

            const resultado = await data.json();
            // Ordeno por precios
            setVuelos(resultado.sort((a, b) => (a.price > b.price ? 1 : a.price < b.price ? -1 : 0)));
            setFilteredResults(resultado);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            // Puedes agregar lógica para manejar el error, como mostrar un mensaje al usuario.
        }
    }

    // Función para manejar cambios en los campos de entrada
    const handleInputChange = (e, filterKey) => {
        setFilters({
            ...filters,
            [filterKey]: e.target.value,
        });
    }

    const performSearch = () => {
        let results = vuelos;
    
        // Filtra por nombre (destination)
        if (filters.destination) {
            results = results.filter(vuelo =>
                vuelo.destination.toLowerCase().includes(filters.destination.toLowerCase())
            );
        }
    
        // Filtra por origen
        if (filters.origin) {
            results = results.filter(vuelo =>
                vuelo.origin.toLowerCase().includes(filters.origin.toLowerCase())
            );
        }
    
        // Filtra por fecha
        if (filters.date) {
            results = results.filter(vuelo =>
                vuelo.data.includes(filters.date)
            );
        }
    
        // Filtra por disponibilidad
        if (filters.availability) {
            results = results.filter(vuelo =>
                vuelo.availability.toString().includes(filters.availability)
            );
        }
    
        // Filtra por precio
        if (filters.price) {
            results = results.filter(vuelo =>
                parseFloat(vuelo.price) <= parseFloat(filters.price)
            );
        }
    
        setFilteredResults(results);
    };
    
    

    // Efecto secundario para cargar datos de la API al montar el componente
    useEffect(() => {
        getApi();
    }, []);

    // Renderización del componente de búsqueda
    return (
        <React.Fragment>
            {/* Campos de entrada para los filtros */}
            <input
                value={filters.destination}
                onChange={(e) => handleInputChange(e, 'destination')}
                type="text"
                placeholder='Destino'
                className='form-control'
            />
            <input
                value={filters.origin}
                onChange={(e) => handleInputChange(e, 'origin')}
                type="text"
                placeholder='Origen'
                className='form-control'
            />
            <input
                value={filters.date}
                onChange={(e) => handleInputChange(e, 'date')}
                type="text"
                placeholder='Fecha'
                className='form-control'
            />
            <input
                value={filters.availability}
                onChange={(e) => handleInputChange(e, 'availability')}
                type="text"
                placeholder='Disponibilidad'
                className='form-control'
            />
            <input
                value={filters.price}
                onChange={(e) => handleInputChange(e, 'price')}
                type="text"
                placeholder='Precio'
                className='form-control'
            />

            {/* Botón para realizar la búsqueda */}
            <button onClick={performSearch}>Buscar</button>

            {/* Contenedor de resultados */}
            <div className='resultContainer'>
                {filteredResults.map((vuelo) => (
                    // Caja de resultados para cada vuelo
                    <div className='resultBox' key={vuelo.id}>
                        <p><strong>Fecha:</strong> {vuelo.data}</p>
                        <p><strong>Origen:</strong> {vuelo.origin}</p>
                        <p><strong>Destino:</strong> {vuelo.destination}</p>
                        <p><strong>Precio:</strong> {vuelo.price}</p>
                        <p><strong>Disponibilidad:</strong> {vuelo.availability}</p>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default Search;
