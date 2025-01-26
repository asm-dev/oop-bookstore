export const createLink = (
  callback: Function,
  text: string,
  customClass: string
): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = text;
  link.classList.add(customClass);
  link.addEventListener("click", (event) => {
    event.preventDefault();
    callback();
  });

  return link;
};
