import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Staff chanel</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-400">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default index;
