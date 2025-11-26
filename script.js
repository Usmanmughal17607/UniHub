// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const body = document.body;

// Application Form Variables (Global)
let currentStep = 1;
const totalSteps = 3;

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'mobile-menu-overlay';
document.body.appendChild(overlay);

// Toggle mobile menu
function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = isActive ? 'hidden' : '';
    
    // Animate menu items
    if (isActive) {
        navLinksItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'all 0.3s ease ' + (index * 0.05) + 's';
            
            // Trigger reflow
            void item.offsetWidth;
            
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        });
    }
}

// Close menu function
function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
    
    // Reset animations
    navLinksItems.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
        item.style.transition = '';
    });
}

// Event Listeners
if (hamburger && navLinks && overlay) {
    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
}
if (navLinksItems) {
    navLinksItems.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Close menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        closeMenu();
    }
});

// Manual Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = slides.length;

// Set initial slide position
function setSlidePosition() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });
}

// Go to specific slide
function goToSlide(slideIndex) {
    // Update current slide
    currentSlide = slideIndex;
    
    // Move slider
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    updateDots();
    
    // Add animation to slide content
    const currentContent = slides[currentSlide].querySelector('.slide-content');
    currentContent.classList.add('slide-up');
    
    // Remove animation class after completion
    setTimeout(() => {
        currentContent.classList.remove('slide-up');
    }, 1000);
}

// Update dot indicators
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

// Event Listeners
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (dots) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
}

// Initialize slider
setSlidePosition();
updateDots();

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header on Scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add shadow to header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.link-box, .news-card, .section-title');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in');
        }
    });
};

// Run animation on scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.slide-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Add animation to quick links
    const linkBoxes = document.querySelectorAll('.link-box');
    linkBoxes.forEach((box, index) => {
        box.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Trigger animations for elements in viewport
    animateOnScroll();
});

// Form submission handling
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your server
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Add animation to news cards on hover
const newsCards = document.querySelectorAll('.news-card');
newsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Application Form Functions
function nextStep() {
    console.log('nextStep called, currentStep:', currentStep);
    
    // Check if we're on the apply page
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (!currentStepElement) {
        console.log('Not on apply page or step element not found');
        return;
    }
    
    // Temporarily bypass validation for testing
    if (currentStep < totalSteps) {
        const nextStepElement = document.getElementById(`step${currentStep + 1}`);
        if (nextStepElement) {
            currentStepElement.classList.remove('active');
            currentStep++;
            nextStepElement.classList.add('active');
            updateStepIndicators();
            console.log('Moved to step:', currentStep);
        } else {
            console.log('Next step element not found');
        }
    }
}

function prevStep() {
    console.log('prevStep called, currentStep:', currentStep);
    
    // Check if we're on the apply page
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (!currentStepElement) {
        console.log('Not on apply page or step element not found');
        return;
    }
    
    if (currentStep > 1) {
        const prevStepElement = document.getElementById(`step${currentStep - 1}`);
        if (prevStepElement) {
            currentStepElement.classList.remove('active');
            currentStep--;
            prevStepElement.classList.add('active');
            updateStepIndicators();
            console.log('Moved to step:', currentStep);
        } else {
            console.log('Previous step element not found');
        }
    }
}

function updateStepIndicators() {
    for (let i = 1; i <= totalSteps; i++) {
        const number = document.getElementById(`step${i}-number`);
        if (number) {
            const label = number.nextElementSibling;
            
            if (i < currentStep) {
                number.className = 'step-number completed';
                label.className = 'step-label';
            } else if (i === currentStep) {
                number.className = 'step-number active';
                label.className = 'step-label active';
            } else {
                number.className = 'step-number';
                label.className = 'step-label';
            }
        }
    }
}

function validateCurrentStep() {
    console.log('Validating step:', currentStep);
    const currentStepElement = document.getElementById(`step${currentStep}`);
    if (!currentStepElement) {
        console.log('Step element not found');
        return true;
    }
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    console.log('Required fields found:', requiredFields.length);
    
    for (let field of requiredFields) {
        console.log('Checking field:', field.name, 'Value:', field.value);
        if (!field.value.trim()) {
            console.log('Field is empty:', field.name);
            alert('Please fill in all required fields.');
            field.focus();
            return false;
        }
    }
    
    console.log('Validation passed');
    return true;
}

function submitApplication() {
    if (validateCurrentStep()) {
        // Show loading state
        const submitBtn = document.querySelector('#step3 .btn:last-child');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate submission delay
            setTimeout(() => {
                // Show success message
                document.getElementById(`step${currentStep}`).classList.remove('active');
                document.getElementById('success').classList.add('active');
                
                // Log application data to console (for testing)
                const formData = new FormData(document.getElementById('applicationForm'));
                console.log('Application submitted with data:', Object.fromEntries(formData));
            }, 1500);
        }
    }
}

// File upload handling for application form
document.addEventListener('DOMContentLoaded', function() {
    const documentsInput = document.getElementById('documents');
    if (documentsInput) {
        documentsInput.addEventListener('change', function(e) {
            const files = e.target.files;
            const uploadArea = this.parentElement;
            
            if (files.length > 0) {
                uploadArea.innerHTML = `
                    <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                    <p>${files.length} file(s) selected</p>
                    <p style="font-size: 0.9rem; color: var(--text-light);">Click to change files</p>
                `;
            }
        });
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Add animation to section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    title.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Professional Floating FAQ Chatbot with Animations
(function() {
    // Remove any existing bot (for hot reload)
    if (document.getElementById('faq-chat-btn')) document.getElementById('faq-chat-btn').remove();
    if (document.getElementById('faq-chat-window')) document.getElementById('faq-chat-window').remove();
    
    // Questions and answers
    const faqData = [
        { q: 'What are the requirements for admission?', a: 'Admission requirements include: completed application form, official academic transcripts, standardized test scores (if applicable), letters of recommendation, personal statement, and proof of English proficiency (for international students).' },
        { q: 'What programs do you offer?', a: 'We offer programs in Computer Science, Business Administration, Engineering, Arts, and Science. See the Academics page for details.' },
        { q: 'How can I contact the university?', a: 'You can contact us by phone at +92 51 111 000 248 or by email at info@gcu.edu.pk. Visit the Contact page for more options.' },
        { q: 'What is the application fee?', a: 'The application fee is Rs. 2,000 plus a processing fee of Rs. 500.' },
        { q: 'Where is the campus located?', a: 'Our campus is located at Fazla E Haq Garden Begum Kot Lahore.' }
    ];

    // Create chat button
    const chatBtn = document.createElement('div');
    chatBtn.id = 'faq-chat-btn';
    chatBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
    document.body.appendChild(chatBtn);

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'faq-chat-window';
    chatWindow.innerHTML = `
        <div class="faq-chat-header">Ask GCU Bot <span id="faq-chat-close">&times;</span></div>
        <div class="faq-chat-body" id="faq-chat-body"></div>
    `;
    document.body.appendChild(chatWindow);

    // Helper: Animate message appearance
    function appendMessage(html, fromBot = false, delay = 0) {
        const body = document.getElementById('faq-chat-body');
        const msg = document.createElement('div');
        msg.className = 'faq-chat-msg' + (fromBot ? ' bot' : ' user');
        msg.innerHTML = html;
        setTimeout(() => {
            body.appendChild(msg);
            setTimeout(() => msg.classList.add('show'), 10);
            body.scrollTop = body.scrollHeight;
        }, delay);
    }

    // Show question list as chat bubbles
    function showQuestions() {
        const body = document.getElementById('faq-chat-body');
        body.innerHTML = '';
        appendMessage('Hi! How can I help you? Please select a question below.', true);
        setTimeout(() => {
            const qWrap = document.createElement('div');
            qWrap.className = 'faq-chat-questions';
            faqData.forEach((item, i) => {
                const btn = document.createElement('button');
                btn.className = 'faq-chat-q';
                btn.textContent = item.q;
                btn.onclick = function() { showAnswer(i); };
                qWrap.appendChild(btn);
            });
            body.appendChild(qWrap);
            body.scrollTop = body.scrollHeight;
        }, 400);
    }

    // Show answer with typing animation
    function showAnswer(i) {
        const body = document.getElementById('faq-chat-body');
        body.innerHTML = '';
        appendMessage(faqData[i].q, false);
        // Typing indicator
        const typing = document.createElement('div');
        typing.className = 'faq-chat-typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        body.appendChild(typing);
        body.scrollTop = body.scrollHeight;
        setTimeout(() => {
            typing.remove();
            appendMessage(faqData[i].a, true);
            // Back button (arrow style)
            const backBtn = document.createElement('button');
            backBtn.className = 'faq-chat-back';
            backBtn.innerHTML = '<span class="faq-back-arrow">&#8592;</span> <span class="faq-back-text">Back</span>';
            backBtn.onclick = showQuestions;
            body.appendChild(backBtn);
            body.scrollTop = body.scrollHeight;
        }, 900);
    }

    // Open/close chat
    chatBtn.onclick = function() {
        chatWindow.classList.add('open');
        setTimeout(() => chatWindow.classList.add('visible'), 10);
        showQuestions();
    };
    document.getElementById('faq-chat-close').onclick = function() {
        chatWindow.classList.remove('visible');
        setTimeout(() => chatWindow.classList.remove('open'), 300);
    };

    // Styles
    const style = document.createElement('style');
    style.innerHTML = `
    #faq-chat-btn {
        position: fixed; bottom: 32px; right: 32px;
        background: linear-gradient(135deg, #2563eb 60%, #8b5cf6 100%);
        color: #fff;
        width: 64px; height: 64px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 2.2rem; box-shadow: 0 8px 32px rgba(37,99,235,0.18);
        cursor: pointer; z-index: 9999; border: 3px solid #fff;
        transition: box-shadow 0.2s, background 0.2s, transform 0.2s;
        animation: faq-float-in 0.7s cubic-bezier(.68,-0.55,.27,1.55);
    }
    #faq-chat-btn:hover { box-shadow: 0 12px 36px rgba(37,99,235,0.28); background: linear-gradient(135deg, #8b5cf6 60%, #2563eb 100%); transform: scale(1.08); }
    #faq-chat-window {
        position: fixed; bottom: 110px; right: 32px; width: 370px; max-width: 97vw;
        background: #fff; border-radius: 18px; box-shadow: 0 16px 48px rgba(0,0,0,0.18);
        overflow: hidden; display: flex; flex-direction: column; z-index: 10000;
        border: 1.5px solid #2563eb; opacity: 0; pointer-events: none; transform: translateY(40px) scale(0.98);
        transition: opacity 0.3s, transform 0.3s;
    }
    #faq-chat-window.open { display: flex; }
    #faq-chat-window.visible { opacity: 1; pointer-events: auto; transform: translateY(0) scale(1); }
    .faq-chat-header {
        background: linear-gradient(135deg, #2563eb 60%, #8b5cf6 100%); color: #fff; padding: 1rem; font-weight: 700; font-size: 1.1rem;
        display: flex; justify-content: space-between; align-items: center;
        letter-spacing: 0.5px;
    }
    #faq-chat-close { cursor: pointer; font-size: 1.3rem; font-weight: 700; transition: color 0.2s; }
    #faq-chat-close:hover { color: #f87171; }
    .faq-chat-body { padding: 1.2rem; background: #f8fafc; min-height: 120px; font-size: 1rem; overflow-y: auto; max-height: 340px; }
    .faq-chat-questions { display: flex; flex-direction: column; gap: 0.7rem; margin-top: 1.1rem; }
    .faq-chat-q {
        background: #2563eb; color: #fff; border: none; border-radius: 18px 18px 18px 4px;
        padding: 0.7rem 1rem; font-size: 1rem; cursor: pointer; transition: background 0.2s, transform 0.2s; text-align: left;
        box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        margin-left: 0.5rem; align-self: flex-start;
    }
    .faq-chat-q:hover { background: #8b5cf6; transform: translateY(-2px) scale(1.03); }
    .faq-chat-msg {
        opacity: 0; transform: translateY(20px) scale(0.98); transition: opacity 0.35s, transform 0.35s; margin-bottom: 0.7rem;
        max-width: 85%; word-break: break-word; padding: 0.7rem 1.1rem; border-radius: 18px 18px 18px 4px; font-size: 1rem;
        box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        background: #2563eb; color: #fff; align-self: flex-start;
        margin-left: 0.5rem;
    }
    .faq-chat-msg.bot { background: #2563eb; color: #fff; border-radius: 18px 18px 18px 4px; }
    .faq-chat-msg.user { background: #f3f4f6; color: #222; border-radius: 18px 18px 4px 18px; align-self: flex-end; margin-left: auto; margin-right: 0.5rem; }
    .faq-chat-msg.show { opacity: 1; transform: translateY(0) scale(1); }
    .faq-chat-answer { margin-bottom: 1.2rem; color: #222; }
    .faq-chat-back {
        background: #2563eb; color: #fff; border: none; border-radius: 8px;
        padding: 0.5rem 1.2rem; font-size: 1rem; cursor: pointer; transition: background 0.2s;
        margin-top: 0.5rem; display: inline-flex; align-items: center; gap: 0.5rem;
    }
    .faq-chat-back:hover { background: #8b5cf6; }
    .faq-back-arrow {
        font-size: 1.2em; display: inline-block; vertical-align: middle;
        margin-right: 0.1em;
    }
    .faq-back-text {
        display: none;
    }
    .faq-chat-typing {
        display: flex; align-items: center; gap: 0.2rem; margin: 0.7rem 0 0.7rem 0.5rem;
        height: 18px;
    }
    .faq-chat-typing span {
        display: inline-block; width: 7px; height: 7px; background: #2563eb; border-radius: 50%; opacity: 0.6;
        animation: faq-typing 1.2s infinite;
    }
    .faq-chat-typing span:nth-child(2) { animation-delay: 0.2s; }
    .faq-chat-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes faq-typing {
        0%, 80%, 100% { opacity: 0.6; transform: translateY(0); }
        40% { opacity: 1; transform: translateY(-6px); }
    }
    @keyframes faq-float-in {
        0% { opacity: 0; transform: scale(0.7) translateY(60px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @media (max-width: 600px) {
        #faq-chat-window { right: 10px; width: 98vw; bottom: 80px; }
        #faq-chat-btn { right: 10px; bottom: 10px; }
        .faq-back-text { display: none; }
    }
    `;
    document.head.appendChild(style);
})();
