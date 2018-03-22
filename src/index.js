function init(e) {
    let elements = document.getElementsByTagName("BODY");
    elements[0].innerHTML = "<div>hello webpack with dll</div>";

    /*$.ajax({
        headers: {
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8"
        },
        url: "/api",
        type: "GET",
        success: (d) => {
            console.dir(d);
        }
    })*/
}
window.addEventListener("DOMContentLoaded", init);