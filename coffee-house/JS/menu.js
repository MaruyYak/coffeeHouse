let menuItems;
let refreshButton;
let openCategory;
let modal;
let allItems;
let popWindow;
let optionItems;

let selectedItem;
let selectedSize;
let selectedAdditives;

window.onload = function(e){ 
    allItems = document.querySelector('.menu_categories')
    menuItems = document.querySelectorAll('.menu_item');
    tabSwitchers = document.querySelectorAll('.switcher')
    refreshButton = document.querySelector('.refresh_list_button')
    modal = document.querySelector('.popup_overlay')
    popWindow = document.querySelector('.popup_window')
    optionItems = document.querySelectorAll('.option_button_info');


    changeCategory('coffee', 0)

    tabSwitchers[0].addEventListener('click', () => changeCategory('coffee', 0));
    tabSwitchers[1].addEventListener('click', () => changeCategory('tea', 1));
    tabSwitchers[2].addEventListener('click', () => changeCategory ('dessert', 2));
    refreshButton.addEventListener('click', () => loadItems());

    allItems.addEventListener('click', (event) => openModal(event));
    modal.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup_overlay') || event.target.classList.contains('popup_close')) {
            modal.classList.toggle('openModal');
            optionItems.forEach((item) => {
              item.classList.remove('option_button_info_selected');
            });
        }
    })

    burgermenuOnload(true);
}

function changeCategory(selectedCategory, switcherId) {
    tabSwitchers.forEach((tab)=>{tab.classList.remove('switcher_selected')});
    tabSwitchers[switcherId].classList.add('switcher_selected');
    menuItems.forEach(item => item.classList.add('menu_item_hidden'))
    Array.from(menuItems).filter((item) => item.classList.contains(selectedCategory)).forEach((item, id) => {
        if(window.innerWidth <= 768 && id < 4 || window.innerWidth > 768) { 
            item.classList.remove('menu_item_hidden')
        }
    })
    openCategory = selectedCategory
    if (openCategory !== "tea" && window.innerWidth <= 768) {
        refreshButton.style.display = `flex`
    } else {
        refreshButton.style.display = `none`       
    }
}

function loadItems() {
    Array.from(menuItems).filter((item) => item.classList.contains(openCategory))
    .forEach((item) => item.classList.remove('menu_item_hidden'))
    refreshButton.style.display = `none`
}

function openModal(event) {
    if (!event || !event.target) {
        return;
    }
    let clickedElement = event.target;
    let parentElement = clickedElement.parentElement;
    while (parentElement) {
        if (parentElement.id) {            
            let elementProduct = products.find(product => product.name === parentElement.id);
            if (elementProduct) {
                selectedItem = elementProduct;
                modal.classList.toggle('openModal');
                generateModal(elementProduct, parentElement.id)
            } 
                return; 
         }
         parentElement = parentElement.parentElement;
    }
}

function generateModal(item, photoId) {
  const name = document.querySelector('.popup_title');
  const desc = document.querySelector('.popup_desc');
  const sizeOptions = document.querySelectorAll('.popup_buttons .size');
  const imgElement = document.querySelector('.popup_img img');

  imgElement.src = `./img/Menu/${photoId}.png`;
  imgElement.alt = photoId;
   
  selectSizeOption();
  additiveOptions();

  selectedAdditives = [];
  sizeOptions[0].classList.add('option_button_info_selected');
  selectedSize = 's';
 
  name.innerHTML = item.name;
  desc.innerHTML = item.description;

  calculatePrice();
}

function calculatePrice() {
  const price = document.querySelector('.popup_price');

  if (!selectedItem) return;

  let additivesCost = 0;

  selectedAdditives.forEach((additiveName) => {
      const additive = selectedItem.additives.find(add => add.name === additiveName);
      if (additive) {
          additivesCost += +additive['add-price'];
      }
  });

  const sizePrice = selectedItem.sizes[selectedSize] ? +selectedItem.sizes[selectedSize]['add-price'] : 0;
  const basePrice = +selectedItem.price;

  const totalPrice = basePrice + sizePrice + additivesCost;

  price.innerHTML = `$${totalPrice.toFixed(2)}`;
}


function selectSizeOption() {
  const sizeOptions = document.querySelectorAll('.popup_buttons .size');

  sizeOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
        sizeOptions.forEach((item) => {
            item.classList.remove('option_button_info_selected');
        });
        event.currentTarget.classList.add('option_button_info_selected');
        selectedSize = event.currentTarget.querySelector('.size_name').textContent.trim().toLowerCase();
        calculatePrice();
    });
  });
}


function additiveOptions() {
  const additiveOptions = document.querySelectorAll('.popup_buttons .additive');

  additiveOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
        event.currentTarget.classList.toggle('option_button_info_selected');
        const additiveName = event.currentTarget.querySelector('p').textContent.trim();
        if (selectedAdditives.includes(additiveName)) {
            selectedAdditives = selectedAdditives.filter(item => item !== additiveName);
        } else {
            selectedAdditives.push(additiveName);
        }
        calculatePrice();
    });
  });
}