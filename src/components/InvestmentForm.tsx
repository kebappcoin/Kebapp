import React, { useState } from 'react';

export default function InvestmentForm() {
  const [amount, setAmount] = useState('');

  return (
    <div className="bg-[#0f1011] py-16">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-[#1a1b1e] rounded-2xl p-8 border border-yellow-500/20">
          <h2 className="text-2xl font-bold mb-8 text-center">PRESALE IS LIVE</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Enter SOL Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-yellow-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="234234234"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  SOL
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Your BART Tokens
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value="234234234234545"
                  className="w-full bg-[#0a0b0d] border border-yellow-500/20 rounded-lg px-4 py-3 text-white"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  BART
                </div>
              </div>
            </div>

            <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-300 transform hover:scale-[1.02] transition-all duration-300">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}