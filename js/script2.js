$(".recipe-li").click(function() {
	$(".recipe-li").siblings().find("img").hide();
	$(this).find("img").show();
	
});


//$(".menu").click(function() {
//	get_things('menu');
	
//});	

//function exportto_menu(data) {
//}

$("#arrow").click(function() {
	
	if ($("#arrow").css('transform') == 'none') {
		$("#arrow").css({'transform' : 'rotate(-180deg)'});
		$("#recipes").find("ul").show();
	} else {
		$("#arrow").css({'transform' : ''});
		$("#recipes").find("ul").hide();
	}
	

});