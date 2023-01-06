const core = require('@actions/core');
const github = require('@actions/github');

try{
    var value = core.getInput('response');
    console.log(value)


} catch ( error ){
    core.setFailed(error.message)
}