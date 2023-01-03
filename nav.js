//
//    Toggle Mobile Navigation
//
const navbarMenu = document.querySelector("#navigation #navbar-menu");
const hamburgerMenu = document.querySelector("#navigation .hamburger-menu");
const mainSection = document.querySelector('main');
const footer = document.querySelector('footer');

hamburgerMenu.addEventListener('click', () => {
    const isOpened = hamburgerMenu.getAttribute('aria-expanded') === "true";
    isOpened ? hamburgerMenu.setAttribute('aria-expanded', "false") : hamburgerMenu.setAttribute('aria-expanded', "true");

    navbarMenu.classList.toggle("open");
    hamburgerMenu.classList.toggle("clicked");

    closeNavbarOnOutsideClick();  //close navbar when you click outside of it
});

function closeNavbarOnOutsideClick() {
    // Appointments page doesn't have footer, so this checks if footer exists
    if (!footer) return;

    if (navbarMenu.classList.contains("open")) {   
        mainSection.addEventListener('click', removeMenuClasses);
        footer.addEventListener('click', removeMenuClasses);
    }
    else {
        mainSection.removeEventListener('click', removeMenuClasses);
        footer.removeEventListener('click', removeMenuClasses);
    }
}

function removeMenuClasses() {
    navbarMenu.classList.remove("open");
    hamburgerMenu.classList.remove("clicked");
    hamburgerMenu.setAttribute('aria-expanded', "false");

    mainSection.removeEventListener('click', removeMenuClasses);
    footer.removeEventListener('click', removeMenuClasses);
}