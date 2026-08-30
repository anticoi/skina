// MODULAR PHOTO GALLERY - Loads photos from gallery.json
// Photos are managed via the admin panel at /admin (Decap CMS)
// Or by editing gallery.json directly

let galleryData = [];

// Helper: normalize image filename to avoid duplicated "images/" prefix
function getImagePath(filename) {
    if (!filename) return '';
    // If filename already starts with "images/", return as-is
    if (filename.startsWith('images/')) return filename;
    // Otherwise, prepend "images/"
    return `images/${filename}`;
}

// Load gallery data from JSON file
async function loadGalleryData() {
    try {
        const response = await fetch('gallery.json');
        if (!response.ok) throw new Error('No se pudo cargar gallery.json');
        const data = await response.json();
        galleryData = data.photos || [];
    } catch (error) {
        console.error('Error cargando la galería:', error);
        galleryData = [];
    }
    renderGallery();
}

// Function to render gallery dynamically
function renderGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    // Clear any existing content
    container.innerHTML = '';
    
    galleryData.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'relative group overflow-hidden rounded-2xl cursor-pointer card-hover';
        
        photoCard.innerHTML = `
            <div class="aspect-square overflow-hidden">
                <img 
                    src="${getImagePath(photo.filename)}" 
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
                src="${getImagePath(photo.filename)}" 
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
    
    img.src = getImagePath(newPhoto.filename);
    img.alt = newPhoto.title;
    title.textContent = newPhoto.title;
    description.textContent = newPhoto.description;
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePhoto(-1);
    if (e.key === 'ArrowRight') navigatePhoto(1);
}

// Initialize gallery: load data from JSON and render when DOM is ready
document.addEventListener('DOMContentLoaded', loadGalleryData);