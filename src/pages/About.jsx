import React from 'react';
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import { FaFilm, FaStar, FaPlayCircle } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-neutral-900 min-h-screen text-neutral-50">
            <Header />

            {/* Banner Section */}
            <div className="w-full bg-gradient-to-b from-neutral-800 to-neutral-900 py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="md:text-5xl text-3xl font-bold mb-4">Về Chúng Tôi</h1>
                    <p className="md:text-lg text-base text-neutral-400 max-w-2xl mx-auto">
                        Khám phá thế giới điện ảnh cùng chúng tôi. Chúng tôi mang đến những bộ phim tuyệt vời, trải nghiệm xem mượt mà và khó quên.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Our Mission */}
                <div className="mb-16">
                    <h2 className="md:text-3xl text-2xl font-semibold mb-6 flex items-center gap-2">
                        <FaFilm className="text-red-500" /> Sứ Mệnh Của Chúng Tôi
                    </h2>
                    <p className="text-neutral-400 md:text-base text-sm leading-relaxed">
                        Tại đây, chúng tôi mong muốn kết nối những người yêu phim với các bộ phim yêu thích của họ và giới thiệu những hành trình điện ảnh mới. 
                        Chúng tôi nỗ lực xây dựng một nền tảng thân thiện, nơi bạn có thể khám phá, xem và thưởng thức phim từ mọi thể loại, thời đại và quốc gia.
                    </p>
                </div>

                {/* What We Offer */}
                <div className="mb-16">
                    <h2 className="md:text-3xl text-2xl font-semibold mb-6 flex items-center gap-2">
                        <FaStar className="text-yellow-500" /> Chúng Tôi Mang Đến Gì
                    </h2>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                        <div className="space-y-3">
                            <FaPlayCircle className="w-8 h-8 text-red-500" />
                            <h3 className="text-xl font-medium">Xem Phim Mượt Mà</h3>
                            <p className="text-neutral-400 text-sm">
                                Xem phim yêu thích mọi lúc, mọi nơi với chất lượng cao và không bị gián đoạn.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <FaFilm className="w-8 h-8 text-red-500" />
                            <h3 className="text-xl font-medium">Kho Phim Đa Dạng</h3>
                            <p className="text-neutral-400 text-sm">
                                Từ những bộ phim hành động kịch tính đến phim tâm lý cảm động, khám phá kho phim phong phú thuộc mọi thể loại.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <FaStar className="w-8 h-8 text-red-500" />
                            <h3 className="text-xl font-medium">Trải Nghiệm Cá Nhân Hóa</h3>
                            <p className="text-neutral-400 text-sm">
                                Nhận gợi ý phim phù hợp với sở thích và danh sách tuyển chọn dành riêng cho bạn.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Our Story */}
                <div className="mb-16">
                    <h2 className="md:text-3xl text-2xl font-semibold mb-6 flex items-center gap-2">
                        <FaFilm className="text-red-500" /> Câu Chuyện Của Chúng Tôi
                    </h2>
                    <p className="text-neutral-400 md:text-base text-sm leading-relaxed">
                        Được thành lập bởi một nhóm những người đam mê điện ảnh, đây ra đời với mục tiêu giúp việc xem phim trở nên dễ dàng và thú vị hơn. 
                        Từ khi ra mắt, chúng tôi đã phát triển thành một cộng đồng của những người yêu phim, trân trọng giải trí chất lượng và những câu chuyện ý nghĩa. 
                        Hãy cùng chúng tôi tiếp tục hành trình này khi chúng tôi mở rộng kho phim và nâng cao trải nghiệm xem của bạn!
                    </p>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h3 className="md:text-2xl text-xl font-semibold mb-4">Sẵn Sàng Khám Phá?</h3>
                    <a
                        href="/search"
                        className="inline-block px-8 py-3 bg-red-700 text-neutral-50 rounded-full hover:bg-red-600 transition duration-300"
                    >
                        Bắt Đầu Xem Ngay
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;