/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("active");

        if (mobileNav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuToggle.setAttribute("aria-label", "Close menu");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute("aria-label", "Open menu");
        }

    });


    /* Close mobile menu after clicking a link */

    document.querySelectorAll(".mobile-nav a").forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("active");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute("aria-label", "Open menu");

        });

    });

}



/* =========================
   TYPING ANIMATION
========================= */

const texts = [
    "Aspiring Web Developer",
    "PHP Developer",
    "Web Development Enthusiast"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {

    const typingText = document.getElementById("typing-text");

    if (!typingText) {
        return;
    }

    const currentText = texts[textIndex];

    if (isDeleting) {

        charIndex--;

        typingText.textContent =
            currentText.substring(0, charIndex);

    } else {

        charIndex++;

        typingText.textContent =
            currentText.substring(0, charIndex);

    }


    let speed = isDeleting ? 50 : 100;


    /* Finished typing */

    if (!isDeleting && charIndex === currentText.length) {

        speed = 1500;
        isDeleting = true;

    }


    /* Finished deleting */

    else if (isDeleting && charIndex === 0) {

        isDeleting = false;

        textIndex = (textIndex + 1) % texts.length;

        speed = 500;

    }


    setTimeout(typeText, speed);
}


typeText();

/* =========================
   PROJECT IMAGE POPUP
========================= */

const projectImages =
    document.querySelectorAll(".project-image img");

const imagePopup =
    document.getElementById("imagePopup");

const popupImage =
    document.getElementById("popupImage");

const popupClose =
    document.getElementById("popupClose");


projectImages.forEach(function(image) {

    image.addEventListener("click", function() {

        popupImage.src = this.src;

        popupImage.alt = this.alt;

        imagePopup.classList.add("active");

    });

});


/* Close button */

popupClose.addEventListener("click", function() {

    imagePopup.classList.remove("active");

});


/* Click outside image */

imagePopup.addEventListener("click", function(event) {

    if (event.target === imagePopup) {

        imagePopup.classList.remove("active");

    }

});


/* ESC key */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        imagePopup.classList.remove("active");

    }

});