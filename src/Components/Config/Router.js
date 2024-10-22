import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Home from "../MainFile/Home";
import Header from "../AllFiles/Header/Header";
import Navbar from "../Reusable/Navbar";
import NavbarAdminSide from "../AllFiles/NavbarAdmin/NavbarAdminFile";
import AboutAdmin from "../AllFiles/AboutAdmin/AboutAdmin";
import ExprienceAdmin from "../AllFiles/ExprienceAdmin/ExprienceAdmin";
import CertificateAdmin from "../AllFiles/CertificateAdmin/Certificate";
import WebProtfolio from "../AllFiles/WebProtfolioAdmin/WebProtfolio";
import Graphic from "../AllFiles/GraphicAdmin/GraphicAdmin";
import ContactUS from "../AllFiles/ContactAdmin/ContactUsADMIN";
import Login from "../AllFiles/LoginFolder/Login";
import { useEffect } from "react";





const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/HeaderAdminPanel",
                element: <Header />
            },
            {
                path: "/NavbarAdmin",
                element: <NavbarAdminSide />
            },
            {
                path: "/AboutAdmin",
                element: <AboutAdmin />
            },
            {
                path: "/ExprienceAdmin",
                element: <ExprienceAdmin />
            },
            {
                path: "/CertificateAdmin",
                element: <CertificateAdmin />
            },
            {
                path: "/WebProtfolio",
                element: <WebProtfolio />
            },
            {
                path: "/Garphic",
                element: <Graphic />
            },
            {
                path: "/Contact",
                element: <ContactUS />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    },

]);



function Layout() {

    const { pathname } = window.location
    const token = localStorage.getItem('token')
    const navigation = useNavigate()

    useEffect(() => {
        if (!token) {

            navigation('/login')
        } else {
            if (pathname == "/login") {
                navigation("/")
            }
        }
    }, [token, navigation, pathname])

    return <>
        <Navbar />
        <Outlet />
    </>
}

function Router() {
    return <RouterProvider router={router} />
}
export default Router; 