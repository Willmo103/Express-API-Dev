let products = require("./products");
const fs = require("fs");

let updated = [];
products.forEach((product) => {
  let cost = Math.round(product.price * 0.6);
  cost = String(cost);
  if (cost.endsWith(".")) {
    cost = cost + "00";
  } else if (cost.length < 5 && cost.includes(".")) {
    cost = cost + "0";
  } else {
    cost = cost.split(".")[0] + ".00";
  }
  let salesPrice = Math.round(product.price * 0.8);
  salesPrice = String(salesPrice);
  if (salesPrice.endsWith(".")) {
    salesPrice = salesPrice + "00";
  } else if (salesPrice.length < 5 && salesPrice.includes(".")) {
    salesPrice = salesPrice + "0";
  } else {
    salesPrice = salesPrice.split(".")[0] + ".00";
  }
  product.salesPrice = Number(salesPrice);
  product["cost"] = Number(cost);
  //   console.log(product);
  updated.push(product);
});

const output = `
const products = [
  ${updated}
  ]
module.exports = products`;
// fs.writeFileSync("updatedProducts.js", updated);
console.log(updated);
