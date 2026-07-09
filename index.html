// Código Completo e Interactivo Global para script.js

document.addEventListener('DOMContentLoaded', () => {
    // REEMPLAZA ESTA URL POR LA URL REAL QUE TE DIO GOOGLE APPS SCRIPT AL IMPLEMENTAR
    const WEB_APP_URL = "PASAR_AQUÍ_TU_URL_DE_GOOGLE_APPS_SCRIPT";

    // Base de datos de los 15 ejercicios didácticos (Alemán A2)
    const questions = [
        { id: 1, text: "1. Der Mann trägt ______ schweren Karton (m.).", options: ["ein", "einen", "einem"], correct: "einen" },
        { id: 2, text: "2. Die Katze schläft in ______ Karton (m.).", options: ["den", "der", "dem"], correct: "dem" },
        { id: 3, text: "3. Auf dem Boden liegt ______ großer Rucksack (m.).", options: ["ein", "einen", "einem"], correct: "ein" },
        { id: 4, text: "4. Die Frau stellt eine Lampe auf ______ Regal (n.).", options: ["das", "dem", "des"], correct: "das" },
        { id: 5, text: "5. Der Rucksack liegt neben ______ Gitarre (f.).", options: ["die", "der", "den"], correct: "der" },
        { id: 6, text: "6. Ich helfe ______ Mann (m.) bei dem Umzug.", options: ["den", "dem", "der"], correct: "dem" },
        { id: 7, text: "7. Das Buch ist für ______ Lehrerin (f.).", options: ["eine", "einer", "einen"], correct: "eine" },
        { id: 8, text: "8. Wir wohnen seit ______ Monat (m.) en Berlin.", options: ["einen", "einem", "ein"], correct: "einem" },
        { id: 9, text: "9. Suchst du ______ alten Schlüssel (m.)?", options: ["der", "den", "dem"], correct: "den" },
        { id: 10, text: "10. Das Kind spielt mit ______ neuen Spielzeugen (Plural).", options: ["die", "den", "der"], correct: "den" },
        { id: 11, text: "11. Herr Schmidt dankt ______ Kollegin (f.) für die Hilfe.", options: ["die", "der", "den"], correct: "der" },
        { id: 12, text: "12. Gehört das Auto ______ neuen Nachbarn (m.)?", options: ["den", "dem", "des"], correct: "dem" },
        { id: 13, text: "13. Wir gehen durch ______ schönen Park (m.).", options: ["der", "den", "dem"], correct: "den" },
        { id: 14, text: "14. Er ist ______ kluger Student (m.).", options: ["ein", "einen", "einem"], correct: "ein" },
        { id: 15, text: "15. Das Fahrrad steht vor ______ Haus (n.).", options: ["das", "dem", "den"], correct: "dem" }
    ];

    const preguntasContainer = document.getElementById('preguntas-container');
    const quizForm = document.getElementById('quiz-form');
    const resultadoDiv = document.getElementById('resultado');
    const listaResultados = document.getElementById('lista-resultados');

    // Renderizar las 15 preguntas de forma dinámica en la interfaz
    questions.forEach((q) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'pregunta-block';
        questionDiv.style.marginBottom = '15px';

        const label = document.createElement('p');
        label.style.fontWeight = 'bold';
        label.style.margin = '5px 0';
        label.textContent = q.text;
        questionDiv.appendChild(label);

        q.options.forEach((opt) => {
            const optLabel = document.createElement('label');
            optLabel.style.display = 'block';
            optLabel.style.marginLeft = '15px';
            optLabel.style.cursor = 'pointer';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `pregunta-${q.id}`;
            radio.value = opt;
            radio.required = true;
            radio.style.marginRight = '8px';

            optLabel.appendChild(radio);
            optLabel.appendChild(document.createTextNode(opt));
            questionDiv.appendChild(optLabel);
        });

        preguntasContainer.appendChild(questionDiv);
    });

    // Cargar el historial global directamente desde la nube de Google Sheets
    cargarHistorialGlobal();

    // Manejar el envío del cuestionario y posteo en la nube
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreEstudiante = document.getElementById('student-name').value.trim();
        let aciertos = 0;

        questions.forEach((q) => {
            const selectedOpt = document.querySelector(`input[name="pregunta-${q.id}"]:checked`);
            if (selectedOpt && selectedOpt.value === q.correct) {
                aciertos++;
            }
        });

        // Configuración visual del feedback del usuario actual
        resultadoDiv.className = "";
        resultadoDiv.style.padding = "15px";
        resultadoDiv.style.marginTop = "15px";
        resultadoDiv.style.borderRadius = "5px";
        resultadoDiv.style.fontWeight = "bold";
        
        if (aciertos >= 10) {
            resultadoDiv.style.backgroundColor = "#d4edda";
            resultadoDiv.style.color = "#155724";
            resultadoDiv.textContent = `Sehr gut, ${nombreEstudiante}! Has obtenido un puntaje de ${aciertos} / 15. Enviando a la base de datos...`;
        } else {
            resultadoDiv.style.backgroundColor = "#f8d7da";
            resultadoDiv.style.color = "#721c24";
            resultadoDiv.textContent = `Sigue practicando, ${nombreEstudiante}. Has obtenido un puntaje de ${aciertos} / 15. Guardando registro...`;
        }

        // Crear el paquete de datos estructurado JSON
        const nuevoRegistro = {
            nombre: nombreEstudiante,
            nota: aciertos,
            fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " + new Date().toLocaleDateString()
        };

        // Guardar el registro en la nube mediante una petición HTTP POST
        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Evita problemas de políticas CORS cruzadas entre servidores
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoRegistro)
        })
        .then(() => {
            // Esperamos un segundo para que Google Sheets procese e inmediatamente refrescamos la lista global
            setTimeout(() => {
                cargarHistorialGlobal();
                quizForm.reset();
            }, 1000);
        })
        .catch(error => {
            console.error('Error al guardar en la nube:', error);
            resultadoDiv.textContent = "Error de conexión con la base de datos central.";
        });
    });

    // Función global para leer las calificaciones desde la base de datos de Google Sheets
    function cargarHistorialGlobal() {
        listaResultados.innerHTML = "<li style='color: #003366; font-style: italic;'>Conectando con el servidor de calificaciones...</li>";

        fetch(WEB_APP_URL)
        .then(response => response.json())
        .then(historial => {
            renderizarListaGlobal(historial);
        })
        .catch(error => {
            console.error('Error al leer de la nube:', error);
            listaResultados.innerHTML = "<li style='color: #dc3545;'>No se pudo cargar el historial global en este dispositivo.</li>";
        });
    }

    // Función para renderizar los elementos HTML de la lista acumulativa en pantalla
    function renderizarListaGlobal(historial) {
        listaResultados.innerHTML = "";
        
        if (!historial || historial.length === 0) {
            listaResultados.innerHTML = "<li style='color: #666; font-style: italic;'>No hay calificaciones globales registradas todavía.</li>";
            return;
        }

        // Pintamos el array de atrás hacia adelante para que la nota más reciente esté arriba
        historial.slice().reverse().forEach((reg) => {
            const li = document.createElement('li');
            li.style.padding = '10px';
            li.style.borderBottom = '1px solid #e2e8f0';
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.innerHTML = `<span><strong>Estudiante:</strong> ${reg.nombre}</span> 
                            <span><strong>Calificación:</strong> <span style="color: ${reg.nota >= 10 ? '#28a745' : '#dc3545'}; font-weight: bold;">${reg.nota} / 15</span> <small style="color: #666; margin-left: 10px;">(${reg.fecha})</small></span>`;
            listaResultados.appendChild(li);
        });
    }
});
