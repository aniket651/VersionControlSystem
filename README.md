### To install
1. clone the repo
2. go to root directory of project and run `npm install -g .`


this is an attemp to make a simple version control system called Witness.
Its based on popular vsc "git". Its a fun learning project and has helped me in learning about git internals, object databases and linux filesystems.
This project doesn't use git porceilien and plumbing commands but rather approaches the problem at hand from scatch in NodeJs.

Its in beginner stages only and is yet to support branching and merging.


Commands:\n
 # witness init      Init command\n
 # witness status    status command\n
 # witness add       add the files to staging area, effectively starts tracking these files\n
 # witness commit    commit the files that are in staging area\n
 # witness log       logs history of commits\n
 # witness getImage  bring your working directory to the state it had been during a specific commit. Files that were not present during that commit or were untracked, would not be affected in any manner.\n
 # witness checkout  checkout to an existing branch.\n
\n
## Options:\n
# --version  Show version number                                       [boolean]\n
# --help     Show help                                                 [boolean]\n