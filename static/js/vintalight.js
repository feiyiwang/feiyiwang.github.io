"use strict";

var activeVintalight = function activeVintalight(container) {
    container.addEventListener("click", function (e) {
        var element = e.target;
        if (element.tagName == "DIV") {

            var src = element.querySelector("img").getAttribute("src"),
                descrip = element.querySelector("img").getAttribute("alt"),

            vintalightOverlay = document.createElement("div");
            vintalightOverlay.classList.add("vintalight-overlay");
            vintalightOverlay.innerHTML = "\n<figure class=\"vitalight__container active\">\n<img src=\"" + src + "\" alt=\"" + descrip + "\" class=\"vintalight__img\"/>\n<button class=\"vintalight__button\" id=\"button-close\">\u2715</button>\n</figure>\n";
            document.body.appendChild(vintalightOverlay);

            setTimeout(function () {
                vintalightOverlay.classList.add("active");
            }, 1);
            document.body.style.overflow = "hidden";
            document.getElementById("button-close").addEventListener("click", function () {
                // Eliminar clase active
                vintalightOverlay.classList.remove("active");
                // Eliminar overlay del DOM
                setTimeout(function () {
                    document.body.removeChild(vintalightOverlay);
                }, 500);
                // Devolver scroll al body
                document.body.style.overflow = "auto";
            });
            window.addEventListener("keyup", function (e) {
                if (e.key === "Escape") document.getElementById("button-close").click();
            });
        }
    });
};

window.addEventListener("load", activeVintalight(document.getElementById("vintalight")));