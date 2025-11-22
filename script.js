// Global function for scroll to top button
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onload = async function() {
  // Scroll button
  var mybutton = document.getElementById("myBtn");
  window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          mybutton.style.display = "block";
      } else {
          mybutton.style.display = "none";
      }
  };

  // Sidebar open/close
  let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar .bx-menu");
  let menuCloseBtn = document.querySelector(".nav-links .bx-x");
  if(menuOpenBtn) menuOpenBtn.onclick = () => navLinks.style.left = "0";
  if(menuCloseBtn) menuCloseBtn.onclick = () => navLinks.style.left = "-100%";

  // Submenu arrows
  let laptopArrow = document.querySelector(".laptop-arrow");
  if(laptopArrow) laptopArrow.onclick = () => navLinks.classList.toggle("show1");

  let mobileArrow = document.querySelector(".mobile-arrow");
  if(mobileArrow) mobileArrow.onclick = () => navLinks.classList.toggle("show2");

  let acArrow = document.querySelector(".ac-arrow");
  if(acArrow) acArrow.onclick = () => navLinks.classList.toggle("show3");

  // Sticky navbar
  window.addEventListener("scroll", function() {
      const nav = document.querySelector(".nav");
      if(nav) {
          if(this.scrollY > 100) {
              nav.classList.add("sticky");
          } else {
              nav.classList.remove("sticky");
          }
      }
  });

  // Load products from API
  try {
      const res = await fetch("http://127.0.0.1:8000/products");
      if(!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
      }
      const products = await res.json();
      const container = document.getElementById("products-container");
      if(container) {
          container.innerHTML = "";
          products.forEach(p => {
              container.innerHTML += `
                  <div class="col span_1_of_4 box card">
                      <img src="${p.image}" alt="Product Image" class="product-img">
                      <h3>${p.name}</h3>
                      <img src="${p.review_image}" alt="Review Image" class="review-img">
                      <p>${p.price}$</p><br>
                      <center>
                          <a href="view-product.html?id=${p.id}" class="btn1">View Product</a>
                      </center>
                  </div>
              `;
          });
      }
  } catch(error) {
      console.error("Error loading products:", error);
      const container = document.getElementById("products-container");
      if(container) {
          container.innerHTML = "<p>Unable to load products. Please try again later.</p>";
      }
  }
  
};
