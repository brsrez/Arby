const initTyped = () => {
  const strings = ["НАЧАТЬ ЗАРАБАТЫВАТЬ НА РЫНКЕ", "ПЕРЕСТАТЬ СЛИВАТЬ СВОИ ДЕПОЗИТЫ", "ПОНИМАТЬ КАК УСТРОЕН РЫНОК", "СДЕЛАТЬ ТОРГОВЛЮ ОСОЗНАННОЙ", "СТАТЬ ПРОФЕССИОНАЛЬНЫМ ТРЕЙДЕРОМ"]
  const mobileStrings = ["НАЧАТЬ ЗАРАБАТЫВАТЬ НА РЫНКЕ", "ПЕРЕСТАТЬ СЛИВАТЬ СВОИ ДЕПОЗИТЫ", "ПОНИМАТЬ КАК УСТРОЕН РЫНОК", "СДЕЛАТЬ ТОРГОВЛЮ ОСОЗНАННОЙ", "СТАТЬ ПРОФЕС- СИОНАЛЬНЫМ ТРЕЙДЕРОМ"]

  const options = {
    typeSpeed: 50,
    backSpeed: 0,
    startDelay: 2500,
    loop: true,
    cursorChar: "_",
    contentType: 'html',
    fadeOut: true
  }

  if (window.screen.width >= 1130) {
    options.strings = strings
  } else {
    options.strings = mobileStrings
  }

  const typed = new Typed('.hero-title', options);

  addEventListener("resize", () => {
    if (window.screen.width >= 1130) {
      typed.strings = strings
    } else {
      typed.strings = mobileStrings
    }
  });
}

const fetchTariffs = () => {
  const URL = "https://api.arby.trade/cyclopedia-tariffs/index"
  const separateStrategyURL = "https://api.arby.trade/cyclopedia/rubric/ready-strategies/min-price"

  const options = {
    credentials: 'include',
    headers: {
      'X-Language': 'ru'
    },
  }

  fetch(separateStrategyURL, options)
  .then((response) => response.json())
  .then(({ content }) => {
    const separateButton = document.getElementById("tariff-separate")

    separateButton.innerHTML = `Выбрать от ${content.minPrice} ₽`
  })
  .catch((error) => console.error(error))

  fetch(URL, options)
  .then((response) => response.json())
  .then(({ content }) => {
    content.forEach(tariff => {
      const button = document.getElementById(`tariff-${tariff.image}`)

      if (tariff.image === 'elementary') {
        button.innerHTML = `Заказать за ${tariff.price} ₽`
      } else {
        button.innerHTML = `Купить за ${tariff.price} ₽`
      }
    })
  })
  .catch((error) => console.error(error))
}

fetchTariffs()
initTyped()

document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide('.splide', {
    gap: '2rem',
    width: '100%',
    perPage: 3,
    padding: { left: 'calc(100vw/2 - 664px)', right: 80 },
    pagination: false,
    breakpoints: {
      1300: {
        perPage: 2,
      },
      800: {
        perPage: 1,
        gap: '1rem',
        padding: { left: 16, right: 80 },
      },
    }
  });
  splide.mount();
} );