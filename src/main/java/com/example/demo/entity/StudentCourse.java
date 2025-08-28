package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Student_Course")
public class StudentCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "student_id") // phải trùng với tên cột FK
    private Students student; // <-- bắt buộc phải có để mappedBy hoạt động

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Courses course;

    @Column(name = "enrollment_date")
    private Date enrollmentDate = new Date();

    // Getter và Setter
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Students getStudent() { return student; }
    public void setStudent(Students student) { this.student = student; }

    public Courses getCourse() { return course; }
    public void setCourse(Courses course) { this.course = course; }

    public Date getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(Date enrollmentDate) { this.enrollmentDate = enrollmentDate; }
}
