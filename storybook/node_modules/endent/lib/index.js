"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
const objectorarray_1 = __importDefault(require("objectorarray"));
const fast_json_parse_1 = __importDefault(require("fast-json-parse"));
const ENDENT_ID = "twhZNwxI1aFG3r4";
function endent(strings, ...values) {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            let value = values[i];
            let isJson = false;
            if (fast_json_parse_1.default(value).value) {
                value = fast_json_parse_1.default(value).value;
                isJson = true;
            }
            if ((value && value[ENDENT_ID]) || isJson) {
                let rawlines = result.split("\n");
                let l = rawlines[rawlines.length - 1].search(/\S/);
                let endentation = l > 0 ? " ".repeat(l) : "";
                let valueJson = isJson
                    ? JSON.stringify(value, null, 2)
                    : value[ENDENT_ID];
                let valueLines = valueJson.split("\n");
                valueLines.forEach((l, index) => {
                    if (index > 0) {
                        result += "\n" + endentation + l;
                    }
                    else {
                        result += l;
                    }
                });
            }
            else if (typeof value === "string" && value.includes("\n")) {
                let endentations = result.match(/(?:^|\n)( *)$/);
                if (typeof value === "string") {
                    let endentation = endentations ? endentations[1] : "";
                    result += value
                        .split("\n")
                        .map((str, i) => {
                        str = ENDENT_ID + str;
                        return i === 0 ? str : `${endentation}${str}`;
                    })
                        .join("\n");
                }
                else {
                    result += value;
                }
            }
            else {
                result += value;
            }
        }
    }
    result = dedent_1.default(result);
    return result.split(ENDENT_ID).join("");
}
endent.pretty = (data) => {
    return objectorarray_1.default(data)
        ? { [ENDENT_ID]: JSON.stringify(data, null, 2) }
        : data;
};
exports.default = endent;
