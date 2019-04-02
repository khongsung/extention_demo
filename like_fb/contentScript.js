setInterval(function(){
	var like = document.querySelectorAll("._666k div a[aria-pressed='false']");
	if(like.length != 0) {
		like.forEach(function(i,j){
			i.click();
		});
	}
}, 5000);
