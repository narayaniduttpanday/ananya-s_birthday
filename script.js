let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (this.holdingPaper) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;

        // Update position
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        // Ensure the paper stays within the viewport
        const rect = paper.getBoundingClientRect();
        const parentWidth = window.innerWidth;
        const parentHeight = window.innerHeight;

        if (rect.left + this.velX < 0) this.currentPaperX -= rect.left;
        if (rect.top + this.velY < 0) this.currentPaperY -= rect.top;
        if (rect.right + this.velX > parentWidth)
          this.currentPaperX -= rect.right - parentWidth;
        if (rect.bottom + this.velY > parentHeight)
          this.currentPaperY -= rect.bottom - parentHeight;

        // Apply transformation
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.zIndex = highestZ++;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
