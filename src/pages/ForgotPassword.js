import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Container, 
    Card, 
    Form, 
    Button, 
    FormLabel, 
    FormControl, 
    FormGroup, 
    Alert } from 'react-bootstrap';
import Firebase from '../components/Firebase';

export default function ForgotPassword(){

    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    const handle_Login = () => {

        setError('');
        setMsg('');

        Firebase.auth().sendPasswordResetEmail(email).catch(

            err => {

                setError('Failed to reset password ');

            }

        )

        if(!error){

            setMsg('Please check your email to reset password');
        
        }

    }

    useEffect(() => {
        

    }, [])

    return(
        
        <>
            <Container>

                <div className="w-100 d-flex align-items-center justify-content-center"
                style={{minHeight: "100vh"}}>
                    <Card className="h-100 rounded-3"
                    style={{width: "400px", boxShadow: "0px 25px 20px #777"}}>
                        <Card.Body className="my-4 px-5"> 

                            <Form>
                            
                                <h1 className="text-center">Reset Password</h1>

                                { error && <Alert variant="danger" className="mt-4">{error}</Alert> }
                                { msg && <Alert variant="success" className="mt-4">{msg}</Alert> }

                                <FormGroup className="mt-4">

                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl 
                                        type="email" 
                                        onChange={(e)=>{setEmail(e.target.value)}} 
                                        required />

                                </FormGroup>

                                <Button 
                                    className="w-100 mt-1 rounded-3" 
                                    type="submit" 
                                    onClick={handle_Login}>
                                        Reset
                                </Button>
                                
                            </Form>

                            <p className="text-center mt-3"><Link to="/login">Back</Link></p>

                        </Card.Body>
                    </Card>
                </div>

            </Container>

        </>

    )

};