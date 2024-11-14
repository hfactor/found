const fs = require('fs');
const path = require('path');
const Image = require("@11ty/eleventy-img");

const imageOptions = {
  widths: [256],
  formats: ["jpeg", "webp"],
  outputDir: "_site/img/thumbnails",
  urlPath: "/The-Found/img/thumbnails",  // Updated for GitHub Pages
  filenameFormat: (id, src, width, format) => {
    const extension = path.extname(src);
    const name = path.basename(src, extension);
    return `${name}-${width}.${format}`;
  }
};

async function processImage(src) {
  try {
    const metadata = await Image(src, imageOptions);
    return {
      webp: metadata.webp[0],
      jpeg: metadata.jpeg[0],
      width: metadata.webp[0].width,
      height: metadata.webp[0].height
    };
  } catch (error) {
    console.error(`Error processing image ${src}:`, error);
    return null;
  }
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addGlobalData("imagesByFolder", async () => {
    const imageDir = "src/images";
    const folders = [];
    
    try {
      if (!fs.existsSync(imageDir)) {
        console.warn("Images directory not found!");
        return folders;
      }

      const folderEntries = fs.readdirSync(imageDir)
        .filter(item => fs.statSync(path.join(imageDir, item)).isDirectory());

      for (const folder of folderEntries) {
        const folderPath = path.join(imageDir, folder);
        const files = fs.readdirSync(folderPath)
          .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        const processedFiles = await Promise.all(
          files.map(async file => {
            const filePath = path.join(imageDir, folder, file);
            const imageData = await processImage(filePath);
            
            if (!imageData) return null;

            return {
              name: file,
              path: `/found/images/${folder}/${file}`,
              thumbnail: {
                webp: imageData.webp.url,
                jpeg: imageData.jpeg.url,
                width: imageData.width,
                height: imageData.height
              }
            };
          })
        );

        folders.push({
          name: folder,
          files: processedFiles.filter(Boolean)
        });
      }
    } catch (error) {
      console.error("Error processing images:", error);
    }
    
    return folders.sort((a, b) => b.name.localeCompare(a.name));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    pathPrefix: "/found/"  // Add this for GitHub Pages
  };
};