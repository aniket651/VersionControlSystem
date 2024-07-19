import { existsSync, readFileSync, writeFileSync } from "fs";
import { cwd } from 'process';

import chalk from 'chalk'

function handler() {
    //check if the current entry is a valid pathname or not
    //then create its entry into the index file
    const currentDir = cwd();
    console.log(currentDir);
    try {
        const state = (JSON.parse(readFileSync(`${currentDir}/.witness/State.json`, 'utf-8')));
        let currentCommit;
        if(state["detached"]){
            currentCommit = state["head"];
            console.log("detached Head state");
        }
        else{
            const branchName = state["head"];
            console.log("current branch: ", branchName);
            const branchHeads = JSON.parse(readFileSync(`${currentDir}/.witness/refs/branchHead.json`, 'utf-8'));
            currentCommit = branchHeads[branchName];
        }
        const indexObj = JSON.parse(readFileSync(`${currentDir}/.witness/history/commitLog.json`, 'utf-8'));
        const history = [];
        while(currentCommit){
            history.push(indexObj[currentCommit]);
            currentCommit = indexObj[currentCommit]["parentCommitId"];
            if(currentCommit.length>1){
                break;
            }
            currentCommit = currentCommit[0];
        }
        
        console.log(history);
        if(currentCommit){
            console.log("branch merging before this last commit")
        }

    } catch (error) {
        console.log("error in fetching witness history", error);
    }

}

const log = {
    command: 'log',
    describe: 'logs history of commits',
    // builder,
    handler
}

export default log;