window.addEventListener('DOMContentLoaded', () => {

    const swiper = new Swiper('.swiper', {
            autoplay: {
                delay: 2500,
            },

        direction: 'horizontal',
        loop: true,
        spaceBetween: 40,

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

    const menuOpenButton = document.querySelector('.menu__button.open'),
    menuCloseButton = document.querySelector('.menu__button.close'),
    menu = document.querySelector('.header__bottom'),
    anchors = document.querySelectorAll('#anchor');

    const openMenu = (e) => {
        menu.classList.add('active');
    };

    const closeMenu = (e) => {
        menu.classList.remove('active');
    };

    menuOpenButton.addEventListener('click', openMenu);
    menuCloseButton.addEventListener('click', closeMenu);

    const scrollToSection = (e) => {
        const sectionName = e.target.getAttribute('data-to');
        document.querySelector(`.${sectionName}`).scrollIntoView({behavior: 'smooth'});
        menu.classList.remove('active');
    };

    anchors.forEach((el) => el.addEventListener('click', (e) => scrollToSection(e)))

    
})