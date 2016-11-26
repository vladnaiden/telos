//Slider
//-------------------------------------------------------------

window.onload = function () {
    /*************************************
     *   base
     **************************************/

    // requestAnimFrame
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    //clear requestAnimFrame
    window.clearAnimation = (function () {
        return window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame ||
            function (id) {
                clearTimeout(id)
            };
    })();

    var slider = document.querySelector("#slider");

    var slide_count = slider.children[0].children[0].childElementCount;

    var slide_width = slider.children[0].children[0].firstElementChild.clientWidth;

    var slider_width = slide_count * slide_width;


    // slider width
    slider.children[0].children[0].style.width = slider_width + "px";

    // add Class to slide
    for (var c = 0; c < slide_count; c++) {
        slider.children[0].children[0].children[c].className = "slide-" + (c + 1);
    }


    /*************************************
     *   navigate
     **************************************/
    var navigate = document.createElement('div');
    navigate.className = 'navigate';
    navigate.innerHTML = '<a href="#" class="prev">prev</a><a href="#" class="next">next</a>';
    slider.appendChild(navigate);

    // prev, next click
    var prevLink = slider.children[1].children[0];
    var nextLink = slider.children[1].children[1];
    var offset = 0;
    var y = slide_width;
    var sliding;
    var currentItem;
    var currentClassName;
    var firstClick = false;
    var itemTochange = '';

    var items = 4;
    var item = 1;


    function current_Item() {
        currentItem = offset / slide_width;

        for (var i = 0; i < slide_count; i++) {

            slider.children[2].children[i].className = "";
        }

        slider.children[2].children[currentItem].className = "current";

        // Show text
        for (var u = 0; u < slider.children[0].children[0].children[currentItem].childElementCount; u++) {
            if (slider.children[0].children[0].children[currentItem].children[u].classList[0] == "slide-text") {
                currentClassName = slider.children[0].children[0].children[currentItem].children[u].className;
                slider.children[0].children[0].children[currentItem].children[u].className = currentClassName + " show";
            }
        }

        firstClick = true;

    }

    function hideText() {
        if (firstClick == true) {
            for (var u = 0; u < slider.children[0].children[0].children[currentItem].childElementCount; u++) {
                if (slider.children[0].children[0].children[currentItem].children[u].classList[0] == "slide-text") {
                    currentClassName = slider.children[0].children[0].children[currentItem].children[u].className;
                    currentClassName = currentClassName.replace(" show", "");
                    slider.children[0].children[0].children[currentItem].children[u].className = currentClassName;
                }
            }
        }
    }

    function nextClick() {
        if (offset == slider_width - slide_width) {
            console.log(offset);
            clearAnimation(sliding);
            return false
        }
        offset += 25;
        slider.children[0].children[0].style.left = -offset + "px";
        if (offset >= y) {
            clearAnimation(sliding);
            y += slide_width;
            // add current class
            current_Item();
        }
    }

    function prevClick() {
        if (offset == 0) {
            clearAnimation(sliding);
            return false
        }
        offset -= 25;
        slider.children[0].children[0].style.left = -offset + "px";
        if (offset <= y - slide_width * 2) {
            clearAnimation(sliding);
            y -= slide_width;
            // add current class
            current_Item();
        }
    }

    // click event
    nextLink.onclick = function () {
        hideText();
        (function animloop() {
            sliding = requestAnimFrame(animloop);

            nextClick();
        })();
        return false
    };
    prevLink.onclick = function () {
        hideText();
        (function animloop() {
            sliding = requestAnimFrame(animloop);
            prevClick();
        })();
        return false
    };


    // while (offset != (slider_width - slide_width)) {
    //
    //     nine();
    //
    // }

    function timeoutRunner() {
        setTimeout(function () {
            timeoutRunner();
        }, 20000);
        hideText();
        (function animloop() {
            sliding = requestAnimFrame(animloop);
            nextClick();
        })();
        return false;

    }

    timeoutRunner();




    /*************************************
     *   pagination
     **************************************/
    var paginationIndex;
    var pagination = document.createElement('ul');
    pagination.className = 'pagination';
    for (var l = 0; l < slide_count; l++) {
        var paginationItem = document.createElement('li');
        paginationItem.innerHTML = l + 1;
        pagination.appendChild(paginationItem);
    }
    slider.appendChild(pagination);
    slider.children[2].children[0].className = "current";

    function paginationClick() {
        if (offset < paginationIndex * slide_width) {
            offset += 30;
            slider.children[0].children[0].style.left = -offset + "px";
            if (offset == paginationIndex * slide_width) {
                clearAnimation(sliding);
                y = slide_width * paginationIndex + slide_width;
                // add current class
                current_Item();
            }
        } else if (offset > paginationIndex * slide_width) {
            offset -= 30;
            slider.children[0].children[0].style.left = -offset + "px";
            if (offset == paginationIndex * slide_width) {
                clearAnimation(sliding);
                y = slide_width * paginationIndex + slide_width;
                // add current class
                current_Item();
            }
        } else {
            clearAnimation(sliding);
            return false
        }
    }

    for (var i = 0; i < slide_count; i++) {
        (function (index) {
            slider.children[2].children[i].onclick = function () {
                paginationIndex = index;
                hideText();
                (function animloop() {
                    sliding = requestAnimFrame(animloop);
                    paginationClick();
                })();
                return false
            }
        })(i);
    }
};

//Main scroll navigation
//-------------------------------------------------------------

function navScroll() {
    var header = document.getElementsByClassName('header__section')[0].getElementsByTagName('header')[0];

    if (document.body.scrollTop > 100) {
        header.className = 'header fixed';
        document.getElementsByClassName('nav__procedures--link')[0].addEventListener('mouseover', function () {
            document.getElementsByClassName('header')[0].style.height = '200px';
            header.style.borderBottom = '1px solid #e7e7e7';
        }, false);

        document.getElementsByClassName('nav__procedures--link')[0].addEventListener('mouseleave', function () {
            document.getElementsByClassName('header')[0].style.height = '74px';
        }, false);
    }
}

window.addEventListener('scroll', navScroll, false);

/*function hasClass(target, className) {
 return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
 }*/
