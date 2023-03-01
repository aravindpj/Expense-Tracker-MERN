import { Container } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const token = Cookies.get("token");
  async function fetchAlltransaction() {
    const response = await fetch("http://localhost:4000/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response.json();
    console.log(data);
    setTransactions(data);
  }
  useEffect(() => {
    fetchAlltransaction();
  }, []);
  return (
    <Container>
      <TransactionChart data={transactions} />
      <TransactionForm
        fetchAlltransaction={fetchAlltransaction}
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <TransactionList
        data={transactions}
        fetchAlltransaction={fetchAlltransaction}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
