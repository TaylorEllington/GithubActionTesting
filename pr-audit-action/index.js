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
        console.log("no tags! failed!")
    }


} catch ( error ){
    core.setFailed(error.message)
}