const core = require('@actions/core');
const github = require('@actions/github');

try{
    var value = core.getInput('response');
    const payload = JSON.parse(value)

    console.log(payload.data)


} catch ( error ){
    core.setFailed(error.message)
}