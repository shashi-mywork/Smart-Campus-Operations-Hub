package com.smartcampus.backend.repository;

import com.smartcampus.backend.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    
    // Find assets by facility ID
    List<Asset> findByFacilityId(Long facilityId);
}
