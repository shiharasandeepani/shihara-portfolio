// =========================
// MOBILE MENU
// =========================

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {

    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function() {

        mobileNav.classList.toggle("active");

        if (mobileNav.classList.contains("active")) {

            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");

        } else {

            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");

        }

    });


    // Close mobile menu after clicking link

    document.querySelectorAll(".mobile-nav a").forEach(function(link) {

        link.addEventListener("click", function() {

            mobileNav.classList.remove("active");

            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");

        });

    });

}



// =========================
// TYPING TEXT
// =========================

const texts = [
    "Web Development Enthusiast",
    "Student Developer",
    "Aspiring Web Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;


function typeText() {

    const typingElement = document.getElementById("typing");

    if (!typingElement) {
        return;
    }

    const currentText = texts[textIndex];


    // Typing

    if (!isDeleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;


        // Finished typing

        if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeText, 1500);

            return;

        }

    }


    // Deleting

    else {

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;


        // Finished deleting

        if (charIndex === 0) {

            isDeleting = false;

            textIndex =
                (textIndex + 1) % texts.length;

        }

    }


    setTimeout(
        typeText,
        isDeleting ? 60 : 100
    );

}


typeText();



// =========================
// IMAGE GALLERY
// =========================

const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImage");

const closeBtn = document.getElementById("popupClose");
const prevBtn = document.getElementById("popupPrev");
const nextBtn = document.getElementById("popupNext");

let images = [];
let index = 0;

let activeCard = null;


// All project images
const projectImages = document.querySelectorAll(".project-image img");


projectImages.forEach(function(img) {

    img.addEventListener("click", function() {

        // Get clicked project card
        activeCard = this.closest(".project-card");

        // Get gallery name
        const gallery = this.getAttribute("data-gallery");

        // Get all images belonging to same project
        images = Array.from(
            document.querySelectorAll(
                '.project-image img[data-gallery="' + gallery + '"]'
            )
        );

        // Current image
        index = images.indexOf(this);

        // Show selected image
        popupImg.src = this.src;
        popupImg.alt = this.alt;

        // Position popup over the clicked card
        positionPopup();

        // Show popup
        popup.classList.add("active");

        // Update arrows
        updateButtons();
    });

});


// =========================
// POSITION POPUP OVER CARD
// =========================

function positionPopup() {

    if (!activeCard) return;

    const card = activeCard.getBoundingClientRect();

    const popupWidth = popup.offsetWidth || 360;
    const popupHeight = popup.offsetHeight || 250;

    // Center of the selected card
    let left = card.left + (card.width / 2);

    let top = card.top + (card.height / 2);


    // Prevent popup from going outside screen horizontally
    const halfWidth = popupWidth / 2;

    if (left - halfWidth < 10) {
        left = halfWidth + 10;
    }

    if (left + halfWidth > window.innerWidth - 10) {
        left = window.innerWidth - halfWidth - 10;
    }


    // Prevent popup from going outside screen vertically
    const halfHeight = popupHeight / 2;

    if (top - halfHeight < 10) {
        top = halfHeight + 10;
    }

    if (top + halfHeight > window.innerHeight - 10) {
        top = window.innerHeight - halfHeight - 10;
    }


    popup.style.left = left + "px";
    popup.style.top = top + "px";

    popup.style.transform = "translate(-50%, -50%)";
}


// =========================
// SHOW IMAGE
// =========================

function showImage() {

    if (images.length === 0) return;

    popupImg.src = images[index].src;
    popupImg.alt = images[index].alt;

    updateButtons();
}


// =========================
// UPDATE ARROWS
// =========================

function updateButtons() {

    if (images.length <= 1) {

        prevBtn.style.display = "none";
        nextBtn.style.display = "none";

    } else {

        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";

    }
}


// =========================
// NEXT
// =========================

nextBtn.addEventListener("click", function(e) {

    e.stopPropagation();

    index++;

    if (index >= images.length) {
        index = 0;
    }

    showImage();

});


// =========================
// PREVIOUS
// =========================

prevBtn.addEventListener("click", function(e) {

    e.stopPropagation();

    index--;

    if (index < 0) {
        index = images.length - 1;
    }

    showImage();

});


// =========================
// CLOSE
// =========================

closeBtn.addEventListener("click", function(e) {

    e.stopPropagation();

    popup.classList.remove("active");

    activeCard = null;

});


// =========================
// CLICK OUTSIDE
// =========================

popup.addEventListener("click", function(e) {

    if (e.target === popup) {

        popup.classList.remove("active");

        activeCard = null;

    }

});


// =========================
// ESC KEY
// =========================

document.addEventListener("keydown", function(e) {

    if (!popup.classList.contains("active")) return;


    if (e.key === "Escape") {

        popup.classList.remove("active");

        activeCard = null;

    }


    if (e.key === "ArrowRight") {
        nextBtn.click();
    }


    if (e.key === "ArrowLeft") {
        prevBtn.click();
    }

});


// =========================
// KEEP POPUP OVER CARD
// WHEN SCREEN CHANGES
// =========================

window.addEventListener("resize", function() {

    if (popup.classList.contains("active")) {
        positionPopup();
    }

});

window.addEventListener("scroll", function() {

    if (popup.classList.contains("active")) {
        positionPopup();
    }

});