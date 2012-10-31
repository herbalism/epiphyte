var config = module.exports;

config["browser tests"] = {
    environment: "browser",
    sources: ["*.js",
	      "user/*.js",
	      "ext/*.js",
	      "modules/when/*.js",
	      "modules/phloem/**/*.js"],
    tests: ["test/**/*.js"],
    libs: ["modules/curl/src/curl.js", "loaderconf.js"],
    extensions: [require("buster-amd")]
};



