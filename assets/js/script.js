alert("개인 포트폴리오 사이트입니다.")

const sliderTrack = document.querySelector('.slider-track');
const prevButton = document.querySelector('.slider-arrow.prev');
const nextButton = document.querySelector('.slider-arrow.next');
const cards = document.querySelectorAll('.slider-card');
let slideIndex = 0;

function getVisibleCount() {
  return 4; // Show 4 cards at a time
}

function clampIndex(index) {
  const visible = getVisibleCount();
  return Math.min(Math.max(index, 0), Math.max(cards.length - visible, 0));
}

function updateSlider() {
  if (!cards.length) return;
  const cardWidth = cards[0].offsetWidth + 40;
  slideIndex = clampIndex(slideIndex);
  sliderTrack.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
}

nextButton.addEventListener('click', () => {
  slideIndex = clampIndex(slideIndex + 1);
  updateSlider();
});

prevButton.addEventListener('click', () => {
  slideIndex = clampIndex(slideIndex - 1);
  updateSlider();
});

window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);

// Grid slider functionality
const gridTrack = document.querySelector('.grid-track');
const gridCards = document.querySelectorAll('.grid-card');
let gridIndex = 0;

function updateGridSlider() {
  if (!gridCards.length) return;
  const cardWidth = gridCards[0].offsetWidth + 40;
  gridTrack.style.transform = `translateX(-${gridIndex * cardWidth}px)`;

  // Update pager dots
  const dots = document.querySelectorAll('.pager-dots span');
  dots.forEach((dot, index) => {
    if (index === gridIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextGridSlide() {
  gridIndex = (gridIndex + 1) % 4; // 4 slides: 0,1,2,3
  updateGridSlider();
}

// Auto slide every 2.5 seconds
setInterval(nextGridSlide, 2500);

window.addEventListener('load', updateGridSlider);

const profileGroup = document.querySelector('#profile .profile-group');
const profileBoxes = document.querySelectorAll('#profile .profile-box');

if (profileGroup && profileBoxes.length) {
  profileBoxes.forEach(box => {
    const heading = box.querySelector('h4');
    if (!heading) return;
    heading.addEventListener('click', () => {
      const alreadyExpanded = box.classList.contains('expanded');
      profileBoxes.forEach(item => item.classList.remove('expanded'));
      profileGroup.classList.remove('expanded', 'expanded-goal', 'expanded-daily', 'expanded-motivation', 'expanded-downside');

      if (!alreadyExpanded) {
        box.classList.add('expanded');
        const key = box.dataset.box;
        profileGroup.classList.add('expanded', `expanded-${key}`);
      }
    });
  });
}

const profileImageContainer = document.querySelector('.profile-image');
const profileImage = profileImageContainer?.querySelector('img');
if (profileImageContainer && profileImage) {
  const maxOffset = 14;
  profileImageContainer.addEventListener('mousemove', event => {
    const rect = profileImageContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const offsetX = ((x / rect.width) - 0.5) * maxOffset * 2;
    const offsetY = ((y / rect.height) - 0.5) * maxOffset * 2;
    profileImage.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
  });

  profileImageContainer.addEventListener('mouseleave', () => {
    profileImage.style.transform = 'translate3d(0, 0, 0)';
  });
}
