# Branch Purger

## Description

Allows to cleanup unused branches for the source control

## Installation

0. Ensure that node.js is installed
1. Download the repository
2. Run `npm install` command in the repository root folder
3. Create ".env" file
4. Fill it with your configuration as in .env.example file

## Configuration

There are three fields in the configuration

1. Your Branch Prefix. For example "anikolaiev". If it is not set than all branches will be selected for deletion except for the one in the command exclusion.

2. Your Repo Url without /refs/

3. Your PAT

## Warning 

Please read the exclusion logic before executing to avoid deleting
branches that are in use at the moment.
Command will fail if you lack permissions to delete some branches.

## Usage

Execute `node app.js` command from the repository root folder.

Exclude branches that you need to preserve via space separated list.

## Example

BRANCH_PREFIX is set to "anikolaiev"

Repository contains next branches:
main, development, test/branch1, anikolaiev/branch1, anikolaiev/branch2

Running `node app.js branch1 branch2`

As a result none branches will be deleted.

Running `node app.js branch2`

As a result branch anikolaiev/branch1 will be deleted.

Running `node app.js`

As a result branches anikolaiev/branch1 and anikolaiev/branch2 will be deleted.





