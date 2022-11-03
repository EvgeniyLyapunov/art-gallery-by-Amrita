"use strict";

window.addEventListener("DOMContentLoaded", () => {

  const userNick = document.querySelector(".hero__user-nick");
  
  if(localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    userNick.textContent = `Здравствуйте, ${user.nickname}`;
  }

  const swiper = new Swiper('.swiper', {

    speed: 1000,
    // spaceBetween: 50,

    loop: true,
     effect: 'fade',
     
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

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