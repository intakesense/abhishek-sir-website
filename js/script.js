// ===================================
// Premium Portfolio JavaScript
// Author: Abhishek Chauhan Portfolio
// Version: 2.2 - Dual Current Roles - Nov 30, 2024
// ===================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
    
    // Single Page Application - Show only Home on load
    document.querySelectorAll('section[id]').forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
        }
    });
    
    // Set Home as active by default on page load
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// ===================================
// NAVIGATION
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll - DISABLED to prevent auto-switching tabs
// Navigation will only change when user clicks on menu items
// window.addEventListener('scroll', function() {
//     let current = '';
//     const sections = document.querySelectorAll('section[id]');
//     
//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;
//         
//         if (window.scrollY >= (sectionTop - 200)) {
//             current = section.getAttribute('id');
//         }
//     });
//     
//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href').substring(1) === current) {
//             link.classList.add('active');
//         }
//     });
// });

// Single Page Application (SPA) behavior
// Only ONE section is visible at a time
// Clicking navigation shows/hides sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get target section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Hide ALL sections
            document.querySelectorAll('section[id]').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show ONLY the clicked section
            targetSection.style.display = 'block';
            
            // Scroll to top of page (so we see the section from start)
            window.scrollTo(0, 0);
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// On page load, show only Home section
window.addEventListener('load', function() {
    // Hide all sections except home
    document.querySelectorAll('section[id]').forEach(section => {
        if (section.id !== 'home') {
            section.style.display = 'none';
        }
    });
    
    // Set Home as active
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all achievement numbers
document.querySelectorAll('.achievement-number').forEach(number => {
    counterObserver.observe(number);
});

// ===================================
// CHARTS & INFOGRAPHICS
// ===================================

// Chart.js default configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.color = '#4a5568';

// Impact Metrics Chart (Doughnut)
const impactCtx = document.getElementById('impactChart');
if (impactCtx) {
    new Chart(impactCtx, {
        type: 'doughnut',
        data: {
            labels: ['Structured Finance', 'AUM Managed', 'AUM Growth', 'Bank Partnerships'],
            datasets: [{
                data: [80, 25, 157, 60],
                backgroundColor: [
                    '#0A1628',
                    '#1E3A5F',
                    '#C5A572',
                    '#E8D5B5'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12,
                            weight: 500
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 22, 40, 0.95)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            let suffix = '';
                            
                            if (label === 'Structured Finance' || label === 'AUM Managed') {
                                suffix = ' Million USD';
                            } else if (label === 'AUM Growth') {
                                suffix = '% Growth';
                            } else if (label === 'Bank Partnerships') {
                                suffix = '+ Banks';
                            }
                            
                            return label + ': ' + value + suffix;
                        }
                    }
                }
            }
        }
    });
}

// Transaction Highlights Chart (Bar)
const transactionsCtx = document.getElementById('transactionsChart');
if (transactionsCtx) {
    new Chart(transactionsCtx, {
        type: 'bar',
        data: {
            labels: [
                'Stressed Asset Revival',
                'Real Estate Refinancing',
                'Metro Manufacturing',
                'Infrastructure Financing',
                'Manufacturing Finance',
                'Fintech Monthly Disbursal'
            ],
            datasets: [{
                label: 'Transaction Value (Million USD)',
                data: [40, 18, 25, 14, 10, 16.5], // Rs 250 Cr ≈ USD 16.5M (approx conversion)
                backgroundColor: [
                    'rgba(10, 22, 40, 0.8)',
                    'rgba(30, 58, 95, 0.8)',
                    'rgba(197, 165, 114, 0.8)',
                    'rgba(232, 213, 181, 0.8)',
                    'rgba(10, 22, 40, 0.6)',
                    'rgba(197, 165, 114, 0.6)'
                ],
                borderColor: [
                    '#0A1628',
                    '#1E3A5F',
                    '#C5A572',
                    '#E8D5B5',
                    '#0A1628',
                    '#C5A572'
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 22, 40, 0.95)',
                    padding: 15,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            let label = 'Value: USD ' + context.parsed.y + ' Million';
                            
                            // Special note for fintech
                            if (context.label === 'Fintech Monthly Disbursal') {
                                label = 'Monthly Disbursal: Rs 250+ Crore (≈USD 16.5M)';
                            }
                            
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: 500
                        },
                        color: '#4a5568',
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(226, 232, 240, 0.5)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: 500
                        },
                        color: '#4a5568',
                        callback: function(value) {
                            return 'USD ' + value + 'M';
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ===================================
// EXPERIENCE TIMELINE ANIMATION
// ===================================

// Animate timeline items on scroll
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ===================================
// CONTACT FORM
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Construct mailto link
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone || 'Not provided'}\n\n` +
            `Message:\n${formData.message}`
        );
        
        const mailtoLink = `mailto:abhishekchauhaninc@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client will open to send the message.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//     const originalText = heroSubtitle.textContent;
//     typeWriter(heroSubtitle, originalText, 80);
// }

// ===================================
// LOADER (Optional)
// ===================================

window.addEventListener('load', function() {
    // Page is fully loaded
    document.body.classList.add('loaded');
    
    // Trigger animations
    AOS.refresh();
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Add styles for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #C5A572 0%, #E8D5B5 100%);
        border: none;
        border-radius: 50%;
        color: #0A1628;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
    }
    
    .scroll-to-top:active {
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events for better performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers if needed
const debouncedScroll = debounce(function() {
    // Any scroll-dependent functions can be called here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%cAbhishek Chauhan Portfolio', 'color: #C5A572; font-size: 24px; font-weight: bold;');
console.log('%cStrategic Leadership | Investment Banking | Corporate Strategy', 'color: #0A1628; font-size: 14px;');
console.log('%cWebsite: www.abhishekchauhan.co.in', 'color: #1E3A5F; font-size: 12px;');
console.log('%cEmail: abhishekchauhaninc@gmail.com', 'color: #718096; font-size: 12px;');

// ===================================
// END OF SCRIPT
// ===================================