const RESPONSIVE_WIDTH = 1024

gsap.registerPlugin(ScrollTrigger)

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseHeaderItems = document.getElementById("collapsed-items")
const collapseBtn = document.getElementById("collapse-btn")


const dropdowns = document.querySelectorAll('.dropdown')
console.log('Found dropdowns:', dropdowns.length)
dropdowns.forEach((dropdown, index) => {
    // Give each dropdown a unique ID if it doesn't have one
    if (!dropdown.id) {
        dropdown.id = `dropdown-${index}`
    }
    console.log('Initializing dropdown:', dropdown.id)
    new Dropdown(`#${dropdown.id}`)
})


gsap.to("#hero-image", {
    scale: 1,
    duration: 5
})


const expandingBg = document.getElementById("expanding-header-bg")

gsap.to(expandingBg, {

    height: "100%",
    duration: 3,
    scrollTrigger: {
        trigger: "#hero-section",
        // pin: true, 
        start: "50px 10px", // when the top of the trigger hits the top of the viewport
        end: "80px 50px",
        scrub: 1,
        // markers: true
    }

})

ScrollTrigger.create({
    trigger: "#hero-section",
    start: "50px 10px", // when the top of the trigger hits the top of the viewport
    end: "60px 40px",
    scrub: 1,
    // markers: true,
    onEnter: () => {
        const headerLinks = document.querySelectorAll(".header-links")

        headerLinks.forEach(e => {
            e.classList.add("header-white-bg")
        })
        if (isHeaderCollapsed){
            collapseBtn.classList.add("primary-text-color")
        }
        headerWhiteBg = true
    },
    onEnterBack: () => {
        const headerLinks = document.querySelectorAll(".header-links")

        headerLinks.forEach(e => {
            e.classList.remove("header-white-bg")
        })
        collapseBtn.classList.remove("primary-text-color")
        collapseBtn.classList.add("tw-text-white")
        headerWhiteBg = false
    }
})


const reviewContainer = document.querySelector(".review-container")
const reviewSlideShow = new SlideShow(reviewContainer, true, 10000)


function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    console.log("Colappse", isHeaderCollapsed)
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("!tw-opacity-100")
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list", "primary-text-color")
        collapseBtn.classList.add("bi-x", "tw-text-white")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("!tw-opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "tw-text-white")
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""
        
    }else{
        isHeaderCollapsed = true
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
    }
}

window.addEventListener("resize", responsive)

// Carousel functionality
let currentSlide = 1
const totalSlides = 5
let carouselInterval

// Initialize carousel
function initCarousel() {
    console.log("Initializing carousel with", totalSlides, "slides...")
    updateSlideIndicators()
    startAutoPlay()
}

// Change slide (direction: -1 for previous, 1 for next)
function changeSlide(direction) {
    currentSlide += direction
    
    if (currentSlide > totalSlides) {
        currentSlide = 1
    } else if (currentSlide < 1) {
        currentSlide = totalSlides
    }
    
    showSlide(currentSlide)
}

// Go to specific slide
function goToSlide(slideNumber) {
    currentSlide = slideNumber
    showSlide(currentSlide)
}

// Show specific slide
function showSlide(slideNumber) {
    console.log("Showing slide:", slideNumber)
    
    // Hide all slides
    const slides = document.querySelectorAll('.carousel-slide')
    slides.forEach(slide => {
        slide.style.opacity = '0'
    })
    
    // Show current slide
    const currentSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`)
    if (currentSlideElement) {
        currentSlideElement.style.opacity = '1'
    }
    
    // Update indicators
    updateSlideIndicators()
    
    // Reset auto-play timer
    resetAutoPlay()
}

// Update slide indicators
function updateSlideIndicators() {
    const dots = document.querySelectorAll('.carousel-dot')
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active')
            dot.style.backgroundColor = 'rgba(255, 255, 255, 1)'
            dot.style.transform = 'scale(1.2)'
            dot.style.borderColor = 'rgba(255, 255, 255, 1)'
        } else {
            dot.classList.remove('active')
            dot.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            dot.style.transform = 'scale(1)'
            dot.style.borderColor = 'rgba(255, 255, 255, 0.5)'
        }
    })
}

// Start auto-play
function startAutoPlay() {
    carouselInterval = setInterval(() => {
        changeSlide(1)
    }, 5000) // Change slide every 5 seconds
}

// Reset auto-play timer
function resetAutoPlay() {
    clearInterval(carouselInterval)
    startAutoPlay()
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, setting up carousel with", totalSlides, "slides...")
    
    // Wait a bit for everything to be ready
    setTimeout(() => {
        initCarousel()
        
        // Add hover pause functionality
        const carouselContainer = document.querySelector('.carousel-container')
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(carouselInterval)
            })
            
            carouselContainer.addEventListener('mouseleave', () => {
                startAutoPlay()
            })
        }
    }, 100)
})

