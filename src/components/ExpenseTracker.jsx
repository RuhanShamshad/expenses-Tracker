import React from "react";
import { auth, provider, signInWithPopup } from "../firebase-config/firebase";
import { useNavigate } from "react-router-dom";
import '../App.css'
import googleLogo from '../images/download.png';
function ExpenseTracker() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    provider.setCustomParameters({
      prompt: "select_account"
    });
    
    try {
      await signInWithPopup(auth, provider);
      navigate("/form");
    } catch (error) {
      console.error("Error during sign-in", error);
    }
  };

  return (
    <div className="signin-container" style={{ textAlign: "center", marginTop: "100px" }}>
      <h2  className="signin-title">Expense Tracker</h2>
      <button className="google-signin-button" onClick={signInWithGoogle}>
      <img className="google-logo" src={googleLogo} alt="Google logo" />
  Sign in with Google
</button>

    </div>
  );
}

export default ExpenseTracker;
