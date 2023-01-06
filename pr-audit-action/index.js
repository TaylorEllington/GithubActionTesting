const core = require('@actions/core');
const github = require('@actions/github');

async function report(owner, repo, pr, token){
    const octokit = github.getOctokit(token)
        await octokit.rest.issues.createComment({
            owner: owner,
            repo: repo,
            pull_number: pr,
            body: "You need to add either the \"Public Release Notes\" or \"No Release Notes\" label!"
        })
        console.log("no tags! failed!")
        core.setFailed("Need to add PR tags")
}


try{
    var value = core.getInput('response');
    const payload = JSON.parse(value)

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

        core.setOutput('error', 'bad-labels');
        core.setFailed("No PR status label")

    }


} catch ( error ){
    core.setFailed(error.message)
}