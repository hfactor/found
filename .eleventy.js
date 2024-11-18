const fs = require('fs');
const path = require('path');
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addGlobalData("imagesByFolder", async () => {
    const imageDir = "src/images";
    const folders = [];
    
    if (!fs.existsSync(imageDir)) return folders;
    
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
              background: 'white'  // Set white background for thumbnails
            }
          });

          return {
            name: file,
            path: `/images/${folder}/${file}`,
            thumbnail: metadata.jpeg[0].url
          };
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
          return null;
        }
      }));

      folders.push({
        name: folder,
        files: processedFiles.filter(Boolean)
      });
    }
    
    return folders.sort((a, b) => b.name.localeCompare(a.name));
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