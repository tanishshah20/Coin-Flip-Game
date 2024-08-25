// src/components/CoinFlip.js
import React, { useState } from "react";
import { ethers } from "ethers";
import "./CoinFlip.css";


const CoinFlip = ({ account }) => {
  const [betAmount, setBetAmount] = useState("");
  const [selectedSide, setSelectedSide] = useState("");
  const [result, setResult] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = async () => {
    if (!betAmount || !selectedSide) {
      alert("Please select a side and enter a bet amount.");
      return;
    }

    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }

    setIsFlipping(true);
    setTimeout(async () => {
      const flipResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(flipResult);

      if (flipResult === selectedSide) {
        alert(`You won! You doubled your ${betAmount} tokens.`);
      } else {
        alert("You lost the bet.");
      }

      setIsFlipping(false);
    }, 2000);
  };

  return (
    <div className="coin-flip-container">
      <h2>Coin Flip Game</h2>
      <div className="input-group">
        <label htmlFor="betAmount">Bet Amount:</label>
        <input
          id="betAmount"
          type="number"
          placeholder="Enter bet amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
      </div>
      <div className="radio-group">
        <div className="radio-option">
          <input
            id="heads"
            type="radio"
            name="side"
            value="heads"
            checked={selectedSide === 'heads'}
            onChange={() => setSelectedSide('heads')}
          />
          <label htmlFor="heads">Heads</label>
        </div>
        <div className="radio-option">
          <input
            id="tails"
            type="radio"
            name="side"
            value="tails"
            checked={selectedSide === 'tails'}
            onChange={() => setSelectedSide('tails')}
          />
          <label htmlFor="tails">Tails</label>
        </div>
      </div>
      <button onClick={flipCoin} disabled={isFlipping}>
        {isFlipping ? "Flipping..." : "Flip the Coin"}
      </button>
      {result && <p>The coin landed on: {result}</p>}
    </div>
  );
};

export default CoinFlip;
