package com.example.demo.service;

import com.example.demo.Repository.StudentCourseRepository;
import com.example.demo.Repository.StudentRepository;
import com.example.demo.entity.Students;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentCourseRepository studentCourseRepository;

    public void deleteStudent(Integer studentId) {
        // Xóa các liên kết với course trước
        studentCourseRepository.deleteByStudent_StudentId(studentId);
        // Xóa sinh viên
        studentRepository.deleteById(studentId);
    }
}





