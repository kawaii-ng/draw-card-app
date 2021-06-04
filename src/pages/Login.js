import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

export default function Login(){

    const [error, setError] = useState();
    const [user, setUser] = useState();
    const [pw, setPW] = useState();
    const [email, setEmail] = useState();
    const history = useHistory();

    const handle_Login = () => {

        setError('');

        Firebase.auth().signInWithEmailAndPassword(email, pw).catch(

            err => {

                setError('Failed to login an account ');

            }

        )

    }

    useEffect(() => {

        Firebase.auth().onAuthStateChanged((user) => {

            if(user){

                setEmail('');
                setPW('');
                setUser(user);
                history.push('/Dashboard');
    
            }else{
    
                setUser('');
    
            }

        })

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
                            
                                <h1 className="text-center">Login</h1>

                                { error && <Alert variant="danger" className="mt-4">{error}</Alert> }

                                <FormGroup className="mt-4">

                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl 
                                        type="email" 
                                        onChange={(e)=>{setEmail(e.target.value)}} 
                                        required />

                                </FormGroup>

                                <FormGroup>

                                    <FormLabel>Password</FormLabel>
                                    <FormControl 
                                        type="password" 
                                        onChange={(e)=>{setPW(e.target.value)}} 
                                        required />
                                    <p><Link to="/forgot-password">Forgot password?</Link></p>

                                </FormGroup>

                                <Button 
                                    className="w-100 mt-1 rounded-3" 
                                    type="submit" 
                                    onClick={handle_Login}>
                                        Login
                                </Button>
                                
                            </Form>

                            <p className="text-center mt-3">Do not have an account? <Link to="/signup">Sign up</Link></p>

                        </Card.Body>
                    </Card>
                </div>

            </Container>

        </>

    )

};
