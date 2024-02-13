let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const moveHandler = (event) => {
      event.preventDefault();

      if (!this.rotating) {
        if (event.touches) {
          this.touchX = event.touches[0].clientX;
          this.touchY = event.touches[0].clientY;
          this.velX = this.touchX - this.prevTouchX;
          this.velY = this.touchY - this.prevTouchY;
        } else {
          this.touchX = event.clientX;
          this.touchY = event.clientY;
          this.velX = this.touchX - this.prevTouchX;
          this.velY = this.touchY - this.prevTouchY;
        }
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }

        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const startHandler = (event) => {
      event.preventDefault();

      if (this.holdingPaper) return;

      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (event.touches) {
        this.touchX = event.touches[0].clientX;
        this.touchY = event.touches[0].clientY;
        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;
      } else {
        this.touchX = event.clientX;
        this.touchY = event.clientY;
        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;
      }

      if (event.touches && event.touches.length === 2) {
        this.rotating = true;
      }
    };

    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    paper.addEventListener('mousedown', startHandler);
    paper.addEventListener('touchstart', startHandler);

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);

    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchend', endHandler);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
