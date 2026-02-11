// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add animation class to elements
    const animateElements = document.querySelectorAll('.service-card, .feature-box, .about-text, .contact-info');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            const subject = encodeURIComponent('Univora AI Website Contact: ' + (service ? service : 'General Inquiry'));
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nCompany/Institution: ${company}\nService: ${service}\nMessage: ${message}`
            );
            showNotification('Your email is being prepared. Please review and send it in your email app!', 'success');
            setTimeout(function () {
                window.location.href = `mailto:univoraai@gmail.com?subject=${subject}&body=${body}`;
            }, 1000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles if not already added
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: #031221;
                    border: 1px solid #00D2E3;
                    border-radius: 10px;
                    padding: 1rem;
                    max-width: 400px;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0, 210, 227, 0.2);
                }
                
                .notification-success {
                    border-color: #4CAF50;
                    box-shadow: 0 10px 30px rgba(76, 175, 80, 0.2);
                }
                
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1rem;
                }
                
                .notification-message {
                    color: white;
                    font-size: 0.9rem;
                    line-height: 1.4;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: #00D2E3;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                }
                
                .notification-close:hover {
                    background: rgba(0, 210, 227, 0.1);
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        let i = 0;
        const typeSpeed = 50;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }

        // Start typing animation after a delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero background orbs
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.2;
            orb.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            if (!this.classList.contains('no-animation')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth transitions to feature boxes
    document.querySelectorAll('.feature-box').forEach(box => {
        box.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        box.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }

    // Add subtle animation to logo
    const logo = document.querySelector('.logo-placeholder');
    if (logo) {
        logo.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        logo.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // AI visualization animation
    const aiNodes = document.querySelectorAll('.ai-node');
    aiNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.2}s`;
    });

    // Add intersection observer for counters
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const isPercentage = finalNumber.includes('%');
                let currentNumber = 0;
                const increment = isPercentage ? 1 : 1;
                const targetNumber = parseInt(finalNumber);

                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        target.textContent = finalNumber;
                        clearInterval(counter);
                    } else {
                        target.textContent = currentNumber + (isPercentage ? '%' : '+');
                    }
                }, 30);

                statsObserver.unobserve(target);
            }
        });
    });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add random floating animation to gradient orbs
    function randomFloat() {
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach(orb => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            orb.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        });
    }

    // Update floating position every 5 seconds
    setInterval(randomFloat, 5000);

    console.log('🚀 Univora AI website loaded successfully!');
});