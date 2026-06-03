// Framer Motion animation variants — apply via whileInView + viewport={{ once: true }}

export const fadeInUp = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const fadeInLeft = {
  initial:    { opacity: 0, x: -40 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const fadeInRight = {
  initial:    { opacity: 0, x: 40 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.9 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export const slideInFromBottom = {
  initial:    { opacity: 0, y: 80 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

export const viewportOnce = { once: true, amount: 0.2 };
