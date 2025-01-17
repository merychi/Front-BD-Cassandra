import "../../global.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsuarios = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [usersPerPage] = useState(10);  // 10 usuarios por página
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        const ObtenerUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users/');
                console.log("Usuarios recibidos:", response.data.data);
                if (Array.isArray(response.data.data)) {
                    setUsers(response.data.data);
                    setTotalUsers(response.data.data.length);
                } else {
                    console.error("Los datos recibidos no están en el formato esperado.");
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error fetching Users:", error);
                setUsers([]);
            }
        };

        ObtenerUsuarios(); 
    }, []);

    const filteredUsuarios = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsuarios.length / usersPerPage);

    const currentUsers = filteredUsuarios.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handleDelete = async (id) => {
        {/*const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`http://localhost:8080/users/${id}`);
            if (response.status === 200) {
                setUsers(users.filter(item => item.user_id !== id));  
                alert("Usuario eliminado con éxito.");
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            alert("Hubo un error al eliminar el usuario.");
        }*/}
    };
    

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">Gestión de usuarios</h1>
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded py-2 px-4 filtraciones"
                />
            </div>

            <div className="containerfixx mx-auto px-4 mt-4">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>  
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Correo</th>
                            <th className="py-3 px-6 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {currentUsers.map(item => (
                            <tr key={item.user_id}>
                                <td className="py-3 px-6 border-b border-gray-200">{item.user_id}</td> 
                                <td className="py-3 px-6 border-b border-gray-200">{item.name}</td>
                                <td className="py-3 px-6 border-b border-gray-200">{item.email}</td>
                                <td className="py-3 px-6 text-center border-b border-gray-200">
                                    <button
                                        onClick={() => handleDelete(item.user_id)} 
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

            {/* Paginación */}
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

export default AdminUsuarios;
