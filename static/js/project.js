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

// $('.concept').click(function () {
//     $(this).target('blue');
// });

$('.closebtn').click(function () {
    $("#sidebar").hide();
    $("#content").toggleClass("col-md-9 col-md-12");
    $(".openbtn").show();
});
$('.openbtn').click(function () {
    $("#sidebar").show();
    $("#content").toggleClass("col-md-12 col-md-9");
    $(".openbtn").hide();
});
