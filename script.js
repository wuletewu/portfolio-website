// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior

            const targetId = e.target.getAttribute('href').substring(1); // Get the section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Scroll to the target section smoothly
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });

                // Close the mobile nav if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }
            }
        });
    });

    // 2. Dark/Light Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-switch');

    // Check for user's preferred theme in localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            darkModeToggle.checked = true;
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference, check system preference
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // 3. Hamburger Menu Toggle for Mobile
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Disable/enable body scrolling when mobile nav is open/closed
        if (nav.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Add animation delay to nav links when mobile nav opens
    nav.querySelectorAll('li').forEach((item, index) => {
        if (nav.classList.contains('nav-active')) {
            item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        } else {
            item.style.animation = ''; // Remove animation when closing
        }
    });


    // 4. Dynamic Current Year in Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 5. Basic Form Submission (Client-side validation example - optional)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            // Basic client-side validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.'); // Using alert for simplicity, replace with custom modal
                e.preventDefault(); // Prevent form submission
                return;
            }

            // You can add more complex email validation here if needed
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.'); // Using alert for simplicity, replace with custom modal
                e.preventDefault(); // Prevent form submission
                return;
            }

            // If using Formspree, the form's action attribute handles the submission.
            // You can add a success/error message display here after submission.
            // For Formspree, you'd typically handle the response after the form is submitted.
            // Example of showing a success message (this would require preventing default and using fetch):
            /*
            e.preventDefault(); // Prevent default form submission
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    alert('Message sent successfully!'); // Replace with custom modal
                    contactForm.reset();
                } else {
                    alert('Oops! There was a problem sending your message.'); // Replace with custom modal
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('An error occurred. Please try again later.'); // Replace with custom modal
            }
            */
        });
    }
});

