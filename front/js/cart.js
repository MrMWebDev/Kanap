let items = JSON.parse(localStorage.getItem("cart"));
const positionEmptyCart = document.querySelector("#cart__items");

//Si le panier est vide
function getCart(itemsList){
if (itemsList === null || itemsList == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {

for (let produit of itemsList){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id',produit.selectedId);
    productArticle.setAttribute('data-color',produit.selectedColors);
    
// Insertion de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

// Insertion de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = produit.selectedImage;
    productImg.alt = produit.selectedAlttxt;

// Insertion de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

// Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__description";

// Insertion du titre h2
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = produit.selectedName;

// Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = produit.selectedColors;
    productColor.style.fontSize = "20px";

// Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = produit.selectedPrice + " €";

// Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

// Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

// Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

// Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = produit.selectedQuantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

// Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

// Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
}
}}
    getCart(items);

    // Récupération du total des quantités
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    let myLength = elemsQtt.length, // Total des articles présent dans le panier
    totalQtt = 0;

    for (let i = 0; i < myLength; ++i) { // Boucle for qui compte et rajoute les article dans le panier
     totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total

    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) { // Boucle for qui compte et rajoute le prix du panier 
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
     //Selection de l'element à modifier en fonction de son id ET sa couleur
    let quantityModif = items[k].selectedQuantity;
    console.log("quantityModif",quantityModif)
    
    let qttModifValue = qttModif[k].valueAsNumber;
    console.log("qttModifValue",qttModifValue)
    items[k].selectedQuantity = qttModifValue
    localStorage.setItem("cart", JSON.stringify(items));
        
    // refresh rapide
    location.reload();
})
}
// Suppression d'un produit

    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();
 //Selection de l'element à supprimer en fonction de son id ET sa couleur
    let idDelete = items[j].selectedId;
    let colorDelete = items[j].selectedColors;
    itemsList = items.filter( el => el.selectedId !== idDelete || el.selectedColors !== colorDelete );
    console.log("itemsList",itemsList)       
    localStorage.setItem("cart", JSON.stringify(itemsList));
             //Alerte produit supprimé et refresh
    alert("Ce produit a bien été supprimé du panier");
   location.reload();
         })
     }

     //Formulaire

    // Variables Regex
    let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
    let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
    let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;
// Variables pour récupérer les id des champs de formulaire
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");

// Validation prénom
    firstName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom non valide";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});

// Validation nom
    lastName.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Nom non valide";
    return false;
    } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation adresse
    address.addEventListener("input", (event) => {
  event.preventDefault();
  if (adressRegex.test(address.value) == false || address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = "Adresse non valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

// Validation ville
    city.addEventListener("input", (event) => {
    event.preventDefault();
    if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = "Ville non valide";
    return false;
    } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
}
});

// Validation email
    email.addEventListener("input", (event) => {
    event.preventDefault();
    if (emailRegex.test(email.value) == false || email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = "Email non valide";
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
  // création d'un tableau afin de récuperer les données de l'utilisateur
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
      "Vous devez renseigner vos coordonnées pour passer la commande !"
    );
  } else if (
    nameRegex.test(firstName.value) == false ||
    nameRegex.test(lastName.value) == false ||
    adressRegex.test(address.value) == false ||
    nameRegex.test(city.value) == false ||
    emailRegex.test(email.value) == false
  ) {
    window.confirm("Merci de renseigner correctement vos coordonnées !");
  } else {
    let products = [];
    items.forEach((order) => {
    products.push(order.selectedId);
    });

    let pageOrder = { contact, products };

    // Appel à l'api order pour envoyer les tableaux
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
        console.log("une erreur est survenue");
      });
  }
});