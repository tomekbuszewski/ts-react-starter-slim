const { readdirSync } = require("fs");
const path = require("path");

const newFileInfo = {
  userName: require("os").userInfo().username,
  created: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
};

const getReducers = () => {
  const dirs = readdirSync(path.resolve("src", "redux"), {
    withFileTypes: true,
  });

  return dirs
    .map((dir) => {
      if (dir.isDirectory()) {
        return dir;
      }

      return null;
    })
    .filter(Boolean);
};

module.exports = {
  newFileInfo,
  getReducers,
};
