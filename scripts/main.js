// Mobile bottom navigation active state
function updateMobileNavActiveState() {
    const mobileNavLinks = document.querySelectorAll('nav.lg\\:hidden a[href^="#"]');
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('text-accent-green');
        link.classList.add('text-text-gray');
    });
    
    // Get current section and highlight corresponding nav item
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        const activeLink = document.querySelector(`nav.lg\\:hidden a[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.remove('text-text-gray');
            activeLink.classList.add('text-accent-green');
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav item based on scroll position
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.lg\\:block nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update desktop navigation
    desktopNavLinks.forEach(link => {
        link.classList.remove('text-accent-green', 'bg-gray-700');
        link.classList.add('hover:text-accent-green', 'hover:bg-gray-700');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-accent-green', 'bg-gray-700');
            link.classList.remove('hover:text-accent-green', 'hover:bg-gray-700');
        }
    });
    
    // Update mobile navigation
    updateMobileNavActiveState();
}

window.addEventListener('scroll', updateActiveNavItem);
// Call once on load
updateActiveNavItem();

// Add scroll effect to floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    document.querySelectorAll('.animate-pulse').forEach((el, index) => {
        el.style.transform = `translateY(${parallax * (index + 1) * 0.1}px)`;
    });
});

// Scroll-triggered animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Services section animations
            if (entry.target.classList.contains('services-header')) {
                entry.target.classList.add('animate-in');
            }
            
            if (entry.target.classList.contains('service-card')) {
                // Add a small delay to create staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 100);
            }
            
            // Skills section animations
            if (entry.target.classList.contains('skills-header')) {
                entry.target.classList.add('animate-in');
            }
            
            if (entry.target.classList.contains('technical-skills-title')) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 200);
            }
            
            if (entry.target.classList.contains('professional-skills-title')) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 400);
            }
            
            if (entry.target.classList.contains('skill-item')) {
                const skillItems = document.querySelectorAll('.skill-item');
                const index = Array.from(skillItems).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Animate progress bar
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.classList.add('animate-in');
                            const targetWidth = progressBar.getAttribute('data-width');
                            progressBar.style.width = targetWidth;
                        }, 300);
                    }
                }, 600 + (index * 100));
            }
            
            if (entry.target.classList.contains('professional-skill-card')) {
                const cards = document.querySelectorAll('.professional-skill-card');
                const index = Array.from(cards).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 800 + (index * 150));
            }
            
            // Timeline section animations
            if (entry.target.classList.contains('timeline-header')) {
                entry.target.classList.add('animate-in');
            }
            
            if (entry.target.classList.contains('timeline-column-left')) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 200);
            }
            
            if (entry.target.classList.contains('timeline-column-right')) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, 400);
            }
            
            if (entry.target.classList.contains('timeline-item')) {
                // Get index for staggered animation
                const timelineItems = document.querySelectorAll('.timeline-item');
                const index = Array.from(timelineItems).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Animate timeline dot and line
                    const dot = entry.target.querySelector('.timeline-dot');
                    const line = entry.target.querySelector('.timeline-line');
                    
                    if (dot) {
                        setTimeout(() => {
                            dot.classList.add('animate-in');
                        }, 200);
                    }
                    
                    if (line) {
                        setTimeout(() => {
                            line.classList.add('animate-in');
                        }, 400);
                    }
                }, 600 + (index * 150)); // Staggered delay based on item index
            }
        }
    });
}, observerOptions);

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Services section elements
    const servicesHeader = document.querySelector('.services-header');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (servicesHeader) {
        observer.observe(servicesHeader);
    }
    
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Timeline section elements
    const timelineHeader = document.querySelector('.timeline-header');
    const timelineColumnLeft = document.querySelector('.timeline-column-left');
    const timelineColumnRight = document.querySelector('.timeline-column-right');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineHeader) {
        observer.observe(timelineHeader);
    }
    
    if (timelineColumnLeft) {
        observer.observe(timelineColumnLeft);
    }
    
    if (timelineColumnRight) {
        observer.observe(timelineColumnRight);
    }
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Skills section elements
    const skillsHeader = document.querySelector('.skills-header');
    const technicalSkillsTitle = document.querySelector('.technical-skills-title');
    const professionalSkillsTitle = document.querySelector('.professional-skills-title');
    const skillItems = document.querySelectorAll('.skill-item');
    const professionalSkillCards = document.querySelectorAll('.professional-skill-card');
    
    if (skillsHeader) {
        observer.observe(skillsHeader);
    }
    
    if (technicalSkillsTitle) {
        observer.observe(technicalSkillsTitle);
    }
    
    if (professionalSkillsTitle) {
        observer.observe(professionalSkillsTitle);
    }
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
    
    professionalSkillCards.forEach(card => {
        observer.observe(card);
    });
    
    // Enhanced flip card interaction
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        // Add keyboard accessibility
        flipCard.setAttribute('tabindex', '0');
        flipCard.setAttribute('role', 'button');
        flipCard.setAttribute('aria-label', 'Flip card to reveal personal information');
        
        // Handle keyboard interaction
        flipCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCard.classList.toggle('flipped');
                
                // Update aria-label based on state
                const isFlipped = flipCard.classList.contains('flipped');
                flipCard.setAttribute('aria-label', 
                    isFlipped ? 'Flip card back to front' : 'Flip card to reveal personal information'
                );
            }
        });
        
        // Update aria-label on click as well
        flipCard.addEventListener('click', () => {
            setTimeout(() => {
                const isFlipped = flipCard.classList.contains('flipped');
                flipCard.setAttribute('aria-label', 
                    isFlipped ? 'Flip card back to front' : 'Flip card to reveal personal information'
                );
            }, 100);
        });
    }

}); 