let params = (new URL(document.location)).searchParams;
let id = params.get('id'); 
console.log(id)

fetch("http://localhost:3000/api/products/"+id)

.then (response => {
    return response.json();})
  
.then(data => {
    console.log(data);

    const image = document.getElementsByClassName('item__img');
    image[0].innerHTML = `<img id ="image" src="${data.imageUrl}" alt="${data.altTxt}">`;
    imageURL = data.imageUrl;
    imageAlt = data.altTxt;
    const title = document.getElementById('title');
    title.innerHTML = `<h1 id="name" >${data.name}</h1>`;
    const price = document.getElementById('price');
    price.setAttribute("id","price");
    price.innerText =  `${data.price}`;
    const description = document.getElementById('description');
    description.setAttribute("id","description");
    description.innerText = `${data.description}`;
    const colors = document.getElementById('colors');
    colors.setAttribute("id","colors");

    // choice of colors
    for (number in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[number],
        data.colors[number]
      );
    }
  })
    
  // Creation of the event on click to add to cart
   const button = document.querySelector('#addToCart');
   button.addEventListener("click", function() {
 
   console.log(document.querySelector("#colors").value)
    let selectedProduct = { 
    selectedImage : document.getElementById("image").src, 
    selectedAltTxt : document.getElementById ("image").alt,
    selectedName : document.getElementById("name").textContent,
    selectedPrice : document.getElementById("price").textContent,
    selectedId : id,
    selectedColors : document.querySelector("#colors").value,
    selectedQuantity : parseInt(document.querySelector("#quantity").value),

}
   let cart = localStorage.getItem("cart");

     if (cart === null ) {
        cart = [];
    } else {
        cart = JSON.parse (cart);
    }

    let notFound = true

    for (let i = 0; i < cart.length; i++) {
        console.log(cart[i].selectedId)
        console.log(selectedProduct.selectedId)
        console.log(cart[i].selectedColors)
        console.log(selectedProduct.selectedColors)
  
    if (cart[i].selectedId === selectedProduct.selectedId && cart[i].selectedColors === selectedProduct.selectedColors) {
        cart[i].selectedQuantity += selectedProduct.selectedQuantity;
        console.log(cart[i].selectedQuantity)
        console.log(selectedProduct.selectedQuantity)
        notFound = false;  
        console.log("find") 
        }
    }
    
    if (notFound) {cart.push(selectedProduct)}
   
    localStorage.setItem("cart", JSON.stringify(cart))

     alert('The product has been added to the cart')}

    )