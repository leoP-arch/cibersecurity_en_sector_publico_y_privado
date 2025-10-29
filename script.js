document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const content = document.getElementById('mainContent');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
    const pageContents = document.querySelectorAll('.page-content');
    
// --- 1. Toggle del Menú Lateral ---
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        content.classList.toggle('shifted');
    });

    // En pantallas pequeñas, la sidebar se "muestra" y se "oculta" completamente.
    // Usamos 'show' en CSS Media Query para controlarlo en vez de 'hidden'.
    if (window.innerWidth <= 768) {
        menuToggle.addEventListener('click', () => {
             sidebar.classList.toggle('show');
        });
    }

    // --- 2. Toggle de Submenús (Tema 1, Tema 2) ---
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdownMenu = toggle.nextElementSibling;
            
            // Ocultar otros menús abiertos
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle && otherToggle.classList.contains('active')) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.classList.remove('show');
                }
            });

            // Toggle del menú actual
            toggle.classList.toggle('active');
            dropdownMenu.classList.toggle('show');
        });
    });

    // --- 3. Navegación Simulada entre Páginas (Mostrar/Ocultar secciones) ---
    
    // Función central para cambiar de "página"
    window.navigate = (pageId) => {
        // 1. Ocultar todas las secciones
        pageContents.forEach(section => {
            section.classList.remove('active');
        });

        // 2. Mostrar la sección solicitada con animación
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            // setTimeout para asegurar que se aplica la transición después de cambiar la clase 'active'
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50); 
            
            // Cerrar sidebar automáticamente en móviles después de navegar
             if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
            
            // Desplazamiento suave al inicio del contenido
            content.scrollTop = 0;
            
        } else {
            console.error(`Página no encontrada: ${pageId}`);
        }
    };
    
    // Asignar el evento de clic a todos los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (pageId) {
                window.navigate(pageId);
            }
        });
    });

    // Iniciar la página en "Inicio"
    window.navigate('inicio');
});