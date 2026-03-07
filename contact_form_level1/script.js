const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
    let valid = true;

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('msg').value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    document.getElementById('nameError').textContent = "";
    document.getElementById('emailError').textContent = "";
    document.getElementById('subjectError').textContent = "";
    document.getElementById('msgError').textContent = "";

    if(fullname === ''){
        document.getElementById('nameError').textContent = "Full name is required";
        valid = false;
    }
    if(email === ''){
        document.getElementById('emailError').textContent = "Email is required";
        valid = false;
    }
    else if(!emailPattern.test(email)){
    document.getElementById('emailError').textContent = "Enter a valid email";
    valid = false;
}

    if(subject === ''){
        document.getElementById('subjectError').textContent = "Please select a subject";
        valid = false;
    }
    if(message === ''){
        document.getElementById('msgError').textContent = "Message cannot be empty";
        valid = false;
    }
    if(!valid){
       e.preventDefault();
    }

})