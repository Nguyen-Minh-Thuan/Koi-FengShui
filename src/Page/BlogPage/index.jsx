import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';

const BlogPage = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Những lưu ý khi nuôi nhiều cá Koi cùng một hồ',
            excerpt: 'Khi nuôi nhiều cá Koi trong cùng một hồ, bạn cần lưu ý những điểm sau để đảm bảo môi trường sống tốt cho chúng: 1. Dung tích hồ cá: Hãy cân đối với số lượng cá Koi bạn nuôi. Mỗi con cá Koi trưởng thành cần khoảng 500-1000 lít nước ...',
            date: '10/10/2024',
            image: 'https://koiservice.vn/wp-content/uploads/2023/06/ca-koi-chagoi-huong-dan-chon-ca-va-noi-mua-uy-tin-1.png',
        },
        {
            id: 2,
            title: 'Những quy tắc vàng khi thả cá Koi vào hồ mới',
            excerpt: 'Trở nhựt, trước khi thả cá Koi vào ao mới, hồ nên được chạy máy bơm và bộ lọc ít nhất một tuần, lý tưởng là hai tuần. Nước mới thả và các vật ...',
            date: '15/10/2024',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ynbkcVvSVocADhUhwHc-_c_YioGh88V7nQ&s',
        },
        // Thêm các bài viết khác tương tự
    ];

    return (
        <>
            <NavBar />
            <img
                src="https://sanvuonxinh.com/wp-content/uploads/2023/10/tac-dong-cua-anh-nang-mt-troi-doi-voi-ho-ca-koi-1.jpg"
                alt="Koi fish header"
                className="w-full h-48 object-cover"
            />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold mb-2">Blog</h2>
                <main>
                    {blogPosts.map((post) => (
                        <article key={post.id} className="flex mb-8 pb-8 border-b border-gray-200">
                            <img src={post.image} alt={post.title} className="w-48 h-36 object-cover mr-6" />
                            <div className="flex-1">
                                <Link to={`/blog/detail/${post.id}`} className="block">
                                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-200">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                                <p className="text-sm text-gray-700 leading-relaxed">{post.excerpt}</p>
                            </div>
                        </article>
                    ))}
                </main>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
