const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// 1. Create the click event listener for the Add Chapter button
button.addEventListener('click', () => {
    
    // 2. Logic Check: Make sure the input is not blank
    if (input.value.trim() !== '') {
        
        // 3. Create elements
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        
        // 4. Populate elements
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete'); // For your custom CSS
        
        // 5. Append elements
        li.append(deleteButton);
        list.append(li);
        
        // 6. EVENT DELEGATION: Add listener to the NEW delete button
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            input.focus(); // Improvement: returns focus after deleting
        });
        
        // 7. UI Cleanup: Change input value to empty string
        input.value = '';
        
        // 8. UI Improvement: Send focus back to the input
        input.focus();
        
    } else {
        // If blank, just return focus so the user can try again
        input.focus();
    }
});

// Add support for the 'Enter' key - This is a separate instruction
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // This triggers the entire code block above manually
        button.click();
    }
});