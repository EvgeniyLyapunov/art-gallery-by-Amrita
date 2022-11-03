"use strict";

window.addEventListener("DOMContentLoaded", () => {

  // стрелка перемотки вверх

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

  // авторизованный вход в личный кабинет

  let user;
  const profileSection = document.querySelector(".profile"),
        recentlySection = document.querySelector(".recently"),
        actionSection = document.querySelector(".action"),
        authInfo = document.querySelector(".auth-info");

  if(localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));

    sectionShow(profileSection);
    sectionShow(recentlySection);
    sectionShow(actionSection);
    sectionHide(authInfo);
  } else {
    sectionHide(profileSection);
    sectionHide(recentlySection);
    sectionHide(actionSection);
    sectionShow(authInfo);
  }

  function sectionShow(sectionSelector) {
    sectionSelector.classList.add("show");
    sectionSelector.classList.remove("hide");
  }

  function sectionHide(sectionSelector) {
    sectionSelector.classList.add("hide");
    sectionSelector.classList.remove("show");
  }

  const profileFields = document.querySelectorAll(".profile__text");
  const userValues = Object.values(user);

  profileFields.forEach((item, i) => {
    item.textContent = `${userValues[i+2]}`;
  });







});