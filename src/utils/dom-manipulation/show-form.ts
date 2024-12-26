const showForm = (formContainer: HTMLDivElement): void => {
  formContainer.classList.add("visible");
};

const hideAndResetForm = (formContainer: HTMLDivElement): void => {
  formContainer.classList.remove("visible");
  formContainer.innerHTML = "";
};

export const isBookFormEnabled = (shouldShow: boolean): void => {
  const bookForm = document.getElementById("bookForm") as HTMLDivElement;
  return shouldShow ? showForm(bookForm) : hideAndResetForm(bookForm);
};
