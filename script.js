// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// EmailJS Initialization
(function () {
    // Check if emailjs is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init("_Vp6QrCf_1j3dcJYS");
    } else {
        console.error("EmailJS library not loaded");
    }
})();

// Contact Form Handler
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const serviceID = "service_kq0emjm";
        const templateID = "template_93vx5ed";
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert("✅ Message sent successfully!");
                this.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, (error) => {
                alert("❌ Failed to send message. Error: " + JSON.stringify(error));
                console.error("EmailJS Error:", error);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Typing Effect
const typedTextSpan = document.querySelector(".typing-text");
const textArray = ["Web Developer", "AI/ML Engineer", "Software Developer", "Tech Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!typedTextSpan.classList.contains("typing")) typedTextSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        typedTextSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
