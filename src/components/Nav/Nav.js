import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'


const Nav = () => {
    return (
        <nav className="nav">
            <h3 className="nav__logo">Logo</h3>
            <ul className="nav__list">
                <Link to="/">Main</Link>
                <Link to="/cart">Cart</Link>
            </ul>
        </nav>
    )
}

export default Nav;