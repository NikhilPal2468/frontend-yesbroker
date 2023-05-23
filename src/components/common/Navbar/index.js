import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { Button } from 'react-bootstrap'
const Navbar = ({ setShowLogin, setShowRegister }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className={styles.navbar_left}>
                    <img src='/images/logo.png' alt='logo' />
                    <Link to={`/home`} className="navbar-brand" >YesBroker</Link>
                </div>
                <div className={styles.navbar_right}>
                    <Button onClick={() => { setShowLogin(true) }} className='m-2'>Log in</Button>
                    <Button onClick={() => { setShowRegister(true) }} >Sign up</Button>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>

    )
}

export default Navbar