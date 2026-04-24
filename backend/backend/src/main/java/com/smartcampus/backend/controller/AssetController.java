package com.smartcampus.backend.controller;

import com.smartcampus.backend.model.Asset;
import com.smartcampus.backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")

public class AssetController {
    
    @Autowired
    private AssetService assetService;

    @GetMapping
    public List<Asset> getAllAssets() {
        return assetService.getAllAssets();
    }

    @PostMapping
    public Asset createAsset(@RequestBody Asset asset) {
        return assetService.saveAsset(asset);
    }

    @GetMapping("/facility/{facilityId}")
    public List<Asset> getAssetsByFacility(@PathVariable Long facilityId) {
        return assetService.getAssetsByFacility(facilityId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset assetDetails) {
        return assetService.getAssetById(id)
            .map(asset -> {
                asset.setAssetName(assetDetails.getAssetName());
                asset.setAssetTag(assetDetails.getAssetTag());
                asset.setAssetCondition(assetDetails.getAssetCondition());
                asset.setFacility(assetDetails.getFacility()); 
                
                Asset updatedAsset = assetService.saveAsset(asset);
                return ResponseEntity.ok(updatedAsset);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.ok("Asset deleted successfully!");
    }
    
}
