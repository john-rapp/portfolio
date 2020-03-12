const ghpages = require("gh-pages");

ghpages.publish("dist", {
  branch: "master",
  repo: "https://github.com/john-rapp/john-rapp.github.io.git"
});
