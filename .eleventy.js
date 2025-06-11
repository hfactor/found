const fs = require('fs');
const path = require('path');
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Existing image directory passthrough
  eleventyConfig.addPassthroughCopy("src/images");
  
  // Add new passthrough copies for modal files
  eleventyConfig.addPassthroughCopy({
    "src/js/modal.js": "js/modal.js",
    "src/css/modal.css": "css/modal.css"
  });

  eleventyConfig.addGlobalData("allImagesData", async () => {
    const imageDir = "src/images";
    const allImages = [];
    
    if (!fs.existsSync(imageDir)) return { allImages };
    
    const folderEntries = fs.readdirSync(imageDir)
      .filter(item => fs.statSync(path.join(imageDir, item)).isDirectory());

    for (const folder of folderEntries) {
      const folderPath = path.join(imageDir, folder);
      const files = fs.readdirSync(folderPath)
        .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

      const processedFiles = await Promise.all(files.map(async file => {
        const filePath = path.join(imageDir, folder, file);

        try {
          const metadata = await Image(filePath, {
            widths: [256],
            formats: ["jpeg"],
            outputDir: "_site/images/thumbnails",
            urlPath: "/images/thumbnails",
            sharpJpegOptions: {
              background: 'white'
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
    
    return { allImages };
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    pathPrefix: "/"
  };
};