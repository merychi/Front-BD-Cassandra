import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../global.css";

const AdminPelis = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMovie, setNewMovie] = useState({
        poster_link: '',
        title: '',
        release_year: '',
        runtime: '',
        genre: '',
        director: '',
        overview: '',
    });

    const filteredData = (data || []).filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/movies/');
                console.log("Respuesta completa:", response);
                
                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    console.error("No se encontraron películas en la respuesta.");
                    setData([]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setData([]);
            }
        };
        
        fetchMovies();
    }, []);



    const handleAddMovie = () => {
        if (newMovie.poster_link && newMovie.title) {
            // Aquí debes agregar la lógica para agregar la película en el backend, si lo deseas
            alert('Película agregada');
            setIsAddModalOpen(false);
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
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {Object.keys(newMovie).map(key => (
                                <div key={key} className="mb-4">
                                    <label className="custom-label-text">{key.replace('_', ' ')}</label>
                                    <input
                                        type="text"
                                        value={newMovie[key]}
                                        onChange={e => setNewMovie({ ...newMovie, [key]: e.target.value })}
                                        className="custom-input-field"
                                    />
                                </div>
                            ))}
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
                        {(filteredData.length > 0 ? filteredData : []).map(item => (
                            <tr key={item.id}>
                                <td className="py-3 px-6 border-b border-gray-200">{item.id}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.poster_link}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.title}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.release_year}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.runtime}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.genre}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.director}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.overview}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AdminPelis;
