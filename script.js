// Variables globales
let currentSlide = 1;
const totalSlides = 7; // Total de diapositivas incluyendo la intro y la final

// Función para mostrar la siguiente diapositiva
function nextSlide() {
    if (currentSlide < totalSlides) {
        // Ocultar diapositiva actual
        document.getElementById('slide' + currentSlide).classList.remove('active');
        
        // Mostrar siguiente diapositiva
        currentSlide++;
        document.getElementById('slide' + currentSlide).classList.add('active');
        
        // Actualizar barra de progreso
        updateProgressBar();
    }
}

// Función para mostrar la diapositiva anterior
function prevSlide() {
    if (currentSlide > 1) {
        // Ocultar diapositiva actual
        document.getElementById('slide' + currentSlide).classList.remove('active');
        
        // Mostrar diapositiva anterior
        currentSlide--;
        document.getElementById('slide' + currentSlide).classList.add('active');
        
        // Actualizar barra de progreso
        updateProgressBar();
    }
}

// Función para mostrar la respuesta
function showAnswer(answerId) {
    const answer = document.getElementById(answerId);
    answer.classList.add('show');
    
    // Añadir animación
    answer.style.animation = 'none';
    setTimeout(() => {
        answer.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Función para actualizar la barra de progreso
function updateProgressBar() {
    const progressPercentage = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    document.querySelector('.progress').style.width = progressPercentage + '%';
}

// Función para reiniciar la presentación
function restartPresentation() {
    // Ocultar diapositiva actual
    document.getElementById('slide' + currentSlide).classList.remove('active');
    
    // Volver a la primera diapositiva
    currentSlide = 1;
    document.getElementById('slide1').classList.add('active');
    
    // Ocultar todas las respuestas
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.classList.remove('show');
    });
    
    // Actualizar barra de progreso
    updateProgressBar();
}

// Inicializar la barra de progreso al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    
    // Añadir efecto de teclas para navegar
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Añadir animación inicial
    setTimeout(() => {
        document.querySelector('.title').style.animation = 'fadeInDown 1s ease';
        document.querySelector('.subtitle').style.animation = 'fadeInUp 1s ease';
    }, 500);
});

// Función para detectar swipe en dispositivos móviles
document.addEventListener('DOMContentLoaded', function() {
    let touchstartX = 0;
    let touchendX = 0;
    
    const container = document.querySelector('.container');
    
    container.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);
    
    container.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchendX < touchstartX - 50) {
            nextSlide(); // Swipe izquierda
        }
        if (touchendX > touchstartX + 50) {
            prevSlide(); // Swipe derecha
        }
    }
});
