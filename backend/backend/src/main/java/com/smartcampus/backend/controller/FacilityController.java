package com.smartcampus.backend.controller;

import com.smartcampus.backend.model.Facility;
import com.smartcampus.backend.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "*")

public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    // 1. GET:(Read All)
    @GetMapping
    public List<Facility> getAllFacilities() {
        return facilityService.getAllFacilities();
    }

    // 2. POST:(Create)
    @PostMapping
    public Facility createFacility(@RequestBody Facility facility) {
        return facilityService.saveFacility(facility);
    }

    // 3. GET: ID (Read Single)
    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable Long id) {
        return facilityService.getFacilityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFacility(@PathVariable Long id) {
        facilityService.deleteFacility(id);
        return ResponseEntity.ok("Facility deleted successfully!");
    }

    // 4. PUT
@PutMapping("/{id}")
public ResponseEntity<Facility> updateFacility(@PathVariable Long id, @RequestBody Facility facilityDetails) {
    return facilityService.getFacilityById(id)
            .map(facility -> {
                facility.setName(facilityDetails.getName());
                facility.setType(facilityDetails.getType());
                facility.setLocation(facilityDetails.getLocation());
                facility.setCapacity(facilityDetails.getCapacity());
                facility.setDescription(facilityDetails.getDescription());
                facility.setStatus(facilityDetails.getStatus());
                
                Facility updatedFacility = facilityService.saveFacility(facility);
                return ResponseEntity.ok(updatedFacility);
            })
            .orElse(ResponseEntity.notFound().build());
}
    
}
