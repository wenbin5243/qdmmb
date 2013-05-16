window.onload=function() {
    $('.slider').makeSlider(
  {
    navType:'dot',
    navX: 2,
    navY: -15,
    title : true,
    titleX : 0,
    titleY : 320

  });
  // 使tabnav生效
  $('.nav-tab a').hover(function() {
    $(this).addClass('active').closest('li').siblings('li').children('a').removeClass('active');
    var index = $('.nav-tab li').index($(this).closest('li'));
    $('.nav-content').eq(index).addClass('active').siblings().removeClass('active');
  });
};