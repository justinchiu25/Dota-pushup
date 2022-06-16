import React from "react";
import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar as Navbarb, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Navbar() {
    const user = useSelector((state) => (state.user)); //Should be just an ID obtained at start from Login
    return (
        <>
            <div className="Container">
                <Navbarb bg="dark" variant="dark">
                    <Navbarb.Brand> {/* .brand is a container for local uses (add img here)*/}
                        Dota Pushups
                    </Navbarb.Brand>

                    <Nav>
                        <Nav.Link as={Link} to="/"> Home </Nav.Link>
                        <Nav.Link href="/"> Leaderboards </Nav.Link>
                        <Nav.Link as={Link} to={`/user/80476528`}> Profile </Nav.Link>
                        <NavDropdown title="Settings">
                            <NavDropdown.Item href="/"> Edit Profile </NavDropdown.Item>
                            <NavDropdown.Item href="/"> Log Out </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbarb>
            </div>

            <Outlet /> {/*Outlet important to render children*/} 
        </>
    )
}
