var mkdirp = require("mkdirp"),
  path = require("path"),
  fs = require("fs"),
  when = require("when");

const read = require("fs-readdir-recursive");
/**
 * Internal module Dependencies.
 */

var entriesConfig = config.modules.entries,
  entriesFolderPath = path.resolve(config.data, entriesConfig.dirName, "intro");

var helper = require("../utils/helper");

if (!fs.existsSync(entriesFolderPath)) {
  mkdirp.sync(entriesFolderPath);
  helper.writeFile(path.join(entriesFolderPath, entriesConfig.fileName));
}

var jsonFile = global.config.sitecore_json;

function ExtractEntries() {}

ExtractEntries.prototype = {
  getEntries: function (data) {
    // console.log( data.heroSlot );
    return when.promise(function (resolve, reject) {
      var entryData = helper.readFile(
        path.join(entriesFolderPath, entriesConfig.fileName)
      );
      data.statsAndDriveCalloutsSlot.forEach((el) => {
        const callOutDetails = el.fields.calloutItems.map((item) => {
          return {
            title: item.fields.title,
            description: item.fields.description,
          };
        });

        const statsItems = el.fields.statsItems.map((item) => {
          return {
            attribute: item.fields.attribute,
            unit: item.fields.unit,
            value: item.fields.value,
            fieldKey: item.fields.fieldKey,
          };
        });

        //   console.log(callOut);
        uid = "sitecore_entries";
        entryData[uid] = {
          uid: uid,
          title: "Intro",
          stats_and_drive_call_outs_slot: [
            {
              editor_component: {
                title: el?.fields?.title,
                sub_title: el?.fields?.subTitle,
                disclaimer: el?.fields?.disclaimer,
                bev_or_phev_type: el?.fields?.bevOrPhevType,
                test_drive_btn_label: el?.fields?.testDriveBtnLabel,
                _metadata: { uid: "cs8712f59576a27bf2" },
              },
            },
            {
              calloutitems: {
                group: callOutDetails,
                _metadata: { uid: "csab362beea25b78d7" },
              },
            },
            {
              statsitems: {
                group: statsItems,
                _metadata: { uid: "cs2083b747b8697e18" },
              },
            },
          ],
          is_online_sales_model: el.fields.isOnlineSalesModel,
          disclaimerTexts: el.fields.disclaimerTexts,
          cta_title: el.fields.ctaTitle,
          msrp_title: el.fields.msrpTitle,
          alternative_subscribe_value: el.fields.alternativeSubscribeValue,
          buy_title: el.fields.buyTitle,
        };

        helper.writeFile(
          path.join(entriesFolderPath, entriesConfig.fileName),
          JSON.stringify(entryData, null, 4)
        );
        resolve();
      });
    });
  },

  start: function () {
    var self = this;
    successLogger(`exporting entries`);
    return when.promise(function (resolve, reject) {
      var jsonData = helper.readFile(jsonFile);
      //   const objKeys = Object.keys(jsonData.data.slots);
      let slot = jsonData.data.slots;
      self
        .getEntries(slot)
        .then(function () {
          resolve();
        })
        .catch(function (error) {
          console.log("error", error);
          reject();
        });
    });
  },
};

module.exports = ExtractEntries;
