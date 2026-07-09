document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ANIMACIONES DE ENTRADA AL HACER SCROLL
    // ==========================================
    const seccionesARevelar = document.querySelectorAll('section, table, .video-container');
    
    // Añadimos la clase inicial
    seccionesARevelar.forEach(seccion => seccion.classList.add('revelar'));

    const revelarEnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85; // Punto de activación

        seccionesARevelar.forEach(seccion => {
            const seccionTop = seccion.getBoundingClientRect().top;

            if (seccionTop < triggerBottom) {
                seccion.classList.add('visible');
            }
        });
    };

    // Escuchamos el evento scroll y lanzamos una vez al cargar
    window.addEventListener('scroll', revelarEnScroll);
    revelarEnScroll(); 


    // ==========================================
    // 2. TABLA DE DECLINACIÓN INTERACTIVA
    // ==========================================
    // Datos para las micro-explicaciones (puedes ampliar esto)
    const infoDeclinacion = {
        'den / einen': {
            caso: 'Acusativo Masculino',
            regla: '¡Única forma que cambia en Acusativo!',
            ejemplo: 'Ich suche den Schlüssel.'
        },
        'dem / einem': {
            caso: 'Dativo Masculino/Neutro',
            regla: 'El artículo "der" y "das" se convierten en "dem".',
            ejemplo: 'Ich helfe dem Mann / dem Kind.'
        },
        'der / einer': {
            caso: 'Dativo Femenino',
            regla: '¡Cuidado! El artículo "die" se convierte en "der". No confundir con Nominativo.',
            ejemplo: 'Ich danke der Frau.'
        },
        'den / --- (+N)': {
            caso: 'Dativo Plural',
            regla: 'El artículo es "den" y CASI SIEMPRE se añade "-n" al sustantivo.',
            ejemplo: 'Mit den Kindern.'
        }
    };

    const celdasDeclinacion = document.querySelectorAll('.tabla-declinacion td');
    const explicacionSeccion = document.getElementById('explicacion');

    // Creamos un elemento para la micro-explicación (Flashcard)
    const flashcard = document.createElement('div');
    flashcard.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: white; padding: 20px; border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        border-left: 5px solid #004080; width: 280px;
        transform: translateY(120%); transition: transform 0.3s ease;
        z-index: 1000; display: none;
    `;
    document.body.appendChild(flashcard);

    celdasDeclinacion.forEach(celda => {
        const textoCelda = celda.textContent.trim();
        
        // Solo hacemos interactivas las celdas con declinación específica
        if (infoDeclinacion[textoCelda]) {
            celda.classList.add('celda-interactiva');
            celda.title = 'Clic para info y audio';

            celda.addEventListener('click', () => {
                // 1. Mostrar Flashcard con info
                const info = infoDeclinacion[textoCelda];
                flashcard.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <strong style="color:#004080; font-size:1.1rem;">${textoCelda}</strong>
                        <span style="font-size:0.8rem; color:#64748b; background:#f1f5f9; padding:2px 6px; border-radius:4px;">${info.caso}</span>
                    </div>
                    <p style="margin: 0 0 8px 0; font-size:0.9rem;"><strong>Regla:</strong> ${info.regla}</p>
                    <p style="margin:0; font-size:0.9rem; color:#64748b; font-style:italic;">Ex: ${info.ejemplo}</p>
                    <button id="close-flashcard" style="position:absolute; top:5px; right:5px; background:none; border:none; color:#64748b; padding:0; cursor:pointer; font-size:1.2rem; width:auto; margin:0;">&times;</button>
                `;
                flashcard.style.display = 'block';
                setTimeout(() => flashcard.style.transform = 'translateY(0)', 10);

                // Botón cerrar flashcard
                document.getElementById('close-flashcard').addEventListener('click', () => {
                    flashcard.style.transform = 'translateY(120%)';
                    setTimeout(() => flashcard.style.display = 'none', 300);
                });

                // 2. Reproducir Audio (Ejemplo simplificado)
                // Necesitas archivos como 'den.mp3' en una carpeta /audio
                // const audioMap = { 'den / einen': 'den.mp3', ... };
                // const audio = new Audio(`audio/${audioMap[textoCelda]}`);
                // audio.play().catch(e => console.log("Audio no encontrado:", e));
                
                // Efecto visual sutil en la celda
                celda.style.backgroundColor = '#bae6fd'; 
                setTimeout(() => celda.style.backgroundColor = '', 400);
            });
        }
    });


    // ==========================================
    // 3. BARRA DE PROGRESO DEL CUESTIONARIO
    // ==========================================
    const quizForm = document.getElementById('quiz-form');
    const preguntasContainer = document.getElementById('preguntas-container');
    
    // Crear la estructura de la barra de progreso
    const progressContainer = document.createElement('div');
    progressContainer.className = 'quiz-progress-container';
    progressContainer.innerHTML = '<div class="quiz-progress-bar"></div>';
    quizForm.insertBefore(progressContainer, preguntasContainer);
    
    const progressBar = progressContainer.querySelector('.quiz-progress-bar');
    
    // Función para actualizar la barra
    const actualizarProgreso = () => {
        const totalPreguntas = 15; // Tu número de preguntas
        const preguntasRespondidas = quizForm.querySelectorAll('input[type="radio"]:checked').length;
        const porcentaje = (preguntasRespondidas / totalPreguntas) * 100;
        
        // Mostrar la barra si hay al menos una respuesta
        if (preguntasRespondidas > 0) progressContainer.style.display = 'block';
        
        progressBar.style.width = `${porcentaje}%`;
    };
    
    // Escuchar cambios en el formulario (delegación de eventos)
    quizForm.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            actualizarProgreso();
            
            // Efecto visual en el bloque de pregunta respondido
            const bloquePregunta = e.target.closest('.pregunta-bloque');
            bloquePregunta.style.borderLeft = '5px solid #3b82f6';
            bloquePregunta.style.backgroundColor = '#eff6ff';
        }
    });


    // ==========================================
    // 4. LÓGICA DEL CUESTIONARIO (TU CÓDIGO BASE)
    // ==========================================
    
    // [¡IMPORTANTE!] Aquí debe ir tu código existente que genera las 15 preguntas
    // dentro de 'preguntasContainer'. He incluido una pregunta de ejemplo abajo 
    // para que la estructura funcione, pero debes usar tu generador real.

    const generarPreguntasEjemplo = () => {
        // ... Tu lógica real para cargar las 15 preguntas va aquí ...
        // Ejemplo de estructura requerida para que funcione la interactividad:
        for (let i = 1; i <= 15; i++) {
            const preguntaBloque = document.createElement('div');
            preguntaBloque.className = 'pregunta-bloqueRevelar'; // Importante para la animación de scroll
            preguntaBloque.className = 'pregunta-bloque';
            preguntaBloque.innerHTML = `
                <p>${i}. Hast du ___ Schlüssel (m.) gefunden?</p>
                <label class="opcion"><input type="radio" name="p${i}" value="den"> den</label>
                <label class="opcion"><input type="radio" name="p${i}" value="der"> der</label>
                <label class="opcion"><input type="radio" name="p${i}" value="dem"> dem</label>
            `;
            preguntasContainer.appendChild(preguntaBloque);
        }
        
        // Hacemos que los bloques de preguntas también tengan la animación de revelado
        const preguntasBloques = document.querySelectorAll('.pregunta-bloque');
        preguntasBloques.forEach(bloque => bloque.classList.add('revelar'));
        // Re-lanzamos la función de revelado para las preguntas visibles
        revelarEnScroll();
    };
    
    generarPreguntasEjemplo(); // Borra esto y usa tu generador real


    // Lógica de calificación (Adaptada de tu código original)
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('student-name').value;
        let score = 0;
        const total = 15;

        // Respuestas correctas (Ejemplo, usa las tuyas)
        const respuestasCorrectas = { p1: 'den', p2: 'den', p3: 'dem' /* ... p15 */ };

        for (let i = 1; i <= total; i++) {
            const respuesta = quizForm[`p${i}`]?.value;
            if (respuesta === respuestasCorrectas[`p${i}`]) score++;
        }

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.classList.remove('oculto');
        
        // Efecto suave de aparición
        resultadoDiv.style.opacity = 0;
        setTimeout(() => resultadoDiv.style.opacity = 1, 50);

        if (score === total) {
            resultadoDiv.className = 'correcto';
            resultadoDiv.innerHTML = `¡Perfecto, ${studentName}! 🎉 ${score}/${total}. ¡Dominas los casos!`;
        } else if (score >= total / 2) {
            resultadoDiv.className = 'regular';
            resultadoDiv.innerHTML = `¡Buen intento, ${studentName}! 👍 ${score}/${total}. Repasa la tabla e inténtalo de nuevo.`;
        } else {
            resultadoDiv.className = 'incorrecto';
            resultadoDiv.innerHTML = `Sigue practicando, ${studentName}. 📚 ${score}/${total}. ¡No te rindas!`;
        }

        // Registrar en el historial (Tu lógica original)
        const listaResultados = document.getElementById('lista-resultados');
        const nuevoResultado = document.createElement('li');
        nuevoResultado.innerHTML = `<strong>${studentName}</strong>: ${score}/${total} (Caso: ${resultadoDiv.className})`;
        
        // Determinar color del borde izquierdo basado en la nota
        const colores = { correcto: '#10b981', regular: '#f59e0b', incorrecto: '#ef4444' };
        nuevoResultado.style.borderLeftColor = colores[resultadoDiv.className];
        
        listaResultados.prepend(nuevoResultado);

        // Scroll suave hacia el resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
