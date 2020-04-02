import React from 'react';

import './app-header.css';


const AppHeader = ({liked,allPosts}) => { // сюда приходят props - и мы их сразу деструктурируем
    return (
        <div className = 'app-header d-flex'> 
            <h1>Denis Ustimenko</h1>
    <h2> {allPosts} записей, из них понравилось {liked}</h2> 
        </div>
    );
}

export default AppHeader;