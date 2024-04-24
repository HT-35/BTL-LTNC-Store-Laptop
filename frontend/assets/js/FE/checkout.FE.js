import {
  callAPIFunction,
  callAPIMethodDelete,
  callAPIMethodPost,
  callApiMethodGet,
  fetchMethodPostAddCart,
} from "../utils/callApi.js";

const addressInsert = document.querySelector(".address-insert");
const token = localStorage.getItem("accessToken");
const apiGetListAddress = "http://localhost:3000/delivery-address";

document.addEventListener("DOMContentLoaded", async () => {
  const insertInfo = document.querySelector("#insert-info");
  if (localStorage.getItem("accessToken")) {
    insertInfo.innerHTML = "";

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
  }

  // === === === === === === === === ===   Get Product    === === === === === === === === ===

  const url = new URL(window.location.href);
  const slugProduct = url.searchParams.get("product");
  const color = url.searchParams.get("color");
  //console.log("slugProduct:", slugProduct);
  //console.log("color:", color);

  const res = await callAPIFunction(
    `http://localhost:3000/product/${slugProduct}`
  );
  //console.log(res);

  const detailProduct = await res.data;

  const { _id, nameLaptop, img, ram, storage, colors } = detailProduct;

  //  const price = product.colors[0].price;

  //=== === === === === === Filter Product

  const insertData = document.querySelector("#insert-data");
  const totalCheckout = document.querySelector("#total-checkout");

  const price = colors.filter((item) => item.color == color);
  const newPrice = price.length > 0 ? price[0].price : colors[0].price;
  const imgfilter = img.filter((item) => item.color === color);
  const pathImg = imgfilter[0].path[0];
  // === === === === === === Query Cart Get Quantity
  const getProductDetailInCard = await callApiMethodGet(
    `http://localhost:3000/cart/detail?id_product=${_id}&color=${color}`,
    localStorage.getItem("accessToken")
  );

  let quantity = 1;

  if (getProductDetailInCard.data) {
    quantity = getProductDetailInCard?.data[0].quantity;
  }

  const totalPrice = Number(quantity) * Number(newPrice);
  //console.log(getProductDetailInCard);

  totalCheckout.innerText = `${convertNumber(totalPrice)}đ`;

  const templateProductBilling = `
          <div class="">
                    <tr>
                        <td class="product-col">
                          <div class="product">
                              <figure class="product-media">
                  
                                      <img src="http://localhost:3000/${pathImg}"
                                          alt="Product image">
                      
                              </figure>

                              <h3 class="product-title">
                               ${nameLaptop}
                              </h3>
                          </div>
                        </td>
                        <td class="price-col" >${color}</td>
                        <td class="price-col text-center">${convertNumber(
                          newPrice
                        )}đ</td>
                        <td class="quantity-col  text-center">
                            <p ">${quantity}</p>
                        </td>
                        <td class="total-col text-center">${convertNumber(
                          totalPrice
                        )}đ</td>

                    </tr>
                </div>
  `;

  insertData.insertAdjacentHTML("beforeend", templateProductBilling);

  // === === === === === === === === === Lấy Địa Chỉ Giao Hàng === === === === === === === === ===
  const insertAddress = document.querySelector("#insert-address");
  const listAddress = await callApiMethodGet(apiGetListAddress, token);
  console.log("listAddress:", listAddress);

  if (listAddress.data.length > 0) {
    console.log("ok");
    listAddress?.data.forEach((item, index) => {
      const { numberPhone, id_User, id, email_address, address } = item;
      const templateAdress = `
              <button type="button" class="dropdown-item address" id='id-address'  data-id='${id}'>
                <div class="card-body">
                    <h3 class="card-title mb-1">Địa Chỉ Giao Hàng ${
                      index + 1
                    }</h3>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-2">Số Điện Thoại
                        </div>
                        <div class="col-10 col-sm-10 col-md-10" id='numberPhone-address'>0${numberPhone}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-2">Địa Chỉ</div>
                        <div class="col-10 col-sm-10 col-md-10" id='address-address'>
                            ${address}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-2">Địa Chỉ Email
                        </div>
                        <div class="col-10 col-sm-10 col-md-10" id='email-address'>
                           ${email_address}
                    </div>
                </div>
            </button>
  `;

      insertAddress.insertAdjacentHTML("beforeend", templateAdress);
    });

    // ====================================== add default address ======================================

    //console.log(listAddress.data[0]);

    const { numberPhone, id_User, id, email_address } = listAddress?.data[0];
    const addressShip = listAddress.data[0].address;

    const templateAdressDefault = `
       <div class="card-body  p-0" id='id-address' data-id='${id}'>
                                                    <h3 class="card-title mb-1">Địa Chỉ Giao Hàng </h3>
                                                    <div class="row mb-1">
                                                        <div class="col-4 col-sm-4 col-md-4">Số Điện Thoại
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">0${numberPhone}
                                                        </div>
                                                    </div>
                                                    <div class="row mb-1">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ</div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${addressShip}
                                                        </div>
                                                    </div>
                                                    <div class="row mb-1">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ Email
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${email_address}
                                                        </div>
                                                    </div>
                                                </div>
  `;

    addressInsert.insertAdjacentHTML("beforeend", templateAdressDefault);

    // ==================    add Create Address =============
    const templateAddAdress = `
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Thêm Địa Chỉ Giao Hàng
            </button>
    `;
    insertAddress.insertAdjacentHTML("beforeend", templateAddAdress);
  } else {
    const templateAddAdress = `
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Thêm Địa Chỉ Giao Hàng
            </button>
    `;
    insertAddress.insertAdjacentHTML("beforeend", templateAddAdress);
  }

  // ==================    handle add  Address =============
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
      window.location.href = window.location.href;
    }
  });

  //====================    Get Selection address    =========
  const address = document.querySelectorAll(".address");

  address.forEach((item) => {
    //console.log(address);
    item.addEventListener("click", (e) => {
      let idAddress = e.currentTarget.getAttribute("data-id");

      const numberPhone = e.currentTarget
        .querySelector("#numberPhone-address")
        .textContent.trim();
      const address = e.currentTarget
        .querySelector("#address-address")
        .textContent.trim();
      const email = e.currentTarget
        .querySelector("#email-address")
        .textContent.trim();

      const templateAddressShiping = `
                           <div class="card-body  p-0" id='id-address' data-id='${idAddress}'>
                                                    <h3 class="card-title mb-1">Địa Chỉ Giao Hàng </h3>
                                                    <div class="row">
                                                        <div class="col-4 col-sm-4 col-md-4">Số Điện Thoại
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">${numberPhone}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ</div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${address}
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4 col-sm-4 col-md-4">Địa Chỉ Email
                                                        </div>
                                                        <div class="col-8 col-sm-8 col-md-8">
                                                            ${email}
                                                        </div>
                                                    </div>
                                                </div>

      `;
      addressInsert.innerHTML = "";
      addressInsert.insertAdjacentHTML("beforeend", templateAddressShiping);
    });
  });
  //=========================   button checkout  ====================================

  const btnCheckout = document.querySelector("#btn-checkout");

  btnCheckout.addEventListener("click", async () => {
    const idAddress = addressInsert
      .querySelector("#id-address")
      .getAttribute("data-id");

    const bill = {
      id_address: idAddress,
      id_product: [slugProduct],
      quanlity: [quantity],
      color: [color],
    };
    const createBill = await callAPIMethodPost(
      "http://localhost:3000/bill",
      localStorage.getItem("accessToken"),
      bill
    );

    // remove product in cart after checkout
    const product = {
      id_product: _id,
      color: color,
    };
    console.log(product);
    const removeProduct = await callAPIMethodDelete(
      "http://localhost:3000/cart/remove-product",
      localStorage.getItem("accessToken"),
      product
    );
    console.log(removeProduct);
    const idBill = createBill.data.id;
    console.log("idBill:", idBill);
    window.location.href = `/bill.html?bill=${idBill}`;
  });
});

function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
