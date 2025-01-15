import React, { useState } from 'react';
import "../../global.css";

const AdminUsuarios = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([
        { id: 1, nombre: 'xxadreww', correo: 'xxadreww@gmail.com' },
        { id: 2, nombre: 'moritamar', correo: 'moritamar@gmail.com' },
        { id: 3, nombre: 'vicotico', correo: 'vicotico@gmail.com' },
        { id: 4, nombre: 'rubenito', correo: 'rubenito@gmail.com' },
        { id: 5, nombre: 'merrychi', correo: 'merrychi@gmail.com' },
    ]);
    const [editData, setEditData] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newDocente, setNewUser] = useState({
        nombre: '',
        correo: '',
    });

    const filteredData = data.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = docente => {
        setEditData(docente);
    };

    const handleSaveEdit = () => {
        setData(data.map(item => (item.id === editData.id ? editData : item)));
        setEditData(null);
    };

    const handleDelete = id => {
        setData(data.filter(item => item.id !== id));
    };

    const handleAddUser = () => {
        if (newDocente.nombre && newDocente.correo) {
            setData([...data, { id: Date.now(), ...newDocente }]);
            setNewUser({ nombre: '', correo: '' });
            setIsAddModalOpen(false);
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    const closeModal = () => {
        setEditData(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Gestión de usuarios</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="custom-button"
                >
                    <i className="fas fa-plus icon-spacing"></i> Agregar Usuario
                </button>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 filtraciones"
                />
            </div>

            {editData && (
                <div className="modal-overlay-custom">
                    <div className="custom-card-edit">
                        <h2 className="custom-card-title">Editar Usuario</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="mb-4">
                                <label className="custom-label-text">Nombre</label>
                                <input
                                    type="text"
                                    value={editData.nombre}
                                    onChange={e => setEditData({ ...editData, nombre: e.target.value })}
                                    className="custom-input-field"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="custom-label-text">Correo</label>
                                <input
                                    type="text"
                                    value={editData.correo}
                                    onChange={e => setEditData({ ...editData, correo: e.target.value })}
                                    className="custom-input-field"
                                />
                            </div>
                        </div>
                        <div className="custom-flex-card mt-4">
                            <button onClick={handleSaveEdit} className="custom-btn-save">
                                Guardar
                            </button>
                            <button onClick={closeModal} className="custom-btn-cancel ml-2">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="modal-overlay-custom">
                    <div className="custom-card-edit">
                        <h2 className="custom-card-title">Agregar Usuario</h2>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="mb-4">
                                <label className="custom-label-text">Nombre</label>
                                <input
                                    type="text"
                                    value={newDocente.nombre}
                                    onChange={e => setNewUser({ ...newDocente, nombre: e.target.value })}
                                    className="custom-input-field"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="custom-label-text">Correo</label>
                                <input
                                    type="text"
                                    value={newDocente.correo}
                                    onChange={e => setNewUser({ ...newDocente, correo: e.target.value })}
                                    className="custom-input-field"
                                />
                            </div>
                        </div>
                        <div className="custom-flex-card mt-4">
                            <button onClick={handleAddUser} className="custom-btn-save">
                                Guardar
                            </button>
                            <button onClick={() => setIsAddModalOpen(false)} className="custom-btn-cancel ml-2">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-4 mt-4">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Correo</th>
                            <th className="py-3 px-6 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {filteredData.map(item => (
                            <tr key={item.id}>
                                <td className="py-3 px-6 border-b border-gray-200">{item.nombre}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.correo}</td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn-editar"
                                    >
                                        <i className="fas fa-edit mr-1"></i> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
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

export default AdminUsuarios;
