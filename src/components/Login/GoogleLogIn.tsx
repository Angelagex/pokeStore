import {
    GoogleAuthProvider,
    OAuthCredential,
    signInWithPopup,
  } from "firebase/auth";
  import * as React from "react";
  import { useNavigate } from "react-router-dom";
  import { getLogged, IUser, getUser } from "../../redux/features/login/loginSlice";
  import { auth } from "../../firebase/firebaseConfig";
  import { useAppDispatch } from "../../redux/store";
  import { FaGoogle } from "react-icons/fa";
import { getAllPokemonsThunk } from "../../redux/features/pokemon/pokemonActions";
  
  
  interface IGoogleLogInProps {}
  
  const providerGoogleAuth = new GoogleAuthProvider();
  
  const GoogleLogIn: React.FunctionComponent<IGoogleLogInProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const signInWithGoogleButton = () => {
      signInWithPopup(auth, providerGoogleAuth)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential: OAuthCredential | null =
            GoogleAuthProvider.credentialFromResult(result);
  
          const token = credential!.accessToken;
  
          // The signed-in user info.
          //If the logged in is succesfull you will acces this part of the code where you will
          //get a lot of information about the user that have logged in
          const user = result.user;  
          
  
          /*Whit the information of the user you can populate an state that is mainly focused on 
                    holding the information of the user that is logged in*/
  
          dispatch(
            getUser({
                uid: user.uid,
                userImage: user.photoURL,
                userName: user.displayName,
                userEmail: user.email
            } as IUser)
          );
  
          dispatch(
            getLogged(true)
          )
          dispatch(getAllPokemonsThunk())
            navigate("/main")
          // ...
        })
        .catch((error: any) => {
          //If the logged in is not succesfull yu will get to this part and with the message you can tell
          //the user what went wrong
  
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    };
  
    return (
      <div className="login100-social-item bg3">
        <button type="button" className="fa-google" onClick={signInWithGoogleButton}> <FaGoogle style={{color: "white", fontSize: "20px", marginRight: "10px"}}/> Sing Up with Google </button>
      </div>
    );
  };
  
  export default GoogleLogIn;