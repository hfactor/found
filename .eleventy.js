const fs = require('fs');
const path = require('path');
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [300, 800],
        formats: ["jpeg"],
        outputDir: "_site/images/thumbnails/",
        urlPath: "/images/thumbnails/"
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/css");

    eleventyConfig.addCollection("allImages", async function() {
        const imageDir = "src/images";
        const allImages = [];
        
        if (!fs.existsSync(imageDir)) {
            console.log("Image directory not found:", imageDir);
            return allImages;
        }
        
        const folderEntries = fs.readdirSync(imageDir)
            .filter(item => fs.statSync(path.join(imageDir, item)).isDirectory());

        console.log("Found folders:", folderEntries);

        // Process all folders first
        for (const folder of folderEntries) {
            const folderPath = path.join(imageDir, folder);
            const files = fs.readdirSync(folderPath)
                .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

            console.log(`Processing folder ${folder} with ${files.length} files`);

            const processedFiles = await Promise.all(files.map(async file => {
                const filePath = path.join(imageDir, folder, file);

                try {
                    const metadata = await Image(filePath, {
                        widths: [800],
                        formats: ["jpeg"],
                        outputDir: "_site/images/thumbnails",
                        urlPath: "/images/thumbnails",
                        sharpJpegOptions: {
                            quality: 85,
                            mozjpeg: true
                        }
                    });

                    return {
                        name: file,
                        path: `/images/${folder}/${file}`,
                        thumbnail: metadata.jpeg[0].url,
                        folder: folder
                    };
                } catch (error) {
                    console.error(`Error processing ${file}:`, error);
                    return null;
                }
            }));

            allImages.push(...processedFiles.filter(Boolean));
        }
        
        // Shuffle the array before returning
        const shuffled = [...allImages].sort(() => Math.random() - 0.5);
        console.log(`Total images processed: ${shuffled.length}`);
        return shuffled;
    });

    // Add API endpoint
    eleventyConfig.addCollection("apiImages", function(collection) {
        return collection.getFilteredByGlob("src/images/**/*.{jpg,jpeg,png}");
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        }
    };
};