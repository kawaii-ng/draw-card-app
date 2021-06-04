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

export default function Signup(){

    const [error, setError] = useState();
    const [user, setUser] = useState();
    const [pw, setPW] = useState();
    const [confirm, setConfirm] = useState();
    const [email, setEmail] = useState();

    const history = useHistory();

    const handle_Signup = () => {

        if (confirm !== pw) {

            return setError('Password do not match ');
       
        }else{

            setError('');
            Firebase.auth().createUserWithEmailAndPassword(email, pw).catch(
                err => {

                    setError('Failed to ceate an account ');

                }
            );
        
        }
        
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
                            
                                <h1 className="text-center">Sign Up</h1>
                                { error && <Alert variant="danger"  className="mt-4">{error}</Alert> }

                                <FormGroup className="mt-4">

                                    <FormLabel>Email Address <font color="red">*</font></FormLabel>
                                    <FormControl 
                                        type="email" 
                                        onChange={(e)=>{setEmail(e.target.value)}} 
                                        required />

                                </FormGroup>

                                <FormGroup>

                                    <FormLabel>Password <font color="red">*</font></FormLabel>
                                    <FormControl 
                                        type="password" 
                                        onChange={(e)=>{setPW(e.target.value)}} 
                                        required />

                                </FormGroup>

                                <FormGroup>

                                    <FormLabel>Confrim Password <font color="red">*</font></FormLabel>
                                    <FormControl 
                                        type="password" 
                                        onChange={(e)=>{setConfirm(e.target.value)}} 
                                        required />

                                </FormGroup>

                                <Button 
                                    className="w-100 mt-1 rounded-3" 
                                    type="submit" 
                                    onClick={handle_Signup}>
                                        Sign Up
                                </Button>
                                
                            </Form>

                            <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>

                        </Card.Body>
                    </Card>
                </div>

            </Container>

        </>

    )

};