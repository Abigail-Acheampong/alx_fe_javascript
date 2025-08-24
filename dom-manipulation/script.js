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

// Array to store quote objects, each with text and category
let quotes = [];

// Save quotes array to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes array from local storage, or use defaults if none found
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    quotes = [
      { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
      { text: "Success is not in what you have, but who you are.", category: "Success" },
      { text: "Dream big and dare to fail.", category: "Inspiration" }
    ];
    saveQuotes();
  }
}

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
  // Save last viewed quote index in session storage
  sessionStorage.setItem('lastViewedQuote', randomIndex);
}

// Function to add a new quote from user input fields
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    showRandomQuote();
    textInput.value = '';
    categoryInput.value = '';
    alert('Quote added!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        showRandomQuote();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid JSON format.');
      }
    } catch {
      alert('Failed to import quotes. Please check your file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// On page load, set up event listeners and load quotes
document.addEventListener('DOMContentLoaded', function() {
  loadQuotes();
  showRandomQuote();

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  // ...existing code...

// Populate the category dropdown with unique categories
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  // Get unique categories
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  // Clear existing options except "All"
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const lastFilter = localStorage.getItem('lastCategoryFilter');
  if (lastFilter && categoryFilter.querySelector(`[value="${lastFilter}"]`)) {
    categoryFilter.value = lastFilter;
  }
}

// Show quotes filtered by selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('lastCategoryFilter', selectedCategory);

  let filteredQuotes = quotes;
  if (selectedCategory !== 'all') {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  const quoteDisplay = document.getElementById('quoteDisplay');
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }
  // Show a random quote from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" (${quote.category})`;
}

// Update addQuote to refresh categories and filter
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    populateCategories();
    filterQuotes();
    textInput.value = '';
    categoryInput.value = '';
    alert('Quote added!');
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// On page load, set up everything
document.addEventListener('DOMContentLoaded', function() {
  loadQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById('newQuote').addEventListener('click', filterQuotes);

  // ...existing export/import setup...
});

  // Export button
  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Export Quotes (JSON)';
  exportBtn.onclick = exportToJsonFile;
  document.body.appendChild(exportBtn);

  // Import file input
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.id = 'importFile';
  importInput.accept = '.json';
  importInput.onchange = importFromJsonFile;
  document.body.appendChild(importInput);

  // Restore last viewed quote if available in session storage
  const lastViewed = sessionStorage.getItem('lastViewedQuote');
  if (lastViewed !== null && quotes[lastViewed]) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const quote = quotes[lastViewed];
    quoteDisplay.textContent = `"${quote.text}" (${quote.category})`;
  }
});

