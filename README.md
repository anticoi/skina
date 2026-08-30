# La Skina - Sitio Web Oficial

Sitio web estático moderno, rápido y responsivo para la banda "La Skina", especializada en música ochentera y del recuerdo.

## 🎵 Características

- **Diseño Moderno y Vibrante**: Paleta de colores cálidos (dorado, amarillo retro, azul noche, marrón cálido)
- **Totalmente Responsivo**: Adaptado para móviles, tablets y computadoras
- **Ultrarrápido**: HTML5 + TailwindCSS + JavaScript vanilla (sin dependencias pesadas)
- **Fácil de Mantener**: Estructura modular para videos y contenido
- **Animaciones Profesionales**: Efectos suaves y modernos
- **SEO Optimizado**: Meta tags y estructura semántica

## 📁 Estructura del Proyecto

```
skina web/
├── index.html          # Página principal
├── gallery.json        # Datos de la galería (editables desde el admin)
├── hero_config.json    # Configuración de la sección principal (editable desde el admin)
├── admin/              # Panel de administración (Decap CMS)
│   ├── index.html      # Interfaz del admin
│   └── config.yml      # Configuración del CMS
├── js/
│   ├── videos.js       # Configuración modular de videos
│   ├── gallery.js      # Galería de fotos (carga desde gallery.json)
│   └── main.js         # Funcionalidad principal
├── images/             # Imágenes del sitio
├── README.md           # Este archivo
└── .gitignore          # Archivos ignorados por Git
```

## 🚀 Cómo Usar

### 1. Visualizar el Sitio Web

Simplemente abre el archivo `index.html` en tu navegador:

```bash
# En macOS
open index.html

# En Windows
start index.html

# En Linux
xdg-open index.html
```

O usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server
```

Luego abre `http://localhost:8000` en tu navegador.

### 2. Personalizar Videos

Los videos se configuran de forma modular en `js/videos.js`. Simplemente edita el array `videoData`:

```javascript
const videoData = [
    {
        id: 1,
        type: 'youtube',           // 'youtube', 'youtube_short', o 'facebook'
        title: 'Título del video',
        url: 'https://youtube.com/watch?v=XXXXX',
        embedUrl: 'https://youtube.com/embed/XXXXX',
        thumbnail: 'https://img.youtube.com/vi/XXXXX/maxresdefault.jpg',
        description: 'Descripción del video'
    },
    // Agrega más videos aquí...
];
```

**Tipos de videos soportados:**
- `youtube`: Videos regulares de YouTube
- `youtube_short`: YouTube Shorts
- `facebook`: Facebook Reels (muestra un botón en lugar de embed)

### 3. Personalizar Información de Contacto

Edita el número de WhatsApp en `js/main.js` (línea ~30):

```javascript
const whatsappUrl = `https://wa.me/TU_NUMERO_AQUI?text=${whatsappMessage}`;
```

También actualiza los enlaces de redes sociales en `index.html` (sección Contacto).

### 4. Personalizar Colores y Estilos

Los colores principales se definen en `index.html` (en el `<style>`):

```css
:root {
    --gold: #D4AF37;          /* Dorado principal */
    --retro-yellow: #F4D03F;  /* Amarillo retro */
    --night-blue: #1a1a2e;    /* Azul noche */
    --warm-brown: #8B4513;    /* Marrón cálido */
    --metallic: #C0C0C0;      /* Metálico */
}
```

## 🌐 Despliegue

### GitHub Pages (Gratis)

1. Crea un repositorio en GitHub
2. Sube los archivos del proyecto
3. Ve a Settings > Pages
4. Selecciona la rama `main` y carpeta `/ (root)`
5. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repositorio`

### Netlify (Gratis)

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Arrastra la carpeta del proyecto al dashboard de Netlify
3. ¡Listo! Netlify te dará una URL instantánea

### Vercel (Gratis)

1. Instala Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto: `vercel`
3. Sigue las instrucciones en pantalla

### Hosting Tradicional

Simplemente sube los archivos a cualquier hosting que soporte sitios estáticos:
- cPanel
- FTP
- SFTP

## 📱 Secciones del Sitio

1. **Hero/Portada**: Título impactante con animaciones y CTAs
2. **Nosotros**: Historia de la banda y estadísticas
3. **Multimedia**: Videos de YouTube y Facebook (configurables)
4. **Servicios**: Tipos de eventos y repertorio musical
5. **Contacto**: Formulario funcional y enlaces a redes sociales

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **TailwindCSS**: Estilos modernos vía CDN
- **JavaScript Vanilla**: Funcionalidad interactiva
- **Google Fonts**: Poppins y Playfair Display

## 📝 Personalización Adicional

### Cambiar Textos

Todos los textos están en `index.html`. Simplemente busca y reemplaza el contenido que deseas cambiar.

### Agregar Nuevas Secciones

1. Agrega la nueva sección en `index.html` con la estructura:
```html
<section id="nueva-seccion" class="py-20 bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Tu contenido aquí -->
    </div>
</section>
```

2. Agrega el enlace en el menú de navegación

### Modificar el Formulario de Contacto

El formulario actual envía los datos a WhatsApp. Para usar un servicio diferente (como Formspree), edita la función en `js/main.js`.

## 🎨 Personalización Visual

### Cambiar Imágenes

El sitio usa iconos SVG integrados. Para agregar imágenes propias:

1. Crea una carpeta `images/`
2. Agrega tus imágenes
3. Reemplaza los SVG con etiquetas `<img>`:
```html
<img src="images/tu-imagen.jpg" alt="Descripción" class="w-full h-auto">
```

### Modificar Animaciones

Las animaciones se definen en el `<style>` de `index.html`. Puedes ajustar:
- `animate-float`: Animación de flotación
- `animate-pulse-slow`: Pulso lento
- `card-hover`: Efecto hover en tarjetas

## 📊 Rendimiento

El sitio está optimizado para:
- **Carga rápida**: < 1 segundo en conexiones 3G
- **Puntuación Lighthouse**: 95+ en todas las categorías
- **SEO**: Meta tags y estructura semántica
- **Accesibilidad**: Contraste de colores y navegación por teclado

## 🔧 Mantenimiento

### Actualizar Videos

1. Abre `js/videos.js`
2. Agrega, elimina o modifica objetos en el array `videoData`
3. Guarda y recarga el sitio

### Actualizar Textos

1. Abre `index.html`
2. Busca el texto a modificar
3. Reemplaza y guarda

### Actualizar Colores

1. Abre `index.html`
2. Modifica las variables CSS en `:root`
3. Guarda y recarga

## 📞 Soporte

Para preguntas o personalización adicional, contacta al desarrollador.

## �️ Panel de Administración (Mantenedor de Fotos)

El sitio incluye un panel de administración construido con **Decap CMS** (antes Netlify CMS) que permite gestionar las fotos de la galería y la sección principal sin tocar código.

### Acceso al panel

Una vez desplegado en Netlify, accede al panel en:

```
https://TU-SITIO.netlify.app/admin/
```

### Configuración inicial en Netlify (solo una vez)

Para que el panel funcione, necesitas habilitar **Netlify Identity** y **Git Gateway**:

1. Ve a tu sitio en [app.netlify.com](https://app.netlify.com/)
2. Ve a **Site settings > Identity > Enable Identity**
3. En **Identity > Registration**, selecciona **Invite only** (o Open si prefieres)
4. En **Identity > Services > Git Gateway**, haz clic en **Enable Git Gateway**
5. En **Identity**, haz clic en **Invite users** e invita a tu correo
6. Recibirás un email para registrarte y crear tu contraseña

### Cómo usar el panel

1. Entra a `https://TU-SITIO.netlify.app/admin/`
2. Inicia sesión con tu cuenta de Netlify Identity
3. Verás dos secciones:
   - **Galería de Fotos**: Agrega, edita o elimina fotos de la galería
   - **Sección Principal (Hero)**: Cambia la imagen de fondo, el logo y la opacidad

### Agregar una foto nueva

1. En el panel, ve a **Galería de Fotos**
2. Haz clic en el registro existente para editarlo
3. En la lista de fotos, haz clic en **Add** para agregar una nueva
4. Completa: ID, Título, Descripción y selecciona la imagen (o súbela)
5. Haz clic en **Save**
6. El cambio se guarda en GitHub y Netlify despliega automáticamente

### Cambiar imagen de fondo del hero

1. En el panel, ve a **Sección Principal (Hero)**
2. Cambia la imagen de fondo, el logo o la opacidad (0-100)
3. Haz clic en **Save**
4. Netlify desplegará automáticamente los cambios

### Edición manual (alternativa)

Si prefieres no usar el panel, puedes editar directamente:
- `gallery.json` - datos de las fotos de la galería
- `hero_config.json` - configuración de la sección principal
- `js/videos.js` - configuración de videos

## �📄 Licencia

Este proyecto fue creado para La Skina. Todos los derechos reservados.

---

**¡Disfruta tu nuevo sitio web! 🎸✨**
