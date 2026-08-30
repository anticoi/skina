// MODULAR VIDEO DATA - Easy to add, remove, or update videos
// Simply add or remove objects from this array to update the multimedia section

const videoData = [
    {
        id: 1,
        type: 'youtube',
        title: 'La Skina - Presentación en Vivo',
        url: 'https://www.youtube.com/watch?v=XJM9F4gHwk0',
        embedUrl: 'https://www.youtube.com/embed/XJM9F4gHwk0',
        thumbnail: 'https://img.youtube.com/vi/XJM9F4gHwk0/maxresdefault.jpg',
        description: 'Disfruta de nuestra energía en escena'
    },
    {
        id: 2,
        type: 'youtube',
        title: 'Clásicos de los 80',
        url: 'https://www.youtube.com/watch?v=ECNHUMSctr4',
        embedUrl: 'https://www.youtube.com/embed/ECNHUMSctr4',
        thumbnail: 'https://img.youtube.com/vi/ECNHUMSctr4/maxresdefault.jpg',
        description: 'Los mejores clásicos de la década de los 80'
    },
    {
        id: 3,
        type: 'youtube',
        title: 'Baladas del Recuerdo',
        url: 'https://www.youtube.com/watch?v=VYCCRRUXQDk',
        embedUrl: 'https://www.youtube.com/embed/VYCCRRUXQDk',
        thumbnail: 'https://img.youtube.com/vi/VYCCRRUXQDk/maxresdefault.jpg',
        description: 'Baladas emotivas que marcaron época'
    },
    {
        id: 4,
        type: 'youtube_short',
        title: 'La Skina - Short',
        url: 'https://www.youtube.com/shorts/wYmXr4sVlIQ',
        embedUrl: 'https://www.youtube.com/embed/wYmXr4sVlIQ',
        thumbnail: 'https://img.youtube.com/vi/wYmXr4sVlIQ/maxresdefault.jpg',
        description: 'Un vistazo rápido a nuestra música'
    },
    {
        id: 5,
        type: 'facebook',
        title: 'Facebook Reel',
        url: 'https://www.facebook.com/reel/28192891803737665',
        embedUrl: null, // Facebook reels don't support direct embedding
        thumbnail: null,
        description: 'Síguenos en Facebook para más contenido'
    },
    {
        id: 6,
        type: 'local',
        title: 'La Skina en Golden Music',
        url: 'videos/skina_golden_music.mp4',
        embedUrl: null,
        thumbnail: null,
        description: 'Banda La Skina llega a Golden Music - Música en vivo desde las 22:00 hrs'
    },
    {
        id: 7,
        type: 'local',
        title: 'La Skina - Show en Vivo',
        url: 'videos/skina_video2.mp4',
        embedUrl: null,
        thumbnail: null,
        description: 'Otra presentación de La Skina en vivo'
    }
];

// Function to render videos dynamically
function renderVideos() {
    const container = document.getElementById('videos-container');
    
    videoData.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'bg-gray-900 rounded-2xl overflow-hidden border border-gold/20 card-hover';
        
        if (video.type === 'local') {
            // Local video file - use HTML5 video player
            videoCard.innerHTML = `
                <div class="video-container bg-black">
                    <video 
                        src="${video.url}" 
                        title="${video.title}"
                        controls
                        preload="metadata"
                        playsinline
                    ></video>
                </div>
                <div class="p-6 text-center">
                    <h3 class="text-xl font-bold text-gold mb-2">${video.title}</h3>
                    <p class="text-gray-400">${video.description}</p>
                </div>
            `;
        } else if (video.type === 'facebook') {
            // Facebook Reel - Show button/link instead of embed
            videoCard.innerHTML = `
                <div class="p-6">
                    <div class="flex items-center justify-center h-48 bg-blue-600/20 rounded-lg mb-4">
                        <svg class="w-16 h-16 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gold mb-2">${video.title}</h3>
                    <p class="text-gray-400 mb-4">${video.description}</p>
                    <a href="${video.url}" target="_blank" class="inline-flex items-center space-x-2 btn-primary px-6 py-3 rounded-full text-gray-900 font-semibold">
                        <span>Ver en Facebook</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
            `;
        } else {
            // YouTube videos (regular and shorts)
            videoCard.innerHTML = `
                <div class="video-container">
                    <iframe 
                        src="${video.embedUrl}" 
                        title="${video.title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gold mb-2">${video.title}</h3>
                    <p class="text-gray-400">${video.description}</p>
                    <a href="${video.url}" target="_blank" class="inline-flex items-center space-x-2 text-gold hover:underline mt-4">
                        <span>Ver en YouTube</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </div>
            `;
        }
        
        container.appendChild(videoCard);
    });
}

// Initialize video rendering when DOM is ready
document.addEventListener('DOMContentLoaded', renderVideos);
