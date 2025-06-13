

import { createContext, useState, useEffect } from 'react';
import { auth, login } from "../config/firebase"; // Importa la configuración de Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"; // Importa la función de registro de Firebase

export const UserContext = createContext();




const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in:", user);
                const { email, uid, photoURL, displayName } = user;
                setUser({ email, uid, photoURL, displayName });
            } else {
                console.log("No user is signed in");
                setUser(null);
            }
        });
        return unsubscribe;
    }
        , []);

    const registerUser = ({ email, password }) => {
        console.log("Registering user with email:" + email + " and password: " + password);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const loginUser = ({ email, password }) => {
        // Aquí puedes implementar la lógica de inicio de sesión
        // Por ejemplo, usando signInWithEmailAndPassword de Firebase
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        // Aquí puedes implementar la lógica de cierre de sesión
        // Por ejemplo, usando signOut de Firebase
        return signOut(auth);
    }
    return (
        <UserContext.Provider value={{ user, setUser, registerUser, loginUser, signOutUser }}>
            {
                children
            }
        </UserContext.Provider>
    )
}
export default UserProvider;
