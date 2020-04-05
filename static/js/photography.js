/**
 * Created by feiyiwang on 3/20/20.
 */

$(document).on('click','.close_',function(){
    $('#modal2').hide();
});
$('.div_pic').click(function () {
    var src = $(this).children("img").attr("src"),
        content = '<figure class="figure_pic_ scroll"><button  class="close_" title="Close">&times;</button></figure>';
    $("#modal2").empty().append(content).show();
    var actual_width, actual_height, pic;

    $("<img>").attr("src", src).load(function(){
        actual_width = this.width;
        actual_height = this.height;
        // alert(actual_width+'  '+actual_height);
        if (actual_width >= actual_height) {
            pic = '<img src="' + src + '" alt="" class="img_pic_ img_w"/>';
        } else if (actual_width < actual_height) {
            pic = '<img src="' + src + '" alt="" class="img_pic_ img_h"/>';
        }
        $(".figure_pic_").append(pic);
    });
});

function goBack() {
    window.history.back();
}

// var activeVintalight = function activeVintalight(container) {
//     container.addEventListener("click", function (e) {
//         var element = e.target;
//         if (element.tagName == "DIV") {
//
//         }
//     });
// };
// window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));