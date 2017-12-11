/**
 * Created by liukeyi on 2017/12/11.
 */
const path = require('path');
const fs = require('fs');

import { IPropertyTree, IMap } from './interface';
import { transformObjectToTree } from './transform';

function generateDir (path: string, dir: string) {

}

function generateIndexFile () {}

function isSimpleType (v: any) {
    return ['[object Boolean]', '[object String]', '[object Number]', '[object Array]'].indexOf(Object.prototype.toString.call(v)) > -1;
}

function transformObjectToNode (originData: object): IPropertyTree {
    let result: IPropertyTree = {
        properties: [],
        childNode: []
    };

    if (Object.entries) {
        for (let [key, value] of Object.entries(originData)) {
            if (isSimpleType(value)) {
                result.properties.push({
                    key,
                    value
                });
            } else {
                result.childNode.push({
                    key,
                    value: transformObjectToNode(value)
                });
            }
        }
    } else {
        Object.keys(originData).forEach((key) => {
            const value = originData[key];
            if (isSimpleType(value)) {
                result.properties.push({
                    key,
                    value
                });
            } else {
                result.childNode.push({
                    key,
                    value: transformObjectToNode(value)
                });
            }
        });
    }


    return result;
}

module.exports = function generate (startNode: IPropertyTree, test: any) {
    const jsonFile = fs.readFileSync(path.resolve(__dirname, '../test/test.json'), {
        encoding: 'utf-8'
    });

    try {
        const originData: object = JSON.parse(jsonFile);

        const node: IPropertyTree = transformObjectToTree(originData);

        for (let property of node.properties) {
            console.log(property.key);
            console.log(property.value);
        }
    } catch (e) {
        console.log(e);
    }
};
