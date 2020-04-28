((element = document.querySelector('.inner-part')) => {
    let firstPosition = 0,
        secondPosition = 0,
        thirdPosition = 0,
        fourthPosition = 0;

    const dragClose = () => {
        document.body.onmouseup = null;
        document.body.onmousemove = null;
    }

    const dragMove = e => {
        e.preventDefault();

        firstPosition = thirdPosition - e.clientX;
        secondPosition = fourthPosition - e.clientY;
        thirdPosition = e.clientX;
        fourthPosition = e.clientY;

        element.style.top = `${(element.offsetTop - secondPosition)}px`;
        element.style.left = `${(element.offsetLeft - firstPosition)}px`;

        document.querySelector('#fade-out-top').style.display = 'none';
    }

    const dragDown = el => {
        el.preventDefault();

        thirdPosition = el.clientX;
        fourthPosition = el.clientY;

        document.body.onmouseup = dragClose;
        document.body.onmousemove = dragMove;
    }

    element.onmousedown = dragDown;
})();

const dropEffects = (id) => {
    const selectorDiv = document.querySelector(`#${id}`);
    const selectorBtn = document.querySelector(`#${id}-btn`);

    selectorDiv.style.backgroundColor = 'transparent';
    selectorBtn.style.fontSize = '18px';
    selectorBtn.style.boxShadow = '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12)';
    selectorBtn.style.marginTop = '15px';
    selectorBtn.style.transition = '0.2s';
    selectorDiv.style.transition = '0.2s';

    setTimeout(() => {
        selectorDiv.style.backgroundColor = '#0F2027';
        selectorBtn.style.fontSize = '22px';
        selectorBtn.style.boxShadow = '0 23px 6px -6px black';
        selectorBtn.style.marginTop = '0px';
    }, 500);
}