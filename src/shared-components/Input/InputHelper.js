
const InputHelper = {
    validate
}

function validate(element) {
    if(element.validations.isRequired) {
        return element.value ? true : false;
    }
    // If there are no more validations then return true
    return true;
}
export default InputHelper;