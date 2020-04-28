const globalList = [];
const output = document.querySelector('#output-field');
const result = {status: false};

const notAllowed = valueToCheck => /[*/\-.+=]/.test(valueToCheck);
const validChecker = (currVal, nextVal) => notAllowed(currVal.slice(-1)) && notAllowed(nextVal) ? false : true;
const getValueRounded = valueToRound => Math.round(Math.abs(valueToRound));

const displayCalcs = () => {
    output.value = '';
        for (const element of globalList) output.value += element;
            if (globalList.length === 1 && /[\.]/.test(globalList[0]) && globalList[0].length >= 6) output.style.fontSize = '25px';
            else output.style.fontSize = '55px';
                if (getValueRounded(globalList[0]) <= 800) canvasAnimation(getValueRounded(globalList[0]));
                    output.scrollLeft = output.scrollWidth;
}

const getCalcValue = id => {
    const reference = document.querySelector(`#${id}-btn`).value;

    if (result.status && /[0-9]/.test(reference)) globalList.splice(0, 1);
    else if (result.status && reference === '.') return;
    else if (globalList[0] === '0' && globalList.length === 1 && /[0-9]/.test(reference)) return;
    else if (reference === '.') {
        if (globalList[0].lastIndexOf('.') !== -1 && /[*/\-+]/.test(globalList[0]) === false) return;
        else if (/[*/\-+]/.test(globalList[0]) === true && globalList[0].lastIndexOf('.') !== -1 && (globalList[0].lastIndexOf('.') > globalList[0].lastIndexOf('/') && globalList[0].lastIndexOf('.') > globalList[0].lastIndexOf('*') && globalList[0].lastIndexOf('.') > globalList[0].lastIndexOf('+') && globalList[0].lastIndexOf('.') > globalList[0].lastIndexOf('-'))) return;
    }

    if (!(globalList.length === 0 && /[/*+.=]/.test(reference))) {
        if (/[0-9/*\-.+]/.test(reference) && (globalList.length === 0 || validChecker(globalList[0], reference))) {
            globalList.push(reference);
            globalList.push(globalList.splice(0, globalList.length).join(''));
            result.status = false;
        } else if (reference === '=' && validChecker(globalList[0], reference)) {
            globalList.push(eval(globalList[0]).toString());
            result.status = true;
            globalList.splice(0, 1);
        }

        displayCalcs();
    }
}

document.body.addEventListener('keypress', () => {
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if (keyCode === 13) {
        output.value = '';
        globalList.length = 0; 
        canvasAnimation(0);
    } else if(keyCode === 32) {
        let arrayElementLen = globalList[0].length - 1;
        let arrayElement = {...globalList[0]};
            delete arrayElement[arrayElementLen];
            globalList[0] = Array.from(Object.values(arrayElement)).join(''); 
            displayCalcs();
    }
});
