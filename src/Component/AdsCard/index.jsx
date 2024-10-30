import React from "react";
import Content from "../../Page/AdminPage/WebManagement/AdsList";

const AdsCard = ({ imageUrl, title, content, link, startedDate }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} phút trước`;
        } else if (diffInHours < 24) {
            return `${diffInHours} giờ trước`;
        } else if (diffInDays < 30) {
            return `${diffInDays} ngày trước`;
        } else {
            return date.toLocaleDateString('vi-VN');
        }
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex h-[180px] w-[280px]">
          <div className="w-1/3 min-w-[66px] p-2">
              <img 
                src={imageUrl} 
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
                  {content}
              </p>
              <div className="flex justify-between items-center mt-auto">
                  <span className="text-gray-500 text-xs">{formatDate(startedDate)}</span>
                  <a href={link} className="text-purple-600 font-bold text-xs hover:underline">
                      Chi tiết&gt;&gt;
                  </a>
              </div>
          </div>
      </div>
      <div className="w-2/3 p-2 flex flex-col">
        <h2 className="text-purple-600 text-sm font-semibold mb-1 truncate">
          {title}
        </h2>
        <p
          className="text-gray-600 text-xs mb-1 overflow-hidden flex-grow"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "none",
            textOverflow: "ellipsis",
          }}
        ></p>
        <a
          href={link}
          className="text-purple-600 font-bold text-xs hover:underline self-end mt-auto"
        >
          Chi tiết&gt;&gt;
        </a>
      </div>
    </div>
  );
};

export default AdsCard;
