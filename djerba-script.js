// Variables globales
let currentSlide = 0;
let slideInterval;
let reservations = [];
let isMenuOpen = false;

// Configuration du slider
const SLIDE_DURATION = 5000; // 5 secondes par slide

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSlider();
    initializeReservationForm();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeFormValidation();
    setMinDateToday();
    initializeGallery();
    initializeNewsletterForm();
    
    // Fonctionnalités avancées Djerba
    setTimeout(() => {
        personalizeExperience();
        checkLoyaltyProgram();
        detectUserLocation();
        optimizeForMobile();
        initializeChatBot();
        initializeReviewSystem();
    }, 2000);
});

// === NAVIGATION ===
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });
    }
    
    // Effet de scroll sur la navbar
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    
    // Animation du hamburger
    const spans = hamburger.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(-45deg) translate(-8px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-8px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 30px rgba(212, 117, 28, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// === SLIDER HERO ===
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;
    
    // Navigation manuelle
    if (prevBtn) prevBtn.addEventListener('click', () => changeSlide('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => changeSlide('next'));
    
    // Indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play
    startSlideshow();
    
    // Pause sur hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideshow);
        sliderContainer.addEventListener('mouseleave', startSlideshow);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Supprimer la classe active
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calculer le nouveau slide
    if (direction === 'next') {
        currentSlide = (currentSlide + 1) % slides.length;
    } else {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    
    // Activer le nouveau slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function startSlideshow() {
    stopSlideshow();
    slideInterval = setInterval(() => {
        changeSlide('next');
    }, SLIDE_DURATION);
}

function stopSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// === SMOOTH SCROLLING ===
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Hauteur de la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === ANIMATIONS AU SCROLL ===
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animation spéciale pour les cartes de soins
                if (entry.target.classList.contains('soin-card')) {
                    animateCard(entry.target);
                }
                
                // Animation pour les features de Djerba
                if (entry.target.classList.contains('feature-item')) {
                    animateFeature(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = [
        '.soin-card',
        '.feature-item',
        '.galerie-item',
        '.contact-item',
        '.transport-item',
        '.djerba-text',
        '.reservation-info'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });
}

function animateCard(card) {
    const delay = Array.from(card.parentElement.children).indexOf(card) * 200;
    setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
    }, delay);
}

function animateFeature(feature) {
    const delay = Array.from(feature.parentElement.children).indexOf(feature) * 150;
    setTimeout(() => {
        feature.style.transform = 'translateX(0)';
        feature.style.opacity = '1';
    }, delay);
}

// === SYSTÈME DE RÉSERVATION ===
function initializeReservationForm() {
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', handleReservationSubmit);
    }
    
    // Mise à jour dynamique des créneaux
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', updateAvailableSlots);
    }
}

function setMinDateToday() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

function handleReservationSubmit(e) {
    e.preventDefault();
    
    // Ajouter classe loading au bouton
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    const formData = new FormData(e.target);
    const reservation = {
        id: generateReservationId(),
        nom: formData.get('nom'),
        telephone: formData.get('telephone'),
        email: formData.get('email'),
        soin: formData.get('soin'),
        personnes: formData.get('personnes'),
        date: formData.get('date'),
        heure: formData.get('heure'),
        message: formData.get('message') || '',
        dateCreation: new Date().toISOString(),
        statut: 'en_attente'
    };
    
    // Simulation d'un délai de traitement
    setTimeout(() => {
        // Validation
        if (!validateReservation(reservation)) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }
        
        // Vérifier la disponibilité
        if (!checkAvailability(reservation.date, reservation.heure)) {
            showNotification('Créneau non disponible', 'Cette date et heure sont déjà réservées. Veuillez choisir un autre créneau.', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }
        
        // Sauvegarder la réservation
        saveReservation(reservation);
        
        // Afficher le modal de confirmation
        showSuccessModal(reservation);
        
        // Réinitialiser le formulaire
        e.target.reset();
        setMinDateToday();
        
        // Envoyer email de confirmation
        sendConfirmationEmail(reservation);
        
        // Retirer classe loading
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Analytics (simulation)
        trackReservation(reservation);
        
    }, 1500); // Simulation de 1.5 secondes de traitement
}

function validateReservation(reservation) {
    // Validation du nom
    if (reservation.nom.length < 2) {
        showNotification('Erreur de validation', 'Le nom doit contenir au moins 2 caractères.', 'error');
        return false;
    }
    
    // Validation du téléphone
    if (!isValidPhoneNumber(reservation.telephone)) {
        showNotification('Erreur de validation', 'Veuillez saisir un numéro de téléphone valide (ex: +216 12 345 678, 12 345 678)', 'error');
        return false;
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reservation.email)) {
        showNotification('Erreur de validation', 'Veuillez saisir une adresse email valide.', 'error');
        return false;
    }
    
    // Validation de la date
    const selectedDate = new Date(reservation.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Erreur de validation', 'La date de réservation ne peut pas être dans le passé.', 'error');
        return false;
    }
    
    // Validation du dimanche (horaires réduits)
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0) { // Dimanche
        const restrictedHours = ['09:00', '18:30', '20:00'];
        if (restrictedHours.includes(reservation.heure)) {
            showNotification('Horaire non disponible', 'Ce créneau n\'est pas disponible le dimanche. Veuillez choisir entre 10:30 et 17:00.', 'warning');
            return false;
        }
    }
    
    return true;
}

// Validation du téléphone pour la Tunisie
function isValidPhoneNumber(phone) {
    if (!phone || phone.trim().length === 0) {
        return false;
    }
    
    const cleanPhone = phone.replace(/[\s.\-()]/g, '');
    
    if (!/^(\+)?[0-9]+$/.test(cleanPhone)) {
        return false;
    }
    
    // Formats tunisiens
    if (cleanPhone.startsWith('+216')) {
        return cleanPhone.length === 12 && /^[2-9]/.test(cleanPhone.substring(4));
    } else if (cleanPhone.startsWith('216')) {
        return cleanPhone.length === 11 && /^[2-9]/.test(cleanPhone.substring(3));
    } else if (cleanPhone.startsWith('+33')) {
        return cleanPhone.length === 12 && /^[1-9]/.test(cleanPhone.substring(3));
    } else if (cleanPhone.startsWith('0')) {
        return cleanPhone.length === 10 && /^0[1-9]/.test(cleanPhone);
    } else if (cleanPhone.startsWith('+')) {
        return cleanPhone.length >= 8 && cleanPhone.length <= 16;
    } else {
        // Numéro local tunisien
        return cleanPhone.length === 8 && /^[2-9]/.test(cleanPhone);
    }
}

function checkAvailability(date, heure) {
    const existingReservation = reservations.find(r => 
        r.date === date && r.heure === heure && r.statut !== 'annule'
    );
    return !existingReservation;
}

function saveReservation(reservation) {
    reservations.push(reservation);
    console.log('Réservation sauvegardée:', reservation);
}

function generateReservationId() {
    return 'DJB-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function sendConfirmationEmail(reservation) {
    console.log(`Email de confirmation envoyé à ${reservation.email}`);
    console.log('Détails de la réservation:', reservation);
    
    // Simulation d'envoi d'email avec détails spécifiques à Djerba
    const soinDetails = getSoinDetails(reservation.soin);
    console.log('Détails du soin:', soinDetails);
}

function getSoinDetails(soinId) {
    const soins = {
        'hammam': {
            nom: 'Hammam Royal Djerbien',
            prix: 180,
            duree: 90,
            description: 'Expérience authentique dans notre hammam traditionnel'
        },
        'massage-olive': {
            nom: 'Massage aux Huiles d\'Olive de Djerba',
            prix: 120,
            duree: 60,
            description: 'Massage relaxant aux huiles d\'olive locales'
        },
        'soin-visage': {
            nom: 'Soin Visage à l\'Argile Saharienne',
            prix: 100,
            duree: 75,
            description: 'Purification avec argile rouge du Sahara tunisien'
        },
        'bain-vapeur': {
            nom: 'Bain de Vapeur aux Plantes Méditerranéennes',
            prix: 80,
            duree: 45,
            description: 'Détoxification aux herbes de Djerba'
        },
        'rituel-berbere': {
            nom: 'Rituel Berbère Complet',
            prix: 220,
            duree: 120,
            description: 'Voyage sensoriel aux traditions berbères'
        },
        'shiatsu': {
            nom: 'Massage Shiatsu Vue Méditerranée',
            prix: 150,
            duree: 90,
            description: 'Harmonie corps-esprit face à la mer'
        }
    };
    
    return soins[soinId] || null;
}

function trackReservation(reservation) {
    // Analytics pour le suivi des réservations
    console.log('Tracking - Nouvelle réservation:', {
        soin: reservation.soin,
        personnes: reservation.personnes,
        date: reservation.date,
        source: 'website'
    });
}

// === GESTION DES CRÉNEAUX HORAIRES ===
function updateAvailableSlots() {
    const dateInput = document.getElementById('date');
    const heureSelect = document.getElementById('heure');
    
    if (!dateInput || !heureSelect || !dateInput.value) return;
    
    const selectedDate = new Date(dateInput.value);
    const dayOfWeek = selectedDate.getDay();
    
    // Horaires selon le jour
    let availableSlots;
    if (dayOfWeek === 0) { // Dimanche
        availableSlots = ['10:30', '12:00', '14:00', '15:30', '17:00'];
    } else if (dayOfWeek === 5) { // Vendredi
        availableSlots = ['09:00', '10:30', '14:00', '15:30', '17:00', '18:30'];
    } else {
        availableSlots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00'];
    }
    
    // Vider les options existantes (sauf la première)
    while (heureSelect.children.length > 1) {
        heureSelect.removeChild(heureSelect.lastChild);
    }
    
    // Ajouter les créneaux disponibles
    availableSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        
        // Vérifier la disponibilité
        if (!checkAvailability(dateInput.value, slot)) {
            option.textContent += ' (Complet)';
            option.disabled = true;
            option.style.color = '#999';
        }
        
        heureSelect.appendChild(option);
    });
    
    // Ajouter note pour dimanche
    if (dayOfWeek === 0) {
        showNotification('Horaires du dimanche', 'Horaires réduits le dimanche : 10h30 - 17h00', 'info');
    }
}

// === MODAL DE CONFIRMATION ===
function showSuccessModal(reservation) {
    const modal = document.getElementById('successModal');
    const reservationNumber = document.getElementById('reservationNumber');
    
    if (modal) {
        if (reservationNumber) {
            reservationNumber.textContent = reservation.id;
        }
        
        modal.style.display = 'block';
        
        // Fermer en cliquant à l'extérieur
        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };
        
        // Auto-fermeture après 8 secondes
        setTimeout(() => {
            closeModal();
        }, 8000);
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// === SYSTÈME DE NOTIFICATIONS ===
function showNotification(title, message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-header">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <strong>${title}</strong>
            </div>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="removeNotification(this.parentElement)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Ajouter les styles si nécessaire
    if (!document.querySelector('#notification-styles')) {
        addNotificationStyles();
    }
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Auto-suppression
    setTimeout(() => {
        removeNotification(notification);
    }, type === 'error' ? 7000 : 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function removeNotification(notification) {
    if (notification && notification.parentElement) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }
}

function addNotificationStyles() {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 30px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(44, 62, 80, 0.2);
            padding: 25px;
            max-width: 450px;
            z-index: 2001;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border-left: 5px solid;
        }
        
        .notification-success { 
            border-left-color: #27ae60;
            background: linear-gradient(135deg, #ffffff 0%, #f8fff9 100%);
        }
        .notification-error { 
            border-left-color: #e74c3c;
            background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
        }
        .notification-warning { 
            border-left-color: #f39c12;
            background: linear-gradient(135deg, #ffffff 0%, #fffcf5 100%);
        }
        .notification-info { 
            border-left-color: #3498db;
            background: linear-gradient(135deg, #ffffff 0%, #f8fcff 100%);
        }
        
        .notification-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .notification-header i {
            font-size: 1.4rem;
        }
        
        .notification-success .notification-header i { color: #27ae60; }
        .notification-error .notification-header i { color: #e74c3c; }
        .notification-warning .notification-header i { color: #f39c12; }
        .notification-info .notification-header i { color: #3498db; }
        
        .notification-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            cursor: pointer;
            color: #7f8c8d;
            font-size: 1.2rem;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            background: rgba(0, 0, 0, 0.1);
            color: #2c3e50;
            transform: scale(1.1);
        }
        
        .notification p {
            margin: 0;
            color: #5d6d7e;
            line-height: 1.6;
            font-size: 1rem;
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 15px;
                left: 15px;
                max-width: none;
                top: 90px;
            }
        }
    `;
    document.head.appendChild(styles);
}

// === VALIDATION DES FORMULAIRES ===
function initializeFormValidation() {
    const inputs = document.querySelectorAll('#reservationForm input, #reservationForm select, #reservationForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
        
        // Validation en temps réel pour certains champs
        if (input.name === 'telephone') {
            input.addEventListener('input', debounce(() => validateField({target: input}), 500));
        }
        if (input.name === 'email') {
            input.addEventListener('input', debounce(() => validateField({target: input}), 500));
        }
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    switch (field.name) {
        case 'nom':
            if (value.length > 0 && value.length < 2) {
                showFieldError(field, 'Le nom doit contenir au moins 2 caractères');
            }
            break;
            
        case 'telephone':
            if (value && !isValidPhoneNumber(value)) {
                showFieldError(field, 'Format invalide (ex: +216 12 345 678, 12 345 678)');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError(field, 'Format d\'email invalide');
            }
            break;
            
        case 'date':
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (value && selectedDate < today) {
                showFieldError(field, 'La date ne peut pas être dans le passé');
            }
            break;
    }
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 4px rgba(231, 76, 60, 0.1)';
    
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 8px;
            display: flex;
            align-items: center;
            gap: 5px;
            animation: slideDown 0.3s ease;
        `;
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = 'rgba(212, 117, 28, 0.2)';
    field.style.boxShadow = 'none';
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// === GALERIE INTERACTIVE ===
function initializeGallery() {
    const galerieItems = document.querySelectorAll('.galerie-item');
    
    galerieItems.forEach((item, index) => {
        item.addEventListener('click', () => openGalleryModal(index));
        
        // Animation au hover
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function openGalleryModal(index) {
    // Créer un modal de galerie simple
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <span class="gallery-close">&times;</span>
            <div class="gallery-image">
                <div class="gallery-placeholder">
                    <h3>Image ${index + 1} - Galerie Oasis Spa Djerba</h3>
                    <p>Vue panoramique de nos installations premium</p>
                </div>
            </div>
            <div class="gallery-navigation">
                <button class="gallery-prev"><i class="fas fa-chevron-left"></i></button>
                <span class="gallery-counter">${index + 1} / 6</span>
                <button class="gallery-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    
    // Styles pour le modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2500;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(modal);
    
    // Fermer le modal
    modal.querySelector('.gallery-close').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// === NEWSLETTER ===
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Email invalide', 'Veuillez saisir une adresse email valide.', 'error');
        return;
    }
    
    // Simulation d'inscription
    setTimeout(() => {
        showNotification('Inscription réussie!', 'Vous recevrez nos actualités et offres spéciales de Djerba.', 'success');
        e.target.querySelector('input[type="email"]').value = '';
    }, 1000);
}

// === FONCTIONS SPÉCIALES DJERBA ===

// Simulation des conditions météo de Djerba
function getDjerbaWeatherGreeting() {
    const greetings = [
        "☀️ Profitez du soleil éternel de Djerba",
        "🌊 La Méditerranée vous appelle",
        "🏝️ Détendez-vous sur l'île aux mille parfums",
        "🌺 Respirez les senteurs de jasmin djerbien",
        "🫒 Découvrez les bienfaits de nos oliviers centenaires"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

// Messages contextuels selon l'heure de Djerba
function getDjerbaTimeGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 12) {
        return "🌅 Bon matin ! Commencez votre journée par un moment de détente";
    } else if (hour >= 12 && hour < 17) {
        return "☀️ Bon après-midi ! Échappez à la chaleur dans notre oasis climatisée";
    } else if (hour >= 17 && hour < 20) {
        return "🌅 Bonsoir ! L'heure parfaite pour un massage face au coucher de soleil";
    } else {
        return "🌙 Bonne soirée ! Relaxez-vous sous les étoiles de Djerba";
    }
}

// Suggestions de soins selon la saison (simulation)
function getSeasonalRecommendations() {
    const month = new Date().getMonth();
    
    if (month >= 5 && month <= 8) { // Été
        return {
            message: "🏖️ Spécial Été : Soins rafraîchissants après votre journée de plage",
            soins: ['bain-vapeur', 'soin-visage'],
            promo: "Réduction de 20% sur les soins hydratants"
        };
    } else if (month >= 9 && month <= 11) { // Automne
        return {
            message: "🍂 Automne : Préparez votre peau aux premiers vents du désert",
            soins: ['massage-olive', 'rituel-berbere'],
            promo: "Offre spéciale Hammam + Massage"
        };
    } else { // Hiver/Printemps
        return {
            message: "🌿 Saison douce : Profitez du climat clément de Djerba",
            soins: ['hammam', 'shiatsu'],
            promo: "Forfait détente 3 soins"
        };
    }
}

// === PERSONNALISATION DYNAMIQUE ===
function personalizeExperience() {
    // Afficher le message météo contextuel
    setTimeout(() => {
        const weatherGreeting = getDjerbaWeatherGreeting();
        const timeGreeting = getDjerbaTimeGreeting();
        
        showNotification('Djerba vous accueille', `${weatherGreeting}. ${timeGreeting}`, 'info');
    }, 3000);
    
    // Afficher les recommandations saisonnières
    setTimeout(() => {
        const seasonal = getSeasonalRecommendations();
        showNotification('Recommandation du moment', seasonal.message + ' - ' + seasonal.promo, 'success');
    }, 8000);
}

// === PROGRAMME DE FIDÉLITÉ ===
function checkLoyaltyProgram() {
    // Note: localStorage n'est pas disponible dans les artifacts Claude.ai
    // En production, vous utiliseriez: localStorage.getItem('djerba_visits') || 0
    let visits = 1; // Simulation pour la démo
    
    if (visits === 1) {
        setTimeout(() => {
            showNotification(
                'Bienvenue dans la famille Oasis ! 🌟', 
                'Première visite ? Profitez de 10% de réduction sur votre premier soin avec le code WELCOME10',
                'success'
            );
        }, 5000);
    } else if (visits === 5) {
        setTimeout(() => {
            showNotification(
                'Client Fidèle ! 💎', 
                'Votre 5ème visite vous donne droit à un massage gratuit ! Contactez-nous pour en profiter.',
                'success'
            );
        }, 4000);
    }
}

// === DÉTECTION DE GÉOLOCALISATION ===
function detectUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Coordonnées approximatives de Djerba
                const djerbaLat = 33.8869;
                const djerbaLon = 10.8581;
                
                const distance = calculateDistance(lat, lon, djerbaLat, djerbaLon);
                
                if (distance < 50) { // Moins de 50km de Djerba
                    setTimeout(() => {
                        showNotification(
                            'Vous êtes à Djerba ! 🏝️',
                            'Parfait ! Vous pouvez nous rejoindre en moins de 30 minutes. Réservation express disponible !',
                            'success'
                        );
                    }, 6000);
                } else if (distance < 200) { // En Tunisie
                    setTimeout(() => {
                        showNotification(
                            'Bienvenue depuis la Tunisie ! 🇹🇳',
                            'Nous proposons des forfaits séjour avec hébergement partenaire à Djerba.',
                            'info'
                        );
                    }, 6000);
                }
            },
            function(error) {
                // Géolocalisation refusée ou échouée - pas de problème
                console.log('Géolocalisation non disponible');
            }
        );
    }
}

// Calcul de distance entre deux points GPS
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// === OPTIMISATION MOBILE ===
function optimizeForMobile() {
    // Détection mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Ajuster les animations pour mobile
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        
        // Message spécial mobile
        setTimeout(() => {
            showNotification(
                'Version Mobile Optimisée 📱',
                'Interface adaptée pour votre smartphone. Réservation simplifiée en quelques touches !',
                'info'
            );
        }, 7000);
        
        // Ajouter bouton d'appel direct
        addMobileCallButton();
    }
}

function addMobileCallButton() {
    const callButton = document.createElement('a');
    callButton.href = 'tel:+21675123456';
    callButton.className = 'mobile-call-button';
    callButton.innerHTML = '<i class="fas fa-phone"></i>';
    callButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.4rem;
        text-decoration: none;
        box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
        z-index: 1500;
        transition: all 0.3s ease;
        animation: bounce 2s infinite;
    `;
    
    // Animation bounce
    const bounceAnimation = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    
    if (!document.querySelector('#bounce-animation')) {
        const bounceStyles = document.createElement('style');
        bounceStyles.id = 'bounce-animation';
        bounceStyles.textContent = bounceAnimation;
        document.head.appendChild(bounceStyles);
    }
    
    document.body.appendChild(callButton);
}

// === CHAT BOT SIMULATION ===
function initializeChatBot() {
    // Créer un bouton de chat flottant
    const chatButton = document.createElement('div');
    chatButton.className = 'chat-button';
    chatButton.innerHTML = '<i class="fas fa-comments"></i>';
    chatButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #d4751c 0%, #f4d03f 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 8px 25px rgba(212, 117, 28, 0.3);
        z-index: 1500;
        transition: all 0.3s ease;
        animation: pulse 2s infinite;
    `;
    
    // Animation pulse
    const pulseAnimation = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    
    if (!document.querySelector('#chat-animation')) {
        const chatStyles = document.createElement('style');
        chatStyles.id = 'chat-animation';
        chatStyles.textContent = pulseAnimation;
        document.head.appendChild(chatStyles);
    }
    
    chatButton.addEventListener('click', openChatBot);
    document.body.appendChild(chatButton);
}

function openChatBot() {
    const responses = [
        "Bonjour ! Je suis Leila, votre assistante virtuelle. Comment puis-je vous aider à planifier votre moment de détente à Djerba ? 🏝️",
        "Bienvenue à l'Oasis Spa Djerba ! Souhaitez-vous découvrir nos soins signature ou réserver directement ?",
        "Ahlan wa sahlan ! Quel soin traditionnel tunisien vous intéresse le plus aujourd'hui ?"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    showNotification('Assistant Virtuel - Leila', randomResponse, 'info');
    
    trackUserInteraction('chatbot_open', 'virtual_assistant');
}

// === SYSTÈME D'AVIS CLIENTS ===
function initializeReviewSystem() {
    const reviews = [
        {
            name: "Fatma Ben Ali",
            location: "Tunis",
            rating: 5,
            comment: "Expérience magique ! Le hammam djerbien est authentique et les massages aux huiles d'olive sont divins. Vue sur mer exceptionnelle !"
        },
        {
            name: "Pierre Dubois", 
            location: "France",
            rating: 5,
            comment: "Séjour inoubliable à Djerba. Ce spa allie parfaitement tradition tunisienne et luxe moderne. Le personnel est aux petits soins."
        },
        {
            name: "Amira Trabelsi",
            location: "Sfax", 
            rating: 5,
            comment: "Les soins berbères sont uniques ! L'argile du Sahara et les plantes locales font des merveilles. Je recommande vivement !"
        }
    ];
    
    // Afficher un avis aléatoire après un délai
    setTimeout(() => {
        const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
        showReviewNotification(randomReview);
    }, 12000);
}

function showReviewNotification(review) {
    const stars = '⭐'.repeat(review.rating);
    showNotification(
        `Avis Client - ${review.name} (${review.location})`,
        `${stars}\n"${review.comment}"`,
        'success'
    );
}

// === INTÉGRATION MAPS ===
function openGoogleMaps() {
    const address = "Zone Touristique Sidi Mahrez, Djerba, Tunisie";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
}

// === EFFETS SPÉCIAUX POUR DJERBA ===
function addDjerbaEffects() {
    // Animation des éléments du soleil
    const sunElements = document.querySelectorAll('.fa-sun');
    sunElements.forEach(sun => {
        sun.classList.add('sun-animation');
    });
    
    // Effet de vagues pour les éléments océan
    const oceanElements = document.querySelectorAll('.slide-3, .galerie-2');
    oceanElements.forEach(element => {
        element.style.background += ', linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)';
        element.style.backgroundSize = '200px 200px, cover';
        element.style.animation = 'wave 4s ease-in-out infinite';
    });
}

// === ANALYTICS ET TRACKING ===
function trackUserInteraction(action, element) {
    console.log('User Interaction:', {
        action: action,
        element: element,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    });
}

// Tracking des clics sur les boutons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-soin')) {
        trackUserInteraction('button_click', e.target.textContent.trim());
    }
    
    if (e.target.matches('.nav-menu a')) {
        trackUserInteraction('navigation_click', e.target.textContent.trim());
    }
});

// === FONCTIONS UTILITAIRES ===
function debounce(func, wait) {
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

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function formatPrice(price) {
    return `${price} DT`;
}

// === CHARGEMENT DIFFÉRÉ DES IMAGES ===
function initializeLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Ici vous pourriez charger de vraies images
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.image-placeholder').forEach(img => {
        imageObserver.observe(img);
    });
}

// === OPTIMISATION DES PERFORMANCES ===
function optimizePerformance() {
    // Préchargement des ressources critiques
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Animation de vague
const waveAnimation = `
    @keyframes wave {
        0%, 100% { background-position: 0px 0px, center; }
        50% { background-position: 200px 0px, center; }
    }
`;

// Ajouter l'animation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = waveAnimation;
document.head.appendChild(styleSheet);

// === INITIALISATION FINALE ===
window.addEventListener('load', function() {
    addDjerbaEffects();
    initializeLazyLoading();
    optimizePerformance();
    
    // Ajouter l'événement sur la carte
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', openGoogleMaps);
        mapPlaceholder.style.cursor = 'pointer';
    }
    
    // Message de bienvenue pour Djerba
    setTimeout(() => {
        showNotification(
            'Bienvenue à Djerba! 🏝️', 
            'Découvrez l\'art du bien-être tunisien dans notre oasis de sérénité face à la Méditerranée.', 
            'info'
        );
    }, 2000);
});

// === NETTOYAGE ET OPTIMISATION MÉMOIRE ===
window.addEventListener('beforeunload', function() {
    // Nettoyer les intervalles
    if (slideInterval) {
        clearInterval(slideInterval);
    }
});

// === GESTION DES ERREURS ===
window.addEventListener('error', function(e) {
    console.error('Erreur capturée:', e.error);
    // En production, vous pourriez envoyer ces erreurs à un service de monitoring
});

// === DEBUG ET DÉVELOPPEMENT ===
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🏝️ Oasis Spa Djerba - Mode Développement Activé');
    console.log('Fonctionnalités disponibles:', {
        reservations: reservations.length,
        slider: 'actif',
        animations: 'optimisées',
        mobile: 'responsive',
        chatbot: 'simulé'
    });
}

console.log('🌟 Oasis Spa Djerba - Système initialisé avec succès !');
console.log('🏝️ Découvrez l\'art du bien-être tunisien...');

// Export pour les tests (si nécessaire)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        reservations,
        validateReservation,
        checkAvailability,
        getSoinDetails,
        isValidPhoneNumber
    };
}