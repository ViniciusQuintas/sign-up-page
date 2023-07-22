import Swal from "sweetalert2";
import isEmail from "validator/lib/isEmail";

const body = document.querySelector("body") as HTMLBodyElement;
const sun = document.querySelector(".fa-sun") as HTMLElement;
const moon = document.querySelector(".fa-moon") as HTMLElement;

const eye = document.querySelectorAll(".fa-eye") as unknown as HTMLElement[];
const eyeSlash = document.querySelectorAll(".fa-eye-slash") as unknown as HTMLElement[];

const form = document.querySelector("form") as HTMLFormElement;
const firstName = document.querySelector("#first-name") as HTMLInputElement;
const lastName = document.querySelector("#last-name") as HTMLInputElement;
const email = document.querySelector("#email") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;
const repeatPassword = document.querySelector("#repeat-password") as HTMLInputElement;
const containerInput = document.querySelectorAll('.container-input') as unknown as HTMLDivElement[];

function toggleSunMoon(): void {
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
  body.classList.toggle("dark");
}

function togglePasswordVisibility(inputPassword: HTMLElement, eye: HTMLElement, eyeSlash: HTMLElement): void {
  inputPassword.setAttribute("type",inputPassword.getAttribute("type") === "password" ? "text" : "password");
  eye.classList.toggle("hidden");
  eyeSlash.classList.toggle("hidden");
}

sun.addEventListener("click", toggleSunMoon);
moon.addEventListener("click", toggleSunMoon);

eye.forEach((element) => {
  element.addEventListener("click", () => {
    const inputPassword = element.previousElementSibling as HTMLInputElement;
    const eyeSlashNext = element.nextElementSibling as HTMLElement;
    togglePasswordVisibility(inputPassword, element, eyeSlashNext);
  });
});

eyeSlash.forEach((element) => {
  element.addEventListener("click", () => {
    const inputPassword = element.previousElementSibling?.previousElementSibling as HTMLInputElement;
    const eye = element.previousElementSibling as HTMLElement;
    togglePasswordVisibility(inputPassword, eye, element);
  });
});

form.addEventListener("submit", (e) => {
  inputValidation(firstName, lastName, email, password, repeatPassword);
  emailValidation(email);
  passwordsValidation(password, repeatPassword);
  if (submitForm(containerInput) === true) {
    e.preventDefault();
  }else{
    e.preventDefault();
    successMessage();
    form.reset();
  }
  
});

function showErrorMessage(msg: String): void {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${msg}`,
  });
}

function inputValidation(...input: HTMLInputElement[]): void {
  input.forEach((el) => {
    if (!el.value) {
      el.parentElement?.classList.add('error-message');
      showErrorMessage("Incomplete Form Error: Please fill out all the required fields before proceeding.");
    }else{
      el.parentElement?.classList.remove('error-message');
    }
  });
}

function emailValidation(email: HTMLInputElement): void {
  if (!email.value) {
    email.parentElement?.classList.add('error-message');
  }else if(!isEmail(email.value)) {
    email.parentElement?.classList.add('error-message');
    showErrorMessage("Invalid Email: The provided email address is invalid.");
  }else{
    email.parentElement?.classList.remove('error-message');
  }
}

function passwordsValidation(password: HTMLInputElement, repeatPassword: HTMLInputElement): void {
  if (!password.value && !repeatPassword.value) {
    password.parentElement?.classList.add('error-message');
    repeatPassword.parentElement?.classList.add('error-message');
  }else if (password.value !== repeatPassword.value) {
    password.parentElement?.classList.add('error-message');
    repeatPassword.parentElement?.classList.add('error-message');
    showErrorMessage('Password Mismatch Error: The passwords entered in the password fields do not match.');
  }else{
    password.parentElement?.classList.remove('error-message');
    repeatPassword.parentElement?.classList.remove('error-message');
  }
}

function submitForm(containerInput: HTMLDivElement[]): boolean {
  let send = true
  containerInput.forEach(e =>{
    send = e.classList.contains('error-message');
  })

  return send;
}

function successMessage(): void {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Account Created Successfully',
    showConfirmButton: false,
    timer: 1500
  })
}