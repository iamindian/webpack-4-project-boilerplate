async function init(e) {
    let elements = document.getElementsByTagName("BODY");
    elements[0].innerHTML = "<div>hello</div>";
    return import(/*webpackChunkName:'async'*/'./async').then(()=>{
        alert(`i am after async loaded module`);
    }).catch(error=>{
        alert(`module not loaded`);
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