import { Link } from "react-router-dom"
import { Users, BookOpen, BarChart3, Shield } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Quản lý học sinh",
      description: "Theo dõi thông tin chi tiết của từng học sinh một cách dễ dàng",
    },
    {
      icon: BookOpen,
      title: "Quản lý điểm số",
      description: "Ghi nhận và theo dõi kết quả học tập của học sinh",
    },
    {
      icon: BarChart3,
      title: "Báo cáo thống kê",
      description: "Tạo báo cáo chi tiết về tình hình học tập và hoạt động",
    },
    {
      icon: Shield,
      title: "Bảo mật cao",
      description: "Đảm bảo an toàn thông tin với hệ thống bảo mật hiện đại",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Hệ thống Quản lý Học sinh</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Giải pháp toàn diện cho việc quản lý thông tin học sinh, điểm số và hoạt động giáo dục
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/students"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Bắt đầu quản lý
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá những tính năng mạnh mẽ giúp bạn quản lý học sinh hiệu quả hơn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hãy trải nghiệm hệ thống quản lý học sinh hiện đại và hiệu quả ngay hôm nay
          </p>
          <Link
            to="/students"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Khám phá ngay
          </Link>
        </div>
      </section>
    </div>
  )
}
