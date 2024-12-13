import React from 'react';

export default function TokenInfo() {
  return (
    <div className="bg-[#0f1011] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#1a1b1e] rounded-2xl p-8 border border-yellow-500/20">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Token Name:</span>
                <span className="text-yellow-400">BART</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Presale Price:</span>
                <span className="text-white">0.00001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Launch Price:</span>
                <span className="text-white">0.00003</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Presale Bonus:</span>
                <span className="text-white">15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Buy:</span>
                <span className="text-white">20 SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Min Buy:</span>
                <span className="text-white">0.5 SOL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}