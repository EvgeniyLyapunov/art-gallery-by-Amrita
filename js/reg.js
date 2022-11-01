"use strict";

window.addEventListener("DOMContentLoaded", () => {

  const tabsContant = document.querySelectorAll(".auth__registration"),
        tabsbtn = document.querySelectorAll(".auth__tab-btn"),
        tabsBtnParent = document.querySelector(".auth__tabs-wrapper");

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

    if(target && target.classList.contains("auth__tab-btn")) {
      tabsbtn.forEach((item, i) => {
        if(target == item) {
          hideTabContant();
          showTabContant(i);
        }
      });
    }
  });

});