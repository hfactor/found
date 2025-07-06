module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection("apiImages", function(collection) {
        return collection.getFilteredByGlob("src/images/**/*.{jpg,jpeg,png}");
    });

    eleventyConfig.addPassthroughCopy("src/images");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            layouts: "_layouts"
        }
    };
}; 