const showForm = (formContainer: HTMLDivElement): void => {
  formContainer.classList.add("visible");
};

const hideForm = (formContainer: HTMLDivElement): void => {
  formContainer.classList.remove("visible");
};

export const isBookFormEnabled = (shouldShow: boolean): void => {
  const bookForm = document.getElementById("bookForm") as HTMLDivElement;
  return shouldShow ? showForm(bookForm) : hideForm(bookForm);
};
