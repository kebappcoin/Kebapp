import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';

export default function TokenSale() {
  const totalRaised = 1250000; // Example value
  const hardCap = 2250000;
  const progress = (totalRaised / hardCap) * 100;

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Token Sale Details</h2>
        
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Progress ({progress.toFixed(1)}%)</span>
            <span className="text-purple-600">${totalRaised.toLocaleString()} / ${hardCap.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
        </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold">Investment Limits</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Minimum</span>
                <span className="font-semibold">$100</span>
              </li>
              <li className="flex justify-between">
                <span>Maximum</span>
                <span className="font-semibold">$5,000</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold">Supported Tokens</h3>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00FFA3] rounded-full"></div>
                <span>SOL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#26A17B] rounded-full"></div>
                <span>USDT-SPL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}