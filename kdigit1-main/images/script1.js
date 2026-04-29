// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('KDigit site initialisé');
    
    // Initialiser AOS (animations au scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Initialiser les particules
    initParticles();
    
    // Initialiser le titre dynamique
    initTyped();
    
    // Initialiser les compteurs
    initCounters();
    
    // Initialiser le formulaire intelligent
    initSmartForm();
    
    // Initialiser les boutons
    initBuyButtons();
    
    // Initialiser la lightbox
    initLightbox();
    
    // Initialiser le back to top
    initBackToTop();
    
    // Initialiser la navigation
    initNavigation();
    
    // Afficher message de succès si nécessaire
    showSuccessMessage();
});

// ============================================
// 1. PARTICULES
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer || typeof particlesJS === 'undefined') return;
    
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#F97316', '#ffffff', '#6B7280'] },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#F97316',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// ============================================
// 2. TITRE DYNAMIQUE
// ============================================
function initTyped() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement || typeof Typed === 'undefined') return;
    
    new Typed('#typed-text', {
        strings: [
            "> Connectez-vous à l'avenir",
            "> Sécurisez vos bâtiments",
            "> Optimisez vos réseaux",
            "> KDigit, votre partenaire tech"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// ============================================
// 3. COMPTEURS
// ============================================
function initCounters() {
    const counters = [
        { element: 'chiffre1', target: 127, binary: 'binaire1' },
        { element: 'chiffre2', target: 89, binary: 'binaire2' },
        { element: 'chiffre3', target: 156, binary: 'binaire3' },
        { element: 'chiffre4', target: 7, binary: 'binaire4' }
    ];
    
    function animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current;
        }, 30);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const binaryEl = document.getElementById(counter.binary);
                    if (binaryEl) {
                        binaryEl.style.opacity = '0';
                    }
                });
                
                setTimeout(() => {
                    counters.forEach(counter => {
                        animateCounter(counter.element, counter.target);
                    });
                }, 500);
                
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const section = document.querySelector('.chiffres-section');
    if (section) observer.observe(section);
}

// ============================================
// 4. FORMULAIRE INTELLIGENT
// ============================================
function initSmartForm() {
    const typeDevis = document.getElementById('typeDevis');
    const typeAchat = document.getElementById('typeAchat');
    const devisFields = document.getElementById('devisFields');
    const achatFields = document.getElementById('achatFields');
    
    if (!typeDevis || !typeAchat || !devisFields || !achatFields) return;
    
    function toggleFields() {
        if (typeDevis.checked) {
            devisFields.style.display = 'block';
            achatFields.style.display = 'none';
            
            document.querySelectorAll('#achatFields input, #achatFields select, #achatFields textarea').forEach(f => {
                f.disabled = true;
                f.required = false;
            });
            
            document.querySelectorAll('#devisFields select, #devisFields input').forEach(f => {
                f.disabled = false;
                if (f.id === 'service') f.required = true;
            });
        } else {
            devisFields.style.display = 'none';
            achatFields.style.display = 'block';
            
            document.querySelectorAll('#devisFields select, #devisFields input').forEach(f => {
                f.disabled = true;
                f.required = false;
            });
            
            document.querySelectorAll('#achatFields input, #achatFields select, #achatFields textarea').forEach(f => {
                f.disabled = false;
                if (f.id === 'categorie' || f.id === 'produit') f.required = true;
            });
        }
    }
    
    typeDevis.addEventListener('change', toggleFields);
    typeAchat.addEventListener('change', toggleFields);
    toggleFields();
    
    // Validation formulaire
    const form = document.getElementById('smartForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            let errorMessage = '';
            
            const nom = document.getElementById('nom');
            const telephone = document.getElementById('telephone');
            const email = document.getElementById('email');
            
            if (!nom.value.trim()) {
                isValid = false;
                errorMessage = 'Veuillez entrer votre nom';
                nom.classList.add('is-invalid');
            } else {
                nom.classList.remove('is-invalid');
            }
            
            if (!telephone.value.trim()) {
                isValid = false;
                errorMessage = errorMessage || 'Veuillez entrer votre numéro WhatsApp';
                telephone.classList.add('is-invalid');
            } else {
                telephone.classList.remove('is-invalid');
            }
            
            if (!email.value.trim() || !email.value.includes('@')) {
                isValid = false;
                errorMessage = errorMessage || 'Veuillez entrer un email valide';
                email.classList.add('is-invalid');
            } else {
                email.classList.remove('is-invalid');
            }
            
            if (typeDevis && typeDevis.checked) {
                const service = document.getElementById('service');
                if (service && !service.value) {
                    isValid = false;
                    errorMessage = errorMessage || 'Veuillez sélectionner un service';
                    service.classList.add('is-invalid');
                } else if (service) {
                    service.classList.remove('is-invalid');
                }
            }
            
            if (typeAchat && typeAchat.checked) {
                const categorie = document.getElementById('categorie');
                const produit = document.getElementById('produit');
                
                if (categorie && !categorie.value) {
                    isValid = false;
                    errorMessage = errorMessage || 'Veuillez sélectionner une catégorie';
                    categorie.classList.add('is-invalid');
                } else if (categorie) {
                    categorie.classList.remove('is-invalid');
                }
                
                if (produit && !produit.value.trim()) {
                    isValid = false;
                    errorMessage = errorMessage || 'Veuillez indiquer le produit souhaité';
                    produit.classList.add('is-invalid');
                } else if (produit) {
                    produit.classList.remove('is-invalid');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
            } else {
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
                submitBtn.disabled = true;
            }
        });
    }
}

// ============================================
// 5. BOUTONS D'ACHAT
// ============================================
function initBuyButtons() {
    const buyButtons = document.querySelectorAll('.btn-equipement, .equipement-link');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const categorie = this.getAttribute('data-categorie') || 
                             this.getAttribute('data-produit') || 
                             this.textContent.trim();
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            setTimeout(() => {
                const typeAchat = document.getElementById('typeAchat');
                if (typeAchat) {
                    typeAchat.checked = true;
                    typeAchat.dispatchEvent(new Event('change'));
                    
                    const categorieSelect = document.getElementById('categorie');
                    if (categorieSelect) {
                        Array.from(categorieSelect.options).forEach(option => {
                            if (categorie.toLowerCase().includes(option.value.toLowerCase()) ||
                                option.text.toLowerCase().includes(categorie.toLowerCase())) {
                                categorieSelect.value = option.value;
                            }
                        });
                    }
                    
                    const produitField = document.getElementById('produit');
                    if (produitField) produitField.focus();
                }
            }, 500);
        });
    });
    
    const devisButtons = document.querySelectorAll('.devis-only');
    devisButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            setTimeout(() => {
                const typeDevis = document.getElementById('typeDevis');
                if (typeDevis) {
                    typeDevis.checked = true;
                    typeDevis.dispatchEvent(new Event('change'));
                }
            }, 500);
        });
    });
}

// ============================================
// 6. LIGHTBOX
// ============================================
function initLightbox() {
    window.lbImages = [
        { src: 'images/baie-hikvision.jpg', alt: 'Baie réseau Hikvision' },
        { src: 'images/technicien-baie.jpg', alt: 'Ingénieur réseau' },
        { src: 'images/installation-alarme-1.jpg', alt: 'Installation alarme' },
        { src: 'images/cables-rj45.jpg', alt: 'Câbles RJ45' },
        { src: 'images/centrale-alarme.jpg', alt: 'Centrale alarme' },
        { src: 'images/switches.jpg', alt: 'Switches' },
        { src: 'images/installation-reseau-1.jpg', alt: 'Installation réseau' },
        { src: 'images/installation-alarme-2.jpg', alt: 'Alarme incendie' },
        { src: 'images/patch-panel.jpg', alt: 'Patch panel' },
        { src: 'images/cablage-baie.jpg', alt: 'Câblage baie' },
        { src: 'images/wifi-exterieur.jpg', alt: 'WiFi extérieur' },
        { src: 'images/controle-acces.jpg', alt: 'Contrôle accès' }
    ];
    
    window.lbIdx = 0;
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
}

function openLightbox(index) {
    window.lbIdx = index;
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    if (lb && img && window.lbImages[index]) {
        img.src = window.lbImages[index].src;
        img.alt = window.lbImages[index].alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) {
        lb.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function lbNav(direction) {
    if (!window.lbImages) return;
    window.lbIdx = (window.lbIdx + direction + window.lbImages.length) % window.lbImages.length;
    const img = document.getElementById('lb-img');
    if (img && window.lbImages[window.lbIdx]) {
        img.src = window.lbImages[window.lbIdx].src;
        img.alt = window.lbImages[window.lbIdx].alt;
    }
}

document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox')?.classList.contains('open')) return;
    if (e.key === 'ArrowRight') lbNav(1);
    if (e.key === 'ArrowLeft') lbNav(-1);
    if (e.key === 'Escape') closeLightbox();
});

// ============================================
// 7. BACK TO TOP
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 8. NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');
    
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (collapse && collapse.classList.contains('show')) {
                toggler.click();
            }
        });
    });
}

// ============================================
// 9. MESSAGE DE SUCCÈS
// ============================================
function showSuccessMessage() {
    if (window.location.hash === '#success') {
        setTimeout(() => {
            alert('Merci ! Votre demande a bien été envoyée. Nous vous répondrons sous 24h.');
        }, 500);
    }
}

// ============================================
// 10. ANIMATIONS GLOW
// ============================================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glow-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});