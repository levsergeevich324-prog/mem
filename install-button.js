// ===== КНОПКА УСТАНОВКИ PWA =====
let deferredPrompt;
const installButton = document.getElementById('installButton');
const installBanner = document.getElementById('installBanner');

// Слушаем событие beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Событие beforeinstallprompt сработало');
  // Предотвращаем автоматическое появление баннера
  e.preventDefault();
  // Сохраняем событие для вызова позже
  deferredPrompt = e;
  
  // Показываем нашу кнопку/баннер
  if (installBanner) {
    installBanner.style.display = 'flex';
  }
  if (installButton) {
    installButton.style.display = 'flex';
  }
});

// Функция установки
function installPWA() {
  if (!deferredPrompt) {
    console.log('Нет сохраненного события установки');
    return;
  }
  
  // Показываем диалог установки
  deferredPrompt.prompt();
  
  // Ждем ответ пользователя
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('Пользователь установил PWA');
      // Скрываем кнопку после установки
      if (installBanner) installBanner.style.display = 'none';
      if (installButton) installButton.style.display = 'none';
    } else {
      console.log('Пользователь отменил установку');
    }
    deferredPrompt = null;
  });
}

// Проверяем, установлено ли уже приложение
window.addEventListener('appinstalled', (evt) => {
  console.log('PWA успешно установлено');
  if (installBanner) installBanner.style.display = 'none';
  if (installButton) installButton.style.display = 'none';
});

// Проверяем поддержку PWA
if (!('serviceWorker' in navigator)) {
  console.log('Service Worker не поддерживается');
}

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Service Worker зарегистрирован успешно:', registration.scope);
    }).catch(function(error) {
      console.log('Ошибка регистрации Service Worker:', error);
    });
  });
}

// Для iOS добавляем инструкцию
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

const isInStandaloneMode = () => {
  return ('standalone' in window.navigator) && (window.navigator.standalone);
}

if (isIos() && !isInStandaloneMode()) {
  console.log('Это iOS, показываем инструкцию');
  // Показываем инструкцию для iOS
  if (installBanner) {
    installBanner.style.display = 'flex';
    installBanner.innerHTML = `
      <div class="install-content">
        <span class="install-icon">📱</span>
        <span class="install-text">Установите на главный экран: нажмите "Поделиться" → "На экран «Домой»"</span>
        <button class="install-close" onclick="this.parentElement.parentElement.style.display='none'">✕</button>
      </div>
    `;
  }
}
