    let indiceBag = (() => {
        var indice = document.getElementById("bag-items");
        var bag = localStorage.getItem("bag");
        bag = JSON.parse(bag);

        if (bag == false || bag == null) {
            return false;
        } else if (bag.length == 1) {
            indice.innerText = bag[0].quantity;
        } else {
            quantity = bag.reduce((previous, current) => previous.quantity + current.quantity)
            indice.innerText = quantity;
        }
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

    function throwErrorMessage(message, location) {
        location.innerText = message;
        location.style.display = "block";
        location.classList.add(".border_error")
    }

    function deleteErrorMessageOnFocus() {
        var field = this;
        var displayError = this.nextElementSibling;
        var errorMessage = displayError.innerText;

        if (errorMessage) {
            displayError.style.display = "none";

            if (field.classList.contains("border_error")) {
                field.classList.remove("border_error")
            } else {
                field.style.border = "";
            }
        }
    }
    const REGEX = {
        defaultFormat: /^[a-zA-Z0-9.-\/@]+$/,
        dateOfBirth: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    };
    const ERROR_MESSAGE = {
        defaultFormat: "Oups, something was wrong. Try to use only characters such: letters and numbers",
        dateOfBirth: "Oups, it looks like the format does not match: DD/MM/YEAR",
        email: "The email provided does not match the standart format",
        emailConfirmed: "Oups, it seems you have not retype your email correctly.",
        password: "Your password must be at least 8 characters with: one capital letter, one number and no specifics symboles",
        passwordConfirmed: "Oups, it seems you have not retype your password correctly"
    };
    const LOCATION_FIELDS = {
        DOB: document.getElementById("DOB"),
        country: document.getElementById("country"),
        email: document.getElementById("email"),
        confirmEmail: document.getElementById("confirm-email"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirm-password"),
        surnameField: [...document.getElementsByClassName('surname')],
    };

    let eventFields = (() => {
        LOCATION_FIELDS.surnameField.forEach(field => field.addEventListener("blur", () => checkEntry.formatEntry(event)));
        LOCATION_FIELDS.surnameField.forEach(field => field.addEventListener("focus", deleteErrorMessageOnFocus));

        LOCATION_FIELDS.DOB.addEventListener("blur", () => checkEntry.dob(event));
        LOCATION_FIELDS.DOB.addEventListener("focus", deleteErrorMessageOnFocus);

        LOCATION_FIELDS.country.addEventListener("blur", () => checkEntry.formatEntry(event));
        LOCATION_FIELDS.country.addEventListener("focus", deleteErrorMessageOnFocus);

        LOCATION_FIELDS.email.addEventListener("blur", () => checkEntry.email(event));;
        LOCATION_FIELDS.email.addEventListener("focus", deleteErrorMessageOnFocus);

        LOCATION_FIELDS.confirmEmail.addEventListener("blur", () => checkEntry.confirmEmail(event));
        LOCATION_FIELDS.confirmEmail.addEventListener("focus", deleteErrorMessageOnFocus);

        LOCATION_FIELDS.password.addEventListener("blur", () => checkEntry.password(event));
        LOCATION_FIELDS.password.addEventListener("focus", deleteErrorMessageOnFocus);

        LOCATION_FIELDS.confirmPassword.addEventListener("blur", () => checkEntry.confirmPassword(event));
        LOCATION_FIELDS.confirmPassword.addEventListener("focus", deleteErrorMessageOnFocus);

    })();

    let checkEntry = {
        formatEntry() {
            let field = event.target;
            let entry = field.value;
            let doesItMatchRegex = REGEX.defaultFormat.test(entry);

            if (entry && !doesItMatchRegex) {
                field.classList.add("border_error")
                throwErrorMessage(ERROR_MESSAGE.defaultFormat, field.nextElementSibling);
            }
        },
        dob() {
            let field = event.target;
            let entry = field.value;
            let doesItMatchRegex = REGEX.dateOfBirth.test(entry);

            if (entry && !doesItMatchRegex) {
                field.classList.add("border_error")
                throwErrorMessage(ERROR_MESSAGE.dateOfBirth, field.nextElementSibling);
            }
        },
        email() {

            let field = event.target;
            let entry = field.value;
            let doesItMatchRegex = REGEX.email.test(entry);
            if (entry && !doesItMatchRegex) {
                field.classList.add("border_error");
                throwErrorMessage(ERROR_MESSAGE.email, field.nextElementSibling);

            }
        },
        confirmEmail() {
            let field = event.target;
            let emailReference = LOCATION_FIELDS.email.value;
            let emailConfirmation = field.value;
            let checkMatch = emailConfirmation.match(emailReference);
            if (emailConfirmation && !checkMatch) {
                field.style.border = "2px solid red";
                throwErrorMessage(ERROR_MESSAGE.emailConfirmed, field.nextElementSibling);
            };

        },
        password() {
            let field = event.target;
            let entry = field.value;
            let doesItMatchRegex = REGEX.password.test(entry);


            if (entry && !doesItMatchRegex) {
                field.classList.add("border_error")
                throwErrorMessage(ERROR_MESSAGE.password, field.nextElementSibling);
            }

        },
        confirmPassword() {
            let confirmPassword = event.target;
            let passwordReference = LOCATION_FIELDS.password.value;
            let passwordToCheck = confirmPassword.value;
            let checkMatch = passwordToCheck.match(passwordReference)

            if (passwordToCheck && !checkMatch) {
                confirmPassword.style.border = "2px solid red";
                throwErrorMessage(ERROR_MESSAGE.passwordConfirmed, confirmPassword.nextElementSibling);

            }
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        sliderSubMenu.init();
        toggle.init();
    });