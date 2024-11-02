// new format ------->>>
// json = fetchJSON(`/currencies/{fromCurrency}`)
// rate = json[fromCurrency][toCurrency]
const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form .btn");
const fromCurr = document.querySelector(".from select ");
const toCurr = document.querySelector(".to select ");
const message = document.querySelector(".msg");
let i = 0;
// Populate dropdowns
window.addEventListener("load",() => {
  updateExchangeRate()
}
)
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    select.append(newoption);
    if (select.name === "From" && currCode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "To" && currCode === "INR") {
      newoption.selected = "selected";
    }
    select.addEventListener("click", (e) => {
      updateflag(e.target);
    });
    // option.textContent=countryList[code]
    // console.log(code ,countryList[code]);
    // console.log(c);
  }
}
//updata flag code

const updateflag = (element) => {
  // console.log(element);
  let currCode = element.value;
  // console.log(currCode);
  let countryCode = countryList[currCode];
  // console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
// Handle button click for conversion

btn.addEventListener("click",  (e) => {
    e.preventDefault();
    updateExchangeRate()
    
});
const updateExchangeRate=async()=>{
    let amount = document.querySelector("input ");
    //  console.log(amount.value);
    let amtVal = amount.value;
    if (amtVal < 0) {
        amount.value = 0;
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    // rate means 1 country currency is how much
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(data, rate);
    
    let finalAmt = amtVal * rate;
    message.innerHTML = `${amtVal} ${fromCurr.value}=${finalAmt} ${toCurr.value}`;
}
