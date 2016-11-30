//SublimeContent block
//-------------------------------------------------------------
function changeSublime() {
    var section10aTags = document.getElementsByClassName('section10')[0].getElementsByClassName('content__head')[0].getElementsByTagName('a');
    var section10contentSublimes = document.getElementsByClassName('section10')[0].getElementsByClassName('content__body--sublime');
    var aTagsArr = [];

    for (var q = 0; q < section10aTags.length; q++) {
        aTagsArr.push(section10aTags[q]);

    }

    for (var i = 0; i < aTagsArr.length; i++) {
        (function (index) {
            aTagsArr[i].onclick = function () {
                for (var l = 0; l < section10contentSublimes.length; l++) {
                    aTagsArr[l].className = "content__head--link";
                    section10contentSublimes[l].style.display = 'none';
                }
                aTagsArr[index].className = "content__head--link current";
                section10contentSublimes[index].style.display = 'flex';
            }
        }(i));

    }
}

changeSublime();

//Man Woman buttons change content
//-------------------------------------------------------------

function listsContentChange() {
    var section10aTags = document.getElementsByClassName('section11')[0].getElementsByClassName('content__body')[0].getElementsByClassName('content__body--buttons')[0].getElementsByTagName('a');
    var section10contentSublimes = document.getElementsByClassName('section11')[0].getElementsByClassName('content__body')[0].getElementsByClassName('uni__table--wrapper');
    var aTagsArr = [];

    for (var q = 0; q < section10aTags.length; q++) {
        aTagsArr.push(section10aTags[q]);

    }

    for (var i = 0; i < aTagsArr.length; i++) {
        (function (index) {
            aTagsArr[i].onclick = function () {
                for (var l = 0; l < section10contentSublimes.length; l++) {
                    section10contentSublimes[l].style.display = 'none';
                    aTagsArr[l].className = 'button__group button5';
                }
                aTagsArr[index].className = 'button__group button5 current';
                section10contentSublimes[index].style.display = 'flex';
            }
        }(i));

    }
}

listsContentChange();

//Selecting procedure
//-------------------------------------------------------------

var arrProcSelectedName = [];
var arrProcSelected = [];
(function () {
    var numProcSelected = 0;


    var lists = document.getElementsByClassName('section11')[0].getElementsByClassName('content__body')[0].getElementsByClassName('item');
    var orderValue = document.getElementsByClassName('orderValue')[0];
    var orderNumber = document.getElementsByClassName('orderNumber')[0];

    var orderShowDiv = document.getElementsByClassName('orderShow')[0];

    function selectProcedure() {
        for (var i = 0; i < lists.length; i++) {
            (function () {
                var itemElement = lists[i];
                lists[i].addEventListener('click', function () {
                    if (itemElement.className.indexOf('current') < 1) {
                        itemElement.className += ' current';
                        arrProcSelected.push(itemElement);
                        numProcSelected += 1;
                    } else if (itemElement.className.indexOf('current') > 1) {
                        itemElement.className = 'item';
                        arrProcSelected.splice(arrProcSelected.indexOf(this), 1);
                        numProcSelected -= 1;
                    }

                    if (numProcSelected >= 1) {
                        orderShowDiv.style.display = 'flex';
                    } else {
                        orderShowDiv.style.display = 'none';
                    }

                    getPriceOfProc();
                })
            }(i));
        }
    }

    function getPriceOfProc() {
        var itemNumber = 0;
        orderValue.innerHTML = '';
        orderNumber.innerHTML = '';
        if (arrProcSelected.length > 0) {
            for (var i = 0; i < arrProcSelected.length; i++) {
                itemNumber += parseInt(arrProcSelected[i].getElementsByTagName('span')[1].innerHTML, 10);
                orderValue.innerHTML = itemNumber;
                orderNumber.innerHTML = numProcSelected;
            }
        }

    }

    selectProcedure();

}());


