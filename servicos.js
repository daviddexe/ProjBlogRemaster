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


document.addEventListener("DOMContentLoaded", function () {
    // Lightbox
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");
    const images = document.querySelectorAll(".service img");

    let currentImageIndex = 0;
    let touchStartX = 0; 
    let touchEndX = 0; 
   
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.style.display = "block";
        });
    });

   
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    prevBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    });

  
    nextBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    });

    
    function updateLightboxImage() {
        lightboxImg.src = images[currentImageIndex].src;
    }

  
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            lightbox.style.display = "none";
        }
    });

   
    lightboxImg.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX; 

    lightboxImg.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX; 
    });

    lightboxImg.addEventListener("touchend", () => {
        handleSwipe(); 
    });

    function handleSwipe() {
        const swipeThreshold = 50; 
        const deltaX = touchEndX - touchStartX; 

        if (deltaX > swipeThreshold) {
          
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        } else if (deltaX < -swipeThreshold) {
           
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxImage();
        }
    }
})});