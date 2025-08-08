package com.poiseidoncoder.vinear.service;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageKitService {
    ImageKit imageKit;

    public String uploadImage(byte[] fileBytes, String fileName) throws Exception {
        FileCreateRequest request = new FileCreateRequest(fileBytes, fileName);

        Result result = imageKit.upload(request);
        return result.getUrl();
    }
}
