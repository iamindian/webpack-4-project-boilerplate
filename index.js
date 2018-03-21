(function(){
	function init(e){
		let elements = document.getElementsByTagName("BODY");
		elements[0].innerHTML = "<div>hello webpack with dll</div>";
		//alert($.fn.jquery);	
		$.ajax({
			url:"/api",
			method:"GET",
		}).done((d)=>{
			console.dir(d);
		});
	}
	window.addEventListener("DOMContentLoaded",init);
})();
