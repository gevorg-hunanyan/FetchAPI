const baseURL = 'http://openlibrary.org/search.json?q=';
let currentPage = 1;

function searchBooks() {
    currentPage = 1;
    const searchTerm = document.getElementById('searchInput').value;
    const currenValue = searchTerm.split(" ").join("+");
    const url = baseURL + currenValue;

    fetch(url)
        .then(response => response.json())
        .then(data => showResults(data));
}

function showResults(data) {
    const myDiv = document.getElementById('div');
    const paginationDiv = document.getElementById('pagination');
    myDiv.innerHTML = '';

    paginationDiv.innerHTML = '';

    const numFound = data.numFound;
    const docs = data.docs;

    myDiv.innerHTML += `<div id="results"></div>`;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML += `<p class="result">Total Results: ${numFound}</p>`;

    docs.forEach(doc => {
        resultsDiv.innerHTML += `
            <div class="result">
                <p><strong>Title:</strong> ${doc.title || 'N/A'}</p>
                <p><strong>Author Name:</strong> ${doc.author_name ? doc.author_name.join(', ') : 'N/A'}</p>
                <p><strong>First Publish Year:</strong> ${doc.first_publish_year || 'N/A'}</p>
                <p><strong>Subject:</strong> ${doc.subject ? doc.subject.slice(0, 5).join(', ') : 'N/A'}</p>
            </div>
        `;
    });

    const pages = Math.ceil(numFound / 100); 
    const totalPages = Math.ceil(pages / 10);

    let startPage = currentPage - 5;
    let endPage = currentPage + 4;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(10, pages);
    } else if (endPage > pages) {
        endPage = pages;
        startPage = Math.max(1, endPage - 9);
    }


    if (currentPage > 1) {
        paginationDiv.innerHTML += `<button class="page-item-" onclick="goToThePage(${currentPage - 1})">Previous</button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationDiv.innerHTML += `<button class="page-item-${i === currentPage ? 'active' : ''}" onclick="goToThePage(${i})">${i}</button>`;
    }

    if (currentPage < totalPages) {
        paginationDiv.innerHTML += `<button class="page-item-" onclick="goToThePage(${currentPage + 1})">Next</button>`;
    }

}

function goToThePage(page) {
    currentPage = page;
    const searchTerm = document.getElementById('searchInput').value;
    const currenValue = searchTerm.split(" ").join("+");
    const url = baseURL + currenValue + `&page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => showResults(data));
}