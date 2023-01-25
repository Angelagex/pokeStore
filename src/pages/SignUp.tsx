import { createUserWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { auth } from "../firebase/firebaseConfig";
import GoogleLogIn from "../components/Login/GoogleLogIn";
import { FaRegUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface ISingUpPageProps {}

const SingUpPage: React.FunctionComponent<ISingUpPageProps> = (props) => {
  const [email, setUserEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const signInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password && email) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          //If the logged in is succesfull you will acces this part of teh code where you will
          //get a lot of information about the user that have logged in
          const user = userCredential.user;
          console.log("****user****");

          console.log(user);
          /*Whit the information of the user you can populate an state that is mainly focused on 
            holding the information of the user that is logged in*/

          // ...
        })
        .catch((error) => {
          //If the logged in is not succesfull yu will get to this part and with the message you can tell
          //the user what went wrong
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("*** sign in error ***");
          console.log(errorMessage);
          // ..
        });

      setUserEmail("");
      setPassword("");
      alert("User created, please log in")
      navigate("/login")

    }
  };

  return (
    <div className="limiter back">
    <div className="container-login100">
      <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <form className="login100-form validate-form">
          <span className="login100-form-title p-b-49">Sign Up</span>
          <div
            className="wrap-input100 validate-input m-b-23"
            data-validate="Username is reauired"
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
                required
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
              min="6"
            />
            <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>
          </div>

          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button className="login100-form-btn" onClick={(e) => signInForm(e)}>Sign Up</button>
            </div>
          </div>

          <div className="txt1 text-center p-t-54 p-b-20">
            <span>Or Sign Up sning</span>
          </div>

          <div className="flex-c-m">
          <GoogleLogIn />

          </div>

          <div className="flex-col-c p-t-155">
            <span className="txt1 p-b-17">Already have an account?</span>

            <Link to="/" className="txt2">
                Log In
              </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default SingUpPage;