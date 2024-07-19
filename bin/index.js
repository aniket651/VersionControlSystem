#! /usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import init from '../commands/initiate.js'
import status from '../commands/status.js'
import add from '../commands/add.js'
import commit from '../commands/commit.js'
import log from '../commands/log.js'
import getImage from '../commands/getImage.js'
import checkout from '../commands/gotoBranch.js'

yargs(hideBin(process.argv))
  .command(init)
  .command(status)
  .command(add)
  .command(commit)
  .command(log)
  .command(getImage)
  .command(checkout)
  .demandCommand()
  .help()
  .argv


