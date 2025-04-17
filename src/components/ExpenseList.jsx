// src/components/ExpenseList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";


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

  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
    <h3>Expense History</h3>
    {expenses.map(({ id, description, amount }) => (
  <li key={id} style={{ marginBottom: "10px" }}>
    {description} - ${amount}
    <button
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
  </div>
  );
}

export default ExpenseList;
