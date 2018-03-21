(function(){
	function init(e){
		let elements = document.getElementsByTagName("BODY");
		elements[0].innerHTML = "<div>hello webpack with dll</div>";
		alert($.fn.jquery);	
		alert("hello again!!!!");	
	}
	window.addEventListener("DOMContentLoaded",init);
})();
