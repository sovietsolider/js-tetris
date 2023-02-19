let ul = document.getElementById("ranksTable");
for(let i=0; i<localStorage.length; i++) {
    if(localStorage.key(i)!=="|DEV|lvl") {
        let obj = localStorage.getItem(localStorage.key(i));
        console.log(obj);
        let li = document.createElement('li');
        li.innerHTML = obj + " point" + " / " + localStorage.key(i);
        ul.append(li);
    }
}

function checkLvl() {
    if (document.getElementById("lvl1").checked) {
        localStorage.setItem("|DEV|lvl", "1");
        window.location = "../index.html";
    } else if (document.getElementById("lvl2").checked) {
        localStorage.setItem("|DEV|lvl", "2");
        window.location = "../index.html";
    }
}

function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("ranksTable");
    switching = true;
    while (switching) {
        switching = false;
        b = list.getElementsByTagName("LI");
        for (i = 0; i < (b.length - 1); i++) {
            shouldSwitch = false;
            if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}
sortList();
