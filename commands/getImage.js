import { existsSync, readFileSync, writeFileSync } from "fs";
import { cwd } from 'process';
import chalk from 'chalk'

function handler(args) {
    //check if the current entry is a valid pathname or not
    //then create its entry into the index file
    const commitId = args._[1];
    // console.log(args);
    const currentDir = cwd();
    console.log(currentDir);
    try {
        const history = JSON.parse(readFileSync(`${currentDir}/.witness/history/commitLog.json`, 'utf-8'));
        if(!history[commitId]){
            throw error("no such commitId present!!");
        }
        //check if commitId is valid or not for your current branch
        const indexObj = JSON.parse(readFileSync(`${currentDir}/.witness/indices/${commitId}.json`, 'utf-8'));

        for(const filePath in indexObj){
            const hash = indexObj[filePath];
            const data = readFileSync(`${currentDir}/.witness/objects/${hash}`, 'utf-8');
            writeFileSync(filePath,data);
        }
        //update index.json file
        writeFileSync(`${currentDir}/.witness/index.json`,JSON.stringify(indexObj));

        // make head point to this commit instead of a branch
        const state = (JSON.parse(readFileSync(`${currentDir}/.witness/State.json`, 'utf-8')));
        state["head"] = commitId;
        state["detached"] = true;
        writeFileSync(`${currentDir}/.witness/State.json`,JSON.stringify(state));


    } catch (error) {
        console.log("error in getting the commit verion: ", error);
    }

}
function builder(yargs) {
    return yargs
    .option('commitId', {
        alias: 'cId',
        describe: 'commitId of commit to restore',
        type: 'string'
    });
}
const getImage = {
    command: 'getImage',
    describe: 'bring your working directory to the state it had been during a specific commit. Files that were not present during that commit or were untracked, would not be affected in any manner.',
    builder,
    handler
}

export default getImage;