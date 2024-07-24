function burgermenuOnload(menuButtonWorks) {
    const burgerMenu = document.querySelector('.burger_menu');
    const navList = document.querySelector('.nav_list')
    const navWrapper = document.querySelector('.nav_wrapper');
    const menuButtoninBurger = document.querySelector('.menu_button');
    


    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navWrapper.classList.toggle('open');
    })
    navList.addEventListener('click', function(event) {
        if (!event.target.classList.contains('nav_list')) {
            navWrapper.classList.toggle('open');
            burgerMenu.classList.toggle('active');
        }
    })

    if (menuButtonWorks) {
        menuButtoninBurger.addEventListener('click', function(event) {
            navWrapper.classList.remove('open');
            burgerMenu.classList.remove('active');
            event.preventDefault();
        })
    }
}  