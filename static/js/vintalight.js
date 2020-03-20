/**
 * Created by feiyiwang on 3/20/20.
 */

$(document).on('click','.close_',function(){
    $('#modal2').hide();
});
$('.vintalight__photo').click(function () {
    $('#modal2').show();
});
var activeVintalight = function activeVintalight(container) {
    container.addEventListener("click", function (e) {
        var element = e.target;
        if (element.tagName == "DIV") {
            $(".vitalight__container").empty();
            var src = element.querySelector("img").getAttribute("src"),
                descrip = element.querySelector("img").getAttribute("alt");
            pic = "<img src=\"" + src + "\" alt=\"" + descrip + "\" class=\"vintalight__img\"/>";
            dot = "<button  class=\"close_\" title=\"Close Modal\">&times;</button>";
            $(".vitalight__container").append(pic+dot);
        }
    });
};

window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));