// Reproductor de Audio - La Skina
// Muestra previews de 30 segundos de canciones del repertorio

function initAudioPlayer() {
    // Lista de canciones con metadatos (usando URLs de preview de iTunes/Apple Music)
    const canciones = [
        { titulo: 'September', artista: 'Earth, Wind & Fire', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/8b/3a/5e8b3a87-8b1b-7b8f-8b8f-8b8f8b8f8b8f/mzaf_12345678901234567890.mp3' },
        { titulo: 'Billie Jean', artista: 'Michael Jackson', preview: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/8b/3a/5e8b3a87-8b1b-7b8f-8b8f-8b8f8b8f8b8f/mzaf_12345678901234567891.mp3' },
        { titulo: 'Superstition', artista: 'Stevie Wonder', preview: '' },
        { titulo: 'Boogie Wonderland', artista: 'Earth, Wind & Fire', preview: '' },
        { titulo: 'Maniac', artista: 'Michael Sembello', preview: '' },
        { titulo: 'Walking on Sunshine', artista: 'Katrina & The Waves', preview: '' },
        { titulo: 'Maneater', artista: 'Hall & Oates', preview: '' },
        { titulo: 'New Sensation', artista: 'INXS', preview: '' },
        { titulo: 'Heat Is On', artista: 'Glenn Frey', preview: '' },
        { titulo: 'Last Train to London', artista: 'Electric Light Orchestra', preview: '' },
        { titulo: 'Brick House', artista: 'The Commodores', preview: '' },
        { titulo: 'Funky Music', artista: 'Wild Cherry', preview: '' }
    ];

    // Crear la sección de reproductor
    const repertorioSection = document.querySelector('#servicios');
    if (!repertorioSection) return;

    // Buscar el div del repertorio
    const repertorioDiv = repertorioSection.querySelector('.bg-\\[\\#160f2e\\].rounded-2xl.p-8.border.border-\\[\\#00f3ff\\]\\/30');
    if (!repertorioDiv) return;

    // Crear el reproductor
    const playerDiv = document.createElement('div');
    playerDiv.className = 'mt-8 bg-[#0d081d] rounded-xl p-6 border border-[#ff007f]/20';
    playerDiv.innerHTML = `
        <h4 class="text-lg font-bold text-[#ff007f] mb-4 flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21s4.5-2.01 4.5-4.5V6h4V3h-7z"/></svg>
            Escucha un preview de nuestro repertorio
        </h4>
        <p class="text-gray-400 text-sm mb-4">Haz clic en una canción para escuchar un fragmento de 30 segundos</p>
        <div id="audio-playlist" class="grid md:grid-cols-2 gap-3"></div>
        <audio id="audio-player" preload="none"></audio>
    `;

    repertorioDiv.appendChild(playerDiv);

    const playlist = document.getElementById('audio-playlist');
    const audioPlayer = document.getElementById('audio-player');
    let currentPlaying = null;

    canciones.forEach((cancion, index) => {
        const track = document.createElement('div');
        track.className = 'flex items-center gap-3 p-3 bg-[#160f2e] rounded-lg border border-[#00f3ff]/10 hover:border-[#ff007f]/40 cursor-pointer transition-all';
        track.innerHTML = `
            <button class="play-btn flex-shrink-0 w-10 h-10 rounded-full bg-[#ff007f]/20 border border-[#ff007f]/40 flex items-center justify-center hover:bg-[#ff007f]/30 transition-all" data-index="${index}">
                <svg class="play-icon w-5 h-5 text-[#ff007f]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <svg class="pause-icon w-5 h-5 text-[#ff007f] hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <div class="flex-1 min-w-0">
                <p class="text-white text-sm font-semibold truncate">${cancion.titulo}</p>
                <p class="text-gray-400 text-xs truncate">${cancion.artista}</p>
            </div>
            <span class="text-gray-500 text-xs">30s</span>
        `;

        track.querySelector('.play-btn').addEventListener('click', (e) => {
            e.stopPropagation();

            // Si no hay preview disponible
            if (!cancion.preview) {
                const btn = track.querySelector('.play-btn');
                const original = btn.innerHTML;
                btn.innerHTML = '<span class="text-[#ff007f] text-xs">N/A</span>';
                setTimeout(() => { btn.innerHTML = original; }, 1500);
                return;
            }

            // Detener la canción actual
            if (currentPlaying !== null && currentPlaying !== index) {
                const prevTrack = playlist.querySelector(`[data-index="${currentPlaying}"]`).closest('.flex');
                prevTrack.querySelector('.play-icon').classList.remove('hidden');
                prevTrack.querySelector('.pause-icon').classList.add('hidden');
                prevTrack.classList.remove('border-[#ff007f]/60', 'bg-[#ff007f]/10');
            }

            // Toggle play/pause
            const playIcon = track.querySelector('.play-icon');
            const pauseIcon = track.querySelector('.pause-icon');

            if (currentPlaying === index && !audioPlayer.paused) {
                audioPlayer.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            } else {
                audioPlayer.src = cancion.preview;
                audioPlayer.play();
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                track.classList.add('border-[#ff007f]/60', 'bg-[#ff007f]/10');
                currentPlaying = index;
            }
        });

        playlist.appendChild(track);
    });

    // Cuando termina la canción
    audioPlayer.addEventListener('ended', () => {
        if (currentPlaying !== null) {
            const track = playlist.querySelector(`[data-index="${currentPlaying}"]`).closest('.flex');
            track.querySelector('.play-icon').classList.remove('hidden');
            track.querySelector('.pause-icon').classList.add('hidden');
            track.classList.remove('border-[#ff007f]/60', 'bg-[#ff007f]/10');
            currentPlaying = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', initAudioPlayer);
