import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import initializeAuthentication from "./Firebase/firebase.initialize";
initializeAuthentication();

const GoogleProvider = new GoogleAuthProvider();
export default function App() {
  const [user, setUser] = useState('');
  const HandleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
  }
  return (
    <div className="App">
      {user?.email ? <button >Logout</button> : <button onClick={HandleGoogleSignIn}>Sign In With Google</button>}
      {user?.email && <div>
        <h1>Hello {user.displayName}</h1>
      </div>}
    </div>
  );
}