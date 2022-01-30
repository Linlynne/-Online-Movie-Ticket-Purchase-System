import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams, useNavigate } from 'react-router-dom';




function Navbar(props) {

    const navigate = useNavigate();
   

    return (
        <div >
            <header className="p-3 bg-dark text-white">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <Link className="nav-link px-2 text-white" to="/">Home</Link>
                            <Link className="nav-link px-2 text-white" to="/login"></Link>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"
                                onChange={props.handleSearchChange} />
                        </form>

                        <div className="text-end">
                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                {!props.authState.status ? (
                                    <>
                                        <li><Link className="nav-link px-2 text-white" to="/login">Login</Link></li>
                                        <li><Link className="nav-link px-2 text-white" to="/registration">SignUp</Link></li>
                                    </>
                                ) : (
                                    <>
                                        {props.authState.role === 1 ? (
                                            <li>
                                                <div className="dropdown">
                                                    {props.authState.firstName}
                                                    <AccountCircleIcon className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                                                        <li><a className="dropdown-item" onClick={props.logout}>Logout</a></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        ) : (
                                            <li><div className="dropdown">
                                               Hi, {props.authState.firstName}
                                                <AccountCircleIcon className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>
                                                    <li><Link className="dropdown-item" to="/user/orders">Orders</Link></li>
                                                    <li><a className="dropdown-item" onClick={props.logout}>Logout</a></li>
                                                </ul>
                                            </div>
                                            </li>
                                        )}
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}


export default Navbar;
