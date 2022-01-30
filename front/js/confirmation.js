let params = (new URL(document.location)).searchParams;
let Id = params.get('orderId'); 
document.getElementById("orderId").textContent = Id;