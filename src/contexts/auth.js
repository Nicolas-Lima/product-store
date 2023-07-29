import { useState, useEffect, createContext } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebaseConnection";
import {
  getAuthErrorMessage,
  getCreateAccountErrorMessage,
} from "../utils/validationUtils";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("@userData")) || "";
    if (userData && userData.uid) {
      setUser(userData);
    }
    setPageLoading(false);
  }, []);

  async function signIn(email, password) {
    setLoggingIn(true);

    const returnObject = {
      credentialsError: "",
    };
    await signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        const uid = value.user.uid;
        saveUserData(email, uid);
        setUser({
          email,
          uid,
        });
        navigate("/");
      })
      .catch(error => {
        returnObject.credentialsError = getAuthErrorMessage(error.code);
      });

    setLoggingIn(false);

    return returnObject;
  }

  async function signUp(email, password) {
    const returnObject = {
      emailError: "",
      passwordError: "",
    };

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const { email, uid } = value.user;
        saveUserData(email, uid);
        setUser({
          email,
          uid,
        });

        await setDoc(doc(db, "users", uid), {
          email,
          uid,
          purchasedProducts: [],
          profileConfiguration: {
            imgUrl: "",
            name: "",
          },
        });
        navigate("/");
      })
      .catch(error => {
        const errorMessage = getCreateAccountErrorMessage(error.code);
        returnObject.emailError = errorMessage.email;
        returnObject.passwordError = errorMessage.password;
      });

    return returnObject;
  }

  function logout() {
    localStorage.removeItem("@userData");
    setUser(false)
  }

  function saveUserData(email, uid) {
    const userData = {
      email,
      uid,
    };
    localStorage.setItem("@userData", JSON.stringify(userData));
  }

  const contextValue = {
    userSigned: !!user,
    user,
    userUid: user?.uid,
    signIn,
    signUp,
    logout,
    pageLoading,
    loggingIn,
    setLoggingIn,
    registering,
    setRegistering,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {pageLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
