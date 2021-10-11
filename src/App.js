import React, { useEffect, useState } from "react";
import Web3 from "web3";
import logo from "./logo.svg";
import "./App.css";
// const Web3 = require('web3');

function App() {
  let web3 = new Web3(window.web3.currentProvider);
  const [connection, setConnection] = useState(true);
  const [account, setAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function checkMetaMask() {
      // console.log(window.ethereum.isConnected(), "checking isConnected");

      if (window.ethereum.isConnected()) {
        let accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          setConnection(false);
        } else {
          setConnection(true);

          setAccount(accounts[0]);

          let balance = await web3.eth.getBalance(accounts[0]);
          setBalance(balance);

          let netIds = await web3.eth.net.getNetworkType();
          setNetwork(netIds);
        }
      } else {
        setConnection(false);
      }
    }

    checkMetaMask();
  }, [connection]);

  useEffect(() => {
    async function checkMetaMask() {
      let accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      if (accounts.length === 0) {
        setConnection(false);
      } else {
        setConnection(true);

        let balance = await web3.eth.getBalance(accounts[0]);
        setBalance(balance);
      }
    }

    window.ethereum.on("chainChanged", async () => {
      console.log("something happening chain");

      let netIds = await web3.eth.net.getNetworkType();
      setNetwork(netIds);

      let accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      if (accounts.length === 0) {
        setConnection(false);
      } else {
        setConnection(true);

        let balance = await web3.eth.getBalance(accounts[0]);
        setBalance(balance);
      }
    });

    window.ethereum.on("accountsChanged", async (chainId) => {
      console.log("something happening account");

      let accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      if (accounts.length === 0) {
        setConnection(false);
      } else {
        setConnection(true);

        let balance = await web3.eth.getBalance(accounts[0]);
        setBalance(balance);
      }
    });

    //network issue
    window.ethereum.on("disconnect", () => {
      console.log("metamask disconnect");

      setConnection(false);
    });

    window.ethereum.on("connect", () => {
      console.log("metamask connected");

      setConnection(true);
    });

    checkMetaMask();
  });

  return (
    <div className="App">
      <div>Connection is {connection ? "true" : "false"}</div>

      {connection && (
        <>
          <div>Account is {account}</div>
          <div>Network is {network}</div>
          <div>Balance is {balance}</div>
        </>
      )}
    </div>
  );
}

export default App;
