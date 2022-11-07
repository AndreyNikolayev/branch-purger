const axios = require('axios').default;
var eol = require('os').EOL;
require('dotenv').config({ path: __dirname + '/.env' });

var branchesToSave = process.argv.slice(2);

const instance = axios.create({
  baseURL: process.env.REPO_URL,
  timeout: 1000,
  headers: {'Authorization': `Basic ${Buffer.from(`:${process.env.PAT}`).toString('base64')}`}
  });

(async () => {
  try {
    var result = await instance({
      method: 'get',
      url: 'refs?api-version=6.0'
    });
    
    var data = result.data.value.filter(p => p.name.startsWith(`refs/heads/${process.env.BRANCH_PREFIX}`) &&
    !branchesToSave.some(x => p.name.indexOf(x) !== -1));

    console.log(`Deleting next branches:${eol}`)
    console.log(data.map(p => p.name).join(eol));
    var result = await instance({
      method: 'post',
      url: '?api-version=6.0',
      data: data.map(p => {return {
        name: p.name,
        oldObjectId: p.objectId,
        newObjectId: '0000000000000000000000000000000000000000'
      }})
    }); 
    console.log(`${eol}Finished`);
  }
  catch(error) {
    console.log(error);
  }
})();