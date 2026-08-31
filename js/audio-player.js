// Reproductor de Audio - La Skina
// Usa la API de iTunes Search para obtener previews reales de 30 segundos

function initAudioPlayer() {
    const canciones = [
        { titulo: 'September', artista: 'Earth Wind & Fire', termino: 'September Earth Wind Fire' },
        { titulo: 'Billie Jean', artista: 'Michael Jackson', termino: 'Billie Jean Michael Jackson' },
        { titulo: 'Superstition', artista: 'Stevie Wonder', termino: 'Superstition Stevie Wonder' },
        { titulo: 'Boogie Wonderland', artista: 'Earth Wind & Fire', termino: 'Boogie Wonderland Earth Wind Fire' },
        { titulo: 'Maniac', artista: 'Michael Sembello', termino: 'Maniac Michael Sembello' },
        { titulo: 'Walking on Sunshine', artista: 'Katrina and the Waves', termino: 'Walking on Sunshine Katrina Waves' },
        { titulo: 'Maneater', artista: 'Hall and Oates', termino: 'Maneater Hall Oates' },
        { titulo: 'New Sensation', artista: 'INXS', termino: 'New Sensation INXS' },
        { titulo: 'Heat Is On', artista: 'Glenn Frey', termino: 'Heat Is On Glenn Frey' },
        { titulo: 'Last Train to London', artista: 'Electric Light Orchestra', termino: 'Last Train to London ELO' },
        { titulo: 'Brick House', artista: 'The Commodores', termino: 'Brick House Commodores' },
        { titulo: 'Funky Music', artista: 'Wild Cherry', termino: 'Play That Funky Music Wild Cherry' }
    ];

    const repertorioSection = document.querySelector('#servicios');
    if (!repertorioSection) return;

    const repertorioDiv = repertorioSection.querySelector('.bg-\\[\\#160f2e\\].rounded-2xl.p-8.border.border-\\[\\#00f3ff\\]\\/30');
    if (!repertorioDiv) return;

    // Verificar si ya existe el reproductor
    if (document.getElementById('audio-playlist')) return;

    const playerDiv = document.createElement('div');
    playerDiv.className = 'mt-8 bg-[#0d081d] rounded-xl p-6 border border-[#ff007f]/20';
    playerDiv.innerHTML = `
        <h4 class="text-lg font-bold text-[#ff007f] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21s4.5-2.01 4.5-4.5V6h4V3h-7z"/></svg>
            Escucha un preview de nuestro repertorio
        </h4>
        <p class="text-gray-400 text-sm mb-4">Haz clic en una canción para escuchar un fragmento de 30 segundos</p>
        <div id="audio-playlist" class="grid md:grid-cols-2 gap-3"></div>
        <audio id="audio-player" preload="none" crossorigin="anonymous"></audio>
    `;

    repertorioDiv.appendChild(playerDiv);

    const playlist = document.getElementById('audio-playlist');
    const audioPlayer = document.getElementById('audio-player');
    let currentPlaying = null;
    let currentTrackEl = null;

    // Crear los tracks visualmente
    canciones.forEach((cancion, index) => {
        const track = document.createElement('div');
        track.className = 'audio-track flex items-center gap-3 p-3 bg-[#160f2e] rounded-lg border border-[#00f3ff]/10 hover:border-[#ff007f]/40 cursor-pointer transition-all';
        track.dataset.index = index;
        track.innerHTML = `
            <button class="play-btn flex-shrink-0 w-10 h-10 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-center hover:bg-[#ff007f]/30 transition-all" data-index="${index}">
                <svg class="play-icon w-5 h-5 text-[#ff007f]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <svg class="pause-icon w-5 h-5 text-[#ff007f] hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                <svg class="loading-icon w-5 h-5 text-[#ff007f] hidden animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="40" opacity="0.3"></circle><path d="M12 2a10 10 0 0110 10" stroke-width="3" stroke-linecap="round"></path></svg>
            </button>
            <div class="flex-1 min-w-0">
                <p class="text-white text-sm font-semibold truncate">${cancion.titulo}</p>
                <p class="text-gray-400 text-xs truncate">${cancion.artista}</p>
            </div>
            <span class="text-gray-500 text-xs">30s</span>
        `;
        playlist.appendChild(track);
    });

    // Función para buscar el preview en iTunes
    async function fetchPreviewUrl(termino) {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termino)}&limit=1&media=music&entity=song`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results[0].previewUrl;
            }
        } catch (e) {
            console.error('Error buscando preview:', e);
        }
        return null;
    }

    // Función para reproducir/pausar
    async function togglePlay(index, trackEl) {
        const playIcon = trackEl.querySelector('.play-icon');
        const pauseIcon = trackEl.querySelector('.pause-icon');
        const loadingIcon = trackEl.querySelector('.loading-icon');

        // Si es la misma canción y está sonando, pausar
        if (currentPlaying === index && !audioPlayer.paused) {
            audioPlayer.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            return;
        }

        // Si es la misma canción y está pausada, resumir
        if (currentPlaying === index && audioPlayer.paused && audioPlayer.src) {
            audioPlayer.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            return;
        }

        // Detener la canción anterior
        if (currentTrackEl && currentTrackEl !== trackEl) {
            const prevPlay = currentTrackEl.querySelector('.play-icon');
            const prevPause = currentTrackEl.querySelector('.pause-icon');
            const prevLoading = currentTrackEl.querySelector('.loading-icon');
            prevPlay.classList.remove('hidden');
            prevPause.classList.add('hidden');
            prevLoading.classList.add('hidden');
            currentTrackEl.classList.remove('border-[#ff007f]/60', 'bg-[#ff007f]/10');
        }

        // Mostrar loading
        playIcon.classList.add('hidden');
        pauseIcon.classList.add('hidden');
        loadingIcon.classList.remove('hidden');

        // Buscar el preview URL
        const cancion = canciones[index];
        const previewUrl = await fetchPreviewUrl(cancion.termino);

        loadingIcon.classList.add('hidden');

        if (previewUrl) {
            audioPlayer.src = previewUrl;
            audioPlayer.play();
            pauseIcon.classList.remove('hidden');
            trackEl.classList.add('border-[#ff007f]/60', 'bg-[#ff007f]/10');
            currentPlaying = index;
            currentTrackEl = trackEl;
        } else {
            // Si no se encuentra, mostrar mensaje
            playIcon.classList.remove('hidden');
            const btn = trackEl.querySelector('.play-btn');
            const originalTitle = btn.title;
            btn.title = 'No se encontró el preview';
            setTimeout(() => { btn.title = originalTitle; }, 2000);
        }
    }

    // Asignar eventos a cada track
    playlist.querySelectorAll('.audio-track').forEach(track => {
        track.addEventListener('click', () => {
            const index = parseInt(track.dataset.index);
            togglePlay(index, track);
        });
    });

    // Cuando termina la canción
    audioPlayer.addEventListener('ended', () => {
        if (currentTrackEl) {
            const playIcon = currentTrackEl.querySelector('.play-icon');
            const pauseIcon = currentTrackEl.querySelector('.pause-icon');
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            currentTrackEl.classList.remove('border-[#ff007f]/60', 'bg-[#ff007f]/10');
            currentPlaying = null;
            currentTrackEl = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', initAudioPlayer);
