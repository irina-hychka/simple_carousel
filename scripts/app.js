class Carousel {
    constructor(el) {
        this.el = el;
        this.currentIndex = 0;
        this.slidesMargin = 0;
        this.initElements();
        this.initCarousel();
        this.listenEvents();
    }

    initElements() {
        this.elements = {
            prev: this.el.querySelector('[data-prev]'),
            next: this.el.querySelector('[data-next]'),
            slides: this.el.querySelector('.slides')
        };
    }

    initCarousel() {
        this.initSlides();
    }

    initSlides() {
        this.slides = Array.prototype.slice.call(this.el.querySelectorAll('.slide'));
        const styles = window.getComputedStyle(this.slides[0]);
        this.defaultStyles = {
            width: styles.width,
            border: styles.border,
            margin: styles.margin,
            padding: styles.padding
        };
        this.currentIndex = 1;
        this.hideLastAndMoveToBegin();
    }

    listenEvents() {
        this.elements.prev.addEventListener('click', () => {
            if (this.currentIndex <= 1) {
                this.hideLastAndMoveToBegin();
                this.currentIndex++;
            }
            this.currentIndex--;
            this.showSlide(this.currentIndex);
        });
        this.elements.next.addEventListener('click', () => {
            if (this.currentIndex + 3 >= this.slides.length) {
                this.moveFirstToTheEnd();
                this.currentIndex--;
            }
            this.hideSlide(this.currentIndex);
            this.currentIndex++;
        });
    }

    hideSlide(index) {
        this.slides[index].style.width = 0;
        this.slides[index].style.border = 0;
        this.slides[index].style.margin = 0;
        this.slides[index].style.padding = 0;
    }

    showSlide(index) {
        this.slides[index].style.width = this.defaultStyles.width;
        this.slides[index].style.border = this.defaultStyles.border;
        this.slides[index].style.margin = this.defaultStyles.margin;
        this.slides[index].style.padding = this.defaultStyles.padding;
    }

    hideLastAndMoveToBegin() {
        this.hideSlide(this.slides.length-1);
        let item = this.slides.pop();
        this.elements.slides.insertBefore(item, this.slides[0]);
        this.slides.unshift(item);
    }

    moveFirstToTheEnd() {
        let item = this.slides.shift();
        this.elements.slides.appendChild(item);
        this.slides.push(item);
        this.showSlide(this.slides.length-1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.carousel = new Carousel(document.querySelector('.carousel'));
    console.dir(carousel);
});
