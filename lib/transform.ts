/**
 * Created by liukeyi on 2017/12/11.
 */
import { IPropertyTree } from './interface';

export function transformObjectToTree (originData: object): IPropertyTree {
    let result: IPropertyTree = {
        properties: [],
        childNode: []
    };

    return result;
}

export function transformTreeToObject (tree: IPropertyTree): object {
    let result: object = {};

    return result;
}