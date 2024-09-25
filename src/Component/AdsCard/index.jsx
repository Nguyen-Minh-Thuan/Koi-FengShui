import React from 'react'

const AdsCard = ({ image, title, description, link }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex h-[180px] w-[280px]">
          <div className="w-1/3 min-w-[66px] p-2">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover rounded"
              />
          </div>
          <div className="w-2/3 p-2 flex flex-col">
              <h2 className="text-purple-600 text-sm font-semibold mb-1 truncate">{title}</h2>
              <p className="text-gray-600 text-xs mb-1 overflow-hidden flex-grow" style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 'none',
                textOverflow: 'ellipsis'
              }}>
                  {description}
              </p>
              <a href={link} className="text-purple-600 font-bold text-xs hover:underline self-end mt-auto">
                  Chi tiết&gt;&gt;
              </a>
          </div>
      </div>
    )
}

export default AdsCard