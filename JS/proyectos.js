// ===================================
// SISTEMA DE FILTRADO DE PROYECTOS
// ===================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            // Obtener categoría del filtro
            const filterValue = this.getAttribute('data-filter');

            // Filtrar proyectos
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all') {
                    // Mostrar todos
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    }, 10);
                } else if (cardCategory === filterValue) {
                    // Mostrar solo los que coinciden
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    }, 10);
                } else {
                    // Ocultar los que no coinciden
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===================================
// ANIMACIÓN AL HACER SCROLL
// ===================================

function initScrollAnimations() {
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

    // Observar todos los elementos animables
    const animatableElements = document.querySelectorAll(
        '.project-card, .section-header, .project-filters'
    );

    animatableElements.forEach(el => observer.observe(el));
}

// ===================================
// EFECTO PARALLAX EN IMÁGENES
// ===================================

function initParallaxEffect() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            }
        });
    });
}

// ===================================
// CONTADOR DE PROYECTOS
// ===================================

function updateProjectCount() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        const filterValue = button.getAttribute('data-filter');
        let count;

        if (filterValue === 'all') {
            count = document.querySelectorAll('.project-card').length;
        } else {
            count = document.querySelectorAll(`.project-card[data-category="${filterValue}"]`).length;
        }

        // Agregar contador al botón (opcional)
        const existingBadge = button.querySelector('.count-badge');
        if (existingBadge) {
            existingBadge.textContent = count;
        }
    });
}

// ===================================
// LAZY LOADING DE IMÁGENES
// ===================================

function initLazyLoading() {
    const images = document.querySelectorAll('.project-image img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Si la imagen tiene data-src, cargarla
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                // Agregar clase de cargado
                img.classList.add('loaded');
                
                // Dejar de observar esta imagen
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// TOOLTIP PARA TECNOLOGÍAS
// ===================================

function initTechTooltips() {
    const techTags = document.querySelectorAll('.tech-tag');

    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = `Tecnología: ${this.textContent}`;
            tooltip.style.cssText = `
                position: absolute;
                background: #1f2937;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + window.scrollY + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

            setTimeout(() => tooltip.style.opacity = '1', 10);

            this.tooltipElement = tooltip;
        });

        tag.addEventListener('mouseleave', function() {
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
// BÚSQUEDA DE PROYECTOS (OPCIONAL)
// ===================================

function initProjectSearch() {
    const searchInput = document.getElementById('project-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const category = card.querySelector('.project-category').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
}

// ===================================
// ESTADÍSTICAS DE PROYECTOS
// ===================================

function showProjectStats() {
    const totalProjects = document.querySelectorAll('.project-card').length;
    const frontendProjects = document.querySelectorAll('.project-card[data-category="frontend"]').length;
    const backendProjects = document.querySelectorAll('.project-card[data-category="backend"]').length;
    const fullstackProjects = document.querySelectorAll('.project-card[data-category="fullstack"]').length;

    console.log('📊 Estadísticas de Proyectos:');
    console.log(`Total: ${totalProjects}`);
    console.log(`Frontend: ${frontendProjects}`);
    console.log(`Backend: ${backendProjects}`);
    console.log(`Full Stack: ${fullstackProjects}`);
}

// ===================================
// INICIALIZACIÓN
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que todo esté cargado
    setTimeout(() => {
        initProjectFilters();
        initScrollAnimations();
        // initParallaxEffect(); // Descomentar para efecto parallax
        updateProjectCount();
        // initLazyLoading(); // Descomentar si usas lazy loading
        // initTechTooltips(); // Descomentar para tooltips en tecnologías
        // initProjectSearch(); // Descomentar si agregas búsqueda
        showProjectStats(); // Ver estadísticas en consola
    }, 100);
});

// También ejecutar si la página ya está cargada
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        initProjectFilters();
        initScrollAnimations();
        updateProjectCount();
        showProjectStats();
    }, 100);
}