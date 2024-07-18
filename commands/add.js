import { existsSync, readFileSync, writeFileSync } from "fs";
import { cwd } from 'process';
import { updateIndexSync } from "../utils/utilities.js";

export function add(pathArr) {
    //check if the current entry is a valid pathname or not
    //then create its entry into the index file
    const currentDir = cwd();
    console.log(currentDir);

    try {
        let ignoreArr = JSON.parse(readFileSync(`${currentDir}/.ignorewit.json`, 'utf-8'));
        ignoreArr = ignoreArr.map((e)=>`${currentDir}/${e}`);
        console.log(ignoreArr);
        const indexObj = JSON.parse(readFileSync(`${currentDir}/.witness/index.json`, 'utf-8'));
        if(pathArr[3]==="--all"){
            Object.assign(indexObj,{...indexObj,...updateIndexSync(`${currentDir}`,ignoreArr)});
            writeFileSync(`${currentDir}/.witness/index.json`, JSON.stringify(indexObj));
            return;
        }
        
        
        for (let index = 3; index < pathArr.length; index++) {
            const path = pathArr[index];
            if (existsSync(`${currentDir}/${path}`)) {
                const partIndex = updateIndexSync(`${currentDir}/${path}`,ignoreArr);
                Object.assign(indexObj,{...indexObj,...partIndex});
            }
            else {
                console.log(`${path} is not found in current working directory`);
            }
        }

        writeFileSync(`${currentDir}/.witness/index.json`, JSON.stringify(indexObj));

    } catch (error) {
        console.log("error in updating index", error);
    }

}

// initiate();