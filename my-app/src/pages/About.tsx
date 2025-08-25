import { Calendar, Users, Award, Target } from "lucide-react"

export default function About() {
  const milestones = [
    {
      year: "2020",
      title: "Khởi đầu dự án",
      description: "Bắt đầu phát triển hệ thống quản lý học sinh với mục tiêu số hóa giáo dục",
    },
    {
      year: "2021",
      title: "Phiên bản đầu tiên",
      description: "Ra mắt phiên bản beta với các tính năng cơ bản về quản lý thông tin học sinh",
    },
    {
      year: "2022",
      title: "Mở rộng tính năng",
      description: "Thêm các module quản lý điểm số, báo cáo và thống kê chi tiết",
    },
    {
      year: "2023",
      title: "Tích hợp AI",
      description: "Ứng dụng trí tuệ nhân tạo để phân tích và dự đoán kết quả học tập",
    },
    {
      year: "2024",
      title: "Hiện tại",
      description: "Hệ thống hoàn thiện với giao diện hiện đại và tính năng toàn diện",
    },
  ]

  const stats = [
    { icon: Users, label: "Học sinh được quản lý", value: "10,000+" },
    { icon: Calendar, label: "Năm kinh nghiệm", value: "4+" },
    { icon: Award, label: "Trường học tin dùng", value: "50+" },
    { icon: Target, label: "Độ chính xác", value: "99.9%" },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Về StudentManager</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hệ thống quản lý học sinh hiện đại, được phát triển với mục tiêu số hóa và tối ưu hóa quy trình giáo dục tại
            các trường học
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sứ mệnh của chúng tôi</h2>
              <p className="text-gray-600 mb-4">
                StudentManager được tạo ra với sứ mệnh cách mạng hóa cách thức quản lý và theo dõi tiến trình học tập
                của học sinh. Chúng tôi tin rằng công nghệ có thể làm cho giáo dục trở nên hiệu quả và dễ tiếp cận hơn.
              </p>
              <p className="text-gray-600">
                Với giao diện thân thiện và các tính năng mạnh mẽ, hệ thống giúp giáo viên và quản lý trường học tiết
                kiệm thời gian, nâng cao chất lượng giảng dạy và theo dõi sát sao kết quả học tập của từng học sinh.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Hành trình phát triển</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="text-blue-600 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tập trung vào người dùng</h3>
              <p className="text-gray-600">
                Thiết kế giao diện thân thiện, dễ sử dụng cho mọi đối tượng từ giáo viên đến quản lý
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chính xác và tin cậy</h3>
              <p className="text-gray-600">Đảm bảo độ chính xác cao trong việc lưu trữ và xử lý dữ liệu học sinh</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Đổi mới liên tục</h3>
              <p className="text-gray-600">
                Không ngừng cập nhật và cải tiến để đáp ứng nhu cầu ngày càng cao của giáo dục
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
