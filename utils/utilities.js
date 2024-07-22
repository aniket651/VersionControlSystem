
import { cwd } from 'process';
import { statSync, readdirSync, readFileSync, accessSync, constants, writeFileSync} from "fs";
import path from 'path';
import { createHash } from 'crypto';

export function isDirectory(path) {
    try {
        const stats = statSync(path);
        return stats.isDirectory();
    } catch (err) {
        return false;
    }
}

function isFile(path){
    try {
        const stats = statSync(path);
        return stats.isFile();
    } catch (error) {
        return false;
    }
}


export function updateIndexSync(directoryPath, ignoreArr) {
    try {
        let files;
        let fileDetails = {};
        if(isFile(directoryPath)){
            try {
                accessSync(directoryPath, constants.R_OK | constants.W_OK)
                const content = readFileSync(directoryPath, 'utf8');
                const hash = getHash("file", content);
                fileDetails[`${directoryPath}`] = hash;
                return fileDetails;
            } catch (error) {
                // console.log("error in accessSync");
                // console.log(error);
                return fileDetails;
            }
        }
        files = readdirSync(directoryPath); // Get list of filenames
        

        for (const filename of files) {
            if (filename === ".witness") {
                continue;
            }
            const filePath = `${directoryPath}/${filename}`;
            if(ignoreArr.includes(filePath)){
                continue;
            }
            console.log(filePath);
            if (isDirectory(filePath)) {
                const innerFiles = updateIndexSync(`${filePath}`, ignoreArr);
                // const hash = getHash("dir", innerFiles)
                fileDetails = { ...fileDetails, ...innerFiles };
            }
            else {
                try {
                    accessSync(filePath, constants.R_OK | constants.W_OK)
                    const content = readFileSync(filePath, 'utf8');
                    const hash = getHash("file", content);
                    fileDetails[`${filePath}`] = hash;
                } catch (error) {
                    // console.log("error in accessSync");
                    // console.log(error);
                    continue;
                }
            }
        }
        return fileDetails;

    } catch (error) {
        console.log("error in updateIndexSync: ", error);
    }
}



export function statusUpdateSync(directoryPath, untrackedFiles, modifiedFiles, indexObj, ignoreArr) {
    try {
        const files = readdirSync(directoryPath);

        for (const filename of files) {
            if (filename === ".witness") {
                continue;
            }
            const filePath = `${directoryPath}/${filename}`;
            if(ignoreArr.includes(filePath)) continue;

            if (isDirectory(filePath)) {
                statusUpdateSync(filePath, untrackedFiles, modifiedFiles, indexObj, ignoreArr);
            }
            else if (filePath in indexObj) {
                try {
                    accessSync(filePath, constants.R_OK | constants.W_OK)
                    const content = readFileSync(filePath, 'utf8');
                    const hash = getHash("file", content);
                    if (!(hash === indexObj[filePath])) {
                        modifiedFiles.push(filePath);
                        indexObj[filePath] = hash;
                    }
                    
                } catch (error) {
                    
                }
            }
            else {
                untrackedFiles.push(filePath);
            }
        }

    } catch (error) {
        console.log("error in statusUpdateSync: ", error);
    }
}



export function getHash(type, content) {
    try {
        const hash = createHash('sha1').update(`${type} ${content}`).digest('hex');
        return hash;
    } catch (error) {
        console.log("error in generating hash", error);
    }
}


// Example usage
const currentPath = process.cwd();