var config = module.exports;

config["browser tests"] = {
    environment: "browser",
    sources: ["src/**/*.js",
	      "ext/**/*.js",
	      "modules/when/*.js",
	      "modules/phloem/**/*.js"],
    tests: ["test/**/*.js"],
    libs: ["modules/curl/src/curl.js", "loaderconf.js"],
    extensions: [require("buster-amd")]
};



