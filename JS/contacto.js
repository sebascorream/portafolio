// ===================================
// UTILIDAD PARA OBTENER VALORES
// ===================================

const getValue = (id) => document.getElementById(id)?.value || '';

// ===================================
// MANEJO DEL FORMULARIO DE CONTACTO
// ===================================

function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = {
            name: getValue('name'),
            email: getValue('email'),
            phone: getValue('phone'),
            subject: getValue('subject'),
            message: getValue('message')
        };

        if (!validateForm(formData)) {
            showMessage('Por favor completa correctamente los campos requeridos', 'error');
            return;
        }

        // Nota: este formulario no almacena datos.
        // Solo redirige a WhatsApp por motivos de privacidad.
        sendToWhatsApp(formData);

        form.reset();
        showMessage('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
    });
}

// ===================================
// VALIDACIÓN DEL FORMULARIO
// ===================================

function validateForm(data) {
    if (data.name.trim().length < 2) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return false;

    if (!data.subject) return false;

    if (data.phone && data.phone.trim().length < 7) return false;

    if (data.message.trim().length < 10) return false;

    return true;
}

// ===================================
// ENVIAR A WHATSAPP
// ===================================

function sendToWhatsApp(data) {
    const phoneNumber = '573001234567'; // 🔴 CAMBIA ESTE NÚMERO

    let message = `*Nuevo mensaje de contacto*\n\n`;
    message += `👤 *Nombre:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;

    if (data.phone) {
        message += `📱 *Teléfono:* ${data.phone}\n`;
    }

    message += `🏷️ *Asunto:* ${getSubjectLabel(data.subject)}\n\n`;
    message += `💬 *Mensaje:*\n${data.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

// ===================================
// OBTENER ETIQUETA DEL ASUNTO
// ===================================

function getSubjectLabel(value) {
    const subjects = {
        trabajo: 'Oportunidad laboral',
        proyecto: 'Proyecto freelance',
        colaboracion: 'Colaboración',
        consulta: 'Consulta general',
        otro: 'Otro'
    };

    return subjects[value] || value;
}

// ===================================
// MENSAJES DE ESTADO
// ===================================

function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;

    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===================================
// VALIDACIÓN EN TIEMPO REAL
// ===================================

function initRealTimeValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            input.style.borderColor = '#e5e7eb';
        });
    });
}

function validateField(field) {
    let isValid = true;

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
    }

    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(field.value);
    }

    field.style.borderColor = isValid ? '#10b981' : '#ef4444';

    if (!isValid) {
        field.style.animation = 'shake 0.3s ease';
        setTimeout(() => (field.style.animation = ''), 300);
    }

    return isValid;
}

// ===================================
// ANIMACIÓN SHAKE
// ===================================

const style = document.createElement('style');
style.textContent = `
@keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
}`;
document.head.appendChild(style);

// ===================================
// CONTADOR DE CARACTERES
// ===================================

function initCharacterCounter() {
    const textarea = document.getElementById('message');
    if (!textarea) return;

    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 0.85rem;
        color: #6b7280;
        margin-top: 0.5rem;
    `;

    textarea.parentNode.appendChild(counter);

    textarea.addEventListener('input', () => {
        const maxLength = 500;
        const length = textarea.value.length;

        counter.textContent = `${length} / ${maxLength} caracteres`;
        counter.style.color =
            length > maxLength ? '#ef4444' :
            length > maxLength * 0.8 ? '#f59e0b' :
            '#6b7280';
    });

    textarea.dispatchEvent(new Event('input'));
}

// ===================================
// BOTÓN SCROLL TO TOP
// ===================================

function initScrollToTop() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #10b981, #047857);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 300;
        button.style.opacity = visible ? '1' : '0';
        button.style.visibility = visible ? 'visible' : 'hidden';
    });

    button.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
    );
}

// ===================================
// ANIMACIONES AL HACER SCROLL
// ===================================

function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card-contact, .contact-form-wrapper')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
}

// ===================================
// INICIALIZACIÓN ÚNICA
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initRealTimeValidation();
    initCharacterCounter();
    initScrollToTop();
    initScrollAnimations();

    console.log('✅ Formulario de contacto inicializado correctamente');
});
