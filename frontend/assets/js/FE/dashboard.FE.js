import {
  callAPIFunction,
  callAPIMethodPost,
  callApiMethodGet,
} from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const insertAddress = document.querySelector(".insert-address");

  // === === === === === === === === === === Check Authen === === === === === === === === === ===

  const insertInfo = document.querySelector("#insert-info");
  const token = localStorage.getItem("accessToken");
  //console.log(token);
  if (token) {
    insertInfo.innerHTML = "";
    //console.log("ok");
    const userName = localStorage.getItem("userName");
    const templateUser = `                <div class="dropdown compare-dropdown">
                                    <a href="./dashboard.html" class="dropdown-toggle" role="button">
                                        <div class="icon">

                                            <i class="fa-regular fa-user"></i>
                                        </div>
                                        <p style="color: #ffffff;">${userName}</p>
                                    </a>
                                </div>`;

    insertInfo.insertAdjacentHTML("beforeend", templateUser);
  } else {
    window.location.href = "./login.html";
  }

  //  === === === === === === === === === ===   Check URL    === === === === === === === === === ===

  var hash = window.location.hash;
  var navLinks = document.querySelectorAll(".nav-dashboard .nav-link");
  var tabContent = document.querySelectorAll(".tab-content .tab-pane");

  if (hash === "#tab-address-link") {
    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });
    tabContent.forEach(function (link) {
      link.classList.remove("active");
    });

    var tabLink = document.getElementById("tab-address-link");
    var tabAddress = document.getElementById("tab-address");

    if (tabLink) {
      tabLink.classList.add("active");
      tabAddress.classList.add("show");
      tabAddress.classList.add("active");
    }
  }

  //  === === === === === === === === === ===  Call API Create Address    === === === === === === === === === ===

  var emailInput = document.getElementById("email-Rigister");
  var numberPhoneInput = document.getElementById("number-phone-Rigister");
  var addressInput = document.getElementById("register-address");

  addressInput.addEventListener("change", () => {
    saveChangesBtn.removeAttribute("disabled");
  });

  // Lấy thẻ nút "Save changes"
  var saveChangesBtn = document.getElementById("saveChangesBtn");
  var modal = document.getElementById("exampleModal");

  // Gán sự kiện click cho nút "Save changes"
  saveChangesBtn.addEventListener("click", async function () {
    // Kiểm tra xem các trường có được nhập đủ không
    var emailValue = emailInput.value;
    var numberPhoneValue = numberPhoneInput.value;
    var addressValue = addressInput.value;

    if (!emailValue || !numberPhoneValue || !addressValue) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return; // Dừng việc thực hiện hàm tiếp theo nếu có trường không được nhập đủ
    }

    // Kiểm tra định dạng email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      alert("Email không hợp lệ!");
      return; // Dừng việc thực hiện hàm tiếp theo nếu email không hợp lệ
    }

    // Kiểm tra định dạng số điện thoại (ví dụ: 10 chữ số)
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(numberPhoneValue)) {
      alert("Số điện thoại không hợp lệ!");
      return; // Dừng việc thực hiện hàm tiếp theo nếu số điện thoại không hợp lệ
    }

    const address = {
      email_address: emailValue,
      numberPhone: numberPhoneValue,
      address: addressValue,
    };

    const token = localStorage.getItem("accessToken");
    //console.log(token);

    const createAddress = await callAPIMethodPost(
      "http://localhost:3000/delivery-address",
      localStorage.getItem("accessToken"),
      address
    );
    console.log(createAddress);

    // === === === === === === === === === === ===  Clear Modal  === === === === === === === === === === ===

    if (!createAddress.status) {
      const errorEmail = document.querySelector("#error-email");
      if (createAddress.data == "address must be unique") {
        errorEmail.innerText = "* địa chỉ giao hàng đã tồn tại";
        saveChangesBtn.setAttribute("disabled", "");
        return;
      } else {
        errorEmail.innerText = `${createAddress.data}`;
        saveChangesBtn.setAttribute("disabled", "");
        //alert(createAddress.data);
        return;
      }
    } else {
      const { id, address, email_address, numberPhone } = createAddress.data;
      console.log(id);

      const templateAddress = `
  
                                                        <div class="col-lg-12"   >
                                                          <div class="card card-dashboard " id='${id}'>
                                                            <div class="card-body">
                                                                <h3 class="card-title">Địa Chỉ Giao Hàng </h3>
                                                                <div class="row">
                                                                    <div class="col-4 col-sm-4 col-md-4">Số Điện Thoại</div>
                                                                    <div class="col-8 col-sm-8 col-md-8">0${numberPhone}</div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-4 col-sm-4 col-md-4">Địa Chỉ</div>
                                                                    <div class="col-8 col-sm-8 col-md-8">${address}</div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-4 col-sm-4 col-md-4">Địa Chỉ Email</div>
                                                                    <div class="col-8 col-sm-8 col-md-8">${email_address}</div>
                                                                   
                                                                </div>
                                                                <a href="#">Edit <i class="icon-edit"></i></a>
                                                            </div>
                                                          </div>
                                                        </div>
  
  `;
      insertAddress.insertAdjacentHTML("beforeend", templateAddress);

      saveChangesBtn.setAttribute("data-dismiss", "modal");
      modal.setAttribute("aria-hidden", "true");

      modal.style.display = "none";
      modal.classList.remove("show"); // Loại bỏ lớp "show"
      modal.classList.add("fade"); // Thêm lớp "fade" để modal biến mất một cách mượt mà
      document.body.classList.remove("modal-open"); // Loại bỏ lớp "modal-open" từ thẻ body
      var backdrop = document.querySelectorAll(".modal-backdrop"); // Tìm thẻ backdrop

      backdrop.forEach((backdrop) => {
        backdrop.parentNode.removeChild(backdrop); // Loại bỏ backdrop
      });

      // Xóa thông tin đã nhập

      numberPhoneInput.value = "";
      addressInput.value = "";
      setTimeout(() => {
        saveChangesBtn.removeAttribute("data-dismiss", "modal");
      }, 1000);
    }
  });

  //  === === === === === === === === === ===  Get Data Address    === === === === === === === === === ===

  const listAddress = await callApiMethodGet(
    "http://localhost:3000/delivery-address",
    token
  );
  listAddress.data.forEach((addr, index) => {
    const { id, address, email_address, numberPhone } = addr;
    //console.log(id);

    const templateAddress = `
  
                                                        <div class="col-lg-12"   >
                                                          <div class="card card-dashboard " id='${id}'>
                                                            <div class="card-body">
                                                                <h3 class="card-title">Địa Chỉ Giao Hàng ${
                                                                  index + 1
                                                                }</h3>
                                                                <div class="row">
                                                                    <div class="col-4 col-sm-4 col-md-4">Số Điện Thoại</div>
                                                                    <div class="col-8 col-sm-8 col-md-8">0${numberPhone}</div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-4 col-sm-4 col-md-4">Địa Chỉ</div>
                                                                    <div class="col-8 col-sm-8 col-md-8">${address}</div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-4 col-sm-4 col-md-4">Địa Chỉ Email</div>
                                                                    <div class="col-8 col-sm-8 col-md-8">${email_address}</div>
                                                                   
                                                                </div>
                                                                <a href="#">Edit <i class="icon-edit"></i></a>
                                                            </div>
                                                          </div>
                                                        </div>
  
  `;
    insertAddress.insertAdjacentHTML("beforeend", templateAddress);
  });

  // ==================   Handle signout =============================

  const btnSignout = document.querySelector(".btn-signout");
  btnSignout.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    window.location.href = "/index.html";
  });

  // =================================== Get Detail Accout   =================================
  const user = await callApiMethodGet(
    "http://localhost:3000/user/info-user",
    localStorage.getItem("accessToken")
  );
  const { email, fullName, numberPhone } = user.data;

  const insertData = document.querySelector(".insert-data");

  const templateInfo = `
  
                                                      <div class="">
                                                        <div class="row text-center">
                                                            <div class="col-1 col-sm-1 col-md-1"></div>
                                                            <div class="col-3 col-sm-3 col-md-3">
                                                                Họ Tên :
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                               ${fullName}
                                                            </div>
                                                        </div>
                                                        <div class="row text-center">
                                                            <div class="col-1 col-sm-1 col-md-1"></div>
                                                            <div class="col-3 col-sm-3 col-md-3">
                                                                Email :
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                               ${email}
                                                            </div>
                                                        </div>
                                                        <div class="row text-center">
                                                            <div class="col-0 col-sm-0 col-md-1"></div>
                                                            <div class="col-4 col-sm-4 col-md-3">
                                                                Số Điện Thoại :
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                               ${numberPhone}
                                                            </div>
                                                        </div>
                                                    </div>

  `;
  insertData.insertAdjacentHTML("beforeend", templateInfo);

  // =================================== History Bought    =================================

  const insertProduct = document.querySelector("#insert-product");

  const getHistoryBought = await callApiMethodGet(
    "http://localhost:3000/bill/",
    localStorage.getItem("accessToken")
  );
  getHistoryBought?.data.forEach(async (item) => {
    const { price_per_unit, slug_Product, color, quanlity } = item.Billitems[0];
    //console.log({ price_per_unit, slug_Product, color, quanlity });

    const findProduct = await callApiMethodGet(
      `http://localhost:3000/product/${slug_Product}`,
      localStorage.getItem("accessToken")
    );
    const { nameLaptop, img } = findProduct.data;
    const fillterImg = img.filter((item, index) => item.color === color);
    const imgPath = fillterImg[0].path[0];
    console.log("img:", imgPath);

    const templateProduct = `
    
            <div class="row   border-bottom">
            <div
                class="col-2 col-sm-2 col-md-2 col-lg-2 d-flex justify-content-center justify-items-center border-right  border-left">

                <img class="w-50"
                    src="http://localhost:3000/${imgPath}">

            </div>
            <div
                class="col-4 col-sm-4 col-md-4 col-lg-4 text-left  border-right">
                <p class="font-weight-bold">${nameLaptop}
                </p>

            </div>
            <div
                class="col-2 col-sm-2 col-md-2 col-lg-2 border-right">
                <div class="text-center">
                    <p class="font-weight-bold ">
                        ${color}</p>
                </div>
            </div>
            <div
                class="col-2 col-sm-2 col-md-2 col-lg-2 border-right">
                <div class="text-center">
                    <p class="font-weight-bold ">
                        ${quanlity}</p>
                </div>
            </div>
            <div
                class="col-2 col-sm-2 col-md-2 col-lg-2 border-right p-0">
                <div class="text-center">
                    <p class="font-weight-bold ">
                        ${price_per_unit}đ</p>
                </div>
            </div>
        </div>
    `;
    insertProduct.insertAdjacentHTML("beforeend", templateProduct);
  });
});
