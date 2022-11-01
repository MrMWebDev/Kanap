let items = JSON.parse(localStorage.getItem("cart"));
const positionEmptyCart = document.querySelector("#cart__items");

//If the basket is empty
function getCart(itemsList){
if (itemsList === null || itemsList == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {

for (let produit of itemsList){

    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id',produit.selectedId);
    productArticle.setAttribute('data-color',produit.selectedColors);
    
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = produit.selectedImage;
    productImg.alt = produit.selectedAlttxt;

    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__description";


    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = produit.selectedName;


    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = produit.selectedColors;
    productColor.style.fontSize = "20px";


    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = produit.selectedPrice + " €";


    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";


    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    let productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Qty : ";

// Inserting the quantity
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = produit.selectedQuantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

// Insert "p" delete
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Delete";
}
}}
    getCart(items);

    // Retrieval of total quantities
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length, // Total items in cart
    totalQtt = 0;

    for (let i = 0; i < myLength; ++i) { // For loop that counts and adds the items to the cart
     totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Total price retrieval

    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) { // for loop that counts and adds the price of the basket
        totalPrice += (elemsQtt[i].valueAsNumber * items[i].selectedPrice);  
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice    
    );
    
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();
     //Selection of the element to modify according to its id and its color
    let quantityModif = items[k].selectedQuantity;
    console.log("quantityModif",quantityModif)
    
    let qttModifValue = qttModif[k].valueAsNumber;
    console.log("qttModifValue",qttModifValue)
    items[k].selectedQuantity = qttModifValue
    localStorage.setItem("cart", JSON.stringify(items));
        
    // quick refresh
    location.reload();
})
}
// Deleting a product

    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();
 //Selection of the element to delete according to its id and its color
    let idDelete = items[j].selectedId;
    let colorDelete = items[j].selectedColors;
    itemsList = items.filter( el => el.selectedId !== idDelete || el.selectedColors !== colorDelete );
    console.log("itemsList",itemsList)       
    localStorage.setItem("cart", JSON.stringify(itemsList));
             //Product alert deleted and refresh
    alert("This product has been successfully removed from the cart");
   location.reload();
         })
     }

     //Form

    // Variables Regex
    let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
    let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
    let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

// Variables to retrieve form field ids
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");

    firstName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Invalid first name";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});

    lastName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Invalid last name";
    return false;
    } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

    address.addEventListener("input", (event) => {
  event.preventDefault();
  if (adressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Invalid Adress";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

    city.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Invalid City";
    return false;
    } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
}
});

    email.addEventListener("input", (event) => {
    event.preventDefault();
    if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Invalid Email";
    return false; 
    }
    else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});

    let order = document.getElementById("order");
    order.addEventListener("click", (e) => {
    e.preventDefault();
  // creating a table to retrieve user data
    let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

    if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    window.confirm(
      "You must enter your details to place the order!"
    );
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    window.confirm("Please enter your details correctly!");
  } else {
    let products = [];
    items.forEach((order) => {
    products.push(order.selectedId);
    });

    let pageOrder = { contact, products };

    // Call to the order API to send the tables
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pageOrder),
      mode:"cors"
    })
      .then((res) => {
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((error) => {
        console.log("An error has occurred");
      });
  }
});