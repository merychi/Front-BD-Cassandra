import React, { useState } from 'react';
import "../../global.css";

const AdminPelis = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([
        {
            movie_id: 1,
            poster_link: 'link_to_poster1.jpg',
            title: 'Movie 1',
            release_year: 2023,
            runtime: '120 mins',
            genre: 'Action',
            director: 'Director 1',
            overview: 'Overview of Movie 1'
        },
        {
            movie_id: 2,
            poster_link: 'link_to_poster2.jpg',
            title: 'Movie 2',
            release_year: 2022,
            runtime: '90 mins',
            genre: 'Comedy',
            director: 'Director 2',
            overview: 'Overview of Movie 2'
        },
        // Add more movies as needed
    ]);

    const [editData, setEditData] = useState(null);
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

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = movie => {
        setEditData(movie);
    };

    const handleDelete = movie_id => {
        setData(data.filter(item => item.movie_id !== movie_id));
    };

    const handleAddMovie = () => {
        if (newMovie.poster_link && newMovie.title) {
            const newId = data.length ? Math.max(data.map(item => item.movie_id)) + 1 : 1;
            setData([...data, { ...newMovie, movie_id: newId }]);
            setNewMovie({
                poster_link: '',
                title: '',
                release_year: '',
                runtime: '',
                genre: '',
                director: '',
                overview: '',
            });
            setIsAddModalOpen(false);
        } else {
            alert('Por favor, complete todos los campos obligatorios.');
        }
    };

    const closeModal = () => {
        setEditData(null);
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
                            <th className="py-3 px-6 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {filteredData.map(item => (
                            <tr key={item.movie_id}>
                                <td className="py-3 px-6 border-b border-gray-200">{item.movie_id}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.poster_link}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.title}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.release_year}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.runtime}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.genre}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.director}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.overview}</td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn-editar"
                                    >
                                        <i className="fas fa-edit mr-1"></i> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.movie_id)}
                                        className="btn-eliminar"
                                    >
                                        <i className="fas fa-trash-alt mr-1"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPelis;