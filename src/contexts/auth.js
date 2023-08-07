import { useState, useEffect, createContext } from "react";
import Loading from "../components/LoadingSpinner";
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

import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);

  const navigate = useNavigate();

  const getUserData = async uid => {
    const userRef = doc(db, "users", uid);
    try {
      const snapshot = await getDoc(userRef);
      const userData = snapshot.data();
      return userData;
    } catch (error) {
      return "error";
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("@userData")) || "";

    if (userData && userData.uid) {
      const setStoredUserData = async userUid => {
        const storedUserData = await getUserData(userUid);

        if (storedUserData) {
          setUser(storedUserData);
        }
        setPageLoading(false);
      };

      setStoredUserData(userData.uid);
    } else {
 
      const guestData =
        JSON.parse(localStorage.getItem("@guestData")) || "";

      if (guestData) {
        setGuestInfo(guestData);
      }
      setPageLoading(false);
    }
  }, []);

  async function signIn(email, password) {
    setLoggingIn(true);

    const returnObject = {
      credentialsError: "",
    };
    await signInWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const uid = value.user.uid;

        const userData = await getUserData(uid);

        saveUserLoginInfo(email, uid);
        setUser(userData);
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
        saveUserLoginInfo(email, uid);

        const newUser = {
          email,
          uid,
          purchasedProducts: [],
          list: [],
          profileConfiguration: {
            imgUrl: "",
            name: "",
          },
        };
        setUser(newUser);

        await setDoc(doc(db, "users", uid), newUser);
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
    setUser(false);
  }

  function saveUserLoginInfo(email, uid) {
    const userData = {
      email,
      uid,
    };
    localStorage.setItem("@userData", JSON.stringify(userData));
  }

  const contextValue = {
    userSigned: !!user,
    user,
    setUser,
    userUid: user?.uid,
    guestInfo,
    setGuestInfo,
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
