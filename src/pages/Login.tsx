import { signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { auth } from "../firebase/firebaseConfig";
import GoogleLogIn from "../components/Login/GoogleLogIn";
import { getLogged, IUser, getUser } from "../redux/features/login/loginSlice";
import { FaRegUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { getAllPokemonsThunk } from "../redux/features/pokemon/pokemonActions";

interface ILoginProps {}

const LoginPage: React.FunctionComponent<ILoginProps> = (props) => {
  const [username, setUsername] = React.useState("");
  const [email, setUserEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Logged in
          //If the logged in is succesfull you will acces this part of teh code where you will
          //get a lot of information about the user that have logged in
          const user = userCredential.user;
/* 
          console.log("**** user credentials ****");
          console.log(userCredential);
          console.log("**** user ***");
          console.log(user); */

          dispatch(
            getUser({
              uid: user.uid,
              userName: username,
              userEmail: user.email
            } as IUser)
          );
          dispatch(
            getLogged(true)
          )
          dispatch(getAllPokemonsThunk())
          navigate("/main")

          /*Whit the information of the user you can populate an state that is mainly focused on 
        holding the information of the user that is logged in*/
          // ...
        })
        .catch((error) => {
          //If the logged in is not succesfull yu will get to this part and with the message you can tell
          //the user what went wrong
/*           const errorMessage = error.message;
          console.log("*** Log in error ***");
          console.log(errorMessage); */
        });

      setPassword("");
      setUserEmail("");
    }
  };
    return (
    <div className="limiter back">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form">
            <span className="login100-form-title p-b-49">Login</span>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is required"
            >
              <span className="label-input100">Username</span>
              <div className="inputDiv">
                <FaRegUser style={{ color: "a8a8a8", marginLeft: "25px" }} />
                <input
                  className="input100"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Type your username"
                  required
                />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
            </div>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Email is required"
            >
              <span className="label-input100">Email</span>
              <div className="inputDiv">
                <FaRegUser style={{ color: "a8a8a8", marginLeft: "25px" }} />
                <input
                  className="input100"
                  onChange={(e) => setUserEmail(e.target.value)}
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Type your email"
                />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <div className="inputDiv">
                <FaLock style={{ color: "a8a8a8", marginLeft: "25px" }} />
              <input
                className="input100"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
                placeholder="Type your password"
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn" onClick={(e) => logInForm(e)}>Login</button>
              </div>
            </div>

            <div className="txt1 text-center p-t-54 p-b-20">
              <span>Or Sign Up Using</span>
            </div>

            <div className="flex-c-m">
            <GoogleLogIn />

            </div>

            <div className="flex-col-c p-t-155">
              <span className="txt1 p-b-17">Or Sign Up Using</span>

              <Link to="/signUp" className="txt2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;