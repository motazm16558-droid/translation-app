let timeout;

/* ================= SPLASH ================= */
window.addEventListener("load", function () {
    const splash = document.getElementById("splash");
    const container = document.querySelector(".container");

    setTimeout(() => {
        splash.classList.add("hide");

        setTimeout(() => {
            splash.style.display = "none";
            container.classList.add("show");
        }, 800);

    }, 2000); // وقت السبلاش
});

/* ================= TRANSLATION ================= */
function splitText(text, size = 450) {
    let parts = [];
    for (let i = 0; i < text.length; i += size) {
        parts.push(text.substring(i, i + size));
    }
    return parts;
}

async function translateText() {
    let text = document.getElementById("inputText").value;
    let source = document.getElementById("sourceLang").value;
    let target = document.getElementById("targetLang").value;

    if (!text.trim()) {
        document.getElementById("outputText").innerText = "";
        return;
    }

    document.getElementById("outputText").innerText = "Translating...";

    let parts = splitText(text);
    let result = "";

    for (let part of parts) {
        try {
            let response = await fetch("http://localhost:3000/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: part,
                    source,
                    target
                })
            });

            let data = await response.json();
            result += data.translatedText + " ";

        } catch (error) {
            console.error(error);
            result += "[error] ";
        }
    }

    document.getElementById("outputText").innerText = result.trim();
}

/* ================= AUTO TRANSLATE ================= */
document.getElementById("inputText").addEventListener("input", function () {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        translateText();
    }, 700);
});

/* ================= SWAP ================= */
document.getElementById("swapBtn").addEventListener("click", function () {
    let source = document.getElementById("sourceLang");
    let target = document.getElementById("targetLang");

    let temp = source.value;
    source.value = target.value;
    target.value = temp;

    translateText();
});

/* ================= COPY ================= */
document.getElementById("copyBtn").addEventListener("click", function () {
    let text = document.getElementById("outputText").innerText;

    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        let btn = document.getElementById("copyBtn");
        btn.innerText = "Copied ✔";

        setTimeout(() => {
            btn.innerText = "📋 Copy";
        }, 1500);
    });
});

/* ================= DARK MODE ================= */
document.getElementById("darkBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark");

    let isDark = document.body.classList.contains("dark");

    this.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});