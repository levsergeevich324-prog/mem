// ===== ГЕНЕРАЦИЯ ЗВЁЗДНОГО НЕБА =====
function createStars() {
  const starsContainer = document.getElementById('stars');
  
  if (!starsContainer) return;
  
  // Очищаем контейнер
  starsContainer.innerHTML = '';
  
  // Определяем количество звезд в зависимости от размера экрана
  const isMobile = window.innerWidth <= 480;
  const starCount = isMobile ? 200 : 350;
  const bigStarCount = isMobile ? 15 : 30;
  
  // Обычные звёзды
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
  
  // Крупные звезды
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
  dates: "1938 - 2013",
  bio: "<p>Родилась в 1935 году(по  паспорту в 1938).Её жизнь пришлась на непростые годы, но она сохранила доброту, достоинство и умение радоваться простым вещам. Работала, растила детей, стала опорой для внуков, буквально жила ради них работая даже на пенсии. Её помнят как человека с тихим голосом, мудрым взглядом и открытым сердцем.</p>",
  photo: "photo.jpg",
  video: "https://github.com/levsergeevich324-prog/mem/raw/main/video.mp4"
};

// ===== ФУНКЦИЯ ДЛЯ НАСТРОЙКИ ВИДЕО =====
function setupVideo(videoElement) {
  if (!videoElement) return;
  
  // Устанавливаем все необходимые атрибуты для автовоспроизведения и зацикливания
  videoElement.muted = true;      // обязательно для автовоспроизведения
  videoElement.loop = true;       // зацикливание
  videoElement.autoplay = true;   // автовоспроизведение
  videoElement.playsInline = true; // для мобильных устройств
  videoElement.preload = 'auto';   // предзагрузка
  
  // Пытаемся воспроизвести видео
  const playPromise = videoElement.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        console.log('Видео успешно воспроизводится');
      })
      .catch(error => {
        console.log('Автовоспроизведение не удалось:', error);
        // Если автовоспроизведение не сработало, показываем контролы
        videoElement.controls = true;
      });
  }
}

// ===== УСТАНОВКА КОНТЕНТА =====
function setContent() {
  const nameEl = document.getElementById('name');
  const datesEl = document.getElementById('dates');
  const bioEl = document.getElementById('bio');
  const photoEl = document.getElementById('photo');
  const videoEl = document.getElementById('video');
  
  // Устанавливаем текстовый контент
  if (nameEl) nameEl.textContent = defaults.name;
  if (datesEl) datesEl.textContent = defaults.dates;
  if (bioEl) bioEl.innerHTML = defaults.bio;
  
  // Устанавливаем фото
  if (photoEl) {
    photoEl.src = defaults.photo;
    photoEl.onerror = function() {
      console.log('Ошибка загрузки фото');
      this.src = 'https://via.placeholder.com/120x120?text=Photo';
    };
  }

  // Настраиваем видео
  if (videoEl) {
    // Обновляем источник видео
    const sourceEl = videoEl.querySelector('source');
    if (sourceEl) {
      sourceEl.src = defaults.video;
    }
    
    // Перезагружаем видео с новым источником
    videoEl.load();
    
    // Настраиваем автовоспроизведение и зацикливание
    setupVideo(videoEl);
    
    // Обработка ошибок видео
    videoEl.onerror = function() {
      console.log('Ошибка загрузки видео');
      // Показываем сообщение об ошибке
      const wrapper = this.closest('.video-wrapper');
      if (wrapper) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'video-error';
        errorMsg.innerHTML = 'Не удалось загрузить видео';
        errorMsg.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          background: rgba(0,0,0,0.7);
          padding: 10px 20px;
          border-radius: 8px;
          font-family: 'Cormorant Garamond', serif;
        `;
        wrapper.style.position = 'relative';
        wrapper.appendChild(errorMsg);
      }
    };
  }
}

// ===== ПРОВЕРКА ЗАГРУЗКИ ВСЕХ РЕСУРСОВ =====
function checkResources() {
  const videoEl = document.getElementById('video');
  
  // Дополнительная проверка для видео
  if (videoEl) {
    // Если видео уже загружено, но не играет
    if (videoEl.readyState >= 2) { // HAVE_CURRENT_DATA или больше
      setupVideo(videoEl);
    }
    
    // Слушаем событие загрузки видео
    videoEl.addEventListener('loadeddata', function() {
      console.log('Видео загружено');
      setupVideo(this);
    });
  }
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// Пересоздаем звезды при изменении размера окна (с debounce)
let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    createStars();
  }, 200);
}

// Обработчик видимости страницы (для продолжения воспроизведения)
function handleVisibilityChange() {
  const videoEl = document.getElementById('video');
  if (!videoEl) return;
  
  if (!document.hidden) {
    // Страница стала видимой - пробуем воспроизвести видео
    setupVideo(videoEl);
  }
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM загружен, инициализация...');
  
  // Устанавливаем контент
  setContent();
  
  // Создаем звезды
  createStars();
  
  // Проверяем ресурсы
  setTimeout(checkResources, 500); // Небольшая задержка для полной загрузки DOM
  
  // Слушаем изменение видимости страницы
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Слушаем изменение размера окна
  window.addEventListener('resize', handleResize);
  
  // Слушаем загрузку страницы
  window.addEventListener('load', function() {
    console.log('Страница полностью загружена');
    checkResources();
  });
});

// ===== ОЧИСТКА ПРИ ВЫХОДЕ =====
window.addEventListener('beforeunload', function() {
  // Удаляем обработчики событий
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  
  // Останавливаем видео
  const videoEl = document.getElementById('video');
  if (videoEl) {
    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
  }
});

// ===== ДОПОЛНИТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ =====
// Некоторые мобильные браузеры требуют взаимодействия с пользователем
function enableMobilePlayback() {
  const videoEl = document.getElementById('video');
  if (!videoEl) return;
  
  // Если видео не играет после загрузки страницы на мобильном
  if (videoEl.paused) {
    // Добавляем обработчик первого касания
    const enablePlayback = function() {
      setupVideo(videoEl);
      document.removeEventListener('touchstart', enablePlayback);
      document.removeEventListener('click', enablePlayback);
    };
    
    document.addEventListener('touchstart', enablePlayback);
    document.addEventListener('click', enablePlayback);
  }
}

// Запускаем для мобильных устройств
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.addEventListener('DOMContentLoaded', enableMobilePlayback);
}
