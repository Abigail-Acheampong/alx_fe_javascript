// Array to store quote objects, each with text and category
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not in what you have, but who you are.", category: "Success" },
  { text: "Dream big and dare to fail.", category: "Inspiration" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" (${quote.category})`;
}

// Function to add a new quote from user input fields
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    showRandomQuote(); // Optionally display the new quote
    textInput.value = '';
    categoryInput.value = '';
    alert('Quote added!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Show a random quote on page load and set up event listener
document.addEventListener('DOMContentLoaded', function() {
  showRandomQuote();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});