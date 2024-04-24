import { callAPIFunction, callApiMethodGet } from "../utils/callApi.js";
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

  // ===  ===  ===  ===  ===  ===  ===  Get ID Bill    ===  ===  ===  ===  ===  ===

  const insertData = document.querySelector("#insert-Data");

  const url = new URL(window.location.href);
  const idBill = url.searchParams.get("bill");
  const getDetailBill = await callApiMethodGet(
    `http://localhost:3000/bill/detail/${idBill}`,
    localStorage.getItem("accessToken")
  );
  const { id_address, total } = getDetailBill?.data;
  const getDetailAddress = await callApiMethodGet(
    `http://localhost:3000/delivery-address/detail/${id_address}`,
    localStorage.getItem("accessToken")
  );
  const { address, email_address, numberPhone } = getDetailAddress.data;
  console.log({ address, email_address, numberPhone });
  const { price_per_unit, quanlity, slug_Product, color } =
    getDetailBill?.data?.Billitems[0];
  const getDetailProduct = await callAPIFunction(
    `http://localhost:3000/product/${slug_Product}`
  );
  const { nameLaptop, img } = getDetailProduct.data;

  const templateBill = `
    
        <div class="">
        <div class="">
            <h6>Địa Chỉ Đặt Hàng</h6>
            <div class="row mb-1">
                <div class="col-12 col-sm-5 col-md-5 col-lg-5">
                    <span class="d-block text-muted">Email :</span>
                </div>
                <div class="col-12 col-sm-7 col-md-7  col-lg-7">
                    <span>${email_address}</span>
                </div>
            </div>
            <div class="row  mb-1">
                <div class="col-12 col-sm-5 col-md-5 col-lg-5 ">
                    <span class="d-block text-muted">Địa Chỉ Giao Hàng :</span>
                </div>
                <div class="col-12 col-sm-7 col-md-7  col-lg-7">
                    <span>${address}</span>
                </div>
            </div>
            <div class="row  mb-1">
                <div class="col-12 col-sm-5 col-md-5 col-lg-5 ">
                    <span class="d-block text-muted">Số điện thoại:</span>
                </div>
                <div class="col-12 col-sm-7 col-md-7  col-lg-7">
                    <span>0${numberPhone}</span>
                </div>
            </div>
        </div>
        <div class=" border-top border-bottom ">

            <div class="">
                <div class="row  my-2 justify-content-center">
                    <div class="col-3 col-sm-3 col-md-3 col-lg-3 text-center">
                        <span class="font-weight-bold ">Hình Ảnh</span>
                    </div>
                    <div class="col-5 col-sm-5 col-md-5 col-lg-5">
                        <span class="font-weight-bold">Sản Phẩm</span>
                    </div>
                    <div class="col-4 col-sm-4 col-md-4 col-lg-4">
                        <div class="text-right text-center">
                            <span class="font-weight-bold text-center">Giá</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row  my-2 justify-content-center">
                <div class="col-3 col-sm-3 col-md-3 col-lg-3 mx-auto">

                    <img
                        src="https://cdn.tgdd.vn/Products/Images/44/231244/grey-1-org.jpg">

                </div>
                <div class="col-5 col-sm-5 col-md-5 col-lg-5">
                    <p class="font-weight-bold">${nameLaptop}
                    </p>
                    <div class="product-qty">
                        <p class="d-block">Số Lượng: <span>${quanlity}</span></p>
                        <p>Loại: <span>${color}</span></p>
                    </div>
                </div>
                <div class="col-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="text-right">
                        <p class="font-weight-bold text-center">${convertNumber(
                          price_per_unit
                        )}đ</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-end">
            <div class="col-8 col-sm-8 col-md-8 col-lg-8">
                <div class=" border-bottom ml-5">
                    <div class="text-right">
                        <span class="font-weight-bold">Subtotal</span>
                    </div>
                </div>
            </div>
            <div class="col-4 col-sm-4 col-md-4 col-lg-4">
                <div class="border-top border-bottom">
                    <div class="text-center">
                        <span class="font-weight-bold">${convertNumber(
                          total
                        )}đ</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    
    `;

  insertData.insertAdjacentHTML("beforeend", templateBill);
});
function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
