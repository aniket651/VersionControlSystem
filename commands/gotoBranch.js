import { existsSync, readFileSync, writeFileSync } from "fs";
import { cwd } from 'process';
import { status } from "./status.js"; 
import { error } from "console";


export function gotoBranch(branchName) {
    //check if the current entry is a valid pathname or not
    //then create its entry into the index file
    const currentDir = cwd();
    console.log(currentDir);
    try {
        const branchHeads = (JSON.parse(readFileSync(`${currentDir}/.witness/refs/branchHead.json`, 'utf-8')));
        if(!branchHeads[branchName]){
            throw error("branch name not in exixtence!!");
        }
        
        
        
        // make head point to this commit instead of a branch
        const state = (JSON.parse(readFileSync(`${currentDir}/.witness/State.json`, 'utf-8')));
        state["head"] = branchName;
        state["detached"] = false;
        writeFileSync(`${currentDir}/.witness/State.json`,JSON.stringify(state));

        //getImage
        const commitId = branchHeads[branchName];
        //check if commitId is valid or not for your current branch
        const indexObj = JSON.parse(readFileSync(`${currentDir}/.witness/indices/${commitId}.json`, 'utf-8'));
        for(const filePath in indexObj){
            const hash = indexObj[filePath];
            const data = readFileSync(`${currentDir}/.witness/objects/${hash}`, 'utf-8');
            writeFileSync(filePath,data);
        }
        writeFileSync(`${currentDir}/.witness/index.json`,JSON.stringify(indexObj));

    } catch (error) {
        console.log("error in getting the commit verion: ", error);
    }

}
