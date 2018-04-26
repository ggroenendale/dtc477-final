$(".recipe-li").click(function() {
	$(".recipe-li").siblings().find("img").hide();
	$(this).find("img").show();
});