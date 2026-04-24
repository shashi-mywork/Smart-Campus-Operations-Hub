package com.smartcampus.backend.service;

import com.smartcampus.backend.model.Asset;
import com.smartcampus.backend.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class AssetService {
    
    @Autowired
    private AssetRepository assetRepository;

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Asset saveAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public List<Asset> getAssetsByFacility(Long facilityId) {
        return assetRepository.findByFacilityId(facilityId);
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }
}
