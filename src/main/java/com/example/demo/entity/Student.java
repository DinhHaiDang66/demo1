package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long student_id;

    private String first_name;
    private String last_name;
    private String email;
    private LocalDate dob;

    // Getter + Setter
    public Long getStudent_id() {
        return student_id;
    }
    public void setStudent_id(Long student_id) {
        this.student_id = student_id;
    }
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public LocalDate getDob() {
        return dob;
    }
    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    // ✅ Thêm toString để in đẹp
    @Override
    public String toString() {
        return "Student{" +
                "id=" + student_id +
                ", name='" + first_name + " " + last_name + '\'' +
                ", email='" + email + '\'' +
                ", dob=" + dob +
                '}';
    }
}
