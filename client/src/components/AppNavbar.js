import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class AppNavbar extends Component {
    render() {
        return (
            <Navbar bg="light" sticky="top" expand="lg">
                <Navbar.Brand href="/">FlightAware FIDS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/flightinfo/random">Random Flight</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
