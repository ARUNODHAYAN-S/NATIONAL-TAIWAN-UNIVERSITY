// Select DOM elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');
const contactForm = document.getElementById('contact-form');
const copyright = document.getElementById('copyright');

let lastScrollTop = 0;

// Update copyright year dynamically
copyright.textContent = `© ${new Date().getFullYear()} National Taiwan University. All rights reserved.`;

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  const isActive = navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isActive);
});

// Close mobile menu when clicking a link
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth scroll for anchor links
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Handle contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = contactForm.querySelector('input[type="email"]').value;
  alert(`Contact form submitted with email: ${email}`);
  contactForm.reset();
});

// Scroll behavior
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Shrink navbar
  if (scrollTop > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }

  // Hide/show navbar on scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.classList.add('nav-hide');
  } else {
    navbar.classList.remove('nav-hide');
  }

  lastScrollTop = Math.max(scrollTop, 0);

  // Highlight active section
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });

  // Fade-in sections
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollTop >= sectionTop - window.innerHeight / 1.5) {
      section.classList.add('visible');
    }
  });
});

// Initialize visible sections and accordion on page load
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in sections
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - window.innerHeight / 1.5) {
      section.classList.add('visible');
    }
  });

  // Accordion functionality
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = header.classList.contains('active');

      // Close all other sections
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.setAttribute('aria-expanded', 'false');
        h.nextElementSibling.classList.remove('active');
      });

      // Toggle current section
      if (!isActive) {
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
      }
    });
  });
});
