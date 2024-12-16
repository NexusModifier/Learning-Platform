document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal');
    const placeholders = document.querySelectorAll('.placeholder');
    const closeBtn = document.querySelector('.close');
    const subjects = document.querySelectorAll('.subject');
    const primaryColorButtons = document.querySelectorAll('.primary-colors .color-button');
    const secondaryColorButtons = document.querySelectorAll('.secondary-colors .color-button');

    let selectedPrimaryColor = null;
    let selectedSecondaryColor = null;
    let currentPlaceholder = null;

    // Hide modal initially
    modal.style.display = 'none';

    // Handle primary color selection
    primaryColorButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedPrimaryColor = button.dataset.color;
            highlightSelectedColor(button, primaryColorButtons);
        });
    });

    // Handle secondary color selection
    secondaryColorButtons.forEach(button => {
        button.addEventListener('click', function () {
            selectedSecondaryColor = button.dataset.color;
            highlightSelectedColor(button, secondaryColorButtons);
        });
    });

    // Highlight selected color button
    function highlightSelectedColor(button, buttons) {
        buttons.forEach(btn => btn.style.border = 'none');
        button.style.border = '3px solid #000';
    }

    // Open modal on placeholder click
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function () {
            modal.style.display = 'flex';
            currentPlaceholder = placeholder;
        });
    });

    // Close modal on close button or outside click
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function (event) {
        if (event.target === modal) closeModal();
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    // Create and add book on subject click
    subjects.forEach(subject => {
        subject.addEventListener('click', function () {
            if (!selectedPrimaryColor || !selectedSecondaryColor) {
                displayError("Please select both primary and secondary colors before choosing a book.");
                return;
            }

            const book = createBook(subject.textContent, selectedPrimaryColor, selectedSecondaryColor);
            currentPlaceholder.innerHTML = '';  // Remove placeholder content
            currentPlaceholder.appendChild(book);  // Add new book to placeholder
            currentPlaceholder.dataset.subject = subject.dataset.subject;  // Store subject

            modal.style.display = 'none';  // Close the modal
        });
    });

    function createBook(subjectName, primaryColor, secondaryColor) {
        const book = document.createElement('div');
        book.classList.add('book');
        book.textContent = subjectName;
        book.style.backgroundColor = primaryColor;

        addBookSpines(book, secondaryColor);
        addCloseButton(book);  // Add close button to the book

        animateBookAppearance(book);

        return book;
    }

    function addBookSpines(book, spineColor) {
        const spineBefore = document.createElement('div');
        const spineAfter = document.createElement('div');
        spineBefore.classList.add('spine-before');
        spineAfter.classList.add('spine-after');
        spineBefore.style.backgroundColor = spineColor;
        spineAfter.style.backgroundColor = spineColor;
        book.appendChild(spineBefore);
        book.appendChild(spineAfter);
    }

    function addCloseButton(book) {
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.background = 'rgba(0, 0, 0, 0.5)';
        closeButton.style.color = '#fff';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.fontSize = '14px';
        closeButton.style.width = '20px';
        closeButton.style.height = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.display = 'none';  // Initially hide the button

        closeButton.addEventListener('click', function (event) {
            event.stopPropagation();  // Prevent the event from propagating to other handlers
            removeBook(book);  // Call the function to remove the book
        });

        book.appendChild(closeButton);
    }

    function removeBook(book) {
        const placeholder = book.parentNode;
        placeholder.innerHTML = '';  // Remove the book and return to placeholder
        // Optionally, you can reset the placeholder to a specific text or style if needed.
    }

    function animateBookAppearance(book) {
        book.style.transform = 'scale(0.9)';
        book.style.transition = 'transform 0.2s ease-in-out';
        setTimeout(() => {
            book.style.transform = 'scale(1)';
        }, 0);
    }

    function displayError(message) {
        const errorElement = document.createElement('p');
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.textAlign = 'center';
        errorElement.style.marginTop = '10px';

        if (!modal.querySelector('p')) {
            modal.appendChild(errorElement);
            setTimeout(() => errorElement.remove(), 2000);
        }
    }

    // Show close button when hovering over the book
    document.addEventListener('mouseover', function (event) {
        if (event.target && event.target.classList.contains('book')) {
            const closeButton = event.target.querySelector('.close-button');
            if (closeButton) {
                closeButton.style.display = 'block';  // Show the close button on hover
            }
        }
    });

    // Hide the close button when not hovering over the book
    document.addEventListener('mouseout', function (event) {
        if (event.target && event.target.classList.contains('book')) {
            const closeButton = event.target.querySelector('.close-button');
            if (closeButton) {
                closeButton.style.display = 'none';  // Hide the close button when not hovered
            }
        }
    });
});
