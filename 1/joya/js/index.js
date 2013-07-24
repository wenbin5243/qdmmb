$(function(){
	/*幻灯*/
	$(".m1 ul").cycle({
		fx:"scrollLeft",
		timeout:3000,
		speed:'fast',
		pause:1,
		pager:".m1 .footer"
	})
	/*tab 选项卡*/
	var $tab=$(".tab .header ul li")
	/*初始状态*/
	$tab.eq(0).addClass("active");
	$(".tab .main:eq(1)").hide();
	$(".tab ul.main:eq(1),.tab ul.main:eq(2)").hide();

	$tab.hover(function(){
		$(this).addClass('active').siblings().removeAttr('class');
		var index=$tab.index(this);
		$(".tab .main").eq(index)
			.show()
			.siblings(".main").hide();
	})
})