import { callAPIFunction, fetchMethodPostAddCart } from "../utils/callApi.js";
document.addEventListener("DOMContentLoaded", async () => {
  // ====================== Check Authen =========================
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
  // ====================== End Check Authen =========================

  //========================   Insert Data  =======================

  const title = document.querySelector("#title");
  const insertPrice = document.querySelector(".insert-price");

  //  const addNewDetail = document.querySelector(".add-new-Detail");

  //  const addNewImg = document.querySelector(".add-new-img");

  const currentURL = window.location.href;

  // Phân tích URL để lấy tham số 'product'
  const urlParams = new URLSearchParams(currentURL.split("?")[1]);
  const uriProduct = urlParams.get("product");
  const uriColor = urlParams.get("color"); //  Get Query Color

  //console.log("document.addEventListener ~ uriColor:", uriColor);

  const data = await callAPIFunction(
    `http://localhost:3000/product/${uriProduct}`
  );
  const product = await data.data;

  const { _id, nameLaptop, img, ram, storage, colors, Specifications } =
    product;

  //  const price = product.colors[0].price;

  //========== innerText Price=================
  const price = colors.filter((item) => item.color == uriColor);
  const newPrice = price.length > 0 ? price[0].price : colors[0].price;
  //  console.log("newPrice:    ", newPrice);
  insertPrice.innerText = convertNumber(newPrice);

  // ====================  Lọc và lấy  Hình Ảnh Theo Màu Sắc   ===============================
  const newImg = img.filter((item) => item.color == uriColor);
  const Image = newImg.length > 0 ? [newImg[0].path][0] : [img[0].path][0];

  // ==================== End Lọc và lấy  Hình Ảnh Theo Màu Sắc   ===============================

  title.innerText = nameLaptop;

  // Lấy thẻ hình ảnh chính
  const productZoom = document.getElementById("product-zoom");
  // Lấy thẻ gallery hình ảnh
  const productZoomGallery = document.getElementById("product-zoom-gallery");

  //  // Cập nhật hình ảnh chính
  productZoom.src = `http://localhost:3000/${Image[0]}`;
  productZoom.dataset.zoomImage = `http://localhost:3000/${Image[0]}`;

  productZoomGallery.innerHTML = "";
  Image.forEach((path, index) => {
    const galleryItem = document.createElement("a");
    galleryItem.classList.add("product-gallery-item", "img-item");
    galleryItem.href = "javascript:void(0)";
    galleryItem.dataset.image = `http://localhost:3000/${path}`;
    galleryItem.dataset.zoomImage = `http://localhost:3000/${path}`;

    const img = document.createElement("img");
    img.src = `http://localhost:3000/${path}`;
    img.alt = "product image";

    galleryItem.appendChild(img);
    productZoomGallery.appendChild(galleryItem);

    // Thêm sự kiện click để hiển thị hình ảnh khi click vào
    galleryItem.addEventListener("click", () => {
      //console.log("Clicked!"); // Kiểm tra xem sự kiện click được kích hoạt hay không
      //console.log(`Path: ${path}`); // Kiểm tra xem đường dẫn hình ảnh được truyền đúng hay không

      productZoom.src = `http://localhost:3000/${path}`;
      productZoom.dataset.zoomImage = `http://localhost:3000/${path}`;

      // Xóa lớp active khỏi tất cả các thẻ a trong gallery
      galleryItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Thêm lớp active cho thẻ a được click
      galleryItem.classList.add("active");
    });

    // Nếu là đối tượng đầu tiên, thêm lớp active
    if (index === 0) {
      galleryItem.classList.add("active");
    }
  });

  // Lấy lại danh sách các thẻ a trong gallery
  const galleryItems = document.querySelectorAll(".product-gallery-item");

  // Thêm sự kiện click cho từng thẻ a trong gallery
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Xóa lớp active khỏi tất cả các thẻ a trong gallery
      galleryItems.forEach((item) => {
        item.classList.remove("active");
      });

      // Thêm lớp active cho thẻ a được click
      item.classList.add("active");

      // Cập nhật hình ảnh chính
      productZoom.src = item.dataset.image;
      productZoom.dataset.zoomImage = item.dataset.image;
    });
  });

  //========================  End Insert Data  =======================

  const insertOptionColor = document.querySelector(".insert-option-color");

  colors.forEach((item, index) => {
    //console.log("colors.forEach ~ item:", item.color);

    let isActive = "";
    if (uriColor) {
      isActive = item.color === uriColor ? "active" : "";
    } else {
      isActive = index === 0 ? "active" : "";
    }

    const templateOptionColor = `
                                        <a href="/product.html?product=${uriProduct}&color=${item.color}" class="color-thumb ml-2 text-center ${isActive}" >

                                        <p class="text-center">${item.color}</p>
                                    </a>

        `;
    insertOptionColor.insertAdjacentHTML("beforeend", templateOptionColor);
  });

  const colorThumbnails = document.querySelectorAll(".color-thumb");

  colorThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Xóa lớp active khỏi tất cả các thumbnail
      colorThumbnails.forEach((thumb) => {
        thumb.classList.remove("active");
      });
      // Thêm lớp active cho thumbnail được click
      thumbnail.classList.add("active");
    });
  });

  //=============================  insert data =============================

  const {
    KeyboardLight,
    TheWebOfCommunication,
    Webcams,
    WirelessConnectivity,
  } = Specifications.connectionPortsAndExpansionFeatures;

  const { AudioTechnology, GraphicCard } = Specifications.graphicsAndSound;

  const { BatteryInformation, ChargerCapacity, LaunchTime, OperatingSystem } =
    Specifications.otherInformation;

  const {
    caching,
    cpuSpeed,
    cpuTechnology,
    maxSpeed,
    multiplier,
    numberOfStreams,
  } = Specifications.processor;

  const { HardDrive, MaximumRamSupport, ramBusSpeed, ramType } =
    Specifications.ramMemory_hardDrive;

  const { colorCoverage, resolution, scanFrequency, screen, screenTechnology } =
    Specifications.screen;

  const { Material, Size, volume } = Specifications.sizeVolume;

  const insertSpecificationCompact = document.querySelector(
    ".insert-specificationCompact"
  );

  const templateSpecificationCompact = `

                                                        <div class="">

                                                        <div class="row">
                                                            <div class="col-6 col-sm-6 col-md-6 "
                                                                style="font-weight: 400;font-size: 1.4rem">Công nghệ
                                                                CPU:
                                                            </div>
                                                            <div class="col-6 col-sm-6 col-md-6 ">${cpuTechnology}</div>
                                                        </div>

                                                        <div class="mt-2">
                                                            <div class="row">
                                                                <div class="col-6 col-sm-6 col-md-6"
                                                                    style="font-weight: 400;font-size: 1.4rem">Màn hình:
                                                                </div>
                                                                <div class="col-6 col-sm-6 col-md-6">${screen}</div>
                                                            </div>

                                                        </div>
                                                        <div class="mt-2">
                                                            <div class="row">
                                                                <div class="col-6 col-sm-6 col-md-6"
                                                                    style="font-weight: 400;font-size: 1.4rem">RAM:
                                                                </div>
                                                                <div class="col-6 col-sm-6 col-md-6">${ram}</div>
                                                            </div>

                                                        </div>
                                                        <div class="mt-2 mb-3">
                                                            <div class="row">
                                                                <div class="col-6 col-sm-6 col-md-6"
                                                                    style="font-weight: 400;">Ổ
                                                                    Cứng:</div>
                                                                <div class="col-6 col-sm-6 col-md-6">${HardDrive}</div>
                                                            </div>

                                                        </div>
                                                    </div>

    `;

  insertSpecificationCompact.insertAdjacentHTML(
    "beforeend",
    templateSpecificationCompact
  );

  const insertSpecifications = document.querySelector("#insert-specifications");

  const templateSpecifications = `

                                              <div class="">

                                                <!-- Bộ xử lý -->

                                                <dcol-6 class="mt-2 mb-2">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-12 col-md-12 text-center">
                                                            <h2 class="bg-gray">Bộ xử lý</h2>
                                                        </div>

                                                    </div>

                                                    <div class="row">
                                                        <div class="col-0 col-sm-4 col-md-3"></div>
                                                        <div class="col-6 col-sm-4 col-md-4  ">Công
                                                            nghệ CPU:
                                                        </div>
                                                        <div class="col-6 col-sm-4 col-md-4">${cpuTechnology}</div>
                                                        <div class="col-0 col-sm-4 col-md-1"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-0 col-sm-4 col-md-3"></div>
                                                        <div class="col-6 col-sm-4 col-md-4  ">Số nhân:
                                                        </div>
                                                        <div class="col-6 col-sm-4 col-md-4">${multiplier}</div>
                                                        <div class="col-0 col-sm-4 col-md-1"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-0 col-sm-4 col-md-3"></div>
                                                        <div class="col-6 col-sm-4 col-md-4  ">Số luồng:
                                                        </div>
                                                        <div class="col-6 col-sm-4 col-md-4">${numberOfStreams}</div>
                                                        <div class="col-0 col-sm-4 col-md-1"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-0 col-sm-4 col-md-3"></div>
                                                        <div class="col-6 col-sm-4 col-md-4  ">Tốc độ CPU:
                                                        </div>
                                                        <div class="col-6 col-sm-4 col-md-4">${cpuSpeed}</div>
                                                        <div class="col-0 col-sm-4 col-md-1"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-0 col-sm-4 col-md-3"></div>
                                                        <div class="col-6 col-sm-4 col-md-4  ">Tốc độ tối đa:
                                                        </div>
                                                        <div class="col-6 col-sm-4 col-md-4">${maxSpeed}</div>
                                                        <div class="col-0 col-sm-4 col-md-1"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-0 col-sm-4 col-md-3"></div>
                                                        <div class="col-6 col-sm-4 col-md-4  ">Bộ nhớ đệm:
                                                        </div>
                                                        <div class="col-6 col-sm-4 col-md-4">${caching}</div>
                                                        <div class="col-0 col-sm-4 col-md-1"></div>
                                                    </div>

                                                    <!-- Bộ nhớ RAM, Ổ cứng -->
                                                    <div class="mt-2 mb-2">

                                                        <div class="row">
                                                            <div class="col-12 col-sm-12 col-md-12 text-center">
                                                                <h2 class="bg-gray">Bộ nhớ RAM, Ổ cứng</h2>
                                                            </div>

                                                        </div>

                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">RAM:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${ram}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Loại RAM:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${ramType}
                                                            </div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Tốc độ Bus RAM:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${ramBusSpeed}
                                                            </div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Hỗ trợ RAM tối đa:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${MaximumRamSupport}
                                                            </div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Ổ cứng:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${HardDrive}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                    </div>

                                                    <!-- Màn hình -->
                                                    <div class="mt-2 mb-2">
                                                        <div class="row">
                                                            <div class="col-12 col-sm-12 col-md-12 text-center">
                                                                <h2 class="bg-gray">Màn hình</h2>
                                                            </div>

                                                        </div>

                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Màn hình:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${screen}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Độ phân giải:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${resolution}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Tần số quét:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${scanFrequency}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Công nghệ màn hình:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${screenTechnology}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                    </div>

                                                    <!-- Đồ họa và Âm thanh -->
                                                    <div class="mt-2 mb-2">
                                                        <div class="row">
                                                            <div class="col-12 col-sm-12 col-md-12 text-center">
                                                                <h2 class="bg-gray">Đồ họa và Âm thanh</h2>
                                                            </div>

                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Card màn hình:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${GraphicCard}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Công nghệ âm thanh:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${AudioTechnology}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>

                                                    </div>

                                                    <!-- Cổng kết nối & tính năng mở rộng -->
                                                    <div class="mt-2 mb-2">
                                                        <div class="row">
                                                            <div class="col-12 col-sm-12 col-md-12 text-center">
                                                                <h2 class="bg-gray">Cổng kết nối & tính năng mở rộng
                                                                </h2>
                                                            </div>

                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Cổng giao tiếp:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${TheWebOfCommunication}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Kết nối không dây:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${WirelessConnectivity}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Webcam:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${Webcams}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Đèn bàn phím:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${KeyboardLight}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>

                                                    </div>

                                                    <!-- Kích thước & khối lượng -->
                                                    <div class="mt-2 mb-2">
                                                        <div class="row">
                                                            <div class="col-12 col-sm-12 col-md-12 text-center">
                                                                <h2 class="bg-gray">Kích thước & khối lượng</h2>
                                                            </div>

                                                        </div>

                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Kích thước, khối
                                                                lượng:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${volume} ${Size} </div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Chất liệu:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${Material}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>

                                                    </div>

                                                    <!-- Thông tin khác -->
                                                    <div class="mt-2 ">
                                                        <div class="row">
                                                            <div class="col-12 col-sm-12 col-md-12 text-center">
                                                                <h2 class="bg-gray">Thông tin khác</h2>
                                                            </div>

                                                        </div>

                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Thông tin Pin:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${BatteryInformation}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Hệ điều hành:</div>
                                                            <div class="col-6 col-sm-4 col-md-4">${OperatingSystem}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-0 col-sm-4 col-md-3"></div>
                                                            <div class="col-6 col-sm-4 col-md-4  ">Thời điểm ra mắt:
                                                            </div>
                                                            <div class="col-6 col-sm-4 col-md-4">${LaunchTime}</div>
                                                            <div class="col-0 col-sm-4 col-md-1"></div>
                                                        </div>

                                                    </div>

                                            </div>

  `;

  insertSpecifications.insertAdjacentHTML("beforeend", templateSpecifications);

  // =================================  btn-add-car ========================================

  const btnAddCart = document.querySelector("#btn-add-cart");
  const btnCheckout = document.querySelector("#btn-checkout");
  console.log("btnCheckout:", btnCheckout);

  const getColor = colors.filter((item) => item.color == uriColor);
  const color = getColor.length > 0 ? getColor[0].color : colors[0].color;
  console.log("color:", color);

  btnAddCart.addEventListener("click", async (e) => {
    const cart = {
      token: localStorage.getItem("accessToken"),
      id_product: _id,
      quantity: 1,
      color: color,
    };
    e.preventDefault();
    console.log("btnAddCart");
    const addCartProduct = await fetchMethodPostAddCart(
      "http://localhost:3000/cart",
      cart
    );
    if (!addCartProduct.status) {
      window.location.href = "./login.html";
    }
    console.log(addCartProduct);
  });

  btnCheckout.addEventListener("click", async (e) => {
    //const cart = {
    //  token: localStorage.getItem("accessToken"),
    //  id_product: _id,
    //  quantity: 1,
    //  color: color,
    //};
    //console.log("cart:", cart);

    window.location.href = `./checkout.html?product=${uriProduct}&color=${color}`;
  });
});

function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
