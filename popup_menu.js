// Define the Gemini API key and URL for the API request
const GEMINI_API_KEY = "YOUR API KEY";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Get the HTML element with the ID 'result_text', where results will be displayed
let resultText = document.getElementById("result_text");

// Get the current URL of the window and extract the query string
const url = new URL(window.location.href);
const search = url.search;  // Get the query part of the URL (e.g., ?q=something)
const searchParam = new URLSearchParams(search);  // Create an object to work with query parameters
const q = searchParam.get('q');  // Extract the value of the 'q' query parameter

// Log a simple message to the console (for debugging)
console.log("hello world");

// Make a POST request to the Gemini API

//A POST request is a type of HTTP request method used to send data to a server. It is one of the most common methods for interacting with web servers and APIs.
fetch(GEMINI_API_URL, {
    method: "POST",  // Define the HTTP method as POST
    headers: {
        'Content-Type': 'application/json',  // Specify that the content type is JSON
    },
    // Send the extracted query 'q' as part of the request body in JSON format
    body: JSON.stringify({
        contents: [{
            parts: [{
                text: q  // Send the query as the text for processing by the API
            }]
        }]
    }),
})
// Handle the response of the API call
.then(response => response.json())  // Parse the response as JSON
.then(data => {
    console.log("API Response:", data);  // Log the entire response for debugging

    // Extract the text from the response using a try-catch block
    try {
        const text = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] ? 
                     data.candidates[0].content.parts[0].text :  // Extract the text if available
                     "Text not found";  // Fallback if the text isn't found
        console.log("Extracted Text:", text);  // Log the extracted text

        // Optionally, you can display the extracted text in the 'result_text' element
        // resultText.textContent = text;  // Uncomment this line to display the text in the HTML element

    } catch (error) {
        // Handle errors that occur when accessing the nested properties of the response
        console.error("Error accessing nested properties:", error);
    }
})
// Handle any errors that occur during the fetch request
.catch(error => console.error("Fetch Error:", error));
