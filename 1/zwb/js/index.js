$(function(){
	//幻灯
	$('.m1 .b ul').cycle({
		fx:     'scrollLeft',
		speed:  'fast',
		timeout: 3000,
		pager:  '.m1 .f'
	});
	//标签卡
	$('.tab .h li').hover(function(){
		var index=$('.tab .h li').index(this);
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab .b').eq(index).addClass('active').siblings().removeClass('active');
	})
})