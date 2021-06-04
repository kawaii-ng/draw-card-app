import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    Container, 
    Card, 
    Button
} from 'react-bootstrap';
import Firebase from '../components/Firebase';
import NavBar from '../components/NavBar';
import './style.css';

export default function Dashboard(){

    const user = Firebase.auth().currentUser;
    const [start, setStart] = useState(false);
    const [drew, setDrew] = useState(false);
    const [no, setNo] = useState();
    const [content, setContent] = useState();

    const random_No = () => {

        return Math.floor(Math.random() * 12 + 1);

    }

    const handle_draw = (userEmail) => {

        setNo('');
        setContent('');
        const getNum = random_No();
        Firebase.firestore().collection('CARD').where('ID', '==', getNum).onSnapshot((snapshot) => {

            snapshot.docs.forEach((doc)=>{

                setNo(doc.data().ID);
                setContent(doc.data().CONTENT);          
                
                {/* add record automatically */}
                Firebase.firestore().collection('USER').add({
            
                    EMAIL: String(user.email),
                    NUM: Number(doc.data().ID),
                    TEXT: String(doc.data().CONTENT)
                    
                })
        

            })

        })

        setDrew(true);

    }

    const handle_start = () => {

        setStart(true);
        handle_draw();
        
    }

    useEffect(()=>{

        if(drew){

            setDrew(false);

        }

    })

    return(
        
        <>

            <NavBar/>

            <Container>

                <div className="w-100 d-flex align-items-center justify-content-center"
                    style={{minHeight: "100vh"}}>

                    { !start && <Button onClick={handle_start}>Draw Your Card</Button>}

                    { start &&
                    
                    <Container className="d-flex align-items-center justify-content-center">
                        
                        <Card className="h-100 rounded-3"
                        style={{width: "400px", boxShadow: "0px 15px 25px #AAA"}}>
                            <Card.Body className="my-4 px-5"> 

                                <Card.Title>Card No. {no}</Card.Title>

                                <Card.Text>天父的信：</Card.Text>

                                <Card.Text>{content}</Card.Text>

                                <Button className="mt-5"  onClick={handle_draw}>Draw Again</Button>

                            </Card.Body>
                        </Card>
                        
                    </Container>
                    
                    }

                </div>

            </Container>

        </>

    )

};