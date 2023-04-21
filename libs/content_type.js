var mkdirp = require("mkdirp"),
  path = require("path"),
  fs = require("fs"),
  when = require("when");

// const { config } = require("process");

var contentTypeConfig = config.modules.contentTypes,
  contentTypeFolderPath = path.resolve(config.data, contentTypeConfig.dirName);

var helper = require("../utils/helper");

if (!fs.existsSync(contentTypeFolderPath)) {
  mkdirp.sync(contentTypeFolderPath);
  helper.writeFile(path.join(contentTypeFolderPath, "intro.json"));
}

function ExtractContentType() {}

ExtractContentType.prototype = {
  start: function () {
    successLogger(`exporting content-type`);
    var sitecoreSchema = {
      title: "Intro",
      uid: "intro",
      schema: [
        {
          data_type: "text",
          display_name: "Title",
          field_metadata: { _default: true, version: 1 },
          mandatory: true,
          uid: "title",
          unique: true,
          multiple: false,
          non_localizable: false,
        },
        {
          display_name: "URL",
          uid: "url",
          data_type: "text",
          field_metadata: {
            _default: true,
          },
          unique: true,
          mandatory: false,
          multiple: false,
        },
        {
          data_type: "blocks",
          display_name: "Stats And Drive Call outs Slot",
          blocks: [
            {
              title: "Editor Component",
              uid: "editor_component",
              schema: [
                {
                  data_type: "text",
                  display_name: "Title",
                  uid: "title",
                  field_metadata: {
                    description: "",
                    default_value: "",
                    version: 1,
                  },
                  format: "",
                  error_messages: { format: "" },
                  mandatory: false,
                  multiple: false,
                  non_localizable: false,
                  unique: false,
                },
                {
                  data_type: "text",
                  display_name: "Sub Title",
                  uid: "sub_title",
                  field_metadata: {
                    description: "",
                    default_value: "",
                    version: 1,
                  },
                  format: "",
                  error_messages: { format: "" },
                  mandatory: false,
                  multiple: false,
                  non_localizable: false,
                  unique: false,
                },
                {
                  data_type: "text",
                  display_name: "Disclaimer",
                  uid: "disclaimer",
                  field_metadata: {
                    description: "",
                    default_value: "",
                    multiline: true,
                    version: 1,
                  },
                  format: "",
                  error_messages: { format: "" },
                  mandatory: false,
                  multiple: false,
                  non_localizable: false,
                  unique: false,
                },
                {
                  data_type: "text",
                  display_name: "Bev or Phev Type",
                  uid: "bev_or_phev_type",
                  field_metadata: {
                    description: "",
                    default_value: "",
                    version: 1,
                  },
                  format: "",
                  error_messages: { format: "" },
                  mandatory: false,
                  multiple: false,
                  non_localizable: false,
                  unique: false,
                },
                {
                  data_type: "text",
                  display_name: "Test Drive Btn Label",
                  uid: "test_drive_btn_label",
                  field_metadata: {
                    description: "",
                    default_value: "",
                    version: 1,
                  },
                  format: "",
                  error_messages: { format: "" },
                  mandatory: false,
                  multiple: false,
                  non_localizable: false,
                  unique: false,
                },
              ],
            },
            {
              title: "calloutItems",
              uid: "calloutitems",
              schema: [
                {
                  data_type: "group",
                  display_name: "Group",
                  field_metadata: { description: "", instruction: "" },
                  schema: [
                    {
                      data_type: "text",
                      display_name: "Title",
                      uid: "title",
                      field_metadata: {
                        description: "",
                        default_value: "",
                        version: 1,
                      },
                      format: "",
                      error_messages: { format: "" },
                      mandatory: false,
                      multiple: false,
                      non_localizable: false,
                      unique: false,
                    },
                    {
                      data_type: "text",
                      display_name: "Description ",
                      uid: "description_",
                      field_metadata: {
                        description: "",
                        default_value: "",
                        multiline: true,
                        version: 1,
                      },
                      format: "",
                      error_messages: { format: "" },
                      mandatory: false,
                      multiple: false,
                      non_localizable: false,
                      unique: false,
                    },
                  ],
                  uid: "group",
                  mandatory: false,
                  multiple: true,
                  non_localizable: false,
                  unique: false,
                },
              ],
            },
            {
              title: "statsItems",
              uid: "statsitems",
              schema: [
                {
                  data_type: "group",
                  display_name: "Group",
                  field_metadata: { description: "", instruction: "" },
                  schema: [
                    {
                      data_type: "text",
                      display_name: "attribute",
                      uid: "attribute",
                      field_metadata: {
                        description: "",
                        default_value: "",
                        version: 1,
                      },
                      format: "",
                      error_messages: { format: "" },
                      mandatory: false,
                      multiple: false,
                      non_localizable: false,
                      unique: false,
                    },
                    {
                      data_type: "text",
                      display_name: "unit",
                      uid: "unit",
                      field_metadata: {
                        description: "",
                        default_value: "",
                        version: 1,
                      },
                      format: "",
                      error_messages: { format: "" },
                      mandatory: false,
                      multiple: false,
                      non_localizable: false,
                      unique: false,
                    },
                    {
                      data_type: "text",
                      display_name: "fieldKey",
                      uid: "fieldkey",
                      field_metadata: {
                        description: "",
                        default_value: "",
                        version: 1,
                      },
                      format: "",
                      error_messages: { format: "" },
                      mandatory: false,
                      multiple: false,
                      non_localizable: false,
                      unique: false,
                    },
                    {
                      data_type: "text",
                      display_name: "value",
                      uid: "value",
                      field_metadata: {
                        description: "",
                        default_value: "",
                        version: 1,
                      },
                      format: "",
                      error_messages: { format: "" },
                      mandatory: false,
                      multiple: false,
                      non_localizable: false,
                      unique: false,
                    },
                  ],
                  uid: "group",
                  mandatory: false,
                  multiple: true,
                  non_localizable: false,
                  unique: false,
                },
              ],
            },
          ],
          multiple: true,
          uid: "stats_and_drive_call_outs_slot",
          field_metadata: { instruction: "", description: "" },
          mandatory: false,
          non_localizable: false,
          unique: false,
        },
      ],
      options: {
        is_page: true,
        title: "title",
        sub_title: [],
        description: "list of sitecore",
        _version: 1,
        url_prefix: "/news/",
        url_pattern: "/:title",
        singleton: false,
      },
      description: "Schema for Intro",
      abilities: {
        get_one_object: true,
        get_all_objects: true,
        create_object: true,
        update_object: true,
        delete_object: true,
        delete_all_objects: true,
      },
    };

    helper.writeFile(
      path.join(contentTypeFolderPath, "intro.json"),
      JSON.stringify(sitecoreSchema, null, 4),
      (err) => {
        if (err) throw err;
      }
    );
  },
};

module.exports = ExtractContentType;
