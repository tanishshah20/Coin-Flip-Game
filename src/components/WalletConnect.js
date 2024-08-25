import React, { useState, useEffect } from 'react';
import './WalletConnect.css';

const WalletConnect = ({ account, setAccount }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        setErrorMessage('Failed to check connection.');
      }
    } else {
      setErrorMessage('MetaMask is not installed.');
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsConnected(true);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Failed to connect wallet.');
      }
    } else {
      setErrorMessage('MetaMask is not installed.');
    }
  };

  return (
    <div className="wallet-connect-container">
      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Wallet Connected: {account}</p>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default WalletConnect;
