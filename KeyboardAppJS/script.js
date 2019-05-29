const keyboard = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 92, 122, 120, 99, 118, 98, 
    110, 109, 44, 46, 47, 13, "ShiftLeft", "Space", "ControlLeft", "AltLeft"];
let inputForKey = document.querySelector('#inputForKey');
let flag = false;

function init() {
    let out = '';
    for(let i = 0; i < keyboard.length; i++) {
        let value = String.fromCharCode(keyboard[i]);
        if(i == 12 || i == 23 || i == 35) {
            out += "<div class='clearfix'></div>";
        }
        if(i == 34) {value = "enter";}
        if(i == 35) {value = "shift";}
        if(i == 36) {value = "space";}
        if(i == 37) {value = "ctrl";}
        if(i == 38) {value = "alt";}
        out += "<div class='k-key' data='" + keyboard[i] + "'>" + value + "</div>";
    }
    document.querySelector("#keyboard").innerHTML = out;
    document.querySelectorAll("#keyboard .k-key").forEach(function(el) {
        if(el.getAttribute('data') == '13') {
            el.className = "k-key enter";
        }
        if(el.getAttribute('data') == 'ShiftLeft') {
            el.className = "k-key shift";
        }
        if(el.getAttribute('data') == 'ControlLeft') {
            el.className = "k-key ctrl";
        }
        if(el.getAttribute('data') == 'Space') {
            el.className = "k-key space";
        }
        if(el.getAttribute('data') == 'AltLeft') {
            el.className = "k-key alt";
        }   
    })
    
}

function keyClick() {
    inputForKey.autofocus = true;
    document.querySelectorAll("#keyboard .k-key").forEach(function(element) {
        element.classList.remove("active");
    });
    let code = this;
    let codeValue = code.textContent;
    this.classList.add("active");
    
    if(code.textContent == "shift" || code.textContent == "ctrl" || code.textContent == "alt" || code.textContent == "enter") codeValue = "";
    if(code.textContent == "space") codeValue = " ";
    inputForKey.value += codeValue;
}

function keyKeypress(event) {
    document.querySelectorAll("#keyboard .k-key").forEach(function(element) {
        element.classList.remove("active");
    });
    inputForKey.autofocus = true;
    if(event.code == 'ShiftLeft' || event.code == 'ControlLeft' || event.code == 'Space' || event.code == 'AltLeft') {
        document.querySelector("#keyboard .k-key[data='" +event.code+ "']").classList.add("active");
    } 
        document.querySelector("#keyboard .k-key[data='" +event.keyCode+ "']").classList.add("active");
}

function keyKeydown(evt) {
    if(evt.code == "AltLeft" || evt.code == "ControlLeft") flag = true;
    if(evt.code == "ShiftLeft" && flag) {
        flag = false;
        document.querySelector("#keyboard .k-key[data='AltLeft']").classList.add("active");
        document.querySelector("#keyboard .k-key[data='ShiftLeft']").classList.add("active");
        document.querySelector("#keyboard .k-key[data='ControlLeft']").classList.add("active");
    }
}

init();
document.addEventListener("keypress", keyKeypress);
document.addEventListener("keydown", keyKeypress);
document.addEventListener("keydown", keyKeydown);
document.querySelectorAll("#keyboard .k-key").forEach(function(element) {
    element.addEventListener("click", keyClick);
});

