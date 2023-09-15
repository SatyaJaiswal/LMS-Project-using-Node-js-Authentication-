// Function to load the batch.ejs content
function loadBatchContent() {
    // Send an AJAX request to the server
    fetch('/batch', {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        // Replace the content of the batch-content div with the fetched HTML
        document.getElementById('batch-content').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching batch content:', error);
    });
}

// Add a click event listener to the "Create Batch" link
document.getElementById('create-batch-link').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior
    loadBatchContent(); // Call the function to load batch content
});
