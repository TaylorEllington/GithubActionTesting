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
        //const myToken = core.getInput('myToken')

        var fullName = core.getInput('repoName');
        var splitName = fullName.split('/');

        const fs = require('fs')
        const ev = JSON.parse(
            fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
        )
        const prNum = ev.pull_request.number


        const octokit = github.getOctokit(secrets.GITHUB_TOKEN)
        await octokit.rest.issues.createComment({
            owner: splitName[0],
            repo: splitName[1],
            pull_number: prNum,
            body: "You need to add either the \"Public Release Notes\" or \"No Release Notes\" label!"
        })
        console.log("no tags! failed!")
        core.setFailed("Need to add PR tags")
    }


} catch ( error ){
    core.setFailed(error.message)
}