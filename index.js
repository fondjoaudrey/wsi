// ============================================
// SCRIPT PRINCIPAL - KDIGIT
// Toutes les interactions et animations
// ============================================

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS (animations au scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialiser les particules
    initParticles();
    
    // Initialiser le titre dynamique (Typed.js)
    initTyped();
    
    // Initialiser les compteurs binaires
    initCounters();
    
    // Initialiser le formulaire intelligent
    initSmartForm();
    
    // Initialiser les boutons d'achat
    initBuyButtons();
});

// ============================================
// 1. PARTICULES ANIMÉES (FOND)
// ============================================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#F97316', '#ffffff', '#6B7280']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
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
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ============================================
// 2. TITRE DYNAMIQUE (TYPED.JS)
// ============================================
function initTyped() {
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#typed-text', {
            strings: [
                '> KDigit.init()',
                '> Solutions_Sécurité.activate()',
                '> Réseaux_Intelligents.deploy()',
                '> Innovation.load()',
                '> KDigit.ready()'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            onComplete: function() {
                document.getElementById('main-title').classList.remove('d-none');
            }
        });
    }
}

// ============================================
// 3. COMPTEURS BINAIRES ANIMÉS
// ============================================
function initCounters() {
    const counters = [
        { element: 'chiffre1', target: 127, binary: '10100101' },
        { element: 'chiffre2', target: 45, binary: '11010010' },
        { element: 'chiffre3', target: 156, binary: '10010110' },
        { element: 'chiffre4', target: 89, binary: '11101001' }
    ];
    
    // Fonction pour animer un compteur
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
    
    // Observer pour lancer l'animation quand la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remplacer le binaire par les chiffres
                counters.forEach(counter => {
                    const binaryEl = document.getElementById(`binaire${counter.element.slice(-1)}`);
                    if (binaryEl) {
                        binaryEl.style.opacity = '0';
                    }
                });
                
                // Lancer les animations
                setTimeout(() => {
                    counters.forEach(counter => {
                        animateCounter(counter.element, counter.target);
                    });
                }, 500);
                
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const chiffresSection = document.querySelector('.chiffres-section');
    if (chiffresSection) {
        observer.observe(chiffresSection);
    }
}

// ============================================
// 4. FORMULAIRE INTELLIGENT (DEVIS/ACHAT)
// ============================================
function initSmartForm() {
    const typeDevis = document.getElementById('typeDevis');
    const typeAchat = document.getElementById('typeAchat');
    const devisFields = document.getElementById('devisFields');
    const achatFields = document.getElementById('achatFields');
    
    if (!typeDevis || !typeAchat || !devisFields || !achatFields) return;
    
    // Fonction pour basculer les champs
    function toggleFields() {
        if (typeDevis.checked) {
            devisFields.style.display = 'block';
            achatFields.style.display = 'none';
            
            // Désactiver les champs achat pour qu'ils ne soient pas soumis
            document.querySelectorAll('#achatFields input, #achatFields select, #achatFields textarea').forEach(field => {
                field.disabled = true;
                field.required = false;
            });
            
            // Activer les champs devis
            document.querySelectorAll('#devisFields select, #devisFields input').forEach(field => {
                field.disabled = false;
                if (field.id === 'service') field.required = true;
            });
        } else {
            devisFields.style.display = 'none';
            achatFields.style.display = 'block';
            
            // Désactiver les champs devis
            document.querySelectorAll('#devisFields select, #devisFields input').forEach(field => {
                field.disabled = true;
                field.required = false;
            });
            
            // Activer les champs achat
            document.querySelectorAll('#achatFields input, #achatFields select, #achatFields textarea').forEach(field => {
                field.disabled = false;
                if (field.id === 'categorie' || field.id === 'produit') field.required = true;
            });
        }
    }
    
    // Écouter les changements
    typeDevis.addEventListener('change', toggleFields);
    typeAchat.addEventListener('change', toggleFields);
    
    // Initialiser l'état
    toggleFields();
}

// ============================================
// 5. BOUTONS D'ACHAT (PRÉ-REMPLISSAGE)
// ============================================
function initBuyButtons() {
    const buyButtons = document.querySelectorAll('.btn-equipement, .equipement-link');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer la catégorie ou le produit
            const categorie = this.getAttribute('data-categorie') || 
                             this.getAttribute('data-produit') || 
                             this.textContent.trim();
            
            // Aller vers le formulaire
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Sélectionner "Achat" dans le formulaire
            setTimeout(() => {
                const typeAchat = document.getElementById('typeAchat');
                if (typeAchat) {
                    typeAchat.checked = true;
                    
                    // Déclencher l'événement change
                    const event = new Event('change');
                    typeAchat.dispatchEvent(event);
                    
                    // Pré-remplir la catégorie si possible
                    const categorieSelect = document.getElementById('categorie');
                    if (categorieSelect) {
                        // Chercher une option qui correspond
                        for (let option of categorieSelect.options) {
                            if (categorie.toLowerCase().includes(option.value.toLowerCase()) ||
                                option.text.toLowerCase().includes(categorie.toLowerCase())) {
                                categorieSelect.value = option.value;
                                break;
                            }
                        }
                    }
                    
                    // Mettre le focus sur le champ produit
                    const produitField = document.getElementById('produit');
                    if (produitField) {
                        produitField.focus();
                    }
                }
            }, 500);
        });
    });
    
    // Boutons "Devis seulement"
    const devisButtons = document.querySelectorAll('.devis-only');
    devisButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Sélectionner "Devis"
            setTimeout(() => {
                const typeDevis = document.getElementById('typeDevis');
                if (typeDevis) {
                    typeDevis.checked = true;
                    const event = new Event('change');
                    typeDevis.dispatchEvent(event);
                }
            }, 500);
        });
    });
}

// ============================================
// 6. GESTION DU HEADER AU SCROLL
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Détection du lien actif
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop) {
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

// ============================================
// 7. MENU MOBILE - FERMETURE APRÈS CLIC
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
});

// ============================================
// 8. VALIDATION DU FORMULAIRE AVANT ENVOI
// ============================================
const contactForm = document.getElementById('smartForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const typeDevis = document.getElementById('typeDevis');
        const typeAchat = document.getElementById('typeAchat');
        
        let isValid = true;
        let errorMessage = '';
        
        // Vérifier les champs communs
        const nom = document.getElementById('nom');
        const telephone = document.getElementById('telephone');
        const email = document.getElementById('email');
        
        if (!nom.value.trim()) {
            isValid = false;
            errorMessage = 'Veuillez entrer votre nom';
            nom.classList.add('is-invalid');
        }
        
        if (!telephone.value.trim()) {
            isValid = false;
            errorMessage = errorMessage || 'Veuillez entrer votre numéro WhatsApp';
            telephone.classList.add('is-invalid');
        }
        
        if (!email.value.trim() || !email.value.includes('@')) {
            isValid = false;
            errorMessage = errorMessage || 'Veuillez entrer un email valide';
            email.classList.add('is-invalid');
        }
        
        // Vérifier selon le type
        if (typeDevis && typeDevis.checked) {
            const service = document.getElementById('service');
            if (!service.value) {
                isValid = false;
                errorMessage = errorMessage || 'Veuillez sélectionner un service';
                service.classList.add('is-invalid');
            }
        }
        
        if (typeAchat && typeAchat.checked) {
            const categorie = document.getElementById('categorie');
            const produit = document.getElementById('produit');
            
            if (!categorie.value) {
                isValid = false;
                errorMessage = errorMessage || 'Veuillez sélectionner une catégorie';
                categorie.classList.add('is-invalid');
            }
            
            if (!produit.value.trim()) {
                isValid = false;
                errorMessage = errorMessage || 'Veuillez indiquer le produit souhaité';
                produit.classList.add('is-invalid');
            }
        }
        
        if (!isValid) {
            e.preventDefault();
            alert(errorMessage);
        } else {
            // Afficher un message de chargement
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
            submitBtn.disabled = true;
        }
    });
}

// ============================================
// 9. EFFET GLOW SUIVANT LA SOURIS (OPTIONNEL)
// ============================================
document.addEventListener('mousemove', function(e) {
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

// ============================================
// 10. MESSAGE CONSOLE POUR LE RAPPORT
// ============================================
console.log('=================================');
console.log('Site KDigit - Version 1.0');
console.log('Développé par [Ton Nom]');
console.log('Stage à Wide Solution Integrator Ltd');
console.log('IUT de Douala - Génie Informatique');
console.log('=================================');
console.log('Technologies utilisées :');
console.log('- HTML5, CSS3, JavaScript');
console.log('- Bootstrap 5');
console.log('- Font Awesome 6');
console.log('- Particles.js, Typed.js, AOS');
console.log('- Netlify Forms');
console.log('=================================');