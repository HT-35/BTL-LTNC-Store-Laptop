import { fetchMethodPost } from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", () => {
  // ========================  REGISTER ========================
  const form = document.querySelector("#register-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Validate the form fields
    const firstname = document
      .querySelector("#FirstName-Rigister")
      .value.trim();
    const lastname = document.querySelector("#LastName-Rigister").value.trim();
    const email = document.querySelector("#email-Rigister").value.trim();
    const numberphone = document
      .querySelector("#number-phone-Rigister")
      .value.trim();
    const password = document.querySelector("#register-password").value.trim();

    if (firstname === "") {
      alert("Please enter your first name");
      return;
    }

    if (lastname === "") {
      alert("Please enter your last name");
      return;
    }

    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (!isValidPhoneNumber(numberphone)) {
      alert("Số điện thoại là 10 số. Vui lòng nhập lại.");
      return;
    }

    // You can add more validation rules for email and phone number if needed

    if (password === "") {
      alert("Please enter your password");
      return;
    }

    // If all fields are valid, proceed with form submission
    const data = {
      fullName: `${firstname} ${lastname}`,
      email: email,
      numberPhone: numberphone,
      passWord: password,
    };

    // You can now submit the form data using your fetchMethodPost function or any other method
    createUser(data);
  });

  // ========================  Login ========================
  const formSingin = document.querySelector("#singin-form");

  formSingin.addEventListener("submit", (e) => {
    e.preventDefault();
    const notifi = document.querySelector("#notifi");
    const buttonSingin = document.querySelector("#button-singin");

    const singinEmail = document.querySelector("#singin-email");
    const singinPassword = document.querySelector("#singin-password");
    console.log(singinEmail, singinPassword);

    singinEmail.addEventListener("change", () => {
      buttonSingin.removeAttribute("disabled");
      notifi.innerHTML = "";
    });
    singinPassword.addEventListener("change", () => {
      buttonSingin.removeAttribute("disabled");
      notifi.innerHTML = "";
    });

    const account = {
      username: singinEmail.value.trim(),
      password: singinPassword.value.trim(),
    };

    async function login(data) {
      const postData = await fetchMethodPost(
        "http://localhost:3000/login",
        data
      );
      const res = await postData;
      if (res.status === true) {
        alert("login successfull");
        console.log(res);
        const { token, fullName } = res;
        console.log({ token, fullName });
        showProfile(token, fullName);
        window.location.href = "http://127.0.0.1/index.html";
      } else {
        const template = `<span class="text-danger">Tài Khoản Hoặc Mật Khẩu Sai !!</span>`;
        notifi.insertAdjacentHTML("beforeend", template);
        buttonSingin.setAttribute("disabled", "");
      }
    }
    login(account);
  });
});

async function createUser(data) {
  const postData = await fetchMethodPost(
    "http://localhost:3000/user/create",
    data
  );
  const res = await postData;
  console.log(res);
  if (res.status === true) {
    alert("Tạo Tài Khoản Thành Công !! ");
    window.location.href = "http://127.0.0.1/login.html";
  } else {
    const notifi = `${res.data.errors[0].path} đã tồn tại`;
    alert(notifi);
  }
}

function isValidPhoneNumber(phone) {
  // Sử dụng regular expression để kiểm tra số điện thoại có đúng định dạng không (ví dụ: có đủ 10 số)
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function showProfile(token, username) {
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userName", username);
}
