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

  const validation = new window.JustValidate('#registration-form', {
    errorFieldCssClass: 'is-invalid',
    errorFieldStyle: {
      border: '1px solid #FF5C00',
    },
    errorLabelCssClass: 'is-label-invalid',
    errorLabelStyle: {
      color: '#FF5C00',
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
  .addField('#first-name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткое имя'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное имя'
    },
  ])
  .addField('#middle-name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткое отчество'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное отчество'
    },
  ])
  .addField('#last-name', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткая фамилия'
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Слишком длинная фамилия'
    },
  ])
  .addField('#reg-nick', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Слишком короткий ник'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинный ник'
    },
  ])
  .addField('#reg-email', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'email',
      errorMessage: 'Email имеет неверный формат!',
    },
  ])
  .addField('#reg-password', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'minLength',
      value: 5,
      errorMessage: 'Слишком короткий пароль'
    },
  ])
  .addField('#reg-repeat-password', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      validator: (value, fields) => {
        if (fields['#reg-password'] && fields['#reg-password'].elem) {
          const repeatPasswordValue = fields['#reg-password'].elem.value;
  
          return value === repeatPasswordValue;
        }
  
        return true;
      },
      errorMessage: 'Пароль должен быть тем же',
    },
  ])
  .onSuccess(() => {
    authPost("#registration-form", "#registration-submit", "server/reg.php", "#checkbox");
  });





  // Регистрация и вход
  //authPost("#registration-form", "#registration-submit", "server/reg.php", "#checkbox");
  authPost("#login-form", "#login-submit", "server/login.php");

  function  authPost(formSelector, btnSelector, urlPath, ...rest) {
    const form = document.querySelector(formSelector),
          submit = document.querySelector(btnSelector);

    submit.addEventListener("click", async (e) => {
      e.preventDefault();

      if(rest.length > 0) {
        const check = document.querySelector(rest[0]);
        if(!check.checked) {
          alert("Для регистрации нужно согласие на обработку данных");
          return;
        }
      }

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      if((JSON.parse(json).confirmPass) && (JSON.parse(json).pass != JSON.parse(json).confirmPass)) {
        alert("Неправильно подтверждён пароль");
        return;
      }

      let answer = await postData(urlPath, json);
      userData(answer, form);
    });      
  }

  async function postData(urlPath, json) {
    let result = await fetch(urlPath, {
      method: "POST",
      body: json,
      headers: { "Accept": "application/json", "Content-Type": "application/json;charset=utf-8" }
    });
    return await result.json();
  }

  function userData(userObj, form) {
    if(userObj.status == "ok") {
      localStorage.setItem("user", `${JSON.stringify(userObj)}`);

      form.reset();
      location.href="index.html";
    } else {
      alert(userObj.status);
      form.reset();
      return;
    }
  }
});