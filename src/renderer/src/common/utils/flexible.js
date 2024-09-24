(function flexible(window, document) {
    let docEl = document.documentElement;
    let dpr = window.devicePixelRatio || 1;

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (16 / 12.8) * dpr + 'rem';
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }

    setBodyFontSize();

    // set 1rem = viewWidth / 100 (当前项目以12.8为基准)
    function setRemUnit() {
        let rem = docEl.clientWidth / 100;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        let fakeBody = document.createElement('body');
        let testElement = document.createElement('div');
        testElement.style.border = `${0.5 / 12.8}rem solid transparent`;
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
})(window, document);
