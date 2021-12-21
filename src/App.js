import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import './App.css';
import initializeAuthentication from "./Firebase/firebase.initialize";



initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


function App() {

  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const {displayName, photoURL, email} = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(loggedInUser);
      }).catch((error) => {
        
      });
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({})
    })
  }

  return (
    <div className="App">
      
      { !user.name ?
        <div>
        <button onClick={handleGoogleSignIn}>Google</button>
        <button onClick={handleGithubSignIn}>github</button>
        </div> :
        <button onClick={handleSignOut}>SignOut</button>
      }
      
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>your email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
