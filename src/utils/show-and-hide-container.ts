export const showContainer = (container: HTMLDivElement): void => {
  container.classList.add("visible");
};

export const hideContainer = (container: HTMLDivElement): void => {
  container.classList.remove("visible");
};
