// ===== ГЕНЕРАЦИЯ ЗВЁЗДНОГО НЕБА (ТОЛЬКО ЗВЁЗДЫ, БЕЗ КОМЕТ) =====
function createStars() {
  const starsContainer = document.getElementById('stars');
  
  // Обычные звёзды — 250 штук, мерцают
  for (let i = 0; i < 250; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 6 + 's';
    star.style.animationDuration = Math.random() * 4 + 3 + 's';
    star.style.opacity = Math.random() * 0.5 + 0.2;
    starsContainer.appendChild(star);
  }
}

// Данные
const defaults = {
  name: "Карелина Миля Илларионовна",
  dates: "1938 — 2013",
  tagline: "Ты там где живёт только Бог.... Ты там где кончаются звёзды...",
  bio: "<p>Родилась в 1938 году. Её жизнь пришлась на непростые годы, но она сохранила доброту, достоинство и умение радоваться простым вещам. Работала, растила детей, стала опорой для внуков, буквально жила ради них работая даже на пенсии. Её помнят как человека с тихим голосом, мудрым взглядом и открытым сердцем.</p>",
  photo: "photo.jpg",
  video: "https://github.com/levsergeevich324-prog/mem/raw/main/video.mp4"
};

// Устанавливаем контент
document.getElementById('name').textContent = defaults.name;
document.getElementById('dates').textContent = defaults.dates;
document.getElementById('tagline').textContent = defaults.tagline;
document.getElementById('bio').innerHTML = defaults.bio;
document.getElementById('photo').src = defaults.photo;

const videoEl = document.getElementById('video');
const sourceEl = videoEl.querySelector('source');
if (sourceEl) {
  sourceEl.src = defaults.video;
  videoEl.load();
}

// Запускаем звёзды
createStars();
