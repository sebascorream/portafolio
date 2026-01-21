// ===================================
// ANIMACIÓN DE BARRAS DE PROGRESO
// ===================================

// Función para animar las barras cuando sean visibles
function animateSkillBars() {
    const skillsSection = document.querySelector('.tecnologias-section');
    
    if (!skillsSection) return;

    const observerOptions = {
        threshold: 0.3, // Se activa cuando el 30% de la sección es visible
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar todas las barras de progreso
                const progressBars = entry.target.querySelectorAll('.progress-fill');
                
                progressBars.forEach((bar, index) => {
                    // Guardar el ancho original
                    const targetWidth = bar.style.width;
                    
                    // Resetear a 0
                    bar.style.width = '0%';
                    
                    // Animar con delay escalonado
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100 + (index * 100));
                });

                // Dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar la sección de skills
    const skillsContainer = document.querySelector('.skills-bars');
    if (skillsContainer) {
        observer.observe(skillsContainer);
    }
}

// ===================================
// CONTADOR ANIMADO PARA PORCENTAJES
// ===================================

function animatePercentages() {
    const percentages = document.querySelectorAll('.skill-percentage');
    
    percentages.forEach(percentage => {
        const targetValue = parseInt(percentage.textContent);
        let currentValue = 0;
        const increment = targetValue / 50; // Dividir en 50 pasos
        const duration = 1500; // 1.5 segundos
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                percentage.textContent = targetValue + '%';
                clearInterval(counter);
            } else {
                percentage.textContent = Math.floor(currentValue) + '%';
            }
        }, stepTime);
    });
}

// ===================================
// ANIMACIÓN AL HACER SCROLL
// ===================================

function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si es la sección de skills, animar porcentajes
                if (entry.target.classList.contains('skills-bars')) {
                    setTimeout(animatePercentages, 200);
                }
            }
        });
    }, {
        threshold: 0.2
    });

    // Observar elementos animables
    const animatableElements = document.querySelectorAll(
        '.skill-item, .skill-card, .section-header'
    );

    animatableElements.forEach(el => observer.observe(el));
}

// ===================================
// EFECTO HOVER EN SKILLS
// ===================================

function initSkillHoverEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressFill = this.querySelector('.progress-fill');
            const currentWidth = progressFill.style.width;
            
            // Efecto de "pulso" en la barra
            progressFill.style.transform = 'scaleY(1.2)';
            
            setTimeout(() => {
                progressFill.style.transform = 'scaleY(1)';
            }, 200);
        });
    });
}

// ===================================
// TOOLTIPS PARA LOS ICONOS (OPCIONAL)
// ===================================

function initTooltips() {
    const skillIcons = document.querySelectorAll('.skill-icon');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            const skillName = this.parentElement.querySelector('.skill-name').textContent;
            
            // Crear tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = skillName;
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            document.body.appendChild(tooltip);
            
            // Posicionar tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            // Guardar referencia para remover después
            this.tooltipElement = tooltip;
        });
        
        icon.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.style.opacity = '0';
                setTimeout(() => {
                    if (this.tooltipElement && this.tooltipElement.parentNode) {
                        this.tooltipElement.parentNode.removeChild(this.tooltipElement);
                    }
                }, 300);
            }
        });
    });
}

// ===================================
// INICIALIZACIÓN
// ===================================

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que todo esté cargado
    setTimeout(() => {
        animateSkillBars();
        handleScrollAnimations();
        initSkillHoverEffects();
        // initTooltips(); // Descomentar si quieres tooltips adicionales
    }, 100);
});

// También ejecutar si la página ya está cargada
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        animateSkillBars();
        handleScrollAnimations();
        initSkillHoverEffects();
    }, 100);
}