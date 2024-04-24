import {
  callAPIMethodPost,
  callAPIPost,
  callApiMethodGet,
} from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  const insertInfo = document.querySelector("#insert-info");
  const token = localStorage.getItem("accessToken");
  //console.log(token);
  if (token) {
    insertInfo.innerHTML = "";
    //console.log("ok");
    const userName = localStorage.getItem("userName");
    const templateUser = `                <div class="dropdown compare-dropdown">
                                    <a href="#" class="dropdown-toggle" role="button">
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

  // ==================   Handle signout =============================

  const btnSignout = document.querySelector(".btn-signout");
  btnSignout.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    window.location.href = "/index.html";
  });

  // ==========================  Get Detail Accout   =================================
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
                                                       <div class="row text-center">
                                                            <div class="col-0 col-sm-0 col-md-1"></div>
                                                            <div class="col-4 col-sm-4 col-md-3">
                                                               Vai trò:
                                                            </div>
                                                            <div class="col-8 col-sm-8 col-md-8 text-left">
                                                              Admin
                                                            </div>
                                                        </div>
                                                    </div>

  `;
  insertData.insertAdjacentHTML("beforeend", templateInfo);

  // ==========================  Get NEW bILL   =================================

  const insertBill = document.querySelector("#insert-bill");

  const billList = await callApiMethodGet(
    "http://localhost:3000/bill/get-all",
    localStorage.getItem("accessToken")
  );

  const billListData = billList?.data || [];

  for (let index = 0; index < billListData.length; index++) {
    const item = billListData[index];
    const { id_address, total } = item;
    const { slug_Product, color, quanlity, createdAt } = item.Billitems[0];

    const address = await callApiMethodGet(
      `http://localhost:3000/delivery-address/detail/${id_address}`,
      localStorage.getItem("accessToken")
    );
    const addressDetail = address.data.address;

    const product = await callApiMethodGet(
      `http://localhost:3000/product/${slug_Product}`,
      localStorage.getItem("accessToken")
    );
    const { nameLaptop, storage, ram } = product.data;

    //console.log("nameLaptop:", index);
    const date = new Date(createdAt);

    const formattedDate = ` ${date.getHours()}h${date.getMinutes()}"  -  ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear().toString()}    `;

    const templateBill = `

       <div class="card card-dashboard " id="insert-bill">

                  <div class="card-body  p-5">
                  <h3 class="card-title text-center">Đơn Hàng ${index + 1}
                  </h3>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold font-weight-bold ">
                          Khách Hàng:
                      </div>
                      <div
                          class="col-7 col-sm-7 col-md-9  p-0 ">
                          ${fullName}
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold font-weight-bold ">
                          Số
                          Điện
                          Thoại :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9  p-0 ">
                         ${numberPhone}
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold font-weight-bold ">
                          Email:
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                          ${email}
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold font-weight-bold ">
                          Địa
                          Chỉ
                          :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                         ${addressDetail}
                      </div>
                  </div>

                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold ">
                          Tên
                          Sản Phẩm :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                         ${nameLaptop}
                      </div>
                  </div>

                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold ">
                          Số
                          Lượng :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                          ${quanlity}
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold ">
                         Ram :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                          ${ram}
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold ">
                         Bộ Nhớ :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                          ${storage}
                      </div>
                  </div>

                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold  ">
                          Màu Sắc :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                          ${color}
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold  ">
                          Tổng Tiền :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                         ${convertNumber(total)} đ
                      </div>
                  </div>
                  <div class="row">
                      <div
                          class="col-4 col-sm-4 col-md-3 p-0 font-weight-bold  ">
                          Ngày Đặt Hàng :
                      </div>
                      <div
                          class="col-8 col-sm-8 col-md-9 p-0 ">
                         ${formattedDate}
                      </div>
                  </div>
                  <!--<a href="#">Chi Tiết Đơn Hàng <i
                          class="icon-edit"></i></a>-->
              </div>
        </div>
      `;

    insertBill.insertAdjacentHTML("beforeend", templateBill);
  }
});

function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
