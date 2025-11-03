// Scroll Progress Bar
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Intersection Observer for Fade-in Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
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
}

// Add Hover Effect to Job Items
function initJobHoverEffects() {
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        job.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Typing Effect for Title (Optional - can be activated)
function typingEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add Copy Email Functionality
function initCopyEmail() {
    const emailLinks = document.querySelectorAll('.contact-link[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary tooltip
                const originalText = this.innerHTML;
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Email copied!
                `;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(() => {
                // Fallback: open email client
                window.location.href = this.getAttribute('href');
            });
        });
    });
}

// Add Parallax Effect to Header
function initParallaxEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Skills Animation on Scroll
function initSkillsAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });
    
    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px) scale(0.95)';
        category.style.transition = 'all 0.5s ease';
        observer.observe(category);
    });
}

// Add Dark/Light Mode Toggle (Optional)
function createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '🌙';
    toggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--bg-secondary);
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        z-index: 1000;
        display: none; /* Hidden by default, can be enabled */
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggle.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
}

// Add Print Button
function createPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.className = 'print-button';
    printBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
        </svg>
        Print Resume
    `;
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 12px 24px;
        border-radius: 8px;
        border: none;
        background: var(--accent-gradient);
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    document.body.appendChild(printBtn);
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Add Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Press 'P' to print
        if (e.key === 'p' && e.ctrlKey) {
            e.preventDefault();
            window.print();
        }
        
        // Press 'T' to scroll to top
        if (e.key === 't' && e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    createScrollProgressBar();
    initIntersectionObserver();
    initSmoothScroll();
    initJobHoverEffects();
    initCopyEmail();
    initSkillsAnimation();
    initKeyboardNavigation();
    
    // Optional features
    initParallaxEffect();
    createPrintButton();
    // createThemeToggle(); // Uncomment to enable theme toggle
    
    // Add subtle animations to list items
    const listItems = document.querySelectorAll('.responsibilities li, .achievements li');
    listItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });
    
    // Console message for developers
    console.log('%c👋 Hi! Thanks for checking out the code!', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
    console.log('%cThis resume was built with HTML, CSS, and vanilla JavaScript.', 'color: #667eea; font-size: 12px;');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any position-dependent elements
        console.log('Window resized, recalculating positions...');
    }, 250);
});

// Performance optimization: Passive event listeners
if (supportsPassive()) {
    window.addEventListener('scroll', () => {}, { passive: true });
}

function supportsPassive() {
    let passive = false;
    try {
        const options = Object.defineProperty({}, 'passive', {
            get: () => { passive = true; }
        });
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive;
}
