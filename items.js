Array.prototype.flexFilter = function (info) {
    return this.filter(item => {
        return info.every(i => {
            return i.values.indexOf(item[i.field]) > -1;
        });
    });
};
const BRAND = [...document.getElementsByClassName("button_filter")];
const COLOR = [...document.getElementsByClassName("button_color")];
var containerCart = [...document.getElementsByClassName("container-cart-item")];

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
/*body*/
function createItemCart(item) {


    var createLink = document.createElement("a");
    createLink.setAttribute("href", "item-alone1.html? source=" + item.name);
    createLink.setAttribute("class", "link_item_page");


    var createElementDiv = document.createElement("div");
    createElementDiv.setAttribute("class", "item_cart");

    var createImg = document.createElement("img");

    createImg.setAttribute("src", item.img[0]);

    createImg.setAttribute("class", "img_cart");
    createImg.setAttribute("color", item.color);

    createElementDiv.appendChild(createImg);

    var createUl = document.createElement("ul");

    var createLi1 = document.createElement("li");
    createLi1.textContent = item.brand;

    createUl.appendChild(createLi1);
    var createLi2 = document.createElement("li");
    createLi2.textContent = item.price;
    createUl.appendChild(createLi2);
    createElementDiv.appendChild(createUl);
    createLink.appendChild(createElementDiv);

    containerCart[0].appendChild(createLink);
};
const CART = {
    key: "cart",
    content: [],
    selection: [],
    getItemsStorage() {

        var products = localStorage.getItem(CART.key);
        CART.content = JSON.parse(products);

        return CART.content;

    },
    filter(criteria) {
        criteria = criteria.filter(item => item.values.length > 0);
        CART.selection = CART.content.flexFilter(criteria);
        DISPLAY_CART.selection(CART.selection);
    },
    findProduct() {
        CART.selection = CART.contents.filter(item => item.attribute === value);
    },
};
const FILTER = {

    criteria: [{
            field: "brand",
            values: []
        },
        {
            field: "color",
            values: []
        },
    ],
    selectBrand() {
        var element = this;
        var value = this.getAttribute("value");
        if (value === "allShoes") {
            return DISPLAY_CART.defaultCart()
        } else {
            var isCriteriaAlreadySelected = FILTER.criteria[0].values.indexOf(value);
            (isCriteriaAlreadySelected > -1) ? FILTER.criteria[0].values.splice(isCriteriaAlreadySelected, 1): FILTER.criteria[0].values.push(value);

            CART.filter(FILTER.criteria);
            FILTER.lightBrandSelected(element);
        }
    },
    selectColor() {
        var element = this;
        var value = this.getAttribute("value");
        var isCriteriaAlreadySelected = FILTER.criteria[1].values.indexOf(value);
        (isCriteriaAlreadySelected > -1) ? FILTER.criteria[1].values.splice(isCriteriaAlreadySelected, 1): FILTER.criteria[1].values.push(value);
        CART.filter(FILTER.criteria);
        FILTER.lightColorSelected(element);
    },
    lightBrandSelected(brand) {
        brand.classList.toggle("brand_selected");
    },
    lightColorSelected(color) {
        color.classList.toggle("color_selected")
    }

};

const DISPLAY_CART = {

    defaultCart() {
        CART.selection = [];
        FILTER.criteria.values = FILTER.criteria.map(item => item.values = []);
        containerCart[0].innerHTML = "";
        CART.content.forEach(item => createItemCart(item));
        var removeBorder = BRAND.map(item => (item.classList.contains("brand_selected")) ? item.classList.toggle("brand_selected") : false);
    },

    removeDefault() {
        containerCart[0].innerHTML = "";

    },

    selection(selection) {
        DISPLAY_CART.removeDefault();
        selection.forEach(item => createItemCart(item))
    }

};

BRAND.forEach(brand => brand.addEventListener("click", FILTER.selectBrand));
COLOR.forEach(color => color.addEventListener("click", FILTER.selectColor));

document.addEventListener("DOMContentLoaded", () => {
    CART.getItemsStorage();
    DISPLAY_CART.defaultCart();
    sliderSubMenu.init();
    toggle.init();
});