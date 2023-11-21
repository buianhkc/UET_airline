function deposit() {
    console.log("Nạpajpaj");
    // URL endpoint for your POST request
    var url = '/user-page/deposit';

    // Data to be sent in the POST request (you can customize this)
    
    var data = {
        userId: document.querySelector(".linkToUser").classList[2],
        amount: document.querySelector("#input-amount").value
    };

    console.log(data);
    
    // Fetch API to send POST request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}