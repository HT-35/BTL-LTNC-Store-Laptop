import {
  callAPIFunction,
  callAPIMethodDelete,
  changeQuantityProductInCard,
  fetchGetAllCard,
} from "../utils/callApi.js";

document.addEventListener("DOMContentLoaded", async () => {
  // ==================   Check Authen ======================================

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

  // ==================  End Check Authen ======================================

  const token = localStorage.getItem("accessToken");

  const res = await fetchGetAllCard("http://localhost:3000/cart", token);
  if (res.status === false) {
    window.location.href = "/login.html";
  }

  const product = res.data;

  //console.log(product);

  const insertData = document.querySelector("#insert-data");
  //console.log("document.addEventListener ~ insertData:", insertData);

  product.forEach((item, index) => {
    const {
      _id,
      slug,
      color,
      img,
      nameLaptop,
      number,
      price,
      storage,
      quantity,
    } = item;
    //console.log(item);

    const filterPathImg = img.filter((item) => item.color === color);
    console.log("filterPathImg:", filterPathImg);

    const pathImg = `http://localhost:3000/${filterPathImg[0].path[0]}`;

    let total = 0;
    total = Number(price) * Number(quantity);

    const templateProducr = `
          <tr>
            <td class="product-col">
                <div class="product">
                    <figure class="product-media">
                        <a href="#">
                            <img src="${pathImg}"
                                alt="Product image">
                        </a>
                    </figure>

                    <h3 class="product-title">
                        <p >${nameLaptop}</p>
                    </h3>
                </div>
            </td>
            <td class="price-col color">${color}</td>
            <td class="price-col " style=" width: 150px;">${convertNumber(
              price
            )}đ</td>
            
          <td class="quantity-col ml-5">
              <div class="cart-product-quantity text-center">
                  <input type="number" class="form-control input-number" value="${parseInt(
                    quantity
                  )}" min="1"
                      max="10" step="1" data-decimals="0" data-price=${price} data-productId=${_id} required>
              </div>
          </td>




            <td class="total-col total-change" style=" width: 150px;">${convertNumber(
              total
            )}đ</td>
            <td class="total-col"> <a href='./checkout.html?product=${slug}&color=${color}'> <button class="btn btn-outline-primary-2 checkout" 
                    type="submit">Thanh Toán</button></a>
            </td>
            <td class="remove-col">
                              <button class="btn-remove" data-id='${_id}'><i class="icon-close" ></i>
                              </button
            </td>
        </tr>           
    `;

    // Kiểm tra xem sản phẩm đã được thêm vào DOM chưa trước khi thêm
    if (!document.querySelector(`#product-${_id}`)) {
      insertData.insertAdjacentHTML("beforeend", templateProducr);
    }
  });

  // === ===  ===   ===   ===     Increase Quantity Or  Reduce Quantity === ===  ===   ===   ===

  function deBounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const handleInputChange = async (e) => {
    const color = e.target.closest("tr").querySelector(".color").textContent;
    const price = parseInt(e.target.dataset.price);
    const quantityChange = parseInt(e.target.value);
    const total = price * quantityChange;
    const totalCell = e.target.closest("tr").querySelector(".total-change");
    totalCell.innerText = `${convertNumber(total)}đ`;
    const productId = e.target.dataset.productid;
    const updateCart = {
      id_product: productId,
      quantity: Number(quantityChange),
      color: color,
    };
    console.log("updateCart:  ", updateCart);
    const callApiUpdateQuantity = await changeQuantityProductInCard(
      "http://localhost:3000/cart/reduce-quantity",
      localStorage.getItem("accessToken"),
      updateCart
    );
    console.log(callApiUpdateQuantity);
  };

  const debounceHandleInputChange = deBounce(handleInputChange, 400);

  const inputNumber = document.querySelectorAll(".input-number");

  inputNumber.forEach((input) => {
    input.addEventListener("input", debounceHandleInputChange);
  });

  // === ===  ===   ===   ===   End  Increase Quantity Or  Reduce Quantity === ===  ===   ===

  //  =========================   Handle Remove btn-remove ===  === ===  ======  =====

  const btnRemove = document.querySelectorAll(".btn-remove");
  btnRemove.forEach((item) => {
    item.addEventListener("click", async (e) => {
      const id_product = e.currentTarget.dataset.id;
      const color = e.target
        .closest("tr")
        .querySelector(".price-col")
        .innerText.trim();

      const product = {
        id_product,
        color,
      };
      console.log("Product:", product);
      const removeProduct = await callAPIMethodDelete(
        "http://localhost:3000/cart/remove-product",
        localStorage.getItem("accessToken"),
        product
      );
      console.log(removeProduct);
      if (removeProduct.status === true) {
        window.location.reload();
      }
    });
  });
});

function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
