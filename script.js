const screens = [...document.querySelectorAll(".screen")];
const dots = [...document.querySelectorAll(".dot")];
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const typedText = document.getElementById("typedText");
const letterNext = document.getElementById("letterNext");
const starField = document.getElementById("starField");
const dayCounterNum = document.getElementById("dayCounterNum");

/* ---------- ★ хосын эхэлсэн огноог энд өөрчлөөрэй (ЖЖЖЖ-СС-ӨӨ) ★ ---------- */
const START_DATE = "2026-09-14";

function updateDayCounter() {
  const start = new Date(START_DATE + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - start) / 86400000);
  dayCounterNum.textContent = diffDays >= 0 ? diffDays.toLocaleString("mn-MN") : "0";
}

updateDayCounter();

const message = `Чамд нэг зүйлийг зүгээр л хэлмээр санагдлаа.

Чи миний амьдралд орж ирснээс хойш
зарим өдөр илүү гоё,
зарим инээд илүү үнэ цэнтэй болсон.

Би чамтай хамт байх мөчүүдийг
яаралгүйгээр, нэг нэгээр нь
хадгалж явмаар байна.

Чи миний хувьд онцгой хүн. ❤️`;

let current = 0;

/* ---------- starfield ---------- */

function buildStars() {
  const count = 70;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    const big = Math.random() > .85;
    star.className = "star" + (big ? " big" : "");
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 90 + "vh";
    star.style.animationDuration = (2.5 + Math.random() * 3.5) + "s";
    star.style.animationDelay = (Math.random() * 4) + "s";
    starField.appendChild(star);
  }
}

buildStars();

/* ---------- screens ---------- */

function showScreen(index) {
  screens[current].classList.remove("active");
  current = index;
  screens[current].classList.add("active");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "float-heart";
  heart.textContent = Math.random() > .25 ? "♥" : "✦";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  heart.style.opacity = .2 + Math.random() * .7;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 700);

function confetti() {
  const symbols = ["❤️", "♥", "✦", "♡", "✨"];
  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * .8 + "s";
    piece.style.animationDuration = (1.8 + Math.random() * 1.8) + "s";
    document.getElementById("confetti").appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

function typeMessage() {
  typedText.textContent = "";
  letterNext.disabled = true;
  let i = 0;

  const timer = setInterval(() => {
    typedText.textContent += message[i];
    i++;

    if (i >= message.length) {
      clearInterval(timer);
      letterNext.disabled = false;
    }
  }, 32);
}

openBtn.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => showScreen(1), 900);
});

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.id === "letterNext") {
      showScreen(3);
    } else {
      showScreen(current + 1);
      if (current === 2) typeMessage();
    }
  });
});

/* ---------- yes / no question ---------- */

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionTease = document.getElementById("questionTease");

const teases = [
  "Чи надад хайртай юу? 🦌❤️",
  "Бодоод үз дээ... 🥺",
  "Үгүй гэж бүү хэлээрэй",
  "Ямар ч байсан үнэн хариулаарай",
  "Зүрх чинь юу гэж байна?",
  "Тийм гэдэг товч харагдаж байна уу? 👀"
];

let noClicks = 0;

noBtn.addEventListener("click", () => {
  noClicks = Math.min(noClicks + 1, teases.length - 1);

  const grow = 1 + noClicks * 0.22;
  const shrink = Math.max(1 - noClicks * 0.16, 0.35);

  yesBtn.style.transform = `scale(${grow})`;
  noBtn.style.transform = `scale(${shrink})`;
  noBtn.style.opacity = Math.max(1 - noClicks * 0.12, 0.35);

  questionTease.textContent = teases[noClicks];
});

yesBtn.addEventListener("click", () => {
  showScreen(4);
  confetti();
});