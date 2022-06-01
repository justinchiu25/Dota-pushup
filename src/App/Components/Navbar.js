import React from "react";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar as Navbarb, NavDropdown } from "react-bootstrap";


export default function Navbar() {

    return (
        <>
            <div className="Container">
                <Navbarb bg="dark" variant="dark">
                    <Navbarb.Brand> {/* .brand is a container for local uses (add img here)*/}
                        Dota Pushups
                    </Navbarb.Brand>

                    <Nav>
                        <Nav.Link href="/"> Home </Nav.Link>
                        <Nav.Link href="/"> Leaderboards </Nav.Link>
                        <Nav.Link href="/"> Profile </Nav.Link>
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
