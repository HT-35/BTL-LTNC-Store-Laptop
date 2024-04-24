import {
  callAPIFunction,
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
  const insertData = document.querySelector("#insert-data");

  product.forEach((item, index) => {
    const { _id, color, img, nameLaptop, price, quantity } = item;
    const filterPathImg = img.filter((imgItem) => imgItem.color === color);
    const pathImg = `http://localhost:3000/${filterPathImg[0].path[0]}`;
    let total = Number(price) * Number(quantity);

    const templateProducr = `
      <tr>
        <td class="product-col">
          <div class="product">
            <figure class="product-media">
              <a href="#">
                <img src="${pathImg}" alt="Product image">
              </a>
            </figure>
            <h3 class="product-title">
              <p>${nameLaptop}</p>
            </h3>
          </div>
        </td>
        <td class="price-col">${color}</td>
        <td class="price-col" style="width: 150px;">${convertNumber(
          price
        )}đ</td>
        <td class="quantity-col ml-5">
          <div class="cart-product-quantity text-center">
            <input type="number" class="form-control input-number" value="${parseInt(
              quantity
            )}" min="1" max="10" step="1" data-decimals="0" data-price="${price}" data-productId="${_id}" required>
          </div>
        </td>
        <td class="total-col total-change" style="width: 150px;">${convertNumber(
          total
        )}đ</td>
        <td class="total-col"><button class="btn btn-outline-primary-2" type="submit">Thanh Toán</button></td>
        <td class="remove-col"><button class="btn-remove"><i class="icon-close"></i></button></td>
      </tr>           
    `;

    insertData.insertAdjacentHTML("beforeend", templateProducr);
  });

  // Lắng nghe sự kiện thay đổi số lượng và cập nhật tổng
  const inputNumber = document.querySelectorAll(".input-number");
  inputNumber.forEach((input) => {
    input.addEventListener("input", () => {
      const quantity = parseInt(input.value);
      const price = parseFloat(input.dataset.price);
      const totalCell = input.closest("tr").querySelector(".total-change");
      const total = price * quantity;
      totalCell.textContent = `${convertNumber(total)}đ`;

      console.log(quantity);
    });
  });
});
function convertNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
