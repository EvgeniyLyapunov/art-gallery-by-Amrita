"use strict";

window.addEventListener("DOMContentLoaded", () => {

  const arrowUp = document.querySelector(".arrow-up");

  window.addEventListener("scroll", (e) => {
    if(document.documentElement.scrollTop > 500) {
      arrowUp.classList.remove("hide");
      arrowUp.classList.add("show");
    } else {
      arrowUp.classList.remove("show");
      arrowUp.classList.add("hide");
    }
  });

  arrowUp.addEventListener("click", (e) => {
    window.scrollBy(0, -(window.scrollY));
  });


});