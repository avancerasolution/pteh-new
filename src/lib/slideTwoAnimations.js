/* Premium smooth easing (Apple / Figma feel) */

export const centerScale = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: "easeOut" }
  }
};

export const fromLeft = {
  hidden: { opacity: 0, x: -60 },
  show: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 1.1,
      ease: "easeOut"
    }
  })
};

export const fromRight = {
  hidden: { opacity: 0, x: 60 },
  show: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 1.1,
      ease: "easeOut"
    }
  })
};

export const fromTop = {
  hidden: { opacity: 0, y: -60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.4, duration: 1.1, ease: "easeOut" }
  }
};
