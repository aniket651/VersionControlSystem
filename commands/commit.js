import { existsSync, readFileSync, writeFileSync } from "fs";
import { cwd } from 'process';
import { status } from "./status.js"; 


export function commit(pathArr) {
    //check if the current entry is a valid pathname or not
    //then create its entry into the index file
    const currentDir = cwd();
    console.log(currentDir);
    const msg = pathArr[3];
    try {
        status();
        const indexObj = JSON.parse(readFileSync(`${currentDir}/.witness/index.json`, 'utf-8'));
        const commitId = Date.now();
        // console.log(indexObj);
        for(const filePath in indexObj){
            // console.log(filePath);
            if(!existsSync(`${currentDir}/.witness/objects/${indexObj[filePath]}`)){
                const data = readFileSync(filePath,'utf-8');
                writeFileSync(`${currentDir}/.witness/objects/${indexObj[filePath]}`,data);
            }
        }

        writeFileSync(`${currentDir}/.witness/indices/${commitId}.json`,JSON.stringify(indexObj));
        // read value value of head from "head:<branch name>" in State.json
        // update latest commit in branchHead file
        const state = (JSON.parse(readFileSync(`${currentDir}/.witness/State.json`, 'utf-8')));
        let prevCommit;
        
        if(state["detached"]){
            prevCommit = state["head"];
        }
        else if(!state["detached"]){
            const branchHeads = JSON.parse(readFileSync(`${currentDir}/.witness/refs/branchHead.json`, 'utf-8'));
            const branchName = state["head"];
            prevCommit = branchHeads[branchName];
            branchHeads[branchName] = `${commitId}`;
            writeFileSync(`${currentDir}/.witness/refs/branchHead.json`,JSON.stringify(branchHeads));
        }

        //write commit history and commit meta data somewhere
        const commitHistory = (JSON.parse(readFileSync(`${currentDir}/.witness/history/commitLog.json`, 'utf-8')));
        const currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = `${day}/${month}/${year}`;
        const obj = {
            "commitId" : commitId,
            "msg" : msg,
            "date" : formattedDate,
            "parentCommitId": [prevCommit]
        }
        // commitHistory.unshift(obj);
        commitHistory[commitId] = obj;
        writeFileSync(`${currentDir}/.witness/history/commitLog.json`,JSON.stringify(commitHistory));


    } catch (error) {
        console.log("error in commiting", error);
    }

}
