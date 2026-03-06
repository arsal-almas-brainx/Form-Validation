const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const contactNumber = document.getElementById('contactNumber');
const emails = document.getElementById('emails');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');


const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactRegex = /^\d{11}$/;

const checkTotalValidity = () => {
    const isFnValid = firstName.value.trim() !== "";
    const isLnValid = lastName.value.trim() !== "";
    
    const ageVal = parseInt(age.value);
    const isAgeValid = !isNaN(ageVal) && ageVal >= 18 && ageVal <= 151;
    
    const isContactValid = contactNumber.value.trim() !== "" && contactRegex.test(contactNumber.value);
    
    const emailValues = emails.value.split(',').map(e => e.trim()).filter(e => e !== "");
    const areEmailsValid = emailValues.length > 0 && emailValues.every(e => emailRegex.test(e));
    
    const isPassStrong = passRegex.test(password.value);
    const isMatch = (password.value === confirmPassword.value) && confirmPassword.value !== "" && isPassStrong;

   
    submitBtn.disabled = !(isFnValid && isLnValid && isAgeValid && areEmailsValid && isPassStrong && isMatch && isContactValid);
};

const handleVisualFeedback = (e) => {
    const input = e.target;
    let isValid = false;

    if (input.id === 'firstName' || input.id === 'lastName') {
        isValid = input.value.trim() !== "";
    } else if (input.id === 'age') {
        const val = parseInt(input.value);
        isValid = !isNaN(val) && val >= 18 && val <= 151;
    } else if (input.id === 'contactNumber') {
        isValid = input.value.trim() !== "" && contactRegex.test(input.value);
    } else if (input.id === 'emails') {
        const list = input.value.split(',').map(e => e.trim()).filter(e => e !== "");
        isValid = list.length > 0 && list.every(e => emailRegex.test(e));
    } else if (input.id === 'password') {
        isValid = passRegex.test(input.value);
    } else if (input.id === 'confirmPassword') {
        isValid = input.value === password.value && input.value !== "" && passRegex.test(password.value);
    }

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
};

const allInputs = [firstName, lastName, age, contactNumber, emails, password, confirmPassword];

allInputs.forEach(el => {
    el.addEventListener('blur', handleVisualFeedback);
    el.addEventListener('input', checkTotalValidity);
});

password.addEventListener('blur', () => {
    if (confirmPassword.value !== "") {
        handleVisualFeedback({ target: confirmPassword });
    }
});