import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    Container, 
    Card, 
    Button,
    Row,
    Col
} from 'react-bootstrap';
import Firebase from '../components/Firebase';
import NavBar from '../components/NavBar';

export default function Record(){

    const user = Firebase.auth().currentUser.email;
    const [items, setItems] = useState([]);
    const [no, setNo] = useState();
    const [content, setContent] = useState();

    const get_items = () => {

        Firebase.firestore().collection('USER').where('EMAIL', '==', String(user)).onSnapshot((snapshot) => {

            const newItems = snapshot.docs.map((doc)=>({

                t: doc.data().TEXT,
                n: doc.data().NUM

            }))

            setItems(newItems)

        })

    }

    useEffect( () => {

        get_items();

    }, [])

    return(
        
        <>

            <NavBar/>

            <Container className="w-100 mt-5 d-flex align-items-center justify-content-center"
            style={{}}>
                <Row>
                    <Link to="/dashboard">
                        <Button>Back</Button>
                    </Link>
                </Row>
            </Container>
            <Container className="w-100 mt-5 mb-5 d-flex align-items-center justify-content-center"
            style={{}}>
                <Row>
                    <div>
                        <Card className="mx-5 my-1">
                            <Card.Body>
                                <Row>

                                    <Col style={{maxWidth:"10%"}}><Card.Title>Card</Card.Title></Col>
                                    <Col><Card.Title>Content</Card.Title></Col>

                                </Row>
                            </Card.Body>
                        </Card>
                        {
                            
                            items.map(i=>
                                <Card className="mx-5 my-1">
                                    <Card.Body>
                                        <Row>
                                            <Col style={{maxWidth:"10%"}}><Card.Text>{i.n}</Card.Text></Col>
                                            <Col><Card.Text>{i.t}</Card.Text></Col>
                                        </Row>
                                    </Card.Body>
                                </Card>)
                            
                        }
                    </div>
                </Row>

            </Container>


        </>

    )

};