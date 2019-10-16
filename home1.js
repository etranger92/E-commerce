/*TODO: change the inscription - store the img git - allShoes

/*Variables*/


async function nabil() {
	return await fetch('https://cors-anywhere.herokuapp.com/https://github.com/etranger92/E-commerce/blob/master/products.json');
}

nabil().then(index => console.log(index)).catch(console.log("hoo"));

//Products
let items = [{
		type: "Men shoes",
		brand: "Flower",
		color: "black",
		img: ["../Pictures/shoes/item-shoes/flower-spyder-black0.jpg",
			"../Pictures/shoes/item-shoes/flower-spyder-black1.jpg",
			"../Pictures/shoes/item-shoes/flower-spyder-black2.jpg",
			"../Pictures/shoes/item-shoes/flower-spyder-black3.jpg",
			"../Pictures/shoes/item-shoes/flower-spyder-black4.jpg",
			"../Pictures/shoes/item-shoes/flower-spyder-black5.jpg",
		],
		price: "39$*",
		name: "spyder",
		description: "Coton.. Best quality...",
		id: "0",
		quantity: 0
	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "black",
		img: ["../Pictures/shoes/shoes0.jpg"],
		price: "39$",
		name: "snake",
		description: "............",
		id: "1",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Sun",
		color: "white",
		img: ["../Pictures/shoes/shoes1.jpg", ],
		price: "49$",
		name: "",
		id: "2",
		quantity: 0


	},
	{
		type: "Men shoes",
		brand: "Tree",
		color: "red",
		img: ["../Pictures/shoes/shoes2.jpg", ],
		price: "49$",
		name: "",
		id: "3",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "white",
		img: ["../Pictures/shoes/shoes3.jpg", ],
		price: "59$",
		name: "",
		id: "4",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Sun",
		color: "green",
		img: ["../Pictures/shoes/shoes4.jpg", ],
		price: "69$",
		name: "",
		id: "5",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "black",
		img: ["../Pictures/shoes/shoes5.jpg", ],
		price: "69$",
		name: "",
		id: "6",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "white",
		img: ["../Pictures/shoes/shoes6.jpg", ],
		price: "79$",
		name: "",
		id: "7",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Sun",
		color: "white",
		img: ["../Pictures/shoes/shoes7.jpg", ],
		price: "69$",
		name: "",
		id: "8",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "white",
		img: ["../Pictures/shoes/shoes8.jpg", ],
		price: "49$",
		name: "",
		id: "9",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Sun",
		color: "white",
		img: ["../Pictures/shoes/shoes9.jpg", ],
		price: "39$",
		name: "",
		id: "10",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Tree",
		color: "green",
		img: ["../Pictures/shoes/shoes10.jpg", ],
		price: "29$",
		name: "",
		id: "11",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "red",
		img: ["../Pictures/shoes/shoes11.jpg", ],
		price: "59$",
		name: "",
		id: "12",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "green",
		img: ["../Pictures/shoes/shoes12.jpg", ],
		price: "89$",
		name: "",
		id: "13",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Slower",
		color: "green",
		img: ["../Pictures/shoes/shoes13.jpg", ],
		price: "89$",
		name: "",
		id: "14",
		quantity: 0

	},
	{
		type: "Men shoes",
		brand: "Flower",
		color: "black",
		img: ["../Pictures/shoes/shoes14.jpg", ],
		price: "89$",
		name: "",
		id: "15",
		quantity: 0

	},
];
//Texts
let textSlider = ["Our Last Products Have Just Arrived",
	"We are proud to present you our last collection",
	"Be the first one to grab it"
];

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
		console.log("salut")
		toggle.toggleMainMenu();
		toggle.toggleSubMenu();
	},
	toggleMainMenu() {
		var toggleMenu = document.getElementById("burger");
		console.log("salut");
		toggleMenu.addEventListener("click", function () {
			var menuMobile = document.getElementById("navigation-mobile");
			console.log("hi")
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

// SlidersBody
let slidersBody = {
	init() {
		slidersBody.textSlider();
		slidersBody.sliderBodyImages();
	},
	textSlider() {
		var countTextIndice = 0;

		function sliderText() {
			let sliderTextBar = document.getElementById("text-slider");
			var numberOfText = textSlider.length;
			sliderTextBar.innerHTML = textSlider[countTextIndice];
			countTextIndice++;
			if (countTextIndice === numberOfText) {
				countTextIndice = 0;
			}
		};

		sliderText();
		window.setInterval(sliderText, 3000)

	},
	sliderBodyImages() {
		var counter = 0;

		function sliderImage() {
			var imageAttributeSlider = document.getElementById("pics-new-collection").getAttribute("src");
			var setAttribute = document.getElementById("pics-new-collection").setAttribute("src", "../Pictures/newCollection/new-collection" + counter + ".jpeg");
			counter++;
			if (counter === 6) {
				counter = 0;
			};
		}

		sliderImage();
		window.setInterval(sliderImage, 3000)
	}

};
/*storage*/
let productStorage = {
	key: "cart",
	content: [],
	saveItemsStorage() {
		if (items) {
			var products = JSON.stringify(items)
			localStorage.setItem(productStorage.key, products);

		}
	},
	getItemsStorage() {
		var items = localStorage.getItem(productStorage.key);
		var products = JSON.parse(items);
		productStorage.content = products;


	},
	findProduct(attribute, value) {
		var result = productStorage.content.filter(item => item.attribute === value);
		return result;
	},
	deleteProduct(attribute, value) {
		var result = productStorage.content.map(item => {
			if (item.attribute !== value) {
				return item;
			}
		})
	},
};

document.addEventListener("DOMContentLoaded", () => {
	productStorage.saveItemsStorage();
	productStorage.getItemsStorage();
	sliderSubMenu.init();
	toggle.init();
	slidersBody.init();

});