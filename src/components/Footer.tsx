import React from 'react';
import { MessageCircle, Twitter, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Community</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white">
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <a href="mailto:support@kebappcoin.io" className="hover:text-white">
              support@kebappcoin.io
            </a>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} KebappCoin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}