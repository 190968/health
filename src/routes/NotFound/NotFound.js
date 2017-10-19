import React from 'react';
import { Link } from 'react-router-dom';


export const NotFound = () => (
    <div className='not-found'>
        <div className='not-found__content'>
            <div className='not-found__text'>404 page not found</div>
            <br />
            <Link to='/' className='button _big not-found__link'>На главную</Link>
        </div>
    </div>
);

export default NotFound;