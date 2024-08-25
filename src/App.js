import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CoinFlip from './components/CoinFlip';
import './App.css';

const App = () => {
  const [account, setAccount] = useState(null);

  return (
    <div className="app-container">
      <h1>Coin Flip Game</h1>
      <WalletConnect account={account} setAccount={setAccount} />
      {account && <CoinFlip account={account} />}
    </div>
  );
};

export default App;
