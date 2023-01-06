const core = require('@actions/core');
const github = require('@actions/github');



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