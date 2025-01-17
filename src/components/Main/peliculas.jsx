import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../global.css";

const AdminPelis = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [moviesPerPage] = useState(10);  // 10 películas por página
    const [totalMovies, setTotalMovies] = useState(0);  
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMovie, setNewMovie] = useState({
        poster_link: '',
        series_title: '',
        released_year: 0,
        certificate: '',
        runtime: '',
        genre: '',
        imdb_rating: 0,
        overview: '',
        meta_score: 0,
        director: '',
        star1: '',
        star2: '',
        star3: '',
        star4: '',
        no_votes: 0,
        gross: ' ',
    });

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/movies/');
                console.log("Películas recibidas:", response.data.data);
                if (Array.isArray(response.data.data)) {
                    setMovies(response.data.data);
                    setTotalMovies(response.data.data.length);  
                } else {
                    console.error("Los datos recibidos no están en el formato esperado.");
                    setMovies([]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMovies([]);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.series_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalFilteredMovies = filteredMovies.length;
    const totalPages = Math.ceil(totalFilteredMovies / moviesPerPage);

    const currentMovies = filteredMovies.slice(
        (currentPage - 1) * moviesPerPage,
        currentPage * moviesPerPage
    );


    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue =
            name === 'released_year' || name === 'imdb_rating' || name === 'meta_score' || name === 'no_votes'
                ? (value === '' ? 0 : isNaN(value) ? 0 : Number(value))
                : value;

        setNewMovie(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleAddMovie = async () => {
        if (newMovie.series_title) {
            console.log("Datos a agregar:", newMovie);
            try {
                const response = await axios.post('http://localhost:8080/movies/', newMovie);
                if (response.status === 201) {
                    alert('Película agregada con éxito');
                    setIsAddModalOpen(false);

                    setMovies(prevMovies => [newMovie, ...prevMovies]);
                    setTotalMovies(prevTotal => prevTotal + 1);
                } else {
                    alert('Error al agregar la película');
                }
            } catch (error) {
                console.error("Error al agregar la película:", error);
                alert('Hubo un error al agregar la película');
            }
        } else {
            alert('Por favor, complete todos los campos obligatorios.');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Gestión de Películas</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="custom-button"
                >
                    <i className="fas fa-plus icon-spacing"></i> Agregar Película
                </button>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Filtrar por título"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded py-2 px-4 filtraciones"
                    />
                </div>
            </div>

            {/* Modal de Agregar Película */}
            {isAddModalOpen && (
                <div className="modal-overlay-custom">
                    <div className="custom-card-edit">
                        <h2 className="custom-card-title">Agregar Película</h2>
                        <div className="modal-content">
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {Object.keys(newMovie).map(key => (
                                    <div key={key} className="mb-4">
                                        <label className="custom-label-text">{key.replace('_', ' ')}</label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={newMovie[key]}
                                            onChange={handleChange}
                                            className="custom-input-field"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="custom-flex-card mt-4">
                            <button onClick={handleAddMovie} className="custom-btn-save">
                                Guardar
                            </button>
                            <button onClick={() => setIsAddModalOpen(false)} className="custom-btn-cancel ml-2">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Mostrar lista de peliculas */}
            <div className="containerfixx mx-auto px-4 mt-4">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Poster</th>
                            <th className="py-3 px-6 text-left">Título</th>
                            <th className="py-3 px-6 text-left">Año</th>
                            <th className="py-3 px-6 text-left">Duración</th>
                            <th className="py-3 px-6 text-left">Género</th>
                            <th className="py-3 px-6 text-left">Director</th>
                            <th className="py-3 px-6 text-left">Descripción</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {filteredMovies.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="py-3 px-6 text-center">No se encontraron resultados.</td>
                            </tr>
                        ) : (
                            currentMovies.map(item => (
                                <tr key={item.id}>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.id}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">
                                        <img src={item.poster_link} alt={item.series_title} className="w-16 h-24 object-cover" />
                                    </td>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.series_title}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.released_year}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.runtime}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.genre}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.director}</td>
                                    <td className="py-3 px-6 border-b border-gray-200">{item.overview}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
            {/* Paginado */}
            <div className="mt-4">
                <div className="seguimiento-btn">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="pagination-button"
                    >
                        Anterior
                    </button>
                    <span className="pagination-info">{`Página ${currentPage} de ${totalPages}`}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="pagination-button"
                    >
                        Siguiente
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AdminPelis;
