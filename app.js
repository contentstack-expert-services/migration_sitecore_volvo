var path = require("path"),
  chalk = require("chalk"),
  fs = require("fs"),
  inquirer = require("inquirer"),
  sequence = require("when/sequence"),
  helper = require("./utils/helper");

_ = require("lodash");
const Messages = require("./utils/message");
const messages = new Messages("wordpress").msgs;

config = require("./config");
global.errorLogger = require("./utils/logger")("error").error;
global.successLogger = require("./utils/logger")("success").log;
global.warnLogger = require("./utils/logger")("warn").log;

var modulesList = [
  // "assets",
  "content_type",
  "entries",
]; //to create entries
// var contentList = ["convert"]; // to create content type for the entries
var _export = [];

const migFunction = () => {
  try {
    global.filePath = undefined;
    // Module List for Entries
    for (var i = 0, total = modulesList.length; i < total; i++) {
      var ModuleExport = require("./libs/" + modulesList[i] + ".js");
      var moduleExport = new ModuleExport();
      _export.push(
        (function (moduleExport) {
          return function () {
            return moduleExport.start();
          };
        })(moduleExport)
      );
    }

    // Content List
    //create schema for the entries we  have created
    // for (var i = 0, total = contentList.length; i < total; i++) {
    //   var ContentExport = require("./content_types/" + contentList[i] + ".js");
    //   var contentExport = new ContentExport();
    //   _export.push(
    //     (function (contentExport) {
    //       return function () {
    //         return contentExport.start();
    //       };
    //     })(contentExport)
    //   );
    // }
  } catch (error) {
    console.log(error.message);
  }

  var taskResults = sequence(_export);

  taskResults
    .then(async function (results) {
      console.log(chalk.green("Data exporting has been completed"));
    })
    .catch(function (error) {
      console.log("error", error);
      errorLogger(error);
    });
  };

// to check if file exist or not
// const fileCheck = (csFileName, csFilePath) => {
//   const allowedExtension = ".xml";
//   const extension = path.extname(global.config.xml_filename);
//   if (allowedExtension === extension) {
//     if (fs.existsSync(global.config.xml_filename)) {
//       migFunction();
//     } else {
//       console.log(
//         chalk.red(`Please check`),
//         chalk.yellow(`File name "${csFileName}"`),
//         chalk.red(`or`),
//         chalk.yellow(`Filepath "${csFilePath}"`),
//         chalk.red(`are valid or not and try again!`)
//       );
//       XMLMigration();
//     }
//   } else {
//     console.log(chalk.red("use only .xml extension file"));
//   }
// };

module.exports = XMLMigration = async () => {
  const question = [
    {
      type: "input",
      name: "csFilePath",
      message: messages.promptFilePath,
      validate: (csFilePath) => {
        if (!csFilePath || csFilePath.trim() === "") {
          console.log(chalk.red("Please insert filepath!"));
          return false;
        }
        this.name = csFilePath;
        return true;
      },
    },
  ];

  inquirer.prompt(question).then(async (answer) => {
    try {
      global.config.sitecore_json = answer.csFilePath;
      migFunction();
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  });
};
