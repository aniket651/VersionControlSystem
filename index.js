// import {argv} from process;
import { initiate } from "./commands/initiate.js";
import { add } from "./commands/add.js";
import { status } from "./commands/status.js";
import { commit } from "./commands/commit.js";
import { getHistory } from "./commands/getHistory.js";
import { getImage } from "./commands/getImage.js";
import { gotoBranch } from "./commands/gotoBranch.js";

const action = process.argv[2];


switch (action) {
  case "initiate":
    initiate();
    console.log("initialized .witness repo");
    break;
  case "add":
    //check if .witness is created or not
    add(process.argv);
    console.log("adding to the staging area...");
    break;
  case "status":
    //check if .witness is created or not
    status();
    console.log("that was all about status");
    break;
  case "commit":
    //check if .witness is created or not
    commit(process.argv);
    console.log("commited!!");
    break;
  case "log":
    //check if .witness is created or not
    getHistory();
    // console.log("commited!!");
    break;
  case "gotoVersion"://note this will only change the files that were there in that commit to their orignal state. it won't touch the files that were added after that commit. They will continue to exixt in their current form.
    //check if .witness is created or not
    //tell that the changes that have not been commited would be erased. ask if u want to proceed.
    getImage(process.argv[3]);
    // console.log("commited!!");
    break;
  case "checkout":
    gotoBranch(process.argv[3]);
    break;

  default:
    console.error("Invalid command.");
}