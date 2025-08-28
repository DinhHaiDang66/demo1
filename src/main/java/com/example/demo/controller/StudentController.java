package com.example.demo.controller;

import com.example.demo.Repository.StudentCourseRepository;
import com.example.demo.Repository.StudentRepository;
import com.example.demo.entity.Students;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")


public class StudentController {

    private final StudentRepository studentRepository;
    private final StudentCourseRepository studentCourseRepository;
    private final StudentService studentService;
    @Autowired
    public StudentController(StudentRepository studentRepository, StudentCourseRepository studentCourseRepository, StudentService studentService) {
        this.studentRepository = studentRepository;
        this.studentCourseRepository = studentCourseRepository;
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Students> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping("/students")
    public ResponseEntity<Students> addStudent(@RequestBody Students student) {
        try {
            System.out.println("Received student from frontend: " + (student != null ? student.toString() : "null"));
            if (student == null) {
                System.out.println("Student object is null");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            // Kiểm tra các trường bắt buộc
            if (student.getName() == null || student.getGender() == null || student.getEmail() == null) {
                System.out.println("Missing required fields: name=" + student.getName() + ", gender=" + student.getGender() + ", email=" + student.getEmail());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            // Kiểm tra email trùng
            Optional<Students> existingStudent = studentRepository.findByEmail(student.getEmail());
            if (existingStudent.isPresent()) {
                System.out.println("Email already exists: " + student.getEmail());
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            // In các giá trị để debug
            System.out.println("Saving student: name=" + student.getName() + ", age=" + student.getAge() +
                    ", gender=" + student.getGender() + ", email=" + student.getEmail() +
                    ", grade=" + student.getGrade() + ", phone=" + student.getPhone() +
                    ", address=" + student.getAddress() + ", gpa=" + student.getGpa());
            Students savedStudent = studentRepository.save(student);
            System.out.println("Successfully saved student: " + savedStudent);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error in addStudent: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<Students> updateStudent(@PathVariable Integer id, @RequestBody Students studentDetails) {
        try {
            Optional<Students> studentOptional = studentRepository.findById(id);
            if (studentOptional.isPresent()) {
                Students student = studentOptional.get();
                student.setName(studentDetails.getName());
                student.setAge(studentDetails.getAge());
                student.setGender(studentDetails.getGender());
                student.setEmail(studentDetails.getEmail());
                student.setGrade(studentDetails.getGrade());
                student.setPhone(studentDetails.getPhone());
                student.setAddress(studentDetails.getAddress());
                student.setGpa(studentDetails.getGpa());

                Optional<Students> existingStudent = studentRepository.findByEmail(studentDetails.getEmail());
                if (existingStudent.isPresent() && !existingStudent.get().getStudentId().equals(id)) {
                    return new ResponseEntity<>(HttpStatus.CONFLICT);
                }

                Students updatedStudent = studentRepository.save(student);
                return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Error in updateStudent: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Integer id) {
        try {
            System.out.println("Received DELETE request for student ID: " + id);
            if (studentRepository.existsById(id)) {
                studentRepository.deleteById(id); // Sử dụng cascade từ entity
                System.out.println("Successfully deleted student with ID: " + id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                System.out.println("Student not found with ID: " + id);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Error in deleteStudent for ID " + id + ": " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }








}