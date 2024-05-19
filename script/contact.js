
function sendEmail(){
    emailjs.init("49pKbJMnYQ0J30s8M");
    ("FORM SUBMITTED");
    var params = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject: document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
    };
    console.log('Your Name: ' + params.name);
    console.log('Your Email: ' + params.email);
    console.log('Email Subject: ' + params.subject);
    console.log('Your Message: ' + params.message);
    
    var templateId = 'template_7yzkfz4';
    var serviceId = 'service_gz9opmq';

    emailjs.send(serviceId, templateId, params)
    .then(res => {
        alert('Email Sent Succesfully!');
        console.log("Email sent succesfully: ", res);
    }).catch(error =>{
        alert('Error Sending The Email, check the log');
        console.log("Error: ", error);
    });
}