// ===================================
// ANIMACIÓN AL HACER SCROLL
// ===================================

function initTimelineAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos los items del timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
}

// ===================================
// PROGRESO DE LA LÍNEA DE TIEMPO
// ===================================

function initTimelineProgress() {
    const timelines = document.querySelectorAll('.timeline');
    
    timelines.forEach(timeline => {
        // Crear elemento de progreso
        const progressLine = document.createElement('div');
        progressLine.className = 'timeline-progress';
        progressLine.style.cssText = `
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            width: 4px;
            height: 0%;
            background: linear-gradient(180deg, #34d399 0%, #10b981 100%);
            border-radius: 2px;
            transition: height 0.3s ease;
            z-index: 1;
        `;
        
        timeline.appendChild(progressLine);

        // Actualizar progreso al hacer scroll
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top + window.pageYOffset;
            const timelineHeight = timeline.offsetHeight;
            const scrollPosition = window.pageYOffset + window.innerHeight / 2;
            
            if (scrollPosition > timelineTop) {
                const progress = Math.min(
                    ((scrollPosition - timelineTop) / timelineHeight) * 100,
                    100
                );
                progressLine.style.height = progress + '%';
            } else {
                progressLine.style.height = '0%';
            }
        });
    });
}

// ===================================
// CONTADOR DE EXPERIENCIAS
// ===================================

function showTimelineStats() {
    const experienceItems = document.querySelectorAll('.experiencia-section .timeline-item');
    const educationItems = document.querySelectorAll('.formacion-section .timeline-item');
    
    console.log('📊 Estadísticas de Timeline:');
    console.log(`Experiencias laborales: ${experienceItems.length}`);
    console.log(`Formación académica: ${educationItems.length}`);
    console.log(`Total de hitos: ${experienceItems.length + educationItems.length}`);
}

// ===================================
// EFECTO PARALLAX EN MARCADORES
// ===================================

function initMarkerParallax() {
    const markers = document.querySelectorAll('.timeline-marker');
    
    window.addEventListener('scroll', () => {
        markers.forEach((marker, index) => {
            const speed = 0.1 + (index * 0.02);
            const yPos = -(window.pageYOffset * speed);
            marker.style.transform = `translateX(-50%) translateY(${yPos}px)`;
        });
    });
}

// ===================================
// TOOLTIP EN FECHAS
// ===================================

function initDateTooltips() {
    const dates = document.querySelectorAll('.timeline-date');
    
    dates.forEach(date => {
        date.addEventListener('mouseenter', function() {
            const dateText = this.textContent.trim();
            const words = dateText.split(' ');
            
            // Calcular duración aproximada
            if (dateText.includes('-')) {
                const parts = dateText.split('-');
                const startYear = parseInt(parts[0].match(/\d{4}/)?.[0] || '0');
                const endText = parts[1].trim();
                
                let duration = '';
                if (endText.includes('Presente')) {
                    const currentYear = new Date().getFullYear();
                    const years = currentYear - startYear;
                    duration = years > 0 ? `${years} año${years > 1 ? 's' : ''} hasta ahora` : 'Menos de 1 año';
                } else {
                    const endYear = parseInt(endText.match(/\d{4}/)?.[0] || '0');
                    const years = endYear - startYear;
                    const months = years * 12;
                    duration = years > 0 ? `${years} año${years > 1 ? 's' : ''}` : `${months} meses`;
                }
                
                if (duration) {
                    this.setAttribute('title', `Duración: ${duration}`);
                }
            }
        });
    });
}

// ===================================
// FILTRO POR AÑO (OPCIONAL)
// ===================================

function initYearFilter() {
    // Obtener todos los años únicos
    const years = new Set();
    const dates = document.querySelectorAll('.timeline-date');
    
    dates.forEach(date => {
        const text = date.textContent;
        const yearMatches = text.match(/\d{4}/g);
        if (yearMatches) {
            yearMatches.forEach(year => years.add(year));
        }
    });
    
    console.log('📅 Años encontrados:', Array.from(years).sort().reverse());
}

// ===================================
// ANIMACIÓN DE SKILLS AL APARECER
// ===================================

function initSkillsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const badges = entry.target.querySelectorAll('.skill-badge');
                badges.forEach((badge, index) => {
                    setTimeout(() => {
                        badge.style.animation = 'fadeInUp 0.4s ease-out forwards';
                        badge.style.opacity = '0';
                        setTimeout(() => {
                            badge.style.opacity = '1';
                        }, 50);
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsContainers = document.querySelectorAll('.timeline-skills');
    skillsContainers.forEach(container => observer.observe(container));
}

// ===================================
// SCROLL SUAVE ENTRE SECCIONES
// ===================================

function initSmoothScroll() {
    // Agregar botones de navegación (si existen en el navbar)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// CONTADOR ANIMADO DE AÑOS
// ===================================

function animateYearCounter() {
    const dates = document.querySelectorAll('.timeline-date');
    
    dates.forEach(date => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Agregar efecto de "pop"
                    entry.target.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1)';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(date);
    });
}

// ===================================
// MODO RESPONSIVE - AJUSTES DINÁMICOS
// ===================================

function handleResponsiveTimeline() {
    function adjustTimeline() {
        const isMobile = window.innerWidth <= 768;
        const timelineMarkers = document.querySelectorAll('.timeline-marker');
        
        if (isMobile) {
            // Ajustes específicos para móvil
            timelineMarkers.forEach(marker => {
                marker.style.left = '30px';
            });
        } else {
            // Restaurar para desktop
            timelineMarkers.forEach(marker => {
                marker.style.left = '50%';
            });
        }
    }

    // Ejecutar al cargar y al redimensionar
    adjustTimeline();
    window.addEventListener('resize', adjustTimeline);
}

// ===================================
// INICIALIZACIÓN
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initTimelineAnimations();
        initTimelineProgress();
        showTimelineStats();
        // initMarkerParallax(); // Descomentar para efecto parallax
        initDateTooltips();
        initYearFilter();
        initSkillsAnimation();
        initSmoothScroll();
        animateYearCounter();
        handleResponsiveTimeline();
    }, 100);
});

// También ejecutar si la página ya está cargada
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        initTimelineAnimations();
        initTimelineProgress();
        showTimelineStats();
        initDateTooltips();
        initSkillsAnimation();
        animateYearCounter();
        handleResponsiveTimeline();
    }, 100);
}