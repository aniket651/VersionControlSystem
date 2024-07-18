import { existsSync, writeFileSync , mkdirSync} from "fs";
import { cwd } from 'process';

export function initiate() {

    const currentDir = cwd();

    console.log(currentDir);
    if (existsSync(`${currentDir}/.witness`)) {
        console.log("witness has already been activated !")
        return;
    }

    try {
        mkdirSync(`.witness`);
        mkdirSync(`.witness/objects`);
        mkdirSync(`.witness/indices`);
        mkdirSync(`.witness/hooks`);
        mkdirSync(`.witness/info`);
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
        console.error('Error in creating witness and sub-directories', error);

    }

}

// initiate();