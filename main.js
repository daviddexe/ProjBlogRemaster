const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


const myOserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const elements = document.querySelectorAll('.hidden')
elements.forEach((element) => myOserver.observe(element))





function sendMail(event) {
    event.preventDefault();


    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };


    emailjs.send("service_zvkfgaa", "template_y42kkaz", parms).then(
        function (response) {
            alert("E-mail Enviado com Sucesso!"); // Sucesso
        },
    );
}



let inputs = document.querySelectorAll("input, textarea"); 
let botao = document.getElementById("botao");

function validarCampos() {
    let vazio = Array.from(inputs).some(input => input.value.trim() === '');
    botao.disabled = vazio;
}


inputs.forEach(input => input.addEventListener("input", validarCampos));


validarCampos();




document.getElementById("contactForm").addEventListener("submit", sendMail);

const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.controls button:first-child');
const nextButton = document.querySelector('.controls button:last-child');
let currentIndex = 0;

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    carouselItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

updateCarousel();