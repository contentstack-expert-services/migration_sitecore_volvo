/**
 * External module Dependencies.
 */
var mkdirp = require("mkdirp"),
  path = require("path"),
  _ = require("lodash"),
  parseString = require("xml2js").parseString,
  fs = require("fs"),
  when = require("when"),
  axios = require("axios"),
  chalk = require("chalk"),
  read = require("fs-readdir-recursive");
// const { config } = require("process");
/**
 * Internal module Dependencies .
 */
var helper = require("../utils/helper");

var jsonFile = global.config.sitecore_json;

var assetConfig = config.modules.asset;
var assetFolderPath = path.resolve(config.data, assetConfig.dirName);
var assetMasterFolderPath = path.resolve(process.cwd(), "logs", "assets");

if (!fs.existsSync(assetFolderPath)) {
  mkdirp.sync(assetFolderPath);
  helper.writeFile(path.join(assetFolderPath, assetConfig.fileName));
  mkdirp.sync(assetMasterFolderPath);
  helper.writeFile(path.join(assetMasterFolderPath, "failed.json"));
} else {
  if (!fs.existsSync(path.join(assetFolderPath, assetConfig.fileName)))
    helper.writeFile(path.join(assetFolderPath, assetConfig.fileName));
  helper.writeFile(path.join(assetMasterFolderPath, "failed.json"));
}
//Reading a File
var assetData = helper.readFile(
  path.join(assetFolderPath, assetConfig.fileName)
);
var failedJSON =
  helper.readFile(path.join(assetMasterFolderPath, "failed.json")) || {};


var imageFileVariants = ['image', 'videoUltrawideMp4', 'imageUltrawide', 'disableFullWidthHero', 'imageSquare', 'videoSquareMp4', 'videoSquareWebm', 'videoUltrawideWebm',  'imageWide', 'imageStandard', 'videoWideMp4', 'videoWideWebm', 'imageUltraWide' ]
function ExtractAssets() {}

ExtractAssets.prototype = {
  getAllAssets: function () {
    var self = this;
    return when.promise(async function (resolve, reject) {
      var jsonData = helper.readFile(jsonFile);
      const objKeys = Object.keys(jsonData.data.slots);
      objKeys.forEach((el) => {
        const assetFiles = jsonData.data.slots[el];
        assetFiles.forEach((dt) => {
          const assetFields = Object.keys(dt["fields"]);
          assetFields.forEach((ele) => {
            imageFileVariants.forEach(async (vr) => {
            var assetType =
              !assetFiles?.[0]?.fields?.[ele]?.length > 0
                ? assetFiles?.[0]?.fields?.[ele]?.file?.mediaType
                : assetFiles?.[0]?.fields?.[ele]?.[0]?.fields?.[vr]?.file?.mediaType
            var assetUrl =
              !assetFiles?.[0]?.fields?.[ele]?.length > 0
                ? assetFiles?.[0]?.fields?.[ele]?.file?.url
                : assetFiles?.[0]?.fields?.[ele]?.[0]?.fields?.[vr]?.file?.url

            var url = assetUrl && encodeURI(assetUrl);
            var name =
              !assetFiles?.[0]?.fields?.[ele]?.length > 0
                ? assetFiles?.[0]?.fields?.[ele]?.file?.name
                : assetFiles?.[0]?.fields?.[ele]?.[0]?.fields?.[vr]?.file?.name
              console.log(name?.replace(/-/g, '_'))
            if (typeof url === "string") {
              try {
                const response = await axios.get(url, {
                  responseType: "arraybuffer",
                });
                mkdirp.sync(path.resolve(assetFolderPath, `assets_${name}`));
                if (assetType === "video/mp4") {
                  fs.writeFileSync(
                    path.join(assetFolderPath, `assets_${name}`, name + ".mp4"),
                    response.data
                  );
                } else if (assetType === "image/jpeg") {
                  fs.writeFileSync(
                    path.join(
                      assetFolderPath,
                      `assets_${name}`,
                      name + ".jpeg"
                    ),
                    response.data
                  );
                }

                assetData[`assets_${name}`] = {
                  uid: `assets_${name?.replace(/-/g, '_')}`,
                  status: true,
                  tag: [],
                  filename: assetType === "image/jpeg" ? `${name}.jpeg` : assetType === "video/mp4" ?  `${name}.mp4` : '',
                  url: url,
                  is_dir: false,
                  parent_uid: null,
                  _version: 1,
                  title: name,
                  publish_details: [],
                };

                if (failedJSON[`assets_${name}`]) {
                  delete failedJSON[`assets_${name}`];
                }
                helper.writeFile(
                  path.join(assetFolderPath, assetConfig.fileName),
                  JSON.stringify(assetData, null, 4)
                );
                console.log(
                  "An asset with id",
                  chalk.green(`${name}`),
                  "and name",
                  chalk.green(`${name}`),
                  "got downloaded successfully."
                );
              } catch (error) {

                failedJSON[`assets_${name}`] = {
                  failedUid: name,
                  name: name,
                  url: url,
                  reason_for_error: error.message,
                };
                helper.writeFile(
                  path.join(assetMasterFolderPath, "failed.json"),
                  JSON.stringify(failedJSON, null, 4)
                );
                console.error(
                  "Failed to download asset with id",
                  chalk.red(`${name.toString()}`),
                  "and name",
                  chalk.red(`${name}`),
                  `: ${error}`
                );
              }
            }
          });
        });
        });
      });
      resolve()
    });
  },
  start: function () {
    var self = this;
    return when.promise(function (resolve, reject) {
      self
        .getAllAssets()
        .then(function () {
          resolve();
        })
        .catch(function () {
          reject();
        });
    });
  },
};

module.exports = ExtractAssets;
