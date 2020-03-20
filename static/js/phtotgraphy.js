/**
 * Created by feiyiwang on 3/20/20.
 */

$(document).on('click','.close_',function(){
    $('#modal2').hide();
});
$('.div_pic').click(function () {
    $('#modal2').show();
});
var activeVintalight = function activeVintalight(container) {
    container.addEventListener("click", function (e) {
        var element = e.target;
        if (element.tagName == "DIV") {
            var src = element.querySelector("img").getAttribute("src");
            content = '<figure class="figure_pic_"><button  class="close_" title="Close">&times;</button></figure>';
            $("#modal2").empty().append(content);
            pic = '<img src="' + src + '" alt="" class="img_pic_"/>';
            $(".figure_pic_").append(pic);
        }
    });
};
window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));