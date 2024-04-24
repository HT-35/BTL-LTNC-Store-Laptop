import { callAPIFunction } from "../utils/callApi.js";
document.addEventListener("DOMContentLoaded", async () => {
  const insertInfo = document.querySelector("#insert-info");
  if (localStorage.getItem("accessToken")) {
    insertInfo.innerHTML = "";
    console.log("ok");
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

  const addProduct = document.querySelector(".add-new-product-laptop");

  const product = await callAPIFunction("http://localhost:3000/product/");

  const ArrProduct = product.data;
  //  console.log(ArrProduct);

  ArrProduct.map((item) => {
    //console.log(item.nameLaptop);
    const { nameLaptop, img, slug, ram, storage, Specifications } = item;
    const price = item.colors[0].price;
    const Image = img[0].path[0];

    const screen = Specifications.screen.screen;
    const ramMemory = Specifications.ramMemory_hardDrive.HardDrive;
    const battery = Specifications.otherInformation.BatteryInformation;
    const cpuTechnology = Specifications.processor.cpuTechnology;
    const Battery = Specifications.otherInformation.BatteryInformation;
    console.log(Specifications);

    const template = `
                                        <div class="col-6 col-md-3 col-lg-3">
                                            <div class="product product-7 text-center">
                                                <figure class="product-media">
                                                   
                                                    <a href="product.html?product=${slug}">
                                                        <img src="http://localhost:3000/${Image}" alt="Product image"
                                                            class="product-image">
                                                    </a>

                                                    <div class="product-action">
                                                        <a href="#" class="btn-product btn-cart"><span>add to
                                                                cart</span></a>
                                                    </div><!-- End .product-action -->
                                                </figure><!-- End .product-media -->

                                                <div class="product-body text-left">

                                                    <h3 class="product-title"><a href="product.html?product=${slug}"
                                                            class="text-left">${nameLaptop}</a></h3><!-- End .product-title -->
                                                    <div class="product-price justify-content-left ">
                                                        ${price}₫
                                                    </div><!-- End .product-price -->
                                                    <div class="ratings-container">
                                                        <div class="ratings">
                                                            <div class="ratings-val" style="width: 90%;"></div>

                                                        </div>
                                                        <span class="ratings-text">( 5 Reviews )</span>
                                                    </div>
                                                    <div class="text-left">
                                                        <p>Màn hình: ${screen}</p>
                                                        <p>Ram: ${ram}</p>
                                                        <p>Rom: ${storage}</p>
                                                        <p>CPU: ${cpuTechnology}</p>
                                                        <p>Pin: ${Battery}</p>
                                                  
                                                    </div>

                                                </div><!-- End .product-body -->
                                            </div><!-- End .product -->
                                        </div><!-- End .col-sm-6 col-lg-4 -->
    `;

    // const div = document.createElement("div");
    // div.setAttribute("class", "row");
    addProduct.insertAdjacentHTML("beforeend", template);
    // console.log(div);
    // addProduct.innerHTML = div;
  });
});
