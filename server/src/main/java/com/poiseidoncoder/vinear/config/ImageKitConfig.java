package com.poiseidoncoder.vinear.config;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.utils.Utils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class ImageKitConfig {

    @Bean
    public ImageKit imageKit() throws IOException {
        io.imagekit.sdk.config.Configuration config = Utils.getSystemConfig(ImageKitConfig.class);
        ImageKit imageKit = ImageKit.getInstance();
        imageKit.setConfig(config);
        return imageKit;
    }
}
