const price =
  String(
    Math.round(
      Number(
        document
          .querySelectorAll("[class=pip-temp-price__sr-text]")[0]
          .innerText.replace("Price $ ", "")
      )
    )
  ) + ".00";
let cost = String(
  Math.round(
    Number(
      document
        .querySelectorAll("[class=pip-temp-price__sr-text]")[0]
        .innerText.replace("Price $ ", "")
    )
  ) * 0.6
);
if (cost.endsWith(".")) {
  cost = cost + "00";
} else if (cost.length < 5 && cost.includes(".")) {
  cost = cost + "0";
} else {
  cost = cost.split(".")[0] + ".00";
}
const imageUrl = document.querySelectorAll("[class=pip-image]")[0].src;
const description = document.querySelectorAll(
  "[class=pip-product-summary__description]"
)[0].innerText;
const name = document
  .querySelectorAll(`[class=notranslate]`)[1]
  .innerText.split(" ")[0]
  .toLowerCase();
const quantity = Math.floor(Math.random() * 50);
console.log(`
{
    "name": "${name}",
    "price": ${price},
    "cost": ${cost},
    "imageUrl": "${imageUrl}",
    "description":"${description}",
    "quantity": ${quantity}

}
`);
