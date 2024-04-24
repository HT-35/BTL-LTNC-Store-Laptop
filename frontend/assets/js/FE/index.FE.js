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

  // ============================ insert Prodcut trending-all-tab ===================

  const insertProductFeaturedb = document.querySelector(
    "#insert-product-featured"
  );

  const product = await callAPIFunction("http://localhost:3000/product/");

  const ArrProduct = product.data;
  //  console.log(ArrProduct);

  ArrProduct.forEach((item, index) => {
    console.log(index);
    if (index >= 8) {
      return;
    }
    console.log(item);
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
    const templateProduct = `
                     <div class="col-6 col-md-3 col-lg-3">
                            <div class="product product-7 text-center">
                                <figure class="product-media">
                                    <span class="product-label label-new">Innovative</span>
                                    <a href="product.html?product=${slug}">
                                        <img src="http://localhost:3000/${Image}" alt="Product image"
                                            class="product-image">
                                    </a>

                                
                                </figure><!-- End .product-media -->

                                <div class="product-body text-left">

                                    <h3 class="product-title"><a href="product.html?product=${slug}"
                                            class="text-left">${nameLaptop}</a></h3>
                                    <!-- End .product-title -->
                                    <div class="product-price justify-content-left ">
                                        ${price}₫
                                    </div><!-- End .product-price -->
                                
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
    insertProductFeaturedb.insertAdjacentHTML("afterbegin", templateProduct);
  });

  // ============================ insert Prodcut insert-product-trending ===================

  const insertProductTrending = document.querySelector(
    "#insert-product-trending"
  );

  ArrProduct.forEach((item, index) => {
    console.log(index);
    if (index >= 8) {
      return;
    }
    console.log(item);
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
    const templateProduct = `
                     <div class="col-6 col-md-3 col-lg-3">
                            <div class="product product-7 text-center">
                                <figure class="product-media">
                                    <span class="product-label label-new">Trendding</span>
                                    <a href="product.html?product=${slug}">
                                        <img src="http://localhost:3000/${Image}" alt="Product image"
                                            class="product-image">
                                    </a>

                                
                                </figure><!-- End .product-media -->

                                <div class="product-body text-left">

                                    <h3 class="product-title"><a href="product.html?product=${slug}"
                                            class="text-left">${nameLaptop}</a></h3>
                                    <!-- End .product-title -->
                                    <div class="product-price justify-content-left ">
                                        ${price}₫
                                    </div><!-- End .product-price -->
                              
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
    insertProductTrending.insertAdjacentHTML("beforeend", templateProduct);
  });

  // ============================ insert Prodcut insert-product-selling ===================

  const insertProductSelling = document.querySelector(
    "#insert-product-selling"
  );

  ArrProduct.forEach((item, index) => {
    console.log(index);
    if (index >= 8) {
      return;
    }
    console.log(item);
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
    const templateProduct = `
                     <div class="col-6 col-md-3 col-lg-3">
                            <div class="product product-7 text-center">
                                <figure class="product-media">
                                    <span class="product-label label-new">Selling</span>
                                    <a href="product.html?product=${slug}">
                                        <img src="http://localhost:3000/${Image}" alt="Product image"
                                            class="product-image">
                                    </a>

                                
                                </figure><!-- End .product-media -->

                                <div class="product-body text-left">

                                    <h3 class="product-title"><a href="product.html?product=${slug}"
                                            class="text-left">${nameLaptop}</a></h3>
                                    <!-- End .product-title -->
                                    <div class="product-price justify-content-left ">
                                        ${price}₫
                                    </div><!-- End .product-price -->
                                   
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
    insertProductSelling.insertAdjacentHTML("beforeend", templateProduct);
  });
});
