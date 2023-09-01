const products=[
    {
        id:1,
        name:"Air Jordan 4 Retro Premium",
        price:869,
        image:"s1"
    },
    {
        id:2,
        name:"Air Jordan 4 Retro Fire Red",
        price:1099,
        image:"s2"
    },
    {
        id:3,
        name:"Air Jordan 4 Retro Raptor",
        price:999,
        image:"s3"
    },
    {
        id:4,
        name:"Air Jordan 4 Retro Red",
        price:799,
        image:"s4"
    },
    {
        id:5,
        name:"Air Jordan Max Pro 1",
        price:1249,
        image:"s5"
    },
    {
        id:6,
        name:"Air Jordan Force 1",
        price:869,
        image:"s6"
    },
    {
        id:7,
        name:"Air Jordan Max 3",
        price:599,
        image:"s7"
    },
    {
        id:8,
        name:"Air Jordan 1 Premium",
        price:999,
        image:"s8"
    },
    {
        id:9,
        name:"Air Jordan Max 5",
        price:699,
        image:"s9"
    },
    {
        id:10,
        name:"Air Jordan Edge 30",
        price:999,
        image:"s10"
    },
    {
        id:14,
        name:"Air Jordan Edge max 50",
        price:1599,
        image:"s14"
    },
    {
        id:13,
        name:"Air Jordan 5 Retro",
        price:849,
        image:"s13"
    }
];


let cart=JSON.parse(localStorage.getItem("productsInCarts"))||[];

function addtocart(id){
    if(cart.some((item) => item.id === id)){
        console.log(id);
        changeNumberOfUnits("plus",id);
    }else {
        const item = products.find((product) => product.id === id);
    
        cart.push({
          ...item,
          incart:1,
        });
    }
    //console.log(cart);
    localStorage.setItem("productsInCarts",JSON.stringify(cart));
    displayCart();
}

let discountAmount=localStorage.getItem("discountAmount")||0;
localStorage.setItem("discountAmount",discountAmount);

function displayCart(){
    let cartProducts=document.querySelector(".cart-items");
    let cart=localStorage.getItem("productsInCarts");
    cart=JSON.parse(cart);
    if(cartProducts && cart){
    cartProducts.innerHTML='';
    cart.forEach((item)=>{
      cartProducts.innerHTML+=`
        <div class="product">
          <h5 class="product-name"><img src="./images/shoes/${item.image}.svg" alt=""><span>${item.name}<br><button class="btn-cart1" onclick="removeItem(${item.id})"><i class="remove fa-solid fa-trash"></i> Remove item</button> <button class="btn-cart1"><i class="fa-solid fa-heart"></i> Move to favorite</button></span></h5>
          <h5 class="size">11</h5>
          <h5 class="price">$${item.price}</h5>
          <h5 class="quantity"><button class="btn-minus" onclick="changeNumberOfUnits('minus',${item.id})"><img  src="https://img.icons8.com/external-simple-solid-edt.graphics/50/null/external-Minus-add-and-remove-simple-solid-edt.graphics-10.png"/></button>${item.incart}<button class="btn-plus" onclick="changeNumberOfUnits('plus',${item.id})"><img src="https://img.icons8.com/material-sharp/24/null/plus--v1.png"/></button></h5>
          <h5 class="total">$${item.price * item.incart}</h5>
        </div><hr>`
    });
    }
    let cartProductTotal=document.querySelector(".summary");
    let displayQuantity=document.querySelector(".totalproduct");
    let totalPrice=0;
    let totalNumberOfUnits=0;
    cart.forEach((item)=>{
        totalPrice+=item.price * item.incart;
        totalNumberOfUnits+=item.incart;
    });
    displayQuantity.textContent=totalNumberOfUnits;
    let discountAmount=localStorage.getItem("discountAmount");
    discountAmount=parseInt(discountAmount);
    if(cartProductTotal){
        cartProductTotal.innerHTML=`
        <h1>Order Summary</h1>
        <hr style="margin: 0 15px 15px;">
        <h2>Sub total <span class="summary-right">$${(totalPrice-((totalPrice*18)/100)).toFixed(2)}</span></h2>
        <h2>Tax<span class="summary-right">$${((totalPrice*18)/100).toFixed(2)}</span></h2>
        <h2>Shipping<span class="summary-right">FREE <div style="display: inline;text-decoration:line-through;text-decoration-color:red;text-decoration-thickness:2px;margin-left: 3px;"> $50</div></span></h2>
        <h2 class="giftcard" >Giftcard/Discount code <span class="summary-right"></span><br><input type="text" class="codeinput"><button class="codeapply" onclick="discount()">Apply</button></h2><hr style="margin: 0 15px;">
        <h4>Total<span class="summary-right">$${(totalPrice-discountAmount).toFixed(2)}</span></h4>
        <button class="checkout">CHECKOUT</button>
        `
    }
    let giftcard=document.querySelector(".giftcard");
    if(discountAmount>0 && cart.length>0 && giftcard){
        let giftcard=document.querySelector(".giftcard");
        giftcard.innerHTML=`
        Giftcard/Discount code <span class="summary-right">-$${discountAmount.toFixed(2)}</span><br><input type="text" class="codeinput" style="width: 315px;" placeholder="NIKE2023" readonly><div class="verification"><img src="https://img.icons8.com/color/32/null/verified-account--v1.png"/>APPLIED</div>`
    }
}

function removeItem(id) {
    let cart=localStorage.getItem("productsInCarts");
    cart=JSON.parse(cart);
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("productsInCarts",JSON.stringify(cart));
    if(cart.length===0){
        discountAmount=0;
        localStorage.setItem("discountAmount",0);
    }
    displayCart();
}

function changeNumberOfUnits(action,id){
    let cart=localStorage.getItem("productsInCarts");
    cart=JSON.parse(cart);
    cart=cart.map((item)=>{
        let numberOfUnits=item.incart;

        if(item.id===id){
            if(action==="minus" && numberOfUnits>1){
                numberOfUnits--;
            }
            else if(action==="plus" /*&& numberOfUnits< item.instock*/){
                numberOfUnits++;
            }
        }

        return{
            ...item,
            incart:numberOfUnits,
        }
    });
    localStorage.setItem("productsInCarts",JSON.stringify(cart));
    displayCart();
}

function discount(){
    let discountCode=document.querySelector(".codeinput").value.toUpperCase();
    if(discountCode==='NIKE2023'){
        discountAmount=500;
        localStorage.setItem("discountAmount",discountAmount);
    }
    else{
        localStorage.setItem("discountAmount",0);
        discountAmount=0;
        alert("INVALID CODE");
    }
    displayCart();
}

displayCart();

function updateRange(){
    var inputRange=document.getElementById("input-price");
    var maxRange= document.getElementById("max-range");
    maxRange.innerHTML="$"+inputRange.value;
}

function displayitems(){
    var productToDisplay=document.querySelector(".all-product");
    if(productToDisplay){
        productToDisplay.innerHTML=``;
        for(var i=0;i<products.length;i++){
            productToDisplay.innerHTML+=`
            <div class="card-container" >
                <div onclick="location.href='./product.html'">
                    <img src="./images/shoes/${products[i].image}.svg" alt="image1" height="240px" onclick="showDetailProduct(${products[i].id})">
                </div>
                    <div class="desc">
                        <h5>Jordon</h5>
                        <h6>${products[i].name}</h6>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>$${products[i].price}</h4>
                    </div>
                    <button class="btn-cart" onclick="addtocart(${products[i].id})"><i class="fa-solid fa-cart-shopping add-to-cart"></i></button>
                </div>
            `
        }
    }
}
displayitems();
function size(val){
    var sized=document.querySelectorAll(".shoes-size");
    for(let i=0;i<sized.length;i++){
        if(parseFloat(sized[i].innerHTML)===val){
            sized[i].style.borderColor="#54BAB9";
            sized[i].style.color="#54BAB9";
        }
    }
}
function color(val){
    var sized=document.querySelectorAll(".shoes-color");
    for(let i=0;i<sized.length;i++){
        if(document.querySelectorAll(".shoes-color")[i].innerText===val){
            sized[i].style.borderColor="#54BAB9";
            sized[i].style.color="#54BAB9";
        }
    }
}

function showDetailProduct(p_id){
    localStorage.setItem("onclick",p_id);
}
var productDetails=document.querySelector(".product-details");
if(productDetails){
    productDetails.innerHTML=``
    var onclickid=parseInt(localStorage.getItem("onclick"));
    products.map((item)=>{
        if(item.id===onclickid){
            productDetails.innerHTML=`
            <div class="prod-img">
                <h2 class="hid-heading">Home/Men/Shoes</h2>
                <div class="img-cont"><img style="height: 550px;" class="img-main" src="./images/shoes/${item.image}.svg" alt=""></div>
                <div class="img-sec">
                    <div class="img-cont img-bg"><img class="img-secondary" src="./images/shoes/${item.image}.svg" alt=""></div>
                    <div class="img-cont img-bg"><img class="img-secondary" src="./images/shoes/${item.image}.svg" alt=""></div>
                </div>
            </div>
            <div class="prod-details">
            <h2>Home/Men/Shoes</h2>
            <h1>${item.name}</h1>
            <h3>$${item.price} <span>$3000</span></h3>
            <select name="" id="">
                <option value="">Select Size</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
            </select>
            <button class="add-to-carts" onclick="addtocart(${item.id})">Add to cart</button>
            <h3>Product Details</h3>
            <p>With an aged aesthetic and classic colours, the AF-1 gets a vintage makeover. Crisp leather with a checked pattern on the Swoosh and heel adds a festive feel for easy styling. Pair it with jeans, joggers or whatever else—the timeless look is the perfect match for any outfit.Debuting in 1982 as a basketball must-have, the Air Force 1 came into its own in the '90s. The clean look of the classic white-on-white AF-1 was endorsed from the basketball courts to the street and beyond.</p>
            <h3>Delivery Option</h3>
            <form action="">
                <input type="number" name="" id="" maxlength="6" pattern="[0-9]{6}" placeholder="Enter Pincode">
                <button class="pincode-check">check</button>
                <h5>Please enter PIN code to check delivery time & Pay on Delivery Availability</h5>
                <ul type="none">
                    <li>100% Original Products</li>
                    <li>Pay on delivery might be available</li>
                    <li>Easy 30 days returns and exchanges</li>
                    <li>Try & Buy might be available</li>
                </ul>
            </form>
            <h3>Offers</h3>
            <ul type="none">
                <li>Use 'NIKE2023' to avail flat $500 Off</li>
            </ul>
        </div>`
        }
    });
    
}