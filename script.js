const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll(".section, .hero")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })
})

const track = document.getElementById("carouselTrack")
const slides = Array.from(track.children)
const prevBtn = document.getElementById("carouselPrev")
const nextBtn = document.getElementById("carouselNext")
const indicators = document.getElementById("carouselIndicators")

let currentSlide = 0

slides.forEach((_, index) => {
  const indicator = document.createElement("div")
  indicator.classList.add("carousel-indicator")
  if (index === 0) indicator.classList.add("active")
  indicator.addEventListener("click", () => goToSlide(index))
  indicators.appendChild(indicator)
})

const indicatorDots = Array.from(indicators.children)

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`

  indicatorDots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active")
    } else {
      dot.classList.remove("active")
    }
  })
}

function goToSlide(index) {
  currentSlide = index
  updateCarousel()
}

prevBtn.addEventListener("click", () => {
  currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1
  updateCarousel()
})

nextBtn.addEventListener("click", () => {
  currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
  updateCarousel()
})

let autoplayInterval = setInterval(() => {
  currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
  updateCarousel()
}, 5000)

;[prevBtn, nextBtn, ...indicatorDots].forEach((element) => {
  element.addEventListener("click", () => {
    clearInterval(autoplayInterval)
    autoplayInterval = setInterval(() => {
      currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      updateCarousel()
    }, 5000)
  })
})

const codeTabs = document.querySelectorAll(".code-tab")
const codePanels = document.querySelectorAll(".code-panel")

codeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetPanel = tab.dataset.tab

    codeTabs.forEach((t) => t.classList.remove("active"))
    codePanels.forEach((p) => p.classList.remove("active"))

    tab.classList.add("active")
    document.querySelector(`[data-panel="${targetPanel}"]`).classList.add("active")
  })
})

const downloadBtn = document.getElementById("downloadBtn")

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a")
  link.href = "#"
  link.download = "projeto-sistemas-digitais.zip"

  const originalText = downloadBtn.innerHTML
  downloadBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
        Download Iniciado!
    `
  downloadBtn.disabled = true

  setTimeout(() => {
    downloadBtn.innerHTML = originalText
    downloadBtn.disabled = false
  }, 3000)

  alert("Para adicionar o download real, substitua o link.href no código JavaScript pelo caminho do seu arquivo ZIP.")
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

document
  .querySelectorAll(".description-card, .author-card, .software-card, .problem-card, .learning-card")
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offset = 80 // Altura do navbar
      const targetPosition = target.offsetTop - offset
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})
