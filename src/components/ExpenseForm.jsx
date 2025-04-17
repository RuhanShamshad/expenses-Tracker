// src/components/ExpenseForm.js
import React, { useState } from "react";
import { db } from "../firebase-config/firebase";
import { collection, addDoc } from "firebase/firestore";
import ExpenseList from "./ExpenseList";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/");
        // Redirect or update UI here
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!description || !amount) {
        return alert("Fill both fields!");
      }
  
      try {
        // Create reference to 'expenses' collection
        const expensesRef = collection(db, "expense");
  
        // Add document to Firestore
        await addDoc(expensesRef, {
          description,
          amount: Number(amount),
          createdAt: new Date(),
        });
  
        console.log("Expense added to Firestore!");
        // alert("Expense added successfully!");
  
        // Reset form
        setDescription("");
        setAmount("");
      } catch (error) {
        console.error("Error adding expense: ", error);
        alert("Failed to add expense.");
      }
    };

  return (
    <div className="expense-container">
      <div className="expense-header">
        <h2 className="expense-title">Add Expense</h2>
        <button className="logout-button" onClick={logout}>
          Sign Out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Add Expense
        </button>
      </form>

      <ExpenseList />
    </div>
  );
}

export default ExpenseForm;
