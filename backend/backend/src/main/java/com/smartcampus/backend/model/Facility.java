package com.smartcampus.backend.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "facilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // LECTURE_HALL, LAB, etc.

    @Column(nullable = false)
    private String location;

    private Integer capacity;

    private String description;

    private String status = "AVAILABLE"; 
}
