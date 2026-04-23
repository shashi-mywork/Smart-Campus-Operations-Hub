package com.smartcampus.backend.service;

import com.smartcampus.backend.model.Facility;
import com.smartcampus.backend.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    //all facilities
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    //save facility
    public Facility saveFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    // get facility by id
    public Optional<Facility> getFacilityById(Long id) {
        return facilityRepository.findById(id);
    }

    //(Delete)
    public void deleteFacility(Long id) {
        facilityRepository.deleteById(id);
    }
    
}
