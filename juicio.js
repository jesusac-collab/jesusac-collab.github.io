/* ================================================= */
/* JUICIO.JS DIOS SUPREMO 6.0 */
/* PARTE 1 */
/* ================================================= */

let currentScreen = 1;

const TOTAL_SCREENS = 23;

function startTrial(){

    nextScreen(2);

}


/* ====================================== */
/* INICIO */
/* ====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const firstScreen =
        document.querySelector(".screen");

    if(firstScreen){

        firstScreen.classList.add("active");

    }

    updateProgress();

    startBackgroundEffects();

});

/* ====================================== */
/* CAMBIO DE PANTALLAS */
/* ====================================== */

function nextScreen(screenId){

    document
    .querySelectorAll(".screen")
    .forEach(screen => {

        screen.classList.remove("active");

    });

    const target =
        document.getElementById(
            `screen${screenId}`
        );

    if(target){

        target.classList.add("active");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        currentScreen++;

        updateProgress();

        triggerFlash();

    }

}

/* ====================================== */
/* FLASH */
/* ====================================== */

function triggerFlash(){

    const flash =
        document.getElementById(
            "flashEffect"
        );

    if(!flash) return;

    flash.classList.add("flash");

    setTimeout(() => {

        flash.classList.remove("flash");

    },800);

}

/* ====================================== */
/* BARRA DE PROGRESO */
/* ====================================== */

function updateProgress(){

    const bar =
        document.getElementById(
            "progressBar"
        );

    const text =
        document.getElementById(
            "progressText"
        );

    if(!bar) return;

    const progress = Math.min(
        (currentScreen / TOTAL_SCREENS) * 100,
        100
    );

    bar.style.width =
        progress + "%";

    if(text){

        text.innerHTML =
            Math.floor(progress) + "%";

    }

}

/* ====================================== */
/* GUARDAR NOMBRE */
/* ====================================== */

function saveName(){

    const input =
        document.getElementById(
            "girlfriendName"
        );

    if(!input) return;

    const name =
        input.value.trim();

    if(name === ""){

        alert(
            "Ingresa un nombre ❤️"
        );

        return;

    }

    localStorage.setItem(
        "loveName",
        name
    );

    document
    .querySelectorAll(
        ".dynamicName"
    )
    .forEach(el => {

        el.textContent = name;

    });

    nextScreen(3);

}

/* ====================================== */
/* RECUPERAR NOMBRE */
/* ====================================== */

window.addEventListener("load", () => {

    const saved =
        localStorage.getItem(
            "loveName"
        );

    if(saved){

        document
        .querySelectorAll(
            ".dynamicName"
        )
        .forEach(el => {

            el.textContent = saved;

        });

    }

});

/* ====================================== */
/* VEREDICTO */
/* ====================================== */

function showVerdict(){

    const verdict =
        document.getElementById(
            "finalVerdict"
        );

    if(verdict){

        verdict.innerHTML =
            "❤️ CULPABLE ❤️";

    }

    createConfetti(120);

    setTimeout(() => {

        nextScreen(17);

    },2500);

}

/* ================================================= */
/* PEGAR AQUÍ DEBAJO LA PARTE 2 DEL JS DIOS SUPREMO 6.0 */
/* NO BORRAR ESTE INDICADOR */
/* ================================================= */
/* ================================================= */
/* JUICIO.JS DIOS SUPREMO 6.0 */
/* PARTE 2 */
/* ================================================= */

/* ====================================== */
/* EFECTOS DE FONDO */
/* ====================================== */

function startBackgroundEffects(){

    setInterval(() => {

        createHeart();

    },900);

    setInterval(() => {

        createPetal();

    },1400);

    setInterval(() => {

        createStar();

    },1800);

}

/* ====================================== */
/* CORAZONES */
/* ====================================== */

function createHeart(){

    const container =
        document.getElementById(
            "heartsContainer"
        );

    if(!container) return;

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    const hearts = [

        "❤️",
        "💕",
        "💖",
        "💗",
        "💘"

    ];

    heart.innerHTML =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 20) + "px";

    container.appendChild(
        heart
    );

    setTimeout(() => {

        heart.remove();

    },12000);

}

/* ====================================== */
/* PÉTALOS */
/* ====================================== */

function createPetal(){

    const container =
        document.getElementById(
            "petalsContainer"
        );

    if(!container) return;

    const petal =
        document.createElement("div");

    petal.className =
        "petal";

    petal.innerHTML = "🌹";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.animationDuration =
        (8 + Math.random() * 6) + "s";

    petal.style.fontSize =
        (16 + Math.random() * 16) + "px";

    container.appendChild(
        petal
    );

    setTimeout(() => {

        petal.remove();

    },15000);

}

/* ====================================== */
/* ESTRELLAS */
/* ====================================== */

function createStar(){

    const container =
        document.getElementById(
            "starsContainer"
        );

    if(!container) return;

    const star =
        document.createElement("div");

    star.className =
        "magic-star";

    const stars = [

        "✨",
        "⭐",
        "🌟"

    ];

    star.innerHTML =
        stars[
            Math.floor(
                Math.random() *
                stars.length
            )
        ];

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.animationDuration =
        (3 + Math.random() * 4) + "s";

    container.appendChild(
        star
    );

    setTimeout(() => {

        star.remove();

    },7000);

}

/* ====================================== */
/* CONFETI */
/* ====================================== */

function createConfetti(
    amount = 100
){

    const container =
        document.getElementById(
            "confettiContainer"
        );

    if(!container) return;

    const colors = [

        "#ff4fa3",
        "#ff89c9",
        "#ffd4ea",
        "#ffffff",
        "#ffb6d9"

    ];

    for(
        let i = 0;
        i < amount;
        i++
    ){

        const confetti =
            document.createElement(
                "div"
            );

        confetti.className =
            "confetti";

        confetti.style.left =
            Math.random() * 100 + "%";

        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        confetti.style.animationDuration =
            (3 + Math.random() * 5) + "s";

        confetti.style.animationDelay =
            (Math.random() * 2) + "s";

        container.appendChild(
            confetti
        );

        setTimeout(() => {

            confetti.remove();

        },10000);

    }

}

/* ====================================== */
/* LLUVIA MASIVA */
/* ====================================== */

function createHearts(
    amount = 40
){

    for(
        let i = 0;
        i < amount;
        i++
    ){

        setTimeout(() => {

            createHeart();

        }, i * 120);

    }

}

function createPetals(
    amount = 30
){

    for(
        let i = 0;
        i < amount;
        i++
    ){

        setTimeout(() => {

            createPetal();

        }, i * 180);

    }

}

/* ================================================= */
/* PEGAR AQUÍ DEBAJO LA PARTE 3 DEL JS DIOS SUPREMO 6.0 */
/* NO BORRAR ESTE INDICADOR */
/* ================================================= */
/* ================================================= */
/* JUICIO.JS DIOS SUPREMO 6.0 */
/* PARTE 3 */
/* ================================================= */

/* ====================================== */
/* CARTA FINAL ANIMADA */
/* ====================================== */

function animateLetter(){

    const paragraphs =
        document.querySelectorAll(
            ".letter-paragraph"
        );

    if(!paragraphs.length) return;

    paragraphs.forEach(
        (paragraph,index)=>{

            setTimeout(()=>{

                paragraph.classList.add(
                    "show"
                );

            },index * 900);

        }
    );

}

/* ====================================== */
/* OBSERVADOR DE PANTALLAS */
/* ====================================== */

const observer = new MutationObserver(()=>{

    const letterScreen =
        document.getElementById(
            "screen19"
        );

    if(
        letterScreen &&
        letterScreen.classList.contains(
            "active"
        )
    ){

        animateLetter();

    }

});

observer.observe(
    document.body,
    {
        childList:true,
        subtree:true,
        attributes:true
    }
);

/* ====================================== */
/* PROCESAMIENTO SENTENCIA */
/* ====================================== */

function startSentenceProcess(){

    nextScreen("18_5");

    setTimeout(()=>{

        createConfetti(60);

        createHearts(25);

    },1500);

    setTimeout(()=>{

        nextScreen(19);

    },4500);

}

/* ====================================== */
/* EFECTO MARTILLAZO */
/* ====================================== */

function hammerImpact(){

    const hammer =
        document.querySelector(
            ".hammer-icon"
        );

    if(!hammer) return;

    hammer.style.transform =
        "scale(1.3) rotate(-20deg)";

    setTimeout(()=>{

        hammer.style.transform =
            "";

    },500);

}

/* ====================================== */
/* EXPLOSIÓN ROMÁNTICA */
/* ====================================== */

function romanticExplosion(){

    createConfetti(200);

    createHearts(80);

    createPetals(60);

}

/* ====================================== */
/* CRÉDITOS */
/* ====================================== */

function startCredits(){

    const credits =
        document.querySelector(
            ".credits-scroll"
        );

    if(!credits) return;

    credits.style.animation =
        "creditsRoll 60s linear forwards";

}

/* ====================================== */
/* DETECTAR CRÉDITOS */
/* ====================================== */

setInterval(()=>{

    const creditsScreen =
        document.getElementById(
            "screen23"
        );

    if(
        creditsScreen &&
        creditsScreen.classList.contains(
            "active"
        )
    ){

        startCredits();

    }

},1000);

/* ====================================== */
/* EFECTOS DE CASO CERRADO */
/* ====================================== */

function caseClosedEffects(){

    romanticExplosion();

    const seal =
        document.querySelector(
            ".end-seal"
        );

    if(seal){

        seal.classList.add(
            "hollywood-finish"
        );

    }

}

/* ====================================== */
/* ACTIVAR EFECTO FINAL */
/* ====================================== */

setInterval(()=>{

    const finalScreen =
        document.getElementById(
            "screen22"
        );

    if(
        finalScreen &&
        finalScreen.classList.contains(
            "active"
        )
    ){

        caseClosedEffects();

    }

},2500);

/* ====================================== */
/* ATAJOS */
/* ====================================== */

document.addEventListener(
    "keydown",
    (e)=>{

        if(e.key === "Enter"){

            const activeInput =
                document.getElementById(
                    "girlfriendName"
                );

            if(
                activeInput &&
                document.activeElement ===
                activeInput
            ){

                saveName();

            }

        }

    }
);

/* ====================================== */
/* MENSAJE FINAL */
/* ====================================== */

console.log(
`
=========================================
❤️ JUICIO DEL AMOR ❤️
VERSIÓN DIOS SUPREMO 6.0
=========================================

Expediente cargado correctamente.

Estado:
✔ HTML
✔ CSS
✔ JS

Resultado:
❤️ CADENA PERPETUA ❤️

=========================================
`
);

/* ================================================= */
/* FIN DEL JUICIO.JS DIOS SUPREMO 6.0 */
/* PROYECTO COMPLETO */
/* ================================================= */