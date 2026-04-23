package com.smartcampus.backend.controller;

import com.smartcampus.backend.model.Asset;
import com.smartcampus.backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
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
    
}
