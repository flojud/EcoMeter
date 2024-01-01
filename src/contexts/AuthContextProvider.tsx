import {
  deleteUser,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import useNotification from "../hooks/useNotification";
import { IUserContext as IAuthContext, Props } from "../interfaces/Types";

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const { notifyContext } = useNotification();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const deleteMyUser = () => {
    if (user) {
      deleteUser(user)
        .then(() => {
          notifyContext.addNotification(
            "Dein Benutzer wurde erfolgreich gelöscht",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
          notifyContext.addNotification(
            "Dein Benutzer konnte nicht gelöscht werden",
            "error"
          );
        });
    }
  };

  const googleSignIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential) {
            const token = credential.accessToken;
            console.log(token);
            console.log(result.user);
            // The signed-in user info.
            setUser({ ...result.user });
            navigate("/");
            notifyContext.addNotification("Mit Google angemeldet", "success");
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        notifyContext.addNotification(
          "(" + errorCode + ") " + errorMessage,
          "error"
        );
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        notifyContext.addNotification("Erfolgreich abgemeldet", "success");
        setUser({} as User);
        navigate("/");
      })
      .catch(() => {
        notifyContext.addNotification("Fehler beim Logout", "error");
      });
  };

  const checkIsLoggedIn = () => {
    if (user != null) {
      if (user?.uid) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        //console.log(currentUser);
        setUser({ ...currentUser });
      }
    });
    return unsubscribe;
  }, []);

  const authMethods = {
    logout,
    googleSignIn,
    deleteMyUser,
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, authMethods: authMethods }}>
      {children}
    </AuthContext.Provider>
  );
};
