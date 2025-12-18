// JavaScript Document
// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const checkBox = document.getElementById('check');
  const navLinks = document.querySelectorAll('.nav-link a');

  if (!checkBox) return;

  // Smooth menu toggle
  checkBox.addEventListener('change', () => {
    if (checkBox.checked) {
      document.body.classList.add('menu-open');
    } else {
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        document.body.classList.remove('menu-open');
      });
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Optional: prevent default if href="#"
      if (link.getAttribute('href') === '#') e.preventDefault();

      // Animate menu close before unchecking checkbox
      document.body.classList.remove('menu-open');

      // Wait for CSS transition to finish before unchecking checkbox
      const transitionDuration = parseFloat(getComputedStyle(document.body)
        .transitionDuration) * 1000 || 200; // default 200ms if none

      setTimeout(() => {
        checkBox.checked = false;
      }, transitionDuration);
    });
  });

// Carousel Initialization
function initializeCarousel(carouselSelector, nextBtnSelector, prevBtnSelector, cardClass) {
    const carousel = document.querySelector(carouselSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const prevBtn = document.querySelector(prevBtnSelector);

    if (!carousel || !nextBtn || !prevBtn) return;

function getScrollAmount() {
    const cards = carousel.querySelectorAll(cardClass);
    if (cards.length === 0) return 300;
    const card = cards[0];
    const gap = parseInt(getComputedStyle(carousel).gap) || 15;
    const cardWidth = card.offsetWidth;

    if (window.innerWidth <= 768) return cardWidth + gap;
    if (window.innerWidth <= 1024) return (cardWidth + gap) * 2;
    return (cardWidth + gap) * 3;
}

  function updateButtonStates() {
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    const tolerance = 5;

    const isAtStart = scrollLeft <= tolerance;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - tolerance;

    prevBtn.disabled = isAtStart;
    nextBtn.disabled = isAtEnd;

    prevBtn.style.opacity = isAtStart ? "0.5" : "1";
    prevBtn.style.cursor = isAtStart ? "not-allowed" : "pointer";
    nextBtn.style.opacity = isAtEnd ? "0.5" : "1";
    nextBtn.style.cursor = isAtEnd ? "not-allowed" : "pointer";
  }

  function scrollToNext() {
    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  }

   function scrollToPrev() {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
 }

  function refreshCarousel() {
    carousel.style.display = 'none';
    void carousel.offsetHeight; // force reflow
    carousel.style.display = '';
    updateButtonStates();
  }

  nextBtn.addEventListener('click', scrollToNext);
  prevBtn.addEventListener('click', scrollToPrev);
  carousel.addEventListener('scroll', updateButtonStates);

  updateButtonStates();
  return refreshCarousel;
 }

// Initialize all carousels
const refreshProductCarousel = initializeCarousel('.product-carousel', '.product-carousel-btn.next', '.product-carousel-btn.prev', '.product-card');
const refreshShopCarousel = initializeCarousel('.shop-carousel', '.shop-carousel-btn.next', '.shop-carousel-btn.prev', '.shop-card');
const refreshTestimonialCarousel = initializeCarousel('.testimonial-carousel', '.testimonial-carousel-btn.next', '.testimonial-carousel-btn.prev', '.testimonial-card');


// Window Resize Handling
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (refreshProductCarousel) refreshProductCarousel();
    if (refreshShopCarousel) refreshShopCarousel();
    if (refreshTestimonialCarousel) refreshTestimonialCarousel();
  }, 200);
});


// Back to Top Button
const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 250);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

// Scroll Animations
const animatedItems = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      const delay = entry.target.dataset.delay || 0;
      entry.target.style.transitionDelay = `${delay}s`;
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
});

animatedItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(item);
});
 // Footer Fade-in Animation
 const footerContent = document.querySelector('.footer-content.fade-in');
  if (footerContent) {
    const footerObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    footerObserver.observe(footerContent);
  }


// Contact Form Custom Alert  
const contactForm = document.getElementById("contactForm");
const customAlert = document.getElementById("customAlert");
const alertBox = customAlert?.querySelector(".custom-alert-box");

  if (contactForm && customAlert && alertBox) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();

      customAlert.classList.add("show");
      alertBox.style.animation = "popupFadeIn 0.4s ease forwards";

      setTimeout(() => {
        alertBox.style.animation = "popupFadeOut 0.4s ease forwards";
        setTimeout(() => {
          customAlert.classList.remove("show");
        }, 400);
      }, 1500);

      // Reset the form
      contactForm.reset();
  });
}

// Product Page Popup 
  const popup = document.getElementById("productPopup");
  const popupClose = document.getElementById("popupClose");
  const cards = document.querySelectorAll(".product-page-card");

  const popupImage = document.getElementById("popupImage");
  const popupTitle = document.getElementById("popupTitle");
  const popupWeight = document.getElementById("popupWeight");
  const popupIngredients = document.getElementById("popupIngredients");
  const popupSuitable = document.getElementById("popupSuitable");
  const popupPoints = document.getElementById("popupPoints");

  // PRODUCT DATA
  const productDetails = {
    "Freeze-dried Chicken & Egg Yolk 50g": {
      image: "../images/food1.png",
      weight: "50g (excluding weight of bottle)",
      ingredients: "100% Chicken Breast, Egg Yolk and Chicken Liver",
      suitable: "Cat, Dog, Hamster, Sugar Glider",
      points: [
        "Made from 100% Natural Ingredients",
        "Freeze-drying technology preserves nutrients",
        "Gain weight and cheeks",
        "100% pure meat, 0 additives",
        "Easy to Feed"
      ]
    },
    "Freeze Dried Tofu 50g": {
      image: "../images/food2.png",
      weight: "50g (excluding weight of bottle)",
      ingredients: "Tofu, Chicken Breast, Egg Yolk",
      suitable: "Dogs & Hamsters",
      points: [
        "Homemade with natural ingredients",
        "Freeze-drying technology preserves nutrients",
        "Gain weight and cheeks",
        "Rich in Protein",
        "Easy to Feed",
        "Feeding tips: 2 to 3 cubes a day recommended"
      ]
    },
    "Freeze Dried Capelin Fish": {
      image: "../images/food3.png",
      weight: "50g / 100g per Pack",
      ingredients: "Capelin Fish (whole dried fish)",
      suitable: "Cats",
      points: [
        "No Preservatives",
        "Natural Ingredients",
        "No Colouring",
        "Rich in Taurine (Boost Eyesight & Health)",
        "Boost Immune System",
        "Maintain Smooth & Silky Fur"
      ]
    },
    "Freeze-dried Duck Breast 30g": {
      image: "../images/food4.png",
      weight: "30g (excluding weight of packaging)",
      ingredients: "100% Duck Breast Meat",
      suitable: "Cats, Dogs, Hamster, Sugar Glider",
      points: [
        "Homemade with natural ingredients",
        "Freeze-drying technology preserves nutrients",
        "Gain weight and cheeks",
        "100% pure meat, 0 additives",
        "Easy to Feed"
      ]
    },
    "Air Dried Dehydrated Chicken Neck": {
      image: "../images/food5.png",
      weight: "—",
      ingredients: "100% Chicken Neck",
      suitable: "Cats, Dogs",
      points: [
        "100% Natural, 0 Additives",
        "Individual Packaging for Convenience",
        "Veterinary Advised: Cleans Teeth & Molar",
        "High Calcium",
        "High Protein",
        "Nutritious and Delicious"
      ]
    },
    "Freeze Dried Watermelon Raw Meat Bone Snack": {
      image: "../images/food6.png",
      weight: "6g per piece",
      ingredients: "Chicken breast, salmon, chicken liver, egg yolk, chicken heart, spinach, dragon fruit, cat grass",
      suitable: "Cats, Dogs, Hamster, Sugar Glider (above 3 months)",
      points: [
        "Made from 100% Natural Ingredients",
        "Freeze-drying technology preserves nutrients",
        "Gain weight and cheeks",
        "100% pure meat, 0 additives",
        "Easy to Feed"
      ]
    },
    "Freeze-dried Poached Eggs Chicken Flavor 30g": {
      image: "../images/food7.png",
      weight: "30g per pack",
      ingredients: "Chicken Egg, Chicken Breast, Egg Yolk",
      suitable: "Cats, Dogs, Hamster",
      points: [
        "Freeze-drying technology preserves nutrients",
        "Gain weight and cheeks",
        "100% pure meat 0 additives",
        "Easy to Feed"
      ]
    },
    "Chicken Floss Antarctic Krill Egg Yolk 50g": {
      image: "../images/food8.png",
      weight: "50g (excluding weight of bottle)",
      ingredients: "100% Chicken Floss, Antarctic Krill, Egg Yolk",
      suitable: "Cats, Dogs, Hamster, Sugar Glider",
      points: [
        "For Healthy Skin and Fur Coat",
        "Promotes Heart, Liver & Immune Function",
        "Homemade with natural ingredients",
        "Freeze-drying technology preserves nutrients",
        "100% pure meat, 0 additives",
        "Easy to Feed"
      ]
    },
    "Dried Vegetables Fruit Salad for Pets 100g": {
      image: "../images/food9.png",
      weight: "100g (excluding weight of bottle)",
      ingredients: "Cabbage, Purple Potato, Carrot, Apple, Seaweed, Tomato, Pumpkin, Banana",
      suitable: "Cats, Dogs, Hamster, Sugar Glider",
      points: [
        "8 Types of Fruits & Vegetables rich in Vitamins & Minerals",
        "Homemade with natural ingredients",
        "Gain weight and cheeks",
        "100% pure fruit & vegetable, 0 additives",
        "Easy to Feed"
      ]
    },
    "Goat Milk Cookie": {
      image: "../images/food10.png",
      weight: "1 piece per pack",
      ingredients: "Goat Milk Powder, Pumpkin, Wheat Flour, Egg Yolk",
      suitable: "Cats, Dogs, Hamster, Sugar Glider",
      points: [
        "Homemade with natural ingredients",
        "Gain weight and cheeks",
        "0 additives",
        "Easy to Feed"
      ]
    },
    "Natural Cow Horn Dog Chew 5kg - 8kg": {
      image: "../images/food11.png",
      weight: "Varies by size",
      ingredients: "1 Piece S Size (Dogs within 5kg) / 1 Piece L Size (Dogs above 8kg)",
      suitable: "Dogs",
      points: [
        "No Preservatives",
        "Natural Ingredients",
        "No Colouring",
        "Rich in Taurine (Boost Eyesight & Health)",
        "Boost Immune & Nervous System",
        "Rich in Calcium & Phosphorus (Improves Bone Strength)"
      ]
    },
    "Air-Dried Whole Baby Lamb Ribs": {
      image: "../images/food12.png",
      weight: "—",
      ingredients: "100% Baby Lamb Ribs",
      suitable: "Cats, Dogs",
      points: [
        "One can lasts up to 1 week",
        "No Preservatives / Additives / Attractants",
        "Rich in Calcium",
        "Rich in Protein",
        "Keeps your pets busy",
        "Easy to Feed"
      ]
    }
  };

  // Store scroll position
  let scrollPosition = 0;

  // EVENT: OPEN POPUP 
  if (cards.length > 0 && popup && popupClose) {
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const title = card.querySelector("h3").textContent.trim();
        const data = productDetails[title] || {};

        popupImage.src = data.image || card.querySelector("img").src;
        popupTitle.textContent = title;
        popupWeight.textContent = data.weight || "—";
        popupIngredients.textContent = data.ingredients || "—";
        popupSuitable.textContent = data.suitable || "—";

        // clear and populate bullet points
        popupPoints.innerHTML = "";
        (data.points || []).forEach(p => {
          const li = document.createElement("li");
          li.textContent = p;
          popupPoints.appendChild(li);
        });

        // Show popup
        popup.style.display = "flex";
        
        // Lock body scroll properly
        document.body.classList.add("popup-open");
      });
    });

    // EVENT: CLOSE POPUP ===
    function closePopup() {
      popup.style.display = "none";
      
      // Restore body scroll
      document.body.classList.remove("popup-open");
    }

    popupClose.addEventListener("click", closePopup);

    popup.addEventListener("click", e => {
      if (e.target === popup) {
        closePopup();
      }
    });

    // Also close with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && popup.style.display === "flex") {
        closePopup();
      }
    });
  }


// PRODUCT FILTER
const navItems = document.querySelectorAll(".product-nav li");
const allCards = document.querySelectorAll(".product-page-card");

// PRODUCT CATEGORY MAPPING
const categoryMap = {
    dogs: [
      "Freeze-dried Chicken & Egg Yolk 50g",
      "Freeze Dried Tofu 50g",
      "Freeze-dried Duck Breast 30g",
      "Air Dried Dehydrated Chicken Neck",
      "Freeze Dried Watermelon Raw Meat Bone Snack",
      "Freeze-dried Poached Eggs Chicken Flavor 30g",
      "Chicken Floss Antarctic Krill Egg Yolk 50g",
      "Dried Vegetables Fruit Salad for Pets 100g",
      "Goat Milk Cookie",
      "Natural Cow Horn Dog Chew 5kg - 8kg",
      "Air-Dried Whole Baby Lamb Ribs"
    ],
    cats: [
      "Freeze-dried Chicken & Egg Yolk 50g",
      "Freeze Dried Capelin Fish",
      "Freeze-dried Duck Breast 30g",
      "Air Dried Dehydrated Chicken Neck",
      "Freeze Dried Watermelon Raw Meat Bone Snack",
      "Freeze-dried Poached Eggs Chicken Flavor 30g",
      "Chicken Floss Antarctic Krill Egg Yolk 50g",
      "Dried Vegetables Fruit Salad for Pets 100g",
      "Goat Milk Cookie",
      "Air-Dried Whole Baby Lamb Ribs"
    ],
    "small pets": [
      "Freeze-dried Chicken & Egg Yolk 50g",
      "Freeze Dried Tofu 50g",
      "Freeze-dried Duck Breast 30g",
      "Freeze Dried Watermelon Raw Meat Bone Snack",
      "Freeze-dried Poached Eggs Chicken Flavor 30g",
      "Chicken Floss Antarctic Krill Egg Yolk 50g",
      "Dried Vegetables Fruit Salad for Pets 100g",
      "Goat Milk Cookie"
    ]
  };

//FILTER FUNCTION - UPDATED
function filterProducts(category) {
  let hasVisibleCards = false;
  
  // Remove all animation classes first
  allCards.forEach(card => {
    card.classList.remove('fade-in', 'fade-out');
  });
  
  // Filter cards without fade-out animation first
  allCards.forEach(card => {
    const title = card.querySelector("h3").textContent.trim();
    const match = category === "all" || categoryMap[category]?.includes(title);
    
    if (match) {
      hasVisibleCards = true;
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
  
  // Animate visible cards
  setTimeout(() => {
    allCards.forEach(card => {
      if (!card.classList.contains('hidden')) {
        // Trigger reflow
        void card.offsetWidth;
        // Add fade-in animation
        card.classList.add('fade-in');
      }
    });
  }, 10);
  
  // Handle no results message
  const gridContainer = document.querySelector('.product-page-grid');
  let noResultsMsg = gridContainer?.querySelector('.no-results');
  
  if (!hasVisibleCards && gridContainer) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('p');
      noResultsMsg.className = 'no-results';
      noResultsMsg.textContent = 'No products found in this category.';
      noResultsMsg.style.textAlign = 'center';
      noResultsMsg.style.padding = '40px';
      noResultsMsg.style.fontFamily = '"Balsamiq Sans", sans-serif';
      noResultsMsg.style.color = '#937b6f';
      noResultsMsg.style.gridColumn = '1 / -1';
      noResultsMsg.style.opacity = '0';
      noResultsMsg.style.transition = 'opacity 0.3s ease';
      gridContainer.appendChild(noResultsMsg);
      
      // Fade in the message
      setTimeout(() => {
        noResultsMsg.style.opacity = '1';
      }, 300);
    }
  } else if (noResultsMsg) {
    noResultsMsg.style.opacity = '0';
    setTimeout(() => {
      if (noResultsMsg.parentNode) {
        noResultsMsg.parentNode.removeChild(noResultsMsg);
      }
    }, 300);
  }
}

// PAGE LOAD ANIMATION
function animateCardsOnLoad() {
  // Check if on mobile
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
  // Adjust delay based on device
  // Mobile has longer animations in your CSS (1s, 1.2s delays)
  // Desktop has shorter animations (0.5s, 0.8s delays)
  const heroAnimationDelay = isMobile ? 2200 : 1800; // Increased for mobile
  
  // Animate cards after hero & nav animations
  setTimeout(() => {
    allCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-in');
      }, index * (isMobile ? 30 : 50)); // Faster stagger on mobile
    });
  }, heroAnimationDelay);
}

// === EVENT HANDLER ===
if (navItems.length > 0 && allCards.length > 0) {
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      // Don't do anything if clicking the already active item
      if (item.classList.contains('active')) return;
      
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      
      const category = item.textContent.toLowerCase().trim();
      filterProducts(category);
    });
  });

  // Initialize page with animations
  document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for all cards
    allCards.forEach(card => {
      card.classList.remove('hidden');
    });
    
    // Activate "All" tab by default
    const allTab = document.querySelector('.product-nav li:first-child');
    if (allTab) {
      allTab.classList.add('active');
    }
    
    // Animate cards on load
    animateCardsOnLoad();
  });
}

  

// BOARDING & BREEDING CAROUSELS 
  function initializeGalleryCarousel(carouselSelector, nextBtnSelector, prevBtnSelector) {
    const carousel = document.querySelector(carouselSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const prevBtn = document.querySelector(prevBtnSelector);

    if (!carousel || !nextBtn || !prevBtn) return;

    function getScrollAmount() {
      const items = carousel.querySelectorAll('.boarding-gallery-item, .breeding-gallery-item');
      if (items.length === 0) return 300;

      const item = items[0];
      const itemWidth = item.offsetWidth;
      const gap = parseInt(getComputedStyle(carousel).gap) || 20;

      if (window.innerWidth <= 768) return itemWidth + gap;
      if (window.innerWidth <= 1024) return (itemWidth + gap) * 2;
      return (itemWidth + gap) * 3;
    }

    function updateButtonStates() {
      const scrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      const tolerance = 5;

      const isAtStart = scrollLeft <= tolerance;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - tolerance;

      prevBtn.disabled = isAtStart;
      nextBtn.disabled = isAtEnd;

      prevBtn.style.opacity = isAtStart ? "0.5" : "1";
      prevBtn.style.cursor = isAtStart ? "not-allowed" : "pointer";
      nextBtn.style.opacity = isAtEnd ? "0.5" : "1";
      nextBtn.style.cursor = isAtEnd ? "not-allowed" : "pointer";

      if (window.innerWidth > 768) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      }
    }

    function scrollToNext() {
      if (nextBtn.disabled) return;
      carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }

    function scrollToPrev() {
      if (prevBtn.disabled) return;
      carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }

    nextBtn.addEventListener('click', scrollToNext);
    prevBtn.addEventListener('click', scrollToPrev);
    carousel.addEventListener('scroll', updateButtonStates);

    updateButtonStates();
    return updateButtonStates;
  }

  const refreshBoardingCarousel = initializeGalleryCarousel('.boarding-gallery-stack', '.boarding-carousel-btn.next', '.boarding-carousel-btn.prev');
  const refreshBreedingCarousel = initializeGalleryCarousel('.breeding-gallery-stack', '.breeding-carousel-btn.next', '.breeding-carousel-btn.prev');

  let resizeTimer2;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer2);
    resizeTimer2 = setTimeout(() => {
      if (refreshBoardingCarousel) refreshBoardingCarousel();
      if (refreshBreedingCarousel) refreshBreedingCarousel();
    }, 150);
  });

  setTimeout(() => {
    if (refreshBoardingCarousel) refreshBoardingCarousel();
    if (refreshBreedingCarousel) refreshBreedingCarousel();
  }, 300);


// Trigger initial resize to calculate carousel positions
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 300);
});