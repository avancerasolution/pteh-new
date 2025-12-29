export const menuAnim = {
  hidden: { y: "-100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

export const rowAnim = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" }
  }
};

// Animation for each project card (slide from bottom)
export const cardAnim = {
  hidden: { opacity: 0, y: 25 },
  show: i => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 }
  })
};
// button animation
export const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  show: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.15, // stagger effect
      duration: 0.6,
      ease: "easeOut"
    }
  })
};
