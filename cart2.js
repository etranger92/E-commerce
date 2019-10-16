var divContainerCart = document.getElementById("items-cart-resume");
var addToBag = document.getElementById("add-bag");
var quantity = document.getElementById("quantity");
var containerDetail = document.getElementById("detail-summary");

/*header*/
//Desktop
let indiceBag = (() => {

    var element = document.getElementById("bag-items");

    var bag = localStorage.getItem("bag");

    bag = JSON.parse(bag);

    if (bag == false || bag == null) {
        return false;
    }

    if (bag.length == 1) {
        element.innerText = bag[0].quantity;
    } else {
        quantity = bag.reduce((previous, current) => previous.quantity + current.quantity)
        element.innerText = quantity;
    };



})();
let sliderSubMenu = {
    init() {
        sliderSubMenu.firstColumn();
        sliderSubMenu.secondColumn()
    },
    firstColumn() {
        var countIndiceFirst = 0;

        function sliderImgSubMenu() {
            var imgFirstColumn = document.getElementById("img-new-product");
            var takeSrc = imgFirstColumn.getAttribute("src");
            var replaceAttributeImg = takeSrc.replace(/\d/, countIndiceFirst);
            countIndiceFirst++;
            imgFirstColumn.setAttribute("src", replaceAttributeImg);

            if (countIndiceFirst === 4) {
                countIndiceFirst = 0;
            }
        }
        sliderImgSubMenu();
        setInterval(sliderImgSubMenu, 3000);
    },
    secondColumn() {
        var countIndiceSecond = 0;

        function slider() {
            var sliderImgSubMenu1 = function () {
                var imgSecondColumn = document.getElementById("pic_sold");
                var takeSrc = imgSecondColumn.getAttribute("src");
                var replaceAttributeImg = takeSrc.replace(/\d/, countIndiceSecond);
                countIndiceSecond++;
                imgSecondColumn.setAttribute("src", replaceAttributeImg);

                if (countIndiceSecond === 5) {
                    countIndiceSecond = 0;
                }
            }
            sliderImgSubMenu1();
            setInterval(sliderImgSubMenu1, 3000);
        }
        return slider();
    },

};
//Mobile
let toggle = {
    init() {
        toggle.toggleMainMenu();
        toggle.toggleSubMenu();
    },
    toggleMainMenu() {
        var toggleMenu = document.getElementById("burger");
        toggleMenu.addEventListener("click", function () {
            var menuMobile = document.getElementById("navigation-mobile");
            menuMobile.classList.toggle("open");
        })
    },
    toggleSubMenu() {
        var mainHeader = [...document.getElementsByClassName("main_items")];
        mainHeader.forEach(element => element.addEventListener("click", subMenu));

        function subMenu(e) {
            var buttonClicked = e.target;
            var valueOfButton = buttonClicked.innerText;
            var subMenu = buttonClicked.querySelector("ul");
            subMenu.classList.toggle("open");
        }
    }
};

/*Body*/

//User: has as items in his bag:
var detailsUserBag = {
    key: "bag",
    quantity: 0,
    trolley: [],
    init() {
        var content = localStorage.getItem(detailsUserBag.key);
        detailsUserBag.trolley = JSON.parse(content);
        detailsUserBag.indiceBag();
        if (detailsUserBag.trolley.length == false || null) {
            cartVisual.emptyBag()
        }
        return detailsUserBag.trolley;
    },
    sync() {
        localStorage.setItem(detailsUserBag.key, JSON.stringify(detailsUserBag.trolley));
        detailsUserBag.init();
    },
    getQuantity() {
        var length = detailsUserBag.trolley.length;
        if (length == null || length == false) {
            return false
        } else {
            if (length == 1) {
                detailsUserBag.quantity = detailsUserBag.trolley[0].quantity
            } else {
                detailsUserBag.quantity = detailsUserBag.trolley.reduce((previous, current) => {
                    return previous.quantity + current.quantity;
                })
            }
        }
        return detailsUserBag.quantity;
    },
    setQuantity(item, value) {
        detailsUserBag.trolley = detailsUserBag.trolley.map(element => {
            if (element.id == item.id) {
                element.quantity = value;
            }
        })
        detailsUserBag.sync();
    },
    deleteItem(id) {
        detailsUserBag.trolley = detailsUserBag.trolley.filter(item => item.id != id);
        detailsUserBag.sync();
    },
    indiceBag() {
        var element = document.getElementById("bag-items");
        var quantity = 0;
        var indice = detailsUserBag.trolley.length;
        if (indice == false || indice == null) {
            element.innerText = 0;
        } else {
            if (indice == 1) {
                element.innerText = detailsUserBag.trolley[0].quantity;
            } else {
                quantity = detailsUserBag.trolley.reduce((previous, current) => previous.quantity + current.quantity)
                element.innerText = quantity;
            };
        }

    }


};

let till = {
    price: 0,
    calculePrice() {
        var regex = /\d/gi;
        if (detailsUserBag.trolley.length == 0) {
            return false
        } else {
            if (detailsUserBag.trolley.length > 1) {
                till.price = detailsUserBag.trolley.reduce((previous, current) => {
                    var quantity = previous.quantity;
                    //Maybe I can create a method as I am repeating myself. 
                    var previousPrice = previous.price.match(regex);
                    var previousItem = previousPrice.join("");
                    var previousResult = quantity * previousItem;

                    var currentQuantity = current.quantity;
                    var currentPrice = current.price.match(regex);
                    var currentItem = currentPrice.join("");
                    var currentResult = currentQuantity * currentItem;
                    return previousResult + currentResult;

                });
            } else {
                var price = detailsUserBag.trolley[0].price.match(regex);
                var priceToString = price.join("");
                till.price = detailsUserBag.trolley[0].quantity * priceToString;
            }
        }
        return till.price;
    },

};

let cartVisual = {
    displayFinalCart(item) {

        var displayCart = `<div class="sub-container-cart" data-id = ${item.id}>
        <div id="cart-final">
        <img class="pic_cart" src=${item.img[0]}>
        <div id="classTa">
            <ul>
                <li> ${item.type} </li>
                <li> ${item.price} </li>
            </ul>
            <div id="cart-item-product-actions">
                <label for="size"> Size </label>
                <select name="size">
    
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3</option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5</option>
                    <option value="6">6 </option>
                    <option value="7">7 </option>
                    <option value="8"> 8</option>
    
                </select>
                <label for="quantity"> Quantity </label>
                <select id="quantity${item.id}" data-id=${item.id} class="select_quantity" name="quantity">
    
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 </option>
                    <option value="4"> 4</option>
    
                </select>
                <button class="remove_cart"> Remove </button>
            </div>
        </div>
    </div>
    </div>`;
        divContainerCart.innerHTML += displayCart;
        cartVisual.setQuantitySelector(item)

    },
    setQuantitySelector(item) {

        var id = "quantity" + item.id; // => Look up/displayFinalCart/select/id 
        var location = document.getElementById(id);
        location.value = item.quantity;
    },
    removeCart(item) {
        var divToDelete = item.parentElement.parentElement.parentElement.parentElement;
        var idOfItem = divToDelete.getAttribute("data-id");
        divToDelete.parentElement.removeChild(divToDelete);
        detailsUserBag.deleteItem(idOfItem);
        orderDetails.init();
        detailsUserBag.indiceBag();
    },
    changeQuantity(item) {
        var idIndice = item.getAttribute("data-id");
        var element = item;
        detailsUserBag.trolley = detailsUserBag.trolley.map(item => {
            if (item.id == idIndice) {
                item.quantity = Number(element.value);
            }
            return item
        })
    },
    emptyBag() {

        var location = document.getElementById("empty_cart");
        location.style.display = "block";
    }
};
var orderDetails = {
    init() {
        orderDetails.quantity();
        orderDetails.price();
    },
    price() {
        var locationPrice = containerDetail.children[0].querySelector("span");
        var price = till.calculePrice();
        if (price == false) {
            locationPrice.innerText = 0 + "$";
        } else {
            locationPrice.innerText = price + "$";
        }

    },
    quantity() {
        var numberItem = containerDetail.children[1].querySelector("span");
        var quantity = detailsUserBag.getQuantity()
        if (quantity == null) {
            numberItem.innerText = 0
        } else {
            numberItem.innerText = quantity;
        }

    },
    displayPrice() {
        var price = containerDetail.children[0].querySelector("span");
        price.innerText = till.calculePrice() + "$";
    },

};
let displayCarts = (() => {
    var bag = detailsUserBag.init();
    bag.forEach(item => cartVisual.displayFinalCart(item));
})();

/* User: selects another quantity */
var quantityChanged = [...document.getElementsByClassName("select_quantity")];
quantityChanged.forEach(item => item.addEventListener("change", () => {
    cartVisual.changeQuantity(item);
    orderDetails.quantity();
    orderDetails.displayPrice();
    detailsUserBag.indiceBag();
}));

/*User: removes an item*/
var removeCartButton = (() => {
    var button = [...document.getElementsByClassName("remove_cart")];
    button.forEach(item => item.addEventListener("click", () => {
        cartVisual.removeCart(item);
    }));
})();


document.addEventListener("DOMContentLoaded", () => {
    detailsUserBag.init();
    detailsUserBag.getQuantity();
    orderDetails.init();
    sliderSubMenu.init();
    toggle.init();
});