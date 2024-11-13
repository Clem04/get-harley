'useClient'
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  onCartClick: () => void;
  onHomeClick: () => void;
}

export default function TopNavbar({onCartClick, onHomeClick}: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 z-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-xl font-semibold text-white" onClick={onHomeClick}>GETHARLEY</h1>
        </div>
        <div className="absolute right-0 flex items-center pr-4">
          <button
            type="button"
            className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="View cart"
            onClick={onCartClick}
          > 
            <ShoppingCartIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        
      </div>
    </div>
  </nav>
  )
}