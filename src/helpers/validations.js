//Validation for Password Requried,
export  function passwordValidation(x) {
  if(!x){
    return "required";
  }

  if ( !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/i.test(x)) {
   return "It should be 6 -16 characters, must contain one symbol and number";
  }

  return '';
}

