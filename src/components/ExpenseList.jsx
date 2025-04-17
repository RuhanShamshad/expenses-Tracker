// src/components/ExpenseList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import '../App.css'

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);


  useEffect(() => {
    const expensesRef = collection(db, "expense");
    const q = query(expensesRef, orderBy("createdAt", "desc")); // newest first

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expensesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(expensesData);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "expense", id)); 
      console.log("Expense deleted");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  return (
    <>
    <div  className="expense-container" style={{ marginTop: "2rem", textAlign: "center" }}>
    <h3 className="expense-title">Expense History</h3>
    <ul className="expense-list">
    {expenses.map(({ id, description, amount }) => (
  <li key={id} style={{ marginBottom: "10px" }} className="expense-item">
    {/* {description} - ${amount} */}
    <span  className="expense-description">{description}</span>
   <span  className="expense-amount">${amount}</span>
    <button
     className="delete-button"
      onClick={() => handleDelete(id)}
      style={{
        marginLeft: "10px",
        padding: "4px 8px",
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  </li>
))}
</ul>
<div className="total-expense">
<strong><p>Total Expense: ${totalExpense.toFixed(2)}</p></strong>
</div>

  </div>
  </>
  );
}

export default ExpenseList;
