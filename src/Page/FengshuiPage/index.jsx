import React, { useState } from 'react';
import FengshuiGenerate from './FenshuiGenerate';
import FengshuiPoint from './FengshuiPoint';
import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';
import FengshuiRecKoi from './FengshuiRecKoi';

const FengshuiPage = () => {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <>
    <NavBar/>
    <div className="bg-cover bg-center py-4 min-h-screen flex flex-col" 
      style={{backgroundImage: "url('https://boruatinhthuc.com/static/600c7f8f1171abca2dde07725bb75691/3dbc4/abstract-06-oceannight.webp')"}}>
      <div className="container mx-auto px-4 flex-grow flex flex-col">
        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden flex flex-col flex-grow">
          <div className="flex">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium text-center ${
                activeTab === 'generate' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-300 hover:text-pink-600'
              }`}
              onClick={() => setActiveTab('generate')}
            >
              Tra cứu độ tương thích
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium text-center ${
                activeTab === 'reckoi' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-300 hover:text-pink-600'
              }`}
              onClick={() => setActiveTab('reckoi')}
            >
              Tra cứu cá phong thủy
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium text-center ${
                activeTab === 'fishpond' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-300 hover:text-pink-600'
              }`}
              onClick={() => setActiveTab('fishpond')}
            >
              Tra cứu hướng hồ cá
            </button>
          </div>
          <div className="flex-grow">
            {activeTab === 'generate' ? <FengshuiPoint /> : activeTab === 'reckoi' ? <FengshuiRecKoi /> :  < FengshuiGenerate/>}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default FengshuiPage;
