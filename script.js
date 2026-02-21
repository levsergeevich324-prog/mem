  function createStars() {
      const starsContainer = document.getElementById('stars');
      if (!starsContainer) return;
      starsContainer.innerHTML = '';
      
      for (let i = 0; i < 300; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 8 + 's';
        star.style.animationDuration = Math.random() * 5 + 3 + 's';
        star.style.opacity = Math.random() * 0.6 + 0.2;
        starsContainer.appendChild(star);
      }
    }

    const defaults = {
      name: "Карелина Миля Илларионовна",
      photo: "photo.jpg"
    };

    function setContent() {
      document.getElementById('name').textContent = defaults.name;
      document.getElementById('photo').src = defaults.photo;
    }

    function setupVideo() {
      const video = document.getElementById('videoPlayer');
      if (video) {
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.play().catch(e => console.log('Video autoplay failed'));
      }
    }

    function typeWriter() {
      const textElement = document.getElementById('typing-text');
      if (!textElement) return;
      
      const fullText = `Миля Иларионовна родилась 11 декабря 1935 года в Вологде в семье Гусевых Илариона и Марии.\n\nВышла замуж за Карелина Льва Алексеевича. В 1961 году в браке родились двойняшки — Сергей и Ольга. Свою трудовую деятельность Миля Иларионовна начала продавцом, а с 1973 по 1991 год продолжила в службе горгаза, где занималась проверкой газового оборудования в домах.\n\nВ 1981 году семья потеряла кормильца — Лев Алексеевич ушел из жизни. Миля Иларионовна больше замуж не выходила. Выйдя на пенсию, она не смогла сидеть без дела: подрабатывала на рынке, чтобы иметь возможность помогать деньгами близким и внукам.\n\nОна была настоящей хранительницей дома и очень умелой женщиной. Профессионально содержала огород — в один особенно урожайный сезон ей удалось собрать с двух небольших теплиц 100 ведер помидоров!!! Славилась своим мастерством вязания и умением печь вкуснейшие пироги. Всегда готовая прийти на помощь, она выручала близких деньгами, при этом сама умела копить.\n\nОтличаясь мудрым отношением к жизни, она часто говорила: «Только бы не належаться, умереть быстро». За несколько месяцев до ухода она словно почувствовала свою кончину и с тревогой спрашивала родных: «Как вы без меня жить будете?». Её пожелание сбылось — она ушла быстро 27 марта 2013 года.`;
      
      let i = 0;
      textElement.innerHTML = '';
      
      function type() {
        if (i < fullText.length) {
          textElement.innerHTML += fullText.charAt(i);
          i++;
          setTimeout(type, 20);
        } else {
          const cursor = document.createElement('span');
          cursor.className = 'typing-cursor';
          textElement.appendChild(cursor);
        }
      }
      type();
    }

    function updateDaysCounter() {
      const daysElement = document.getElementById('daysCount');
      if (!daysElement) return;
      const deathDate = new Date(2013, 2, 27);
      const today = new Date();
      const diffDays = Math.ceil(Math.abs(today - deathDate) / (1000 * 60 * 60 * 24));
      daysElement.textContent = diffDays.toLocaleString();
    }

    function playBiographyAudio() {
      const audio = document.getElementById('bioAudio');
      if (audio) {
        audio.currentTime = 0;
        audio.loop = true;
        audio.play().catch(e => console.log('Audio play failed'));
      }
    }

    // Функция для запуска всех видео в хронологии
    function playTimelineVideos() {
      const videos = document.querySelectorAll('.timeline-video');
      videos.forEach(video => {
        video.play().catch(e => console.log('Video play failed:', e));
      });
    }

    // Функция для скролла к хронологии
    function scrollToTimeline() {
      const timelineSection = document.getElementById('timeline');
      if (timelineSection) {
        timelineSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
      }
    }

    // Управление звуком
    function initSoundControl() {
      const soundControl = document.getElementById('soundControl');
      const soundIcon = document.getElementById('soundIcon');
      const soundText = document.getElementById('soundText');
      const audio = document.getElementById('bioAudio');
      
      let isMuted = false;
      
      soundControl.addEventListener('click', function() {
        if (isMuted) {
          // Включаем звук
          audio.muted = false;
          soundIcon.textContent = '🔊';
          soundText.textContent = 'Выключить звук';
          soundControl.classList.remove('muted');
        } else {
          // Выключаем звук
          audio.muted = true;
          soundIcon.textContent = '🔇';
          soundText.textContent = 'Включить звук';
          soundControl.classList.add('muted');
        }
        isMuted = !isMuted;
      });
    }

    // Функция для увеличения счетчика (убрана интеграция с API)
    function incrementTotalStats() {
      // Просто увеличиваем локальный счетчик, без API
      console.log('Свеча поставлена (локально)');
    }

    // Функция для воспроизведения звука свечи
    function playCandleSound() {
      const candleSound = document.getElementById('candleSound');
      if (candleSound) {
        candleSound.currentTime = 0; // Сбрасываем на начало
        candleSound.play().catch(e => console.log('Candle sound play failed:', e));
      }
    }

    // ДОБАВЛЕНО: Функция для остановки звука свечи
    function stopCandleSound() {
      const candleSound = document.getElementById('candleSound');
      if (candleSound) {
        candleSound.pause();
        candleSound.currentTime = 0; // Сбрасываем на начало
      }
    }

    function initCandleFeature() {
      const btn = document.getElementById('candleButton');
      const btnNew = document.getElementById('candleButtonNew');
      const effect = document.getElementById('candleEffect');
      const overlay = document.getElementById('whiteOverlay');
      const counter = document.getElementById('counterText');
      const headerTop = document.getElementById('headerTop');
      const mainHeader = document.getElementById('mainHeader');
      const daysCounter = document.getElementById('daysCounter');
      const video = document.getElementById('videoSection');
      const hidden = document.getElementById('hiddenContent');
      const stars = document.getElementById('stars');
      const soundControl = document.getElementById('soundControl');
      
      let count = localStorage.getItem('candleCount') ? parseInt(localStorage.getItem('candleCount')) : 0;
      counter.textContent = count;
      
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
      
      // Функция для обработки клика на кнопку "Биография" (запускает всю анимацию)
      function handleBiographyClick() {
        count++;
        counter.textContent = count;
        localStorage.setItem('candleCount', count);
        
        incrementTotalStats();
        createSparks();
        
        // ДОБАВЛЕНО: Останавливаем звук свечи, если он играет
        stopCandleSound();
        
        effect.classList.add('active');
        
        headerTop.classList.add('hidden');
        mainHeader.classList.add('hidden');
        daysCounter.classList.add('hidden');
        video.classList.add('hidden');
        btnNew.classList.add('hidden'); // Добавляем скрытие кнопки "Поставить свечку"
        
        setTimeout(() => {
          overlay.classList.add('active');
          stars.classList.add('fade-out');
        }, 3000);
        
        setTimeout(() => {
          overlay.classList.remove('active');
          effect.classList.remove('active');
          hidden.classList.add('visible');
          
          soundControl.style.display = 'flex';
          
          typeWriter();
          playBiographyAudio();
          initSoundControl();
          
          setTimeout(() => {
            playTimelineVideos();
          }, 1000);
          
          setTimeout(() => {
            scrollToTimeline();
          }, 1500);
          
        }, 8000);
      }
      
      // Функция для обработки клика на кнопку "Поставить свечку" (только увеличивает счетчик)
      function handleCandleOnlyClick() {
        count++;
        counter.textContent = count;
        localStorage.setItem('candleCount', count);
        
        incrementTotalStats();
        createSparks();
        
        // Воспроизводим звук свечи
        playCandleSound();
        
        // Добавляем эффект пульсации при клике
        btnNew.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btnNew.style.transform = 'scale(1)';
        }, 200);
      }
      
      btn.addEventListener('click', handleBiographyClick);
      btnNew.addEventListener('click', handleCandleOnlyClick);
    }

    document.addEventListener('DOMContentLoaded', function() {
      setContent();
      createStars();
      updateDaysCounter();
      setupVideo();
      initCandleFeature();
      setInterval(updateDaysCounter, 86400000);
    });

    window.addEventListener('resize', function() {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(createStars, 200);
    });
      // Защита от клика правой кнопкой мыши
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      alert('❌ Копирование материалов сайта запрещено');
    });
    
    // Защита от клавиш копирования (Ctrl+C, Ctrl+U и т.д.)
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 's' || e.key === 'a')) {
        e.preventDefault();
        alert('❌ Этот сайт защищен от копирования');
      }
      if (e.key === 'F12') {
        e.preventDefault();
        alert('❌ Инструменты разработчика отключены');
      }
    });
    
    // Дополнительная защита от открытия DevTools
    setInterval(function() {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        document.body.innerHTML = '<h1>❌ Доступ запрещен</h1><p>Закройте инструменты разработчика</p>';
      }
    }, 1000);
