let products = JSON.parse(localStorage.getItem("cart"));

/*Infos on the item selected*/
let propretiesItemSelected = {};
propretiesItemSelected.name = (() => {

        var sourceClicked = document.location.href;
        var regex = /\=.+$/i;
        var itemSelected = sourceClicked.match(regex)[0].substr(1);
        return itemSelected;
    })(),
    propretiesItemSelected.item = (() => products.filter(element => propretiesItemSelected.name === element.name))();
propretiesItemSelected.images = (() => {
    var images = [];
    propretiesItemSelected.item[0].img.forEach(image => images.push(image));
    return images
})();


/*header*/

//Desktop
let indiceBag = (() => {

    var indice = document.getElementById("bag-items");

    var bag = localStorage.getItem("bag");

    bag = JSON.parse(bag);

    if (bag == false || bag == null) {
        return false;
    }

    if (bag.length == 1) {
        indice.innerText = bag[0].quantity;
    } else {
        quantity = bag.reduce((previous, current) => previous.quantity + current.quantity)
        indice.innerText = quantity;
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

/*when the user: enters in ther page*/
let containerImage = document.getElementById("item-selected").querySelector("img");
containerImage.setAttribute("src", propretiesItemSelected.images[0]);

function displayImagesPanel() {

    var contentUl = document.getElementById("divers-view").querySelector("ul");
    var indice = 0;
    var numberOfImgs = propretiesItemSelected.images.length;

    while (numberOfImgs > indice) {
        var newLi = document.createElement("li");

        var createImg = document.createElement("img");
        createImg.setAttribute("class", "img_diff_angles");
        createImg.setAttribute("src", propretiesItemSelected.images[indice]);

        newLi.appendChild(createImg);
        contentUl.appendChild(newLi);

        indice++;

    }
}
displayImagesPanel();

/*when the user: selects one of the pictures*/
var imagesDisplayedToArray = [...document.getElementsByClassName("img_diff_angles")];
imagesDisplayedToArray.forEach(image => image.addEventListener("click", mainImage));

function mainImage() {

    let image = this;
    var getSource = image.getAttribute("src");
    containerImage.setAttribute("src", getSource);

    if (containerImage.hasAttribute("src")) {

        containerImage.removeAttribute("src");
        containerImage.setAttribute("src", getSource);

    } else {
        containerImage.setAttribute("src", getSource);
    }


}

function displayDetailsPicture() {

    var nameItem = document.getElementById("name");
    var titleItem = document.getElementById("item-title");
    var priceItem = document.getElementById("price");
    var descriptionItem = document.getElementById("description");
    var brandItem = document.getElementById("brand-item");


    nameItem.innerText = propretiesItemSelected.item[0].name;
    titleItem.innerText = propretiesItemSelected.item[0].name;
    priceItem.innerText = propretiesItemSelected.item[0].price;
    descriptionItem.innerText = propretiesItemSelected.item[0].description;
    brandItem.innerText = propretiesItemSelected.item[0].brand;


}
displayDetailsPicture();

//When the user clicks on the button "add bag".

var bagStore = {
    key: "bag",
    bag: [],
    init() {
        var bagContent = localStorage.getItem(bagStore.key);
        if (bagContent) {
            bagStore.bag = JSON.parse(bagContent);
            bagStore.indiceBag();
        };

    },
    sync() {
        localStorage.setItem(bagStore.key, JSON.stringify(bagStore.bag));
        var bagContent = localStorage.getItem(bagStore.key);
        bagStore.bag = JSON.parse(bagContent);
        bagStore.indiceBag();

    },
    checkItem(item) {

        var indice = bagStore.bag.length;
        if (indice > 0) {
            var index = bagStore.bag.findIndex(element => element.id == item.id);
            (index > -1) ? bagStore.increaseQuantity(item): bagStore.addItem(item)
        } else {
            bagStore.addItem(item);
        };
    },
    addItem(item) {

        var indice = bagStore.bag.length;
        item.quantity += 1;
        (indice == true) ? bagStore.bag = bagStore.bag.concat(item): bagStore.bag.push(item);
        bagStore.sync();
    },
    removeItem(item) {

        var id = item.id;
        var indice = bagStore.bag.findIndex(item => item.id == id);
        bagStore.bag.splice(indice, 1);
        sync();
    },
    increaseQuantity(item) {

        var index = bagStore.bag.findIndex(element => element.id == item.id);
        bagStore.bag[index].quantity += 1;
        bagStore.sync();
    },
    decreaseQuantity(item) {
        var indice = item.id;
        bagStore.bag = bagStore.bag.map(item => {
            if (item.id == indice) {
                item.quantity -= 1;
                if (item.quantity == 0) {
                    bagStore.removeItem(item)
                }
            }

        })
        bagStore.sync();
    },
    indiceBag() {

        var indice = document.getElementById("bag-items");
        var quantity = 0;
        if (bagStore.bag == null || bagStore.bag == false) return false;
        if (bagStore.bag.length == 1) {
            indice.innerText = bagStore.bag[0].quantity;
        } else {
            quantity = bagStore.bag.reduce((previous, current) => previous.quantity + current.quantity)
            indice.innerText = quantity;
        };
    }
};
var buttonAddToCart = document.getElementById("add-bag");
buttonAddToCart.addEventListener("click", () => {
    displayCartPreview();
    bagStore.checkItem(propretiesItemSelected.item[0]);

});

function displayCartPreview() {

    var panel = document.getElementById("cart-preview");
    var div = `
    <div id="cart-resume">
    <img id="img_resume" class="pic_cart" src=${propretiesItemSelected.images[0]}>
    <div class="cart_resume_details">
        <h4> SUCCESSFULLY ADDED TO BAG</h4>
        <div id="close-cart-resume" onclick="removeCart()"> <i class="fas fa-window-close"></i> </div>
        <div id="sub-div-resume">
            <ul>
                <li>${propretiesItemSelected.item[0].type}</li>
                <li>${propretiesItemSelected.item[0].name} </li>
                <li>${propretiesItemSelected.item[0].price}</li>
            </ul>
            <a href="cart1.html"> <button> CHECKOUT CART </button> </a>
        </div>
    </div>

</div>`;
    panel.innerHTML = div;

}

function removeCart() {
    var crossParent = document.getElementById("cart-resume");
    crossParent.style.display = "none";
};





document.addEventListener("DOMContentLoaded", () => {
    bagStore.init();
    sliderSubMenu.init();
    toggle.init();
});