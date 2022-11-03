"use strict";

window.addEventListener("DOMContentLoaded", () => {

  const tabsContant = document.querySelectorAll(".block"),
        tabsbtn = document.querySelectorAll(".tabs__item"),
        tabsBtnParent = document.querySelector(".tabs__list-btn");

  function hideTabContant() {
    tabsContant.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show");
    });

    tabsbtn.forEach(item => {
      item.classList.remove("tabs__active");
    });
  }

  function showTabContant(i = 0) {
    tabsContant[i].classList.add("show");
    tabsContant[i].classList.remove("hide");
    tabsbtn[i].classList.add("tabs__active");
  }

  hideTabContant();
  showTabContant();

  tabsBtnParent.addEventListener("click", (e) => {
    const target = e.target;

    if(target && target.classList.contains("tabs__item")) {
      tabsbtn.forEach((item, i) => {
        if(target == item) {
          hideTabContant();
          showTabContant(i);
        }
      });
    }
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