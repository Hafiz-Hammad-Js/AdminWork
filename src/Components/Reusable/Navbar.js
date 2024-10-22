import React from "react";
import './Navbar.css'
import { useNavigate } from "react-router-dom";




function Navbar() {

    const navigation = useNavigate()

    return <>

        <nav class="navbar fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">My Protfolio Admin Penal</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="offcanvas offcanvas-start side-bar" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title heading" id="offcanvasDarkNavbarLabel">My Protfolio Admin Panel</h5>
                        
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body check">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link" aria-current="page" onClick={() => navigation('/')}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation('/NavbarAdmin')}>Navbar Admin Side</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/HeaderAdminPanel")}>Header</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation('/AboutAdmin')}>About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/ExprienceAdmin")}>Experience</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/CertificateAdmin")}>Certificates</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" href="#">Skills</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/WebProtfolio")}>WEB Protfolio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/Garphic")}>Graphic Protfolio</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/Contact")}>Contact Us</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link " aria-current="page" onClick={() => navigation("/login")}>login</a>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    </>
}

export default Navbar;