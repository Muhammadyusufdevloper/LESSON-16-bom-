import { getUser } from "./login.js";

const API__URL = "https://dummyjson.com";
const prodactSeeMore = document.querySelector(".prodact__see-more");
const prodactWrapper = document.querySelector(".prodact__wrapper");
const loading = document.querySelector(".loading")
const loginExitBtn = document.querySelector(".login__exit-btn")
const modalBox = document.querySelector(".modal-box")
const login = document.querySelector(".login")
const headerLoginLink = document.querySelector("#header__login-admin")
const form = document.querySelector(".form")
const username = document.querySelector("#username")
const password = document.querySelector("#password")


let limetCount = 4
let count = 1


async function getProdacts(URL) {
  let data = await fetch(`${URL}/products?limit=${limetCount*count}`, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapProdact(res))
    .catch((error) => console.log(error))
    .finally(()=>{
        prodactSeeMore.removeAttribute("disabled")
        prodactSeeMore.innerHTML = "See more"
        loading.style.display = "none"
    })
}

getProdacts(API__URL);

function mapProdact(cardData) {
  let card = "";
  cardData.products.forEach((prodact) => {
    card += `
        <div class="prodact__cards">
            <div class="prodact__img-card">
            <img src=${prodact.thumbnail} alt="${prodact.title} img">
            </div>
            <div class="prodact__info-card">
            <div class="prodact__info__rating-card">
                  <img src="./assets/image/yuldiz.svg" alt="yulduz img">
                  <span class="prodact__info__rating-text">${prodact.rating}</span>
            </div>
            <h3 class="prodact__info__title">${prodact.title}</h3>
            <p class="prodact__info__text">${prodact.description}</</p>
            <div class="prodact__info-card__part">
                <span class="prodact__info__price">${prodact.price}$</</span>
                <span class="prodact__info__price prodact__info__price__acsiya">875.54$</span>
            </div>
            </div>
        </div>
        `;
  });
  prodactWrapper.innerHTML = card;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    // if (!username.value === trim())return alert("Iltimos usernamega malumotni to'liq kriting")
    // if (!password.value === trim())return alert("Iltimos password malumotni to'liq kriting")
    let user = {
        username:username.value,
        password:password.value
    }
    getUser(user)
})


prodactSeeMore.addEventListener("click", ()=>{
    count++
    prodactSeeMore.setAttribute("disabled",true)
    getProdacts(API__URL);
    prodactSeeMore.innerHTML = "Loading..."
})

loginExitBtn.addEventListener("click", ()=>{
    modalBox.style.display="none"
    login.style.display="none"
})
modalBox.addEventListener("click", ()=>{
    modalBox.style.display="none"
    login.style.display="none"
})

headerLoginLink.addEventListener("click", ()=>{
    modalBox.style.display="block"
    login.style.display="block"
})


function checkAdmin() {
    let isLogin = localStorage.getItem("x-auth-token")
    if (isLogin) {
        headerLoginLink.innerHTML = "Admin"
        headerLoginLink.setAttribute("href", "./pages/admin.html")
    }else{
        headerLoginLink.innerHTML = "Login"
    }
}
checkAdmin()