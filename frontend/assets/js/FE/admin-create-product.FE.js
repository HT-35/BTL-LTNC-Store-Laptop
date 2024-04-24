import { callAPIPost, callAPIPostCreateProduct } from "../utils/callApi.js";

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

  // ====================    Form Product  ==============================

  //const form = document.querySelector("#form-create-product");
  const form = document.querySelector("#form-create-product");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //console.log("ok");
    const inputFile = document.querySelector("#input-file");
    console.log("inputFile:", inputFile);
    const formData = new FormData(form);
    const formValues = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value;
    }
    console.log("formValues:", formValues);
    try {
      const createProduct = await callAPIPostCreateProduct(
        form.action, // Sử dụng action của form làm URL
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Ikh1eSIsImVtYWlsIjoiaHV5ZmEzNTIwMDJAZ21haWwuY29tIiwibnVtYmVyUGhvbmUiOiIwMzQzMTI4NzMzIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzEzODQ2ODg4fQ.VF2wyzA-IG0DqoRcHX_iPDnqXxim7crRuikgX_91Cik",
        formData
      );
      console.log(createProduct);
      // Log hoặc xử lý dữ liệu theo nhu cầu của bạn
    } catch (error) {
      console.error(error);
    }
  });

  // =================================================================================================

  //document
  //  .getElementById("uploadForm")
  //  .addEventListener("submit", async function (e) {
  //    e.preventDefault(); // Ngăn chặn chuyển hướng mặc định của form

  //    console.log("ok");

  //    const formData = new FormData(this); // Lấy dữ liệu từ form

  //    try {
  //      const response = await fetch(this.action, {
  //        method: "POST",
  //        body: formData,
  //      });
  //      console.log(response);
  //      if (!response.ok) {
  //        throw new Error("Error submitting form");
  //      }

  //      const data = await response.json();
  //      console.log("Server response:", data);
  //    } catch (error) {
  //      console.error("Error:", error.message);
  //    }
  //  });
});
