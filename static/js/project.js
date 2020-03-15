/**
 * Created by feiyiwang on 3/15/20.
 */

$('.nav-tabs > li > a').click(function () {
    $(this).tab('show');
    $('.nav-tabs > li').removeClass('active');
    $('.nav-tabs > li > ul > li').removeClass('active');
    $(this).parent().addClass('active');
    $('.nav-tabs > li > ul').collapse('hide');
});