// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    // Элементы меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Функция для toggle мобильного меню
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        body.classList.toggle('no-scroll');
        
        // Меняем иконку кнопки
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Обработчик для кнопки меню
    if (mobileMenuBtn) {
        // Создаем иконку для кнопки
        const icon = document.createElement('i');
        icon.className = 'fas fa-bars';
        mobileMenuBtn.appendChild(icon);
        
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Закрытие меню при клике на ссылку
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Анимация появления элементов при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.car-card, .service-card, .about-content, .contact-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация стилей для анимации
    const animatedElements = document.querySelectorAll('.car-card, .service-card, .about-content, .contact-content');
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимации при загрузке и прокрутке
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Обработка формы
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }
    
    // Оптимизация производительности при скролле
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Предзагрузка критических ресурсов
function preloadCriticalResources() {
    const resources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'css/style.css'
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Запуск предзагрузки
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}