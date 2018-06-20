let a = require("./a.js");
let b = require("./b.js");
let img = require("./assets/images/Fav.png");
async function init(e) {
	console.log($.fn.jquery);
	a.init();
	b.init();
    console.profile("init");
    let elements = document.getElementsByTagName("BODY");
    elements[0].innerHTML = "<div>hello</div>";
    return import(/*webpackChunkName:'async'*/'./async').then(()=>{
        console.log(`i am after async loaded module`);
        console.profileEnd("init");
    }).catch(error=>{
        console.log(`module not loaded`);
    });
    /*$.ajax({
        headers: {
            Accept: "text/html; charset=utf-8",
            "Content-Type": "text/plain charset=utf-8"
        },
        url: "/api",
        type: "GET",
        success: (d) => {
            console.dir(d);
        }
    })*/
}
window.addEventListener("DOMContentLoaded", init);
