document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section, .about-us, .our-team, .hero");
    
    function highlightSection() {
        let scrollPosition = window.scrollY;
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - 10 && scrollPosition < sectionTop + sectionHeight - 10) {
                sections.forEach((sec) => sec.classList.remove("active-section"));
                section.classList.add("active-section");
            }
        });
    }

    window.addEventListener("scroll", highlightSection);
    highlightSection(); // Run on load
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("about");
    const aboutLink = document.getElementById("about-link");

    function highlightNav() {
        const rect = aboutSection.getBoundingClientRect();
        
        // Checks if "About Us" section is at least partially visible
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            aboutLink.classList.add("highlight");
        } else {
            aboutLink.classList.remove("highlight");
        }
    }

    window.addEventListener("scroll", highlightNav);
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("team");
    const aboutLink = document.getElementById("team-link");

    function highlightNav() {
        const rect = aboutSection.getBoundingClientRect();
        
        // Checks if "About Us" section is at least partially visible
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            aboutLink.classList.add("highlight");
        } else {
            aboutLink.classList.remove("highlight");
        }
    }

    window.addEventListener("scroll", highlightNav);
});

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let rating = document.querySelector('input[name="rating"]:checked');
    let feedback = document.getElementById("feedback").value;

    if (!rating) {
        alert("Please select a star rating.");
        return;
    }

    alert(`Thank you for your feedback!\nRating: ${rating.value} Stars\nFeedback: ${feedback}`);

    // Reset form
    document.getElementById("feedbackForm").reset();
});

/* Highlight Navbar Link when Scrolling */
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("feedback");
    const aboutLink = document.getElementById("feedback-link");

    function highlightNav() {
        const rect = aboutSection.getBoundingClientRect();
        
        // Checks if "About Us" section is at least partially visible
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            aboutLink.classList.add("highlight");
        } else {
            aboutLink.classList.remove("highlight");
        }
    }

    window.addEventListener("scroll", highlightNav);
});
