package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Enrollment")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enrollment_id;

    private Long student_id;
    private Long course_id;
    private LocalDate enrollment_date;

    // Getter & Setter
    public Long getEnrollment_id() { return enrollment_id; }
    public void setEnrollment_id(Long enrollment_id) { this.enrollment_id = enrollment_id; }

    public Long getStudent_id() { return student_id; }
    public void setStudent_id(Long student_id) { this.student_id = student_id; }

    public Long getCourse_id() { return course_id; }
    public void setCourse_id(Long course_id) { this.course_id = course_id; }

    public LocalDate getEnrollment_date() { return enrollment_date; }
    public void setEnrollment_date(LocalDate enrollment_date) { this.enrollment_date = enrollment_date; }
}
