// Código Completo e Interactivo Global para script.js

document.addEventListener('DOMContentLoaded', () => {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwFAWzmZMRmzERSF_SR2ll7KeTCp0E1I_r4OAACnfXNOrPraS0xEhNXw4_bkCc5vEnuEA/exec";

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

    questions.forEach((q) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'pregunta-bloque';

        const label = document.createElement('p');
        label.textContent = q.text;
        questionDiv.appendChild(label);

        q.options.forEach((opt) => {
            const optLabel = document.createElement('label');
            optLabel.className = 'opcion';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `pregunta-${q.id}`;
            radio.value = opt;
            radio.required = true;

            optLabel.appendChild(radio);
            optLabel.appendChild(document.createTextNode(opt));
            questionDiv.appendChild(optLabel);
        });

        preguntasContainer.appendChild(questionDiv);
    });

    cargarHistorialGlobal();

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

        const nuevoRegistro = {
            nombre: nombreEstudiante,
            nota: aciertos,
            fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " + new Date().toLocaleDateString()
        };

        fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoRegistro)
        })
        .then(() => {
            setTimeout(() => {
                cargarHistorialGlobal();
                quizForm.reset();
            }, 1500);
        })
        .catch(error => {
            console.error('Error al guardar en la nube:', error);
            resultadoDiv.textContent = "Error de conexión con la base de datos central.";
        });
    });

    function cargarHistorialGlobal() {
        listaResultados.innerHTML = "<li style='color: #003366; font-style: italic;'>Conectando con el servidor de calificaciones...</li>";

        const urlSinCache = WEB_APP_URL + "?t=" + new Date().getTime();

        fetch(urlSinCache)
        .then(response => response.json())
        .then(historial => {
            renderizarListaGlobal(historial);
        })
        .catch(error => {
            console.error('Error al leer de la nube:', error);
            listaResultados.innerHTML = "<li style='color: #dc3545;'>No se pudo cargar el historial global en este dispositivo.</li>";
        });
    }

    function renderizarListaGlobal(historial) {
        listaResultados.innerHTML = "";
        
        if (!historial || historial.length === 0) {
            listaResultados.innerHTML = "<li style='color: #666; font-style: italic;'>No hay calificaciones globales registradas todavía.</li>";
            return;
        }

        historial.slice().reverse().forEach((reg) => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.innerHTML = `<span><strong>Estudiante:</strong> ${reg.nombre}</span> 
                            <span><strong>Calificación:</strong> <span style="color: ${reg.nota >= 10 ? '#28a745' : '#dc3545'}; font-weight: bold;">${reg.nota} / 15</span> <small style="color: #666; margin-left: 10px;">(${reg.fecha})</small></span>`;
            listaResultados.appendChild(li);
        });
    }
});
