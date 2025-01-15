import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserTie, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        console.log('Sidebar Loaded'); // Esto se ejecutará al montar el componente
    }, []);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <div className="sidebar-divider"></div>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => toggleSection('main')}>
                            <FontAwesomeIcon icon={faHome} /> Main{' '}
                            <span className="arrow">{activeSection === 'main' ? '︿' : '﹀'}</span>
                        </button>
                        <ul className={`submenu ${activeSection === 'main' ? 'open' : ''}`}>
                            <li><Link to="/adminpanel/users">Gestionar Usuarios</Link></li>
                            <li><Link to="/adminpanel/movies">Gestionar Peliculas</Link></li>
                        </ul>
                        <div className="sidebar-divider"></div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;