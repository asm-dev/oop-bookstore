export const handleStickyHeader = (): void => {
  const header = document.querySelector("header") as HTMLElement;

  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};
