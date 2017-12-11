"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by liukeyi on 2017/12/11.
 */
var path = require('path');
var fs = require('fs');
var transform_1 = require("./transform");
function generateDir(path, dir) {
}
function generateIndexFile() { }
function isSimpleType(v) {
    return ['[object Boolean]', '[object String]', '[object Number]', '[object Array]'].indexOf(Object.prototype.toString.call(v)) > -1;
}
function transformObjectToNode(originData) {
    var result = {
        properties: [],
        childNode: []
    };
    if (Object.entries) {
        for (var _i = 0, _a = Object.entries(originData); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (isSimpleType(value)) {
                result.properties.push({
                    key: key,
                    value: value
                });
            }
            else {
                result.childNode.push({
                    key: key,
                    value: transformObjectToNode(value)
                });
            }
        }
    }
    else {
        Object.keys(originData).forEach(function (key) {
            var value = originData[key];
            if (isSimpleType(value)) {
                result.properties.push({
                    key: key,
                    value: value
                });
            }
            else {
                result.childNode.push({
                    key: key,
                    value: transformObjectToNode(value)
                });
            }
        });
    }
    return result;
}
module.exports = function generate(startNode, test) {
    var jsonFile = fs.readFileSync(path.resolve(__dirname, '../test/test.json'), {
        encoding: 'utf-8'
    });
    try {
        var originData = JSON.parse(jsonFile);
        var node = transform_1.transformObjectToTree(originData);
        for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            console.log(property.key);
            console.log(property.value);
        }
    }
    catch (e) {
        console.log(e);
    }
};
