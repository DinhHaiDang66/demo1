package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long course_id;

    private String course_name;
    private int credit;

    // Getter & Setter
    public Long getCourse_id() { return course_id; }
    public void setCourse_id(Long course_id) { this.course_id = course_id; }

    public String getCourse_name() { return course_name; }
    public void setCourse_name(String course_name) { this.course_name = course_name; }

    public int getCredit() { return credit; }
    public void setCredit(int credit) { this.credit = credit; }
}
