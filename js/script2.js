//document.getElementsByClassName('recipe-div').child
$(".recipe-div a").on('click',function() {
	//console.log(this);
	$(".photo").removeClass("photo").addClass("recipe-li-h");
	$(this).parent().parent().parent().removeClass("recipe-li-h").addClass("photo");
	$("#shownimg")
	$(this).append(`<div id="shownimg" style='background-image: url("img/${$(this).attr("data-img")}"); background-repeat: no-repeat; height: 250px; width: 300px; background-size: contain; margin: auto;'></div>`);
	//$(".recipe-li").css("height", "300px");
});

