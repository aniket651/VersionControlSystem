// import { CommandModule, Argv, ArgumentsCamelCase } from 'yargs'
import chalk from 'chalk'
import { existsSync, writeFileSync, mkdirSync } from "fs";
import { cwd } from 'process';






function handler() {

    const currentDir = cwd();

    console.log(currentDir);
    if (existsSync(`${currentDir}/.witness`)) {
        console.log(chalk.blue("witness has already been activated !"))
        return;
    }

    try {
        mkdirSync(`.witness`);
        mkdirSync(`.witness/objects`);
        mkdirSync(`.witness/indices`);
        // mkdirSync(`.witness/hooks`);
        // mkdirSync(`.witness/info`);
        mkdirSync(`.witness/refs`);
        mkdirSync(`.witness/history`);
        const obj = {
            "head": "main",
            "detached": false
        }
        writeFileSync(`${currentDir}/.witness/refs/branchHead.json`, "{}");
        writeFileSync(`${currentDir}/.witness/State.json`, JSON.stringify(obj));
        writeFileSync(`${currentDir}/.witness/history/commitLog.json`, "{}")
        writeFileSync(`${currentDir}/.witness/config.json`, "");
        writeFileSync(`${currentDir}/.witness/index.json`, "{}");
        writeFileSync(`${currentDir}/.ignorewit.json`, "[]")
    } catch (error) {
        console.error(chalk.red('Error in creating witness and sub-directories'), error);

    }

}

// function builder(yargs: Argv){
//     return yargs.option('name', {
//         alias: 'n',
//         string: true
//       })
// }

const init = {
    command: 'init',
    describe: 'Init command',
    // builder,
    handler
}

export default init;
// initiate();