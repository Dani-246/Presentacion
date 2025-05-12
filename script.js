document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const welcomeScreen = document.getElementById('welcome-screen');
    const contentScreen = document.getElementById('content-screen');
    const teacherBtn = document.getElementById('teacher-btn');
    const studentBtn = document.getElementById('student-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const backToStartBtn = document.getElementById('back-to-start');
    
    // Animación de letras en el título
    const titleLetters = document.querySelectorAll('.title-animation span');
    titleLetters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Función para cambiar de pantalla
    function showScreen(screenToShow, screenToHide) {
        screenToHide.classList.remove('active');
        screenToShow.classList.add('active');
        
        // Animación de entrada para el contenido
        if (screenToShow === contentScreen) {
            const sections = document.querySelectorAll('.section');
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 300 + (index * 100));
            });
        }
    }
    
    // Inicializar estilos para animación de secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Evento para botón de profesor
    teacherBtn.addEventListener('click', function() {
        showScreen(contentScreen, welcomeScreen);
        // Personalización para profesor
        document.querySelector('.header-content h1').textContent = 'Las TICs en Nuestra Vida - Presentación para el Profesor Carlos';
    });
    
    // Evento para botón de alumno
    studentBtn.addEventListener('click', function() {
        showScreen(contentScreen, welcomeScreen);
        // Personalización para alumno
        document.querySelector('.header-content h1').textContent = 'Las TICs en Nuestra Vida';
    });
    
    // Evento para botón de volver al inicio
    backToStartBtn.addEventListener('click', function() {
        showScreen(welcomeScreen, contentScreen);
    });
    
    // Menú móvil
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('#nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Animación al hacer scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Efecto de navegación sticky
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // Efecto hover para imágenes
    const images = document.querySelectorAll('.image-container img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animación para componentes al hacer hover
    const components = document.querySelectorAll('.component, .tool, .change');
    components.forEach(component => {
        component.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        component.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Detectar si es profesor o alumno por parámetro URL
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    
    if (role === 'teacher') {
        teacherBtn.click();
    } else if (role === 'student') {
        studentBtn.click();
    }
    
    // Animación de entrada para la pantalla de bienvenida
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.opacity = '1';
        welcomeScreen.style.transition = 'opacity 1s ease';
    }, 100);
});
