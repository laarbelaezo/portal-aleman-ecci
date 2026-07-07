const preguntas = [
    {
        pregunta: "1. ___ Mann liest ein Buch. (Nominativo, masculino)",
        opciones: ["Der", "Den", "Dem", "Das"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "2. Ich kaufe ___ Tisch. (Acusativo, masculino)",
        opciones: ["ein", "einen", "einem", "eines"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "3. Die Frau hilft ___ Lehrer. (Dativo, masculino)",
        opciones: ["den", "der", "dem", "das"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "4. ___ Katze ist schwarz. (Nominativo, femenino)",
        opciones: ["Die", "Der", "Das", "Den"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "5. Er trinkt ___ Cola. (Acusativo, femenino)",
        opciones: ["ein", "einen", "eine", "einem"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "6. Das Geschenk ist von ___ Tante. (Dativo, femenino)",
        opciones: ["die", "der", "den", "dem"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "7. ___ Kind spielt im Garten. (Nominativo, neutro)",
        opciones: ["Der", "Die", "Das", "Den"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "8. Wir haben ___ Problem. (Acusativo, neutro)",
        opciones: ["ein", "eine", "einen", "einem"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "9. Das Buch gehört ___ Mädchen. (Dativo, neutro)",
        opciones: ["dem", "den", "das", "der"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "10. ___ Autos sind sehr schnell. (Nominativo, plural)",
        opciones: ["Das", "Die", "Der", "Den"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "11. Ich spreche mit ___ Gästen. (Dativo, plural)",
        opciones: ["die", "den", "der", "dem"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "12. Wir besuchen ___ Großvater. (Acusativo, masculino definido)",
        opciones: ["der", "den", "dem", "das"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "13. Er gibt ___ Kollegin den Bericht. (Dativo, femenino indefinido)",
        opciones: ["eine", "einen", "ein", "einer"],
        respuestaCorrecta: 3
    },
    {
        pregunta: "14. ___ Auto steht hier. (Nominativo, neutro indefinido)",
        opciones: ["Ein", "Eine", "Einen", "Einem"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "15. Sie liest ___ Bücher. (Acusativo, plural definido)",
        opciones: ["das", "die", "den", "der"],
        respuestaCorrecta: 1
    }
];

const contenedorPreguntas = document.getElementById('preguntas-container');
const formulario = document.getElementById('quiz-form');
const divResultado = document.getElementById('resultado');

function cargarPreguntas() {
    preguntas.forEach((q, index) => {
        const bloqueDiv = document.createElement('div');
        bloqueDiv.className = 'pregunta-bloque';

        const preguntaTexto = document.createElement('p');
        preguntaTexto.textContent = q.pregunta;
        bloqueDiv.appendChild(preguntaTexto);

        q.opciones.forEach((opcion, i) => {
            const label = document.createElement('label');
            label.className = 'opcion';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `pregunta${index}`;
            radio.value = i;
            radio.required = true;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${opcion}`));
            bloqueDiv.appendChild(label);
        });

        contenedorPreguntas.appendChild(bloqueDiv);
    });
}

function evaluarCuestionario(evento) {
    evento.preventDefault(); 
    let puntaje = 0;

    preguntas.forEach((q, index) => {
        const opciones = document.getElementsByName(`pregunta${index}`);
        let respuestaSeleccionada = -1;

        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                respuestaSeleccionada = parseInt(opciones[i].value);
                break;
            }
        }

        const bloque = opciones[0].closest('.pregunta-bloque');
        if (respuestaSeleccionada === q.respuestaCorrecta) {
            puntaje++;
            bloque.style.borderLeft = "6px solid #28a745"; 
        } else {
            bloque.style.borderLeft = "6px solid #dc3545"; 
        }
    });

    divResultado.classList.remove('oculto');
    divResultado.textContent = `Obtuviste ${puntaje} de ${preguntas.length} respuestas correctas.`;
    
    if (puntaje === preguntas.length) {
        divResultado.className = 'correcto';
    } else if (puntaje >= 10) {
        divResultado.className = 'regular';
    } else {
        divResultado.className = 'incorrecto';
    }
}

// Inicializar el DOM
cargarPreguntas();
formulario.addEventListener('submit', evaluarCuestionario);