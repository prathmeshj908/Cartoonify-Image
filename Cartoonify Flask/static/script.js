document.addEventListener('DOMContentLoaded', function () {
    const cardInner = document.querySelector('.card-inner');
    const frontFace = document.querySelector('.front-face');
    const backFace = document.querySelector('.back-face');
    const footer = document.querySelector('.footer');

    let isFlipped = false;

    cardInner.addEventListener('click', function () {
        isFlipped = !isFlipped;
        if (isFlipped) {
            // Simulate an AJAX request (replace with your actual AJAX logic)
            simulateAjaxRequest()
                .then(response => {
                    // Update back face content with AJAX response
                    backFace.innerHTML = `<h2>AJAX Response</h2><p>${response}</p>`;
                })
                .catch(error => {
                    console.error('Error fetching AJAX data:', error);
                    // Handle error, e.g., display an error message
                });
        } else {
            backFace.innerHTML = ''; // Clear previous back face content
        }
        cardInner.style.transform = `rotateY(${isFlipped ? 180 : 0}deg)`;
    });

    // Animation on footer hover
    footer.addEventListener('mouseenter', function () {
        footer.style.transition = 'background 0.3s ease-in-out';
        footer.style.background = '#485a61';
    });

    footer.addEventListener('mouseleave', function () {
        footer.style.transition = 'background 0.3s ease-in-out';
        footer.style.background = '#394240';
    });

    // Simulate an asynchronous AJAX request (replace with actual AJAX logic)
    function simulateAjaxRequest() {
        return new Promise((resolve, reject) => {
            // Simulate a delay and return a response
            setTimeout(() => {
                const responseData = 'This is the AJAX response data.';
                resolve(responseData);
            }, 1000); // Simulated delay of 1 second
        });
    }
});






