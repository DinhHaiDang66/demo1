import React, { useState, useEffect } from 'react';
import { Users, Info, Phone, Plus, Edit, Trash2, X, Home, BookOpen, Award, TrendingUp } from 'lucide-react';

interface Student {
  studentId: number;
  name: string;
  age: number | null;
  gender: string;
  email: string;
  grade: string;
  phone: string;
  address: string;
  gpa: number | null;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [students, setStudents] = useState<Student[]>([]);
  const [showContact, setShowContact] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    grade: '',
    email: '',
    phone: '',
    address: '',
    gpa: ''
  });
  const [formError, setFormError] = useState<string | null>(null); // Lỗi cụ thể cho form

  const loadStudents = () => {
    fetch('http://localhost:8080/api/students')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setStudents(data);
          setFormError(null); // Xóa lỗi khi tải thành công
        })
        .catch(error => {
          console.error('Error fetching students:', error);
          setFormError('Không thể tải danh sách học sinh. Vui lòng kiểm tra kết nối backend.');
        });
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      grade: '',
      email: '',
      phone: '',
      address: '',
      gpa: ''
    });
    setFormError(null); // Xóa lỗi cũ khi mở form
    setShowStudentForm(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      age: student.age?.toString() || '',
      gender: student.gender,
      grade: student.grade,
      email: student.email,
      phone: student.phone,
      address: student.address,
      gpa: student.gpa?.toString() || ''
    });
    setFormError(null); // Xóa lỗi cũ khi mở form
    setShowStudentForm(true);
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sinh viên này?')) {
      fetch(`http://localhost:8080/api/students/${id}`, {
        method: 'DELETE',
        // Không thêm headers nếu không cần body
      })
          .then(response => {
            if (!response.ok) {
              return response.text().then(text => {
                throw new Error(`Xóa thất bại với mã: ${response.status} - ${text || 'Không có chi tiết'}`);
              });
            }
            return response.status === 204 ? {} : response.json();
          })
          .then(() => {
            loadStudents();
            alert('Xóa thành công!');
          })
          .catch(error => {
            console.error('Error deleting student:', error.message);
            setFormError(error.message || 'Xóa học sinh thất bại. Vui lòng thử lại.');
          });
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Kiểm tra và parse dữ liệu
    const age = formData.age ? parseInt(formData.age) : null;
    if (isNaN(age as number) && formData.age !== '') {
      setFormError('Tuổi phải là số hợp lệ.');
      return;
    }
    const gpa = formData.gpa ? parseFloat(formData.gpa) : null;
    if (isNaN(gpa as number) && formData.gpa !== '') {
      setFormError('GPA phải là số hợp lệ.');
      return;
    }

    const studentData = {
      studentId: editingStudent?.studentId || 0,
      name: formData.name,
      age: age,
      gender: formData.gender,
      grade: formData.grade,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      gpa: gpa
    };
    console.log('Sending data to backend:', JSON.stringify(studentData)); // Log dữ liệu

    const url = editingStudent
        ? `http://localhost:8080/api/students/${editingStudent.studentId}`
        : 'http://localhost:8080/api/students';
    const method = editingStudent ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    })
        .then(response => {
          if (!response.ok) {
            if (response.status === 409) {
              throw new Error('Email đã tồn tại. Vui lòng chọn email khác.');
            } else if (response.status === 404) {
              throw new Error('Sinh viên không tồn tại.');
            } else {
              throw new Error(`${editingStudent ? 'Cập nhật' : 'Thêm'} thất bại với mã: ${response.status}`);
            }
          }
          return response.json();
        })
        .then(() => {
          loadStudents();
          setShowStudentForm(false);
          alert(editingStudent ? 'Cập nhật thành công!' : 'Thêm thành công!');
        })
        .catch(error => {
          console.error(`Error ${editingStudent ? 'updating' : 'adding'} student:`, error);
          setFormError(error.message || `${editingStudent ? 'Cập nhật' : 'Thêm'} học sinh thất bại. Vui lòng kiểm tra dữ liệu.`);
        });

    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      grade: '',
      email: '',
      phone: '',
      address: '',
      gpa: ''
    });
  };

  const renderHomePage = () => (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">EduManage</h1>
          <p className="text-2xl text-gray-600 mb-8">Hệ Thống Quản Lý Học Sinh Hiện Đại</p>
          <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
            Giải pháp toàn diện cho việc quản lý thông tin học sinh, theo dõi kết quả học tập
            và hỗ trợ các hoạt động giáo dục tại trường học.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={() => setCurrentPage('students')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              Bắt Đầu Quản Lý
            </button>
            <button
                onClick={() => setCurrentPage('about')}
                className="px-8 py-4 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 font-semibold text-lg"
            >
              Tìm Hiểu Thêm
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quản Lý Học Sinh</h3>
            <p className="text-gray-600">
              Lưu trữ và quản lý thông tin chi tiết của từng học sinh một cách dễ dàng và hiệu quả.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Theo Dõi Học Tập</h3>
            <p className="text-gray-600">
              Giám sát kết quả học tập, điểm số và tiến độ phát triển của học sinh theo thời gian.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:transform hover:scale-105">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Báo Cáo Thống Kê</h3>
            <p className="text-gray-600">
              Tạo báo cáo chi tiết và thống kê để đánh giá hiệu quả giáo dục và học tập.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Thống Kê Hệ Thống</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{students.length}</div>
              <div className="text-gray-600">Học Sinh</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                {new Set(students.map(s => s.grade)).size}
              </div>
              <div className="text-gray-600">Lớp Học</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {(students.reduce((sum, s) => sum + (s.gpa || 0), 0) / (students.length || 1)).toFixed(1)}
              </div>
              <div className="text-gray-600">GPA Trung Bình</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {students.filter(s => s.gpa && s.gpa >= 8.0).length}
              </div>
              <div className="text-gray-600">Học Sinh Giỏi</div>
            </div>
          </div>
        </div>
      </div>
  );

  const renderAboutPage = () => (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-4">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Về EduManage</h1>
            <p className="text-xl text-gray-600">Câu chuyện phát triển và sứ mệnh của chúng tôi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lịch Sử Hình Thành</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                EduManage được thành lập vào năm 2020 với mục tiêu cách mạng hóa cách thức quản lý
                giáo dục tại Việt Nam. Xuất phát từ nhu cầu thực tế của các trường học trong việc
                số hóa quy trình quản lý học sinh.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Sau 4 năm phát triển, chúng tôi đã trở thành đối tác tin cậy của hơn 500 trường học
                trên toàn quốc, phục vụ hơn 100,000 học sinh và giáo viên.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Với đội ngũ kỹ sư công nghệ giàu kinh nghiệm và hiểu biết sâu sắc về lĩnh vực giáo dục,
                chúng tôi không ngừng cải tiến để mang đến những giải pháp tốt nhất.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tầm Nhìn & Sứ Mệnh</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Tầm Nhìn</h3>
                  <p className="text-blue-700 text-sm">
                    Trở thành nền tảng quản lý giáo dục hàng đầu Việt Nam, góp phần nâng cao
                    chất lượng giáo dục và hiện đại hóa các trường học.
                  </p>
                </div>
                <div className="p-4 bg-teal-50 rounded-lg">
                  <h3 className="font-semibold text-teal-800 mb-2">Sứ Mệnh</h3>
                  <p className="text-teal-700 text-sm">
                    Cung cấp các giải pháp công nghệ tiên tiến, dễ sử dụng và hiệu quả để hỗ trợ
                    các nhà giáo dục trong việc quản lý và phát triển học sinh.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Giá Trị Cốt Lõi</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Chất Lượng</h3>
                <p className="text-gray-600 text-sm">
                  Cam kết mang đến sản phẩm chất lượng cao với độ tin cậy và bảo mật tuyệt đối
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Hỗ Trợ</h3>
                <p className="text-gray-600 text-sm">
                  Đội ngũ hỗ trợ chuyên nghiệp, nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Đổi Mới</h3>
                <p className="text-gray-600 text-sm">
                  Không ngừng nghiên cứu và ứng dụng công nghệ mới để cải thiện trải nghiệm người dùng
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Thành Tựu Đạt Được</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Hơn 500 trường học đang sử dụng hệ thống</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Phục vụ hơn 100,000 học sinh trên toàn quốc</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Đạt chứng nhận ISO 27001 về bảo mật thông tin</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Giải thưởng "Sản phẩm công nghệ giáo dục xuất sắc 2023"</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Tỷ lệ hài lòng của khách hàng đạt 98%</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Đối tác chiến lược với Bộ Giáo dục và Đào tạo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  const renderStudentManagement = () => (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Quản Lý Học Sinh</h1>
            <button
                onClick={handleAddStudent}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Thêm Học Sinh
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.length > 0 ? (
                students.map((student) => (
                    <div key={student.studentId} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:bg-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
                          <p className="text-teal-600 font-medium">{student.grade}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                              onClick={() => handleEditStudent(student)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                              onClick={() => handleDeleteStudent(student.studentId)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Tuổi:</span> {student.age || 'N/A'}</p>
                        <p><span className="font-medium">Giới tính:</span> {student.gender}</p>
                        <p><span className="font-medium">Email:</span> {student.email}</p>
                        <p><span className="font-medium">SĐT:</span> {student.phone}</p>
                        <p><span className="font-medium">Địa chỉ:</span> {student.address}</p>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="font-medium">GPA:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              student.gpa && student.gpa >= 8.5 ? 'bg-green-100 text-green-700' :
                                  student.gpa && student.gpa >= 7.0 ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                          }`}>
                      {student.gpa?.toFixed(1) || 'N/A'}
                    </span>
                        </div>
                      </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">Không có học sinh nào để hiển thị.</p>
            )}
          </div>
        </div>
      </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <nav className="bg-white shadow-lg sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-800">EduManage</span>
              </div>

              <div className="flex space-x-1">
                <button
                    onClick={() => setCurrentPage('home')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 'home'
                            ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Trang Chủ
                </button>
                <button
                    onClick={() => setCurrentPage('about')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 'about'
                            ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <Info className="w-4 h-4 inline mr-2" />
                  Giới Thiệu
                </button>
                <button
                    onClick={() => setCurrentPage('students')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 'students'
                            ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Quản Lý Học Sinh
                </button>
                <button
                    onClick={() => setShowContact(true)}
                    className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Liên Hệ
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-8 px-4">
          {currentPage === 'home' && renderHomePage()}
          {currentPage === 'about' && renderAboutPage()}
          {currentPage === 'students' && renderStudentManagement()}
        </main>

        {showContact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Thông Tin Liên Hệ</h2>
                  <button
                      onClick={() => setShowContact(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Số Điện Thoại</p>
                      <p className="text-gray-600">028 3456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <Info className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">contact@edumanage.vn</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Địa Chỉ Công Ty</p>
                      <p className="text-gray-600">123 Nguyễn Văn Cừ, Q.1, TP.HCM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <p className="text-center text-gray-600 text-sm">
                    Giờ làm việc: 8:00 - 17:30 (Thứ 2 - Thứ 6)
                  </p>
                </div>
              </div>
            </div>
        )}

        {showStudentForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 transform transition-all max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingStudent ? 'Chỉnh Sửa Học Sinh' : 'Thêm Học Sinh Mới'}
                  </h2>
                  <button
                      onClick={() => {
                        setShowStudentForm(false);
                        setFormError(null); // Xóa lỗi khi đóng form
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {formError}
                    </div>
                )}

                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tuổi</label>
                      <input
                          type="number"
                          required
                          min="5"
                          max="25"
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giới Tính</label>
                      <select
                          required
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                    <input
                        type="text"
                        required
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số Điện Thoại</label>
                    <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa Chỉ</label>
                    <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                    <input
                        type="number"
                        required
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => {
                          setShowStudentForm(false);
                          setFormError(null);
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      {editingStudent ? 'Cập Nhật' : 'Thêm Mới'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;