"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Phone, Mail, MapPin, GraduationCap } from "lucide-react"

// Dữ liệu học sinh mẫu
const sampleStudents = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 20,
    studentId: "SV001",
    major: "Công nghệ thông tin",
    gpa: 3.8,
    year: "Năm 3",
    status: "Đang học",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    age: 19,
    studentId: "SV002",
    major: "Kinh tế",
    gpa: 3.6,
    year: "Năm 2",
    status: "Đang học",
  },
  {
    id: 3,
    name: "Lê Hoàng Cường",
    age: 21,
    studentId: "SV003",
    major: "Kỹ thuật điện",
    gpa: 3.9,
    year: "Năm 4",
    status: "Đang học",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    age: 18,
    studentId: "SV004",
    major: "Ngôn ngữ Anh",
    gpa: 3.7,
    year: "Năm 1",
    status: "Đang học",
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    age: 22,
    studentId: "SV005",
    major: "Công nghệ thông tin",
    gpa: 3.5,
    year: "Năm 4",
    status: "Sắp tốt nghiệp",
  },
]

export default function StudentManagementApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const [showContact, setShowContact] = useState(false)
  const [students] = useState(sampleStudents)

  const renderHomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <GraduationCap className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">Hệ Thống Quản Lý Học Sinh</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Giải pháp toàn diện cho việc quản lý thông tin học sinh, theo dõi kết quả học tập và hỗ trợ giáo dục hiện
            đại
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage("students")}>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Quản Lý Học Sinh</CardTitle>
              <CardDescription>Xem và quản lý thông tin chi tiết của tất cả học sinh</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => setCurrentPage("students")}>
                Truy Cập Ngay
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentPage("about")}>
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Giới Thiệu</CardTitle>
              <CardDescription>Tìm hiểu về hệ thống và tính năng của chúng tôi</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentPage("about")}>
                Xem Chi Tiết
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowContact(true)}>
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Liên Hệ</CardTitle>
              <CardDescription>Thông tin liên hệ và hỗ trợ kỹ thuật</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowContact(true)}>
                Liên Hệ Ngay
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Tính Năng Nổi Bật</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Quản Lý Thông Tin</h3>
              <p className="text-sm text-gray-600">Lưu trữ và quản lý thông tin học sinh một cách có hệ thống</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Theo Dõi Học Tập</h3>
              <p className="text-sm text-gray-600">Giám sát kết quả học tập và tiến độ của từng học sinh</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Báo Cáo Thống Kê</h3>
              <p className="text-sm text-gray-600">Tạo báo cáo chi tiết về tình hình học tập</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-sm text-gray-600">Đội ngũ hỗ trợ kỹ thuật luôn sẵn sàng giúp đỡ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStudentsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Danh Sách Học Sinh</h1>
          <Button onClick={() => setCurrentPage("home")} variant="outline">
            Về Trang Chủ
          </Button>
        </div>

        <div className="grid gap-6">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{student.name}</CardTitle>
                    <CardDescription>Mã SV: {student.studentId}</CardDescription>
                  </div>
                  <Badge variant={student.status === "Đang học" ? "default" : "secondary"}>{student.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tuổi</p>
                    <p className="font-semibold">{student.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chuyên ngành</p>
                    <p className="font-semibold">{student.major}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Năm học</p>
                    <p className="font-semibold">{student.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">GPA</p>
                    <p className="font-semibold text-blue-600">{student.gpa}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Thống Kê Tổng Quan</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{students.length}</p>
              <p className="text-sm text-gray-600">Tổng số học sinh</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">GPA trung bình</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {students.filter((s) => s.status === "Đang học").length}
              </p>
              <p className="text-sm text-gray-600">Đang học</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {students.filter((s) => s.status === "Sắp tốt nghiệp").length}
              </p>
              <p className="text-sm text-gray-600">Sắp tốt nghiệp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Giới Thiệu Hệ Thống</h1>
          <Button onClick={() => setCurrentPage("home")} variant="outline">
            Về Trang Chủ
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Về Chúng Tôi</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-lg mb-6">
                Hệ thống Quản lý Học sinh được phát triển với mục tiêu tạo ra một giải pháp toàn diện cho việc quản lý
                thông tin học sinh trong các cơ sở giáo dục.
              </p>

              <h3 className="text-xl font-semibold mb-4">Lịch Sử Phát Triển</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>2020: Khởi động dự án với đội ngũ 5 lập trình viên</li>
                <li>2021: Ra mắt phiên bản beta đầu tiên</li>
                <li>2022: Chính thức triển khai tại 50+ trường học</li>
                <li>2023: Cập nhật tính năng AI và báo cáo thông minh</li>
                <li>2024: Mở rộng ra quốc tế với 200+ cơ sở giáo dục</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Tầm Nhìn & Sứ Mệnh</h3>
              <p className="mb-4">
                <strong>Tầm nhìn:</strong> Trở thành nền tảng quản lý giáo dục hàng đầu, giúp các cơ sở giáo dục số hóa
                và tối ưu hóa quy trình quản lý học sinh.
              </p>
              <p className="mb-6">
                <strong>Sứ mệnh:</strong> Cung cấp công cụ hiện đại, dễ sử dụng để giáo viên và quản lý có thể tập trung
                vào việc giảng dạy và phát triển học sinh.
              </p>

              <h3 className="text-xl font-semibold mb-4">Công Nghệ Sử Dụng</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Frontend:</h4>
                  <ul className="list-disc pl-6">
                    <li>React.js với TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Next.js Framework</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Backend:</h4>
                  <ul className="list-disc pl-6">
                    <li>Node.js & Express</li>
                    <li>PostgreSQL Database</li>
                    <li>Redis Cache</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Đội Ngũ Phát Triển</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Nguyễn Văn A</h4>
                  <p className="text-sm text-gray-600">Lead Developer</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-green-600" />
                  </div>
                  <h4 className="font-semibold">Trần Thị B</h4>
                  <p className="text-sm text-gray-600">UI/UX Designer</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Lê Văn C</h4>
                  <p className="text-sm text-gray-600">Product Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {currentPage === "home" && renderHomePage()}
      {currentPage === "students" && renderStudentsPage()}
      {currentPage === "about" && renderAboutPage()}

      <Dialog open={showContact} onOpenChange={setShowContact}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Thông Tin Liên Hệ</DialogTitle>
            <DialogDescription>Liên hệ với chúng tôi để được hỗ trợ tốt nhất</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold">Số điện thoại</p>
                <p className="text-sm text-gray-600">+84 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-gray-600">support@studentmanagement.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-semibold">Địa chỉ công ty</p>
                <p className="text-sm text-gray-600">
                  123 Đường ABC, Quận 1<br />
                  TP. Hồ Chí Minh, Việt Nam
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                <strong>Giờ làm việc:</strong>
                <br />
                Thứ 2 - Thứ 6: 8:00 - 17:30
                <br />
                Thứ 7: 8:00 - 12:00
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
