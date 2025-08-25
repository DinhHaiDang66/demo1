"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

interface Student {
  id: number
  name: string
  age: number
  studentId: string
  major: string
  gpa: number
  year: number
  email: string
  phone: string
}

const sampleStudents: Student[] = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    age: 20,
    studentId: "SV001",
    major: "Công nghệ thông tin",
    gpa: 3.8,
    year: 2,
    email: "an.nguyen@email.com",
    phone: "0123456789",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    age: 19,
    studentId: "SV002",
    major: "Kinh tế",
    gpa: 3.6,
    year: 1,
    email: "binh.tran@email.com",
    phone: "0987654321",
  },
  {
    id: 3,
    name: "Lê Hoàng Cường",
    age: 21,
    studentId: "SV003",
    major: "Kỹ thuật điện",
    gpa: 3.9,
    year: 3,
    email: "cuong.le@email.com",
    phone: "0369852147",
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    age: 20,
    studentId: "SV004",
    major: "Ngôn ngữ Anh",
    gpa: 3.7,
    year: 2,
    email: "dung.pham@email.com",
    phone: "0741852963",
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    age: 22,
    studentId: "SV005",
    major: "Quản trị kinh doanh",
    gpa: 3.5,
    year: 4,
    email: "em.hoang@email.com",
    phone: "0258147369",
  },
]

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(sampleStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student)
    setIsViewModalOpen(true)
  }

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return "text-green-600 bg-green-100"
    if (gpa >= 3.0) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý học sinh</h1>
          <p className="text-gray-600">Quản lý thông tin và theo dõi kết quả học tập của học sinh</p>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, mã SV, hoặc chuyên ngành..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus size={20} />
              Thêm học sinh
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tổng học sinh</h3>
            <p className="text-3xl font-bold text-gray-900">{students.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">GPA trung bình</h3>
            <p className="text-3xl font-bold text-gray-900">
              {(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Học sinh xuất sắc</h3>
            <p className="text-3xl font-bold text-green-600">{students.filter((s) => s.gpa >= 3.7).length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Chuyên ngành</h3>
            <p className="text-3xl font-bold text-gray-900">{new Set(students.map((s) => s.major)).size}</p>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Học sinh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã SV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chuyên ngành
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Năm học
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GPA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.age} tuổi</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.major}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Năm {student.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGpaColor(student.gpa)}`}
                      >
                        {student.gpa}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Student Modal */}
        {isViewModalOpen && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Thông tin chi tiết</h2>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <p className="text-gray-900 font-semibold">{selectedStudent.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi</label>
                  <p className="text-gray-900">{selectedStudent.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã sinh viên</label>
                  <p className="text-gray-900 font-mono">{selectedStudent.studentId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên ngành</label>
                  <p className="text-gray-900">{selectedStudent.major}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Năm học</label>
                  <p className="text-gray-900">Năm {selectedStudent.year}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGpaColor(selectedStudent.gpa)}`}
                  >
                    {selectedStudent.gpa}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{selectedStudent.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <p className="text-gray-900">{selectedStudent.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
