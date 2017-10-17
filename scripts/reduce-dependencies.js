const fs = require("fs");
const path = require("path");

const redundantDeps = [
  "mediapicker",
  "@atlaskit/avatar",
  "@atlaskit/code",
  "@atlaskit/media-card",
  "@atlaskit/media-core",
  "@atlaskit/media-filmstrip",
  "@atlaskit/mention",
  "@atlaskit/spinner"
];

redundantDeps.forEach(dep => {
  const depPath = path.join(__dirname, "..", "node_modules", dep);
  const depPackageJson = path.join(depPath, "package.json");
  const depMainEntry = path.join(depPath, "index.js");

  console.log(`Getting rid of ${dep}`);

  const packageJson = JSON.parse(fs.readFileSync(depPackageJson, "utf8"));
  packageJson.main = "./index.js";
  fs.writeFileSync(depPackageJson, JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(depMainEntry, "");
});
