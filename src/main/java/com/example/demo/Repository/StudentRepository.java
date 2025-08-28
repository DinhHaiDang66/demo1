package com.example.demo.Repository;

import com.example.demo.entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Students, Integer> {
    // Tìm sinh viên theo email
    Optional<Students> findByEmail(String email);

    // Kiểm tra sự tồn tại của sinh viên theo ID
    boolean existsById(Integer id);
}
