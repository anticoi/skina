// MODULAR PHOTO GALLERY DATA - Easy to add, remove, or update photos
// Simply add or remove objects from this array to update the gallery

const galleryData = [
    {
        id: 1,
        filename: '469395620_122184445220239910_1237380260831878928_n.jpg',
        title: 'La Skina en Vivo',
        description: 'Momento especial en nuestra presentación'
    },
    {
        id: 2,
        filename: '469398432_122184447542239910_8156151367024669384_n.jpg',
        title: 'En Escenario',
        description: 'La energía del escenario'
    },
    {
        id: 3,
        filename: '469404361_122184447356239910_9144323421152256669_n.jpg',
        title: 'Show Intenso',
        description: 'Una presentación llena de energía'
    },
    {
        id: 4,
        filename: '469479252_122184447614239910_7065550302034853732_n.jpg',
        title: 'Conexión Musical',
        description: 'La magia de la música en vivo'
    },
    {
        id: 5,
        filename: '469488625_122184447182239910_732392003030224490_n.jpg',
        title: 'Músicos Profesionales',
        description: 'La experiencia de nuestros integrantes'
    },
    {
        id: 6,
        filename: '469513779_122184447362239910_4794825018769550943_n.jpg',
        title: 'Noche de Éxitos',
        description: 'Los clásicos que marcaron época'
    },
    {
        id: 7,
        filename: '469538389_122184447392239910_5277188833841314977_n.jpg',
        title: 'Público Aplaudiendo',
        description: 'La respuesta del público'
    },
    {
        id: 8,
        filename: '469593245_122184447398239910_983857437660213386_n.jpg',
        title: 'Momento Único',
        description: 'Capturando la esencia del show'
    },
    {
        id: 9,
        filename: '469612174_122184447722239910_4481794784412899084_n.jpg',
        title: 'Fiesta Musical',
        description: 'Celebrando con la mejor música'
    },
    {
        id: 10,
        filename: '469636266_122184447386239910_4745816013261134059_n.jpg',
        title: 'Pasión Escénica',
        description: 'La pasión en cada nota'
    },
    {
        id: 11,
        filename: '469706554_122184446942239910_6207900592258326471_n.jpg',
        title: 'Gran Final',
        description: 'Cerrando con fuerza'
    },
    {
        id: 12,
        filename: '469816806_122184447338239910_7861082708948405390_n.jpg',
        title: 'Entre Amigos',
        description: 'La Skina compartiendo música'
    },
    {
        id: 13,
        filename: '487269549_9653302754708134_4256586824943829794_n.jpg',
        title: 'Ensayo de Banda',
        description: 'Preparando nuestro repertorio'
    },
    {
        id: 14,
        filename: '499914579_23863857386559433_6113977968756069342_n.jpg',
        title: 'Concierto Especial',
        description: 'Una noche inolvidable'
    },
    {
        id: 15,
        filename: '499918874_23863857399892765_6654105899367588552_n.jpg',
        title: 'Músicos en Acción',
        description: 'La energía de nuestros músicos'
    },
    {
        id: 16,
        filename: '499922108_23863857226559449_3772309000784436792_n.jpg',
        title: 'Público Disfrutando',
        description: 'Conectando con la audiencia'
    },
    {
        id: 17,
        filename: '499925739_23863857506559421_802605445917947470_n.jpg',
        title: 'Escena Principal',
        description: 'Dominando el escenario'
    },
    {
        id: 18,
        filename: '499928966_23863857233226115_2727424852141613921_n.jpg',
        title: 'Entre Canciones',
        description: 'Momentos de conexión'
    },
    {
        id: 19,
        filename: '499934800_23863857243226114_7222860140332447218_n.jpg',
        title: 'Final del Show',
        description: 'Cerrando con broche de oro'
    },
    {
        id: 20,
        filename: '654178533_18443387599118736_8155461647070952870_n.jpeg',
        title: 'Backstage',
        description: 'Detrás de cámaras'
    },
    {
        id: 21,
        filename: '696134418_18452959573118736_5137224853568921927_n.jpeg',
        title: 'Preparativos',
        description: 'Listos para el show'
    },
    {
        id: 22,
        filename: '719813244_18458188744118736_788835206785703804_n.jpeg',
        title: 'Celebración',
        description: 'Festejando la música'
    },
    {
        id: 23,
        filename: '719899700_18458188729118736_1627394192383343192_n.jpeg',
        title: 'Grupo Completo',
        description: 'La Skina unida'
    }
];

// Function to render gallery dynamically
function renderGallery() {
    const container = document.getElementById('gallery-container');
    
    galleryData.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'relative group overflow-hidden rounded-2xl cursor-pointer card-hover';
        
        photoCard.innerHTML = `
            <div class="aspect-square overflow-hidden">
                <img 
                    src="images/${photo.filename}" 
                    alt="${photo.title}"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                >
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 class="text-xl font-bold text-gold mb-2">${photo.title}</h3>
                <p class="text-gray-300 text-sm">${photo.description}</p>
            </div>
        `;
        
        // Add lightbox functionality
        photoCard.addEventListener('click', () => openLightbox(photo));
        
        container.appendChild(photoCard);
    });
}

// Lightbox functionality
function openLightbox(photo) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4';
    lightbox.id = 'lightbox';
    
    lightbox.innerHTML = `
        <button class="absolute top-4 right-4 text-white hover:text-gold transition-colors z-10" onclick="closeLightbox()">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
        <button class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors z-10" onclick="navigatePhoto(-1)">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>
        <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors z-10" onclick="navigatePhoto(1)">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>
        <div class="max-w-5xl max-h-[90vh] relative">
            <img 
                src="images/${photo.filename}" 
                alt="${photo.title}"
                class="max-w-full max-h-[80vh] object-contain rounded-lg"
            >
            <div class="text-center mt-4">
                <h3 class="text-2xl font-bold text-gold mb-2">${photo.title}</h3>
                <p class="text-gray-300">${photo.description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Store current photo index for navigation
    lightbox.dataset.currentIndex = galleryData.findIndex(p => p.id === photo.id);
    
    // Close on escape key
    document.addEventListener('keydown', handleLightboxKeydown);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleLightboxKeydown);
    }
}

function navigatePhoto(direction) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    let newIndex = currentIndex + direction;
    
    // Wrap around
    if (newIndex < 0) newIndex = galleryData.length - 1;
    if (newIndex >= galleryData.length) newIndex = 0;
    
    const newPhoto = galleryData[newIndex];
    lightbox.dataset.currentIndex = newIndex;
    
    // Update image and text
    const img = lightbox.querySelector('img');
    const title = lightbox.querySelector('h3');
    const description = lightbox.querySelector('p');
    
    img.src = `images/${newPhoto.filename}`;
    img.alt = newPhoto.title;
    title.textContent = newPhoto.title;
    description.textContent = newPhoto.description;
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePhoto(-1);
    if (e.key === 'ArrowRight') navigatePhoto(1);
}

// Initialize gallery rendering when DOM is ready
document.addEventListener('DOMContentLoaded', renderGallery);
