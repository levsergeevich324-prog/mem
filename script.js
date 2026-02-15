// ===== ГЕНЕРАЦИЯ ЗВЁЗДНОГО НЕБА =====
function createStars() {
  const starsContainer = document.getElementById('stars');
  
  if (!starsContainer) return;
  
  starsContainer.innerHTML = '';
  
  const isMobile = window.innerWidth <= 480;
  const starCount = isMobile ? 200 : 350;
  const bigStarCount = isMobile ? 15 : 30;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    star.style.animationDelay = Math.random() * 8 + 's';
    star.style.animationDuration = Math.random() * 5 + 3 + 's';
    
    const brightness = Math.random() * 0.6 + 0.3;
    star.style.opacity = brightness;
    star.style.boxShadow = `0 0 ${Math.random() * 8 + 3}px rgba(255, 255, 255, ${brightness})`;
    
    starsContainer.appendChild(star);
  }
  
  for (let i = 0; i < bigStarCount; i++) {
    const bigStar = document.createElement('div');
    bigStar.className = 'star';
    const size = Math.random() * 5 + 2;
    bigStar.style.width = size + 'px';
    bigStar.style.height = size + 'px';
    bigStar.style.left = Math.random() * 100 + '%';
    bigStar.style.top = Math.random() * 100 + '%';
    bigStar.style.animationDelay = Math.random() * 8 + 's';
    bigStar.style.animationDuration = Math.random() * 6 + 4 + 's';
    bigStar.style.opacity = Math.random() * 0.7 + 0.2;
    bigStar.style.boxShadow = `0 0 ${Math.random() * 12 + 8}px rgba(200, 220, 255, 0.8)`;
    starsContainer.appendChild(bigStar);
  }
}

// Данные
const defaults = {
  name: "Карелина Миля Илларионовна",
  dates: "1936 - 2013",
  bio: "<p>Родилась в 1935 году. Её жизнь пришлась на непростые годы, но она сохранила доброту, достоинство и умение радоваться простым вещам. Работала, растила детей, стала опорой для внуков, буквально жила ради них работая даже на пенсии. Её помнят как человека с тихим голосом, мудрым взглядом и открытым сердцем.</p>",
  photo: "photo.jpg",
  video: "https://github.com/levsergeevich324-prog/mem/raw/main/video.mp4"
};

// Настройка видео
function setupVideo(videoElement) {
  if (!videoElement) return;
  
  videoElement.muted = true;
  videoElement.loop = true;
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  videoElement.preload = 'auto';
  
  const playPromise = videoElement.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Автовоспроизведение не удалось:', error);
      videoElement.controls = true;
    });
  }
}

// Установка контента
function setContent() {
  const nameEl = document.getElementById('name');
  const datesEl = document.getElementById('dates');
  const bioEl = document.getElementById('bio');
  const photoEl = document.getElementById('photo');
  const videoEl = document.getElementById('video');
  
  if (nameEl) nameEl.textContent = defaults.name;
  if (datesEl) datesEl.textContent = defaults.dates;
  if (bioEl) bioEl.innerHTML = defaults.bio;
  
  if (photoEl) {
    photoEl.src = defaults.photo;
  }

  if (videoEl) {
    const sourceEl = videoEl.querySelector('source');
    if (sourceEl) {
      sourceEl.src = defaults.video;
    }
    videoEl.load();
    setupVideo(videoEl);
  }
}

// ===== ФУНКЦИОНАЛ ЗАЖЖЕНИЯ СВЕЧИ =====
function initCandleFeature() {
  const candleButton = document.getElementById('candleButton');
  const candleEffect = document.getElementById('candleEffect');
  const counterText = document.getElementById('counterText');
  
  if (!candleButton || !candleEffect || !counterText) return;
  
  // Загружаем сохраненное количество свечей
  let candleCount = localStorage.getItem('candleCount') ? 
                    parseInt(localStorage.getItem('candleCount')) : 0;
  
  // Обновляем счетчик
  counterText.textContent = candleCount;
  
  // Эффект свечи активен, если есть хотя бы одна свеча
  if (candleCount > 0) {
    candleEffect.classList.add('active');
  }
  
  // Функция создания искорок
  function createSparks() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const spark = document.createElement('div');
        spark.className = 'candle-spark';
        spark.innerHTML = '✨';
        spark.style.left = Math.random() * 100 + '%';
        spark.style.top = Math.random() * 100 + '%';
        spark.style.fontSize = (Math.random() * 15 + 10) + 'px';
        spark.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        document.body.appendChild(spark);
        
        setTimeout(() => {
          spark.remove();
        }, 2000);
      }, i * 100);
    }
  }
  
  // Обработчик клика на кнопку
  candleButton.addEventListener('click', function() {
    // Увеличиваем счетчик
    candleCount++;
    counterText.textContent = candleCount;
    
    // Сохраняем в localStorage
    localStorage.setItem('candleCount', candleCount);
    
    // Активируем эффект свечи
    candleEffect.classList.add('active');
    
    // Анимация кнопки
    candleButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      candleButton.style.transform = 'scale(1)';
    }, 200);
    
    // Создаем искорки
    createSparks();
    
    // Вибрация на мобильных (если поддерживается)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  });
  
  // Добавляем обработчик для сброса (по двойному клику на счетчик)
  const candleCounter = document.querySelector('.candle-counter');
  if (candleCounter) {
    candleCounter.addEventListener('dblclick', function() {
      candleCount = 0;
      counterText.textContent = '0';
      localStorage.setItem('candleCount', '0');
      candleEffect.classList.remove('active');
      
      // Эффект затухания
      candleEffect.style.opacity = '0';
      setTimeout(() => {
        candleEffect.style.opacity = '';
      }, 500);
    });
  }
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', function() {
  setContent();
  createStars();
  initCandleFeature();
});

// Обновление звезд при изменении размера окна
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    createStars();
  }, 200);
});
