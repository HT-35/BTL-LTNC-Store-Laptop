import { fetchMethodPost } from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", () => {
  // ========================  REGISTER ========================

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
    console.log("account:", account);

    async function login(data) {
      const postData = await fetchMethodPost(
        "http://localhost:3000/login/admin",
        data
      );
      const res = await postData;
      console.log("res:", res);
      if (res.status === true) {
        alert("login successfull");
        console.log(res);
        const { token, fullName } = res;
        console.log({ token, fullName });
        showProfile(token, fullName);
        window.location.href = "http://127.0.0.1/admin-dashboad.html";
      } else {
        if ((res.data = "user does not have permission !!!")) {
          const template = `<span class="text-danger">Bạn Không Có Quyền Truy Cập !!!</span>`;
          notifi.insertAdjacentHTML("beforeend", template);
          buttonSingin.setAttribute("disabled", "");
        } else {
          const template = `<span class="text-danger">Tài Khoản Hoặc Mật Khẩu Sai !!</span>`;
          notifi.insertAdjacentHTML("beforeend", template);
          buttonSingin.setAttribute("disabled", "");
        }
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
