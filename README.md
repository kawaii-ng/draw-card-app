# Draw Card App - v2.0
###### Side Project | Web | 04 Jun 2021
It is a tool for obtaining the words of god via online. 

New Feature(s): 
1. interface design
2. login system
3. record page

###### Link: https://kawaii-ng.github.io/draw-card-app/

## Content 
<ol>
  <li><a href="#overview">Overview</a></li>
  <li><a href="#usage">Usage(s)</a></li>
  <li><a href="#what">What I Have Learnt</a></li>
  <li><a href="#problem">Problem(s) Faced</a></li>
</ol>

<a id="overview" />

## Overview
### Objective(s)
- to draw a card randomly in everytime

### Function(s)
1. Allow visitors register an account with email
2. Allow visitors login into the account 
3. Allow visitors to draw a card randomly
4. Allow visitors to check the record of drawing card

### Technical Skill(s)
- React.js
- Javascript
- HTML
- CSS
- Bootstrap
- Firebase 

### Dev Tool(s)
Visual Studio Code

### Credit(s)
- 天父的信：https://www.facebook.com/%E5%A4%A9%E7%88%B6%E7%9A%84%E4%BF%A1-302669759886371/

<a id="usage" />

## Usage(s)
1. Click "Sign Up" button to register an account in Sign Up Page 
<img src="https://user-images.githubusercontent.com/55972286/121675393-ec8e4380-cae5-11eb-8b6a-4dabe70cb0ea.PNG" width="80%">


2. If the password is not matched wiht confirmed password or some field are blank, it will shows error message
<img src="https://user-images.githubusercontent.com/55972286/121675606-337c3900-cae6-11eb-9479-bd8d7466ac4d.PNG" width="80%">

3. If the password or email is wrong, it will show the error message. Please m
ake sure the email and password is right when logging in. 
<img src="https://user-images.githubusercontent.com/55972286/121675801-73dbb700-cae6-11eb-8791-3b1231c3ed96.PNG" width="80%">

4. If you forgot your password, please click "Forgot password?". It will direct you to the page of resetting password. After entering an email, a email will be sent automatically to you to reset the password. 
<img src="https://user-images.githubusercontent.com/55972286/121675932-a2f22880-cae6-11eb-91d1-b4f13c13e02b.PNG" width="80%">
<a id="what" />

5. When you login sucessfully, you can click "Draw Your Card" button to draw your card. 
<img src="https://user-images.githubusercontent.com/55972286/121676261-01b7a200-cae7-11eb-8bb2-be6c258f3a98.gif" width="80%">

6. Click "Draw Again" button to draw the card again. 
<img src="https://user-images.githubusercontent.com/55972286/121676576-5e1ac180-cae7-11eb-8580-2c7e716e4ee8.gif" width="80%">

7. Click "Check My Record" to check your record of drawing card. 
<img src="https://user-images.githubusercontent.com/55972286/121676663-77237280-cae7-11eb-99f5-426a4441c7b8.PNG" width="80%">

8. Click "Logout" button to logout

## What I Have Learnt?
### Firebase
First, I have learnt how to connect firebase. To connect with firebase, it should be create `Firebase.js` and store the value of configuration. 
```React.js
import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCET7EfYB-j-ueF6ha8Y8_1yzMf1AymEnE",
    authDomain: "draw-card-project.firebaseapp.com",
    projectId: "draw-card-project",
    storageBucket: "draw-card-project.appspot.com",
    messagingSenderId: "305803372926",
    appId: "1:305803372926:web:6dcb37eabfbfd16f1feb2f"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
```

#### Authentication
##### Sign Up
To sign up, it should pass the value of `email` and `pw` into the sign up function, which is `.auth().createUserWithEmailAndPassword()`.

```React.js
Firebase.auth().createUserWithEmailAndPassword(email, pw).catch(
    err => {

        setError('Failed to ceate an account ');

    }
);
```

##### Login
To login, it is similar to the procedures of sign up, but `.auth().signInWithEmailAndPassword()` is used at this time. 

```React.js
Firebase.auth().signInWithEmailAndPassword(email, pw).catch(

    err => {

        setError('Failed to login an account ');

    }

)
```

##### Logout
To logout, it is just simply add the code below. 
```React.js
Firebase.auth().signOut();
```

##### Reset Password
To reset password, it needs to pass the value of `email` and `.auth().sendPasswordResetEmail()` is used at this time.

```React.js
Firebase.auth().sendPasswordResetEmail(email).catch(

    err => {

        setError('Failed to reset password ');

    }

)
```

##### Check Login
To check whether the user is login, `.auth().onAuthStateChanged()` is to detect that kinds of things. 

```React.js
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
```

##### Current User Email
To obtain the email of current user, `.auth().currentUser` is used. 

```React.js
const user = Firebase.auth().currentUser;
```

#### Firestore
##### Query 
To obtain the certain card with certain ID, `.firestore().collection('your_collection_name').where('value 1', 'operator', 'value 2')` is used. Then, `.onSnapshot()` is to obtain the document. 

Next, after drawing card, it should be record the card content and card number. Hence, `.firestore().collection('your_collection_name').add()` is used. 

```React.js
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
```

### .map()
To map the items from firestore, `newItems` is the variable to store the data temporarily. After obtaining all the data, `setItems()` is to store the data. 

```React.js
    const user = Firebase.auth().currentUser.email;
    const [items, setItems] = useState([]);

    const get_items = () => {

        Firebase.firestore().collection('USER').where('EMAIL', '==', String(user)).onSnapshot((snapshot) => {

    const newItems = snapshot.docs.map((doc)=>({

        t: doc.data().TEXT,
        n: doc.data().NUM

    }))

    setItems(newItems)

})

```

```React.js
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
```

### Obtaining Input from Textfield
To obtain the input, `onChange` is used. `e.target.value` is the value of input. `setEmail()` is to store the input. 

```React.js
<FormControl 
    type="email" 
    onChange={(e)=>{setEmail(e.target.value)}} 
    required />
```

### useState()
`useState()` is to set the state of the value. For example, we now have variable `error`, and its initial value is null. If we want to assign the new value, then `setError(your_new_value)` is used. 

#### Step(s):
1. Create the variable (pass initial value inside `useState()` if neccessary)
```React.js
const [error, setError] = useState();
```

2. Assign new value
```React.js
setError('Failed to reset password ');
```

### useHistory()
`useHistory()` is used to direct client to another page. 
```React.js
    const history = useHistory();

    const handle_Logout = () => {

        Firebase.auth().signOut();
        history.push("/login");
        
    }
```
