"use strict";
var _a, _b, _c;
// ── 1. 스크롤 시 헤더 스타일 변화 ──────────────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
});
// ── 2. 스크롤 페이드인 (Intersection Observer) ─────────────────
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
fadeEls.forEach((el) => observer.observe(el));
// ── 3. 모바일 햄버거 메뉴 ──────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
hamburger === null || hamburger === void 0 ? void 0 : hamburger.addEventListener('click', () => {
    const isOpen = navUl === null || navUl === void 0 ? void 0 : navUl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.classList.toggle('active');
});
// 메뉴 항목 클릭 시 닫기
navUl === null || navUl === void 0 ? void 0 : navUl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navUl.classList.remove('open');
        hamburger === null || hamburger === void 0 ? void 0 : hamburger.classList.remove('active');
    });
});
// ── 4. 갤러리 라이트박스 ──────────────────────────────────────
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="닫기">&times;</button>
  <button class="lightbox-prev" aria-label="이전">&#8249;</button>
  <img class="lightbox-img" src="" alt="확대 이미지" />
  <button class="lightbox-next" aria-label="다음">&#8250;</button>
`;
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('.lightbox-img');
const gridItems = Array.from(document.querySelectorAll('.grid-item img'));
let currentIndex = 0;
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = gridItems[index].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}
function showPrev() {
    currentIndex = (currentIndex - 1 + gridItems.length) % gridItems.length;
    lightboxImg.src = gridItems[currentIndex].src;
}
function showNext() {
    currentIndex = (currentIndex + 1) % gridItems.length;
    lightboxImg.src = gridItems[currentIndex].src;
}
gridItems.forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(i));
});
(_a = lightbox.querySelector('.lightbox-close')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeLightbox);
(_b = lightbox.querySelector('.lightbox-prev')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', showPrev);
(_c = lightbox.querySelector('.lightbox-next')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox)
        closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active'))
        return;
    if (e.key === 'Escape')
        closeLightbox();
    if (e.key === 'ArrowLeft')
        showPrev();
    if (e.key === 'ArrowRight')
        showNext();
});
// ── 5. 히어로 타이핑 효과 ─────────────────────────────────────
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const originalHTML = heroTitle.innerHTML;
    const lines = originalHTML.split('<br>');
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    let lineIndex = 0;
    let charIndex = 0;
    function typeNextChar() {
        if (lineIndex >= lines.length)
            return;
        const currentLine = lines[lineIndex].replace(/<[^>]*>/g, '');
        if (charIndex < currentLine.length) {
            if (lineIndex === 0) {
                heroTitle.innerHTML = currentLine.slice(0, charIndex + 1);
            }
            else {
                const prev = lines.slice(0, lineIndex).map(l => l.replace(/<[^>]*>/g, '')).join('<br>');
                heroTitle.innerHTML = prev + '<br>' + currentLine.slice(0, charIndex + 1);
            }
            charIndex++;
            setTimeout(typeNextChar, 80);
        }
        else {
            lineIndex++;
            charIndex = 0;
            if (lineIndex < lines.length) {
                setTimeout(typeNextChar, 300);
            }
        }
    }
    setTimeout(typeNextChar, 600);
}
