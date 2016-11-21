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
