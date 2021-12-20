import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import initializeAuthentication from "./Firebase/firebase.initialize";
initializeAuthentication();

const GoogleProvider = new GoogleAuthProvider();
const auth = getAuth();
export default function App() {
  const [user, setUser] = useState('');
  const HandleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
  }
  const HandleSignOut = () => {
    signOut(auth).then(() => {
      alert('Signed Out successfully');
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="App">
      {user?.email ? <button onClick={HandleSignOut}>Logout</button> : <button onClick={HandleGoogleSignIn}>Sign In With Google</button>}
      {user?.email && <div>
        <h1>Hello {user.displayName}</h1>
      </div>}
    </div>
  );
}