import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "./Firebase/firebase.initialize";
initializeAuthentication();

const GoogleProvider = new GoogleAuthProvider();
const auth = getAuth();
export default function App() {
  const [user, setUser] = useState('');
  const HandleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider).then(result => { setUser(user) }).then(error => { });
  }
  const HandleSignOut = () => {
    signOut(auth).then(result => { setUser('') }).then(error => { });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  }, [])
  return (
    <div className="App">
      {user?.email ? <button onClick={HandleSignOut}>Logout</button> : <button onClick={HandleGoogleSignIn}>Sign In With Google</button>}
      {user?.email && <div>
        <img style={{ borderRadius: '50%', marginTop:'20px' }} src={user.photoURL} alt="profile" />
        <h1>Hello {user.displayName}</h1>
      </div>}
    </div>
  );
}