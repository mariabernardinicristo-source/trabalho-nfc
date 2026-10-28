
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const backToTop = document.getElementById("back-to-top");
const year = document.getElementById("year");

// Atualiza o ano automaticamente
year.textContent = new Date().getFullYear();

// Abre e fecha o menu no celular
menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu ao clicar em um link
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Mostra o botão de voltar ao topo
function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 300);
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();

// Volta ao início da página
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Anima os cartões quando aparecem na tela
const animatedElements = document.querySelectorAll(
    ".about-card, .info-card, .project-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}
