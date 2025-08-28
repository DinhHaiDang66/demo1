package com.example.demo;
import com.example.demo.Repository.StudentRepository;
import com.example.demo.entity.Students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class Demo1Application implements CommandLineRunner {
    @Autowired private StudentRepository studentRepository;
    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args); }
    @Override
    public void run(String... args) {
        List<Students> students = studentRepository.findAll();
        if (students.isEmpty()) {
            System.out.println("Không có sinh viên nào trong DB!");
        } else {
            students.forEach(s -> {
                System.out.println("Student: " + s.getName());

            });
        }
    }

}