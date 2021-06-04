import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar, Button, Form } from 'react-bootstrap';
import Firebase from '../components/Firebase';

export default function NavBar() {
    
    const history = useHistory();

    const handle_Logout = () => {

        Firebase.auth().signOut();
        history.push("/login");
        
    }

    return (

        <>

            <Navbar 
                className="d-flex align-items-center"
                style={{background: "#333652"}}
                collapseOnSelect expand="lg">
                
                    <Navbar.Brand 
                        className="py-3" 
                        style={{
                            float: "left", 
                            color: "white", 
                            paddingLeft: "15%"}}>
                                Welcome to <strong>Draw Card APP</strong>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"/>
                    <Nav style={{paddingRight: "15%"}}>
                        
                        <Nav.Link 
                            as={Link} to="/record"
                            className="py-3" 
                            style={{color: "white"}}>
                            Check My Record
                        </Nav.Link>

                        <Nav.Link>
                            
                            <Button
                                type="submit" 
                                onClick={handle_Logout}>
                                    Logout
                            </Button>

                        </Nav.Link>

                    </Nav>
                
                </Navbar.Collapse>

            </Navbar>

        </>

    );

}