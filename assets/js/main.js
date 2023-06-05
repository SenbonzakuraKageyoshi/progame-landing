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

    const coursesList = document.querySelector('.pricing__list');

    const getCourses = async () => {
        try {
            const data = await fetch('http://45.12.72.51:5000/api/course/get-courses', {
                method: 'POST',
                body: {
                    role: 'student',
                    id: null
                }
            })

            const response = await data.json();

            let html = ''
            
            if(response.length === 0){
                document.querySelector('.loading').remove()
                return coursesList.innerHTML = `<p class="message">Курсы еще не зарегистрированы</p>`
            }
            
            response.forEach((el) => {

                const inner = document.createElement("ul");
                inner.classList.add("pricing__list-item__features");
          
                el.features.split(";").forEach((feature) => {
                  const featureEl = document.createElement("li");
                  featureEl.classList.add("pricing__list-item__features-item");
                  featureEl.textContent = feature;
                  inner.append(featureEl);
                });

                html += 
                `
                <li class="pricing__list-item">
                <div class="priceValue">${el.price} ₽</div>
                <div class="pricing__list-item-name">${el.name}</div>
                <ul class="pricing__list-item__features">
                    ${inner.innerHTML}
                </ul>
            </li>
            `
            })
            
            coursesList.innerHTML = html
            document.querySelector('.loading').remove()
        } catch (error) {
            console.log(error)
            coursesList.innerHTML = `<p class="message">Не удалось получить данные о курсах</p>`
        }
    };

    getCourses();
    
    const sendRequest = async (telephone, email) => {
        try {
            await fetch('http://45.12.72.51:5000/api/request/create', {
                method: 'POST',
                body: JSON.stringify({
                    authorName: 'По заявке с лендинга',
                    text: 'Заявка на регистрацию в личном кабинете',
                    CourseId: null,
                    UserId: null,
                    telephone: telephone,
                    email: email
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
        } catch (error) {
            
        }
    };

    const form = document.querySelector('form');

    const validateForm = (e) => {
        e.preventDefault();
        
        const telephoneValue = document.querySelector('#tel').value;
        const emailValue = document.querySelector('#email').value;

        if(telephoneValue.length !== 11){
            return form.innerHTML += `<p class="message">Номер должен состоять из 11 цифр!</p>`
        }else if(!emailValue.includes('@')){
            return form.innerHTML += `<p class="message">Такой формат почты не поддерживается</p>`
        }else{
            sendRequest(telephoneValue, emailValue)
            .then(() => console.log('Принято!'))
        }
    };

    const sendButton = document.querySelector('.form-button');

    sendButton.addEventListener('click', validateForm)

})