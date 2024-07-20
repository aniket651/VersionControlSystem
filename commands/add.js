import { existsSync, readFileSync, writeFileSync } from "fs";
import { cwd } from 'process';
import { updateIndexSync } from "../utils/utilities.js";
// import { CommandModule, Argv } from 'yargs'
import chalk from 'chalk'

function handler(args) {
    //check if the current entry is a valid pathname or not
    //then create its entry into the index file
    const { files, all } = args
    const currentDir = cwd();
    // console.log(currentDir);
    // console.log(args);
    // console.log("files :",files);
    // console.log("all :",all);


    try {
        let ignoreArr = JSON.parse(readFileSync(`${currentDir}/.ignorewit.json`, 'utf-8'));
        ignoreArr = ignoreArr.map((e)=>`${currentDir}/${e}`);
        // console.log(ignoreArr);
        const indexObj = JSON.parse(readFileSync(`${currentDir}/.witness/index.json`, 'utf-8'));
        if(all){
            Object.assign(indexObj,{...indexObj,...updateIndexSync(`${currentDir}`,ignoreArr)});
            writeFileSync(`${currentDir}/.witness/index.json`, JSON.stringify(indexObj));
            return;
        }


        for (let index = 1; index < args._.length; index++) {
            const path = args._[index];
            if (existsSync(`${currentDir}/${path}`)) {
                const partIndex = updateIndexSync(`${currentDir}/${path}`,ignoreArr);
                Object.assign(indexObj,{...indexObj,...partIndex});
            }
            else {
                console.log(chalk.red(`${path} is not found in current working directory`));
            }
        }

        writeFileSync(`${currentDir}/.witness/index.json`, JSON.stringify(indexObj));

    } catch (error) {
        console.log(chalk.red("error in updating index"), error);
    }

}

function builder(yargs) {
    return yargs
    .positional('files', {
        describe: 'Files to add',
        type: 'string'
    })
    .option('--all', {
        alias: 'a',
        describe: 'Add all files',
        type: 'boolean'
    });
}


const add = {
    command: 'add',
    describe: 'add the files to staging area, effectively starts tracking these files',
    builder,
    handler
}

export default add;
// initiate();