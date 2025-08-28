package com.example.demo.Repository;
import com.example.demo.entity.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CourseRepository extends JpaRepository<Courses, Integer> {
}
