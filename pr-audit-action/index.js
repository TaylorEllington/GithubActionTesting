const core = require('@actions/core');
const github = require('@actions/github');

try{
    var value = core.getInput('response');
    const payload = JSON.parse(value)

    console.log(payload.data)

    var publicRN = false;
    var noRN = false
    for( label in payload.data){
        if(label.name == "Public Release Notes"){
            publicRN = true;
        }

        if(label.name == "No Release Notes"){
            noRN = true;
        }
    }

    if(!publicRN && !noRN){
        const myToken = core.getInput('myToken')
        const octokit = github.getOctokit(myToken)
        await octokit.rest.issues.createComment({
            owner: repoOwner,
            repo: repo.repo,
            pull_number: pull_num,
            body: "You need to add either the \"Public Release Notes\" or \"No Release Notes\" label!"
        })
        console.log("no tags! failed!")
        core.setFailed("Need to add PR tags")
    }


} catch ( error ){
    core.setFailed(error.message)
}