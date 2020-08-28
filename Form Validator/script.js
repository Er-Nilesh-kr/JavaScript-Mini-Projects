const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password_again");

//show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//Check required fields
function checkRequired(input) {
  if (input.value.trim() == "") {
    flag = false;
    showError(input, `${getFieldName(input)} is required`);
  } else {
    flag = true;
    // showSuccess(input);
  }
}

//Get Fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  checkRequired(input);
  if (flag) {
    if (re.test(input.value)) {
      showSuccess(input);
    } else {
      showError(input, "Email is invalid");
    }
  }
}

//Check Length
function checkLength(input, min, max) {
  checkRequired(input);
  if (flag) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be atleast ${min} characters`
      );
      flag = false;
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
      flag = false;
    } else {
      showSuccess(input);
    }
  }
}

//Check Password
function checkPassword(input1, input2) {
  checkLength(input2, 6, 15);
  if (flag) {
    if (input1.value !== input2.value) {
      showError(input2, "Password did not match");
    } else {
      showSuccess(input2);
    }
  }
}
// Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPassword(password, password2);
});
