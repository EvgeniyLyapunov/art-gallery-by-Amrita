"use strict";

window.addEventListener("DOMContentLoaded", () => {

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

});