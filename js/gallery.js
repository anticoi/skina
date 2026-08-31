// MODULAR PHOTO GALLERY - Loads photos from gallery.json
// Photos are managed via the admin panel at /admin (Decap CMS)
// Or by editing gallery.json directly

let galleryData = [];
let currentPage = 1;
const photosPerPage = 12;
let currentLightboxIndex = 0;

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
    currentPage = 1;
    renderGallery();
}

// Get total pages
function getTotalPages() {
    return Math.ceil(galleryData.length / photosPerPage);
}

// Function to render gallery dynamically with pagination
function renderGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    const totalPages = getTotalPages();
    const startIndex = (currentPage - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const pagePhotos = galleryData.slice(startIndex, endIndex);

    pagePhotos.forEach((photo, idx) => {
        const globalIndex = startIndex + idx;
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
        photoCard.addEventListener('click', () => openLightbox(globalIndex));

        container.appendChild(photoCard);
    });

    // Render pagination controls
    renderPagination(totalPages);
}

// Render pagination controls
function renderPagination(totalPages) {
    if (totalPages <= 1) return;

    const container = document.getElementById('gallery-container');
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'col-span-full flex items-center justify-center gap-2 mt-8 flex-wrap';
    paginationDiv.id = 'gallery-pagination';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
    `;
    prevBtn.className = 'w-10 h-10 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-center text-[#ff007f] hover:bg-[#ff007f]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderGallery();
            scrollToGallery();
        }
    });
    paginationDiv.appendChild(prevBtn);

    // Page numbers
    const maxVisiblePages = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page + ellipsis
    if (startPage > 1) {
        paginationDiv.appendChild(createPageButton(1));
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'text-gray-500 px-2';
            paginationDiv.appendChild(ellipsis);
        }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
        paginationDiv.appendChild(createPageButton(i));
    }

    // Last page + ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'text-gray-500 px-2';
            paginationDiv.appendChild(ellipsis);
        }
        paginationDiv.appendChild(createPageButton(totalPages));
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
    `;
    nextBtn.className = 'w-10 h-10 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-center text-[#ff007f] hover:bg-[#ff007f]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderGallery();
            scrollToGallery();
        }
    });
    paginationDiv.appendChild(nextBtn);

    // Page info
    const pageInfo = document.createElement('div');
    pageInfo.className = 'col-span-full text-center text-gray-400 text-sm mt-2';
    pageInfo.textContent = `Página ${currentPage} de ${totalPages} · ${galleryData.length} fotos en total`;
    paginationDiv.appendChild(pageInfo);

    container.appendChild(paginationDiv);
}

// Create a page number button
function createPageButton(pageNum) {
    const btn = document.createElement('button');
    btn.textContent = pageNum;
    if (pageNum === currentPage) {
        btn.className = 'w-10 h-10 rounded-full bg-gradient-to-br from-[#ff007f] to-[#9d00ff] flex items-center justify-center text-white font-bold transition-all';
    } else {
        btn.className = 'w-10 h-10 rounded-full bg-[#0d081d] border border-[#00f3ff]/30 flex items-center justify-center text-gray-300 hover:bg-[#00f3ff]/10 hover:text-[#00f3ff] transition-all';
    }
    btn.addEventListener('click', () => {
        currentPage = pageNum;
        renderGallery();
        scrollToGallery();
    });
    return btn;
}

// Scroll to gallery section
function scrollToGallery() {
    const gallerySection = document.getElementById('galeria');
    if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Lightbox functionality
function openLightbox(globalIndex) {
    currentLightboxIndex = globalIndex;
    const photo = galleryData[globalIndex];

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
                <p class="text-gray-500 text-sm mt-2">Foto ${globalIndex + 1} de ${galleryData.length}</p>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

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
    let newIndex = currentLightboxIndex + direction;

    // Wrap around
    if (newIndex < 0) newIndex = galleryData.length - 1;
    if (newIndex >= galleryData.length) newIndex = 0;

    currentLightboxIndex = newIndex;
    const newPhoto = galleryData[newIndex];

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    // Update image and text
    const img = lightbox.querySelector('img');
    const title = lightbox.querySelector('h3');
    const description = lightbox.querySelector('p');
    const counter = lightbox.querySelectorAll('p')[1];

    img.src = getImagePath(newPhoto.filename);
    img.alt = newPhoto.title;
    title.textContent = newPhoto.title;
    description.textContent = newPhoto.description;
    if (counter) counter.textContent = `Foto ${newIndex + 1} de ${galleryData.length}`;
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigatePhoto(-1);
    if (e.key === 'ArrowRight') navigatePhoto(1);
}

// Initialize gallery: load data from JSON and render when DOM is ready
document.addEventListener('DOMContentLoaded', loadGalleryData);
