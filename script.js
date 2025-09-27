// Navegación entre secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Activar botón correspondiente
    event.target.classList.add('active');
}

// Almacenamiento local para experiencias
let experiences = JSON.parse(localStorage.getItem('babyExperiences')) || [];

// Cargar experiencias al iniciar
document.addEventListener('DOMContentLoaded', function() {
    displayExperiences();
    loadMilestones();
});

// Manejar formulario de experiencias
document.getElementById('shareForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const experience = {
        id: Date.now(),
        parentName: document.getElementById('parentName').value,
        babyAge: document.getElementById('babyAge').value,
        category: document.getElementById('category').value,
        experience: document.getElementById('experience').value,
        date: new Date().toLocaleDateString('es-ES')
    };
    
    experiences.unshift(experience);
    localStorage.setItem('babyExperiences', JSON.stringify(experiences));
    
    displayExperiences();
    this.reset();
    
    // Mostrar mensaje de confirmación
    showNotification('¡Experiencia compartida exitosamente! 🎉');
});

// Mostrar experiencias
function displayExperiences() {
    const experiencesList = document.getElementById('experiencesList');
    
    if (experiences.length === 0) {
        experiencesList.innerHTML = '<p style="text-align: center; color: #666;">Aún no hay experiencias compartidas. ¡Sé el primero en compartir!</p>';
        return;
    }
    
    experiencesList.innerHTML = experiences.map(exp => `
        <div class="experience-item">
            <div class="experience-header">
                <span><strong>${exp.parentName}</strong> - ${getAgeLabel(exp.babyAge)}</span>
                <span class="experience-category">${getCategoryLabel(exp.category)}</span>
            </div>
            <p>${exp.experience}</p>
            <small style="color: #666; margin-top: 0.5rem; display: block;">Compartido el ${exp.date}</small>
        </div>
    `).join('');
}

// Obtener etiquetas legibles
function getAgeLabel(age) {
    const ageLabels = {
        '0-3m': '0-3 meses',
        '3-6m': '3-6 meses',
        '6-12m': '6-12 meses',
        '12-18m': '12-18 meses',
        '18-24m': '18-24 meses'
    };
    return ageLabels[age] || age;
}

function getCategoryLabel(category) {
    const categoryLabels = {
        'alimentacion': '🍼 Alimentación',
        'sueno': '😴 Sueño',
        'desarrollo': '🧠 Desarrollo',
        'salud': '🏥 Salud',
        'juegos': '🎮 Juegos'
    };
    return categoryLabels[category] || category;
}

// Guardar y cargar hitos del desarrollo
function loadMilestones() {
    const savedMilestones = JSON.parse(localStorage.getItem('babyMilestones')) || {};
    
    Object.keys(savedMilestones).forEach(milestoneId => {
        const checkbox = document.getElementById(milestoneId);
        if (checkbox) {
            checkbox.checked = savedMilestones[milestoneId];
        }
    });
}

// Guardar hitos cuando se marcan
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('#milestones')) {
        const savedMilestones = JSON.parse(localStorage.getItem('babyMilestones')) || {};
        savedMilestones[e.target.id] = e.target.checked;
        localStorage.setItem('babyMilestones', JSON.stringify(savedMilestones));
        
        if (e.target.checked) {
            showNotification('¡Hito alcanzado! 🎉');
        }
    }
});

// Mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00cec9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);