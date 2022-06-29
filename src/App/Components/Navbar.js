import React, { useEffect } from "react";
import { Outlet, Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar as Navbarb, NavDropdown } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Redux/Auth";

export default function Navbar() {
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.auth);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout(evt) {
        evt.preventDefault();
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect( () => {
        if (currentUser){
            dispatch(setAuth(currentUser));
        }
    }, [currentUser, dispatch])
    
    return (
        <>
            <div className="Container">
                <Navbarb bg="dark" variant="dark">
                    <Navbarb.Brand> {/* .brand is a container for local uses (add img here)*/}
                        Dota Pushups
                    </Navbarb.Brand>

                    <Nav>
                        <Nav.Link as={Link} to="/"> Home </Nav.Link>
                        <Nav.Link as={Link} to="/leaderboard"> Leaderboards </Nav.Link>
                        {currentUser && authUser.id ? <Nav.Link as={Link} to={`/user/${authUser.id}`}> Profile </Nav.Link> : 
                        currentUser ?
                        <Nav.Link as={Link} to={"/claim"}> Profile </Nav.Link> :
                        <Nav.Link as={Link} to={"/login"}> Profile </Nav.Link>}
                        {currentUser ? <Nav.Link onClick={handleLogout}> Log Out</Nav.Link> :
                        <Nav.Link as={Link} to={"/login"}> Login </Nav.Link>} 
                    </Nav>
                </Navbarb>
            </div>
            <footer className= "bg-dark footerText p-3">
                Dota Push Ups
            </footer>

            <Outlet /> {/*Outlet important to render children*/} 
        </>
    )
}
