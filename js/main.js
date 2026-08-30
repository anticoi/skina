// Main JavaScript functionality for La Skina website

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            fecha: formData.get('fecha'),
            mensaje: formData.get('mensaje')
        };
        
        // Validate form
        if (!data.nombre || !data.email || !data.mensaje) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = encodeURIComponent(
            `Hola La Skina! 🎵\n\n` +
            `Nombre: ${data.nombre}\n` +
            `Email: ${data.email}\n` +
            `Teléfono: ${data.telefono}\n` +
            `Fecha del evento: ${data.fecha || 'No especificada'}\n\n` +
            `Mensaje:\n${data.mensaje}`
        );
        
        // Open WhatsApp with the message
        const whatsappUrl = `https://wa.me/56912345678?text=${whatsappMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message
        alert('¡Gracias por tu mensaje! Te redirigiremos a WhatsApp para completar tu consulta.');
    });
}

// Add scroll-based navbar background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-gray-900');
        nav.classList.remove('bg-gray-900/95');
    } else {
        nav.classList.remove('bg-gray-900');
        nav.classList.add('bg-gray-900/95');
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Make hero section visible immediately
const heroSection = document.getElementById('inicio');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}
