import React from 'react';
import { Users, Link, Trophy } from 'lucide-react';

export default function ReferralSystem() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Referral Program</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold">Referral Rewards</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Whitelisted Promoters: <strong>6% USDT rewards</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>General Referrals: <strong>2% USDT rewards</strong></span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold">Your Referral Link</h3>
            </div>
            <div className="bg-white p-3 rounded-lg flex items-center gap-2">
              <input
                type="text"
                value="https://kebappcoin.io/ref/your-code"
                readOnly
                className="flex-1 bg-transparent outline-none"
              />
              <button className="text-purple-600 hover:text-purple-700">
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-xl text-white text-center">
          <Users className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Start Earning Now</h3>
          <p className="mb-6">Share your referral link and earn rewards for every successful investment</p>
          <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}