// Navigation 
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

// Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

// Get fruit data
const getData = async () => {
	const response = await fetch('./data/db.json');
	const data = await response.json();
	return data;
}

// Calculate weight function
const calcWeight = (fruit, selectedWeight, inputWeight) => {

	let total;
	let output = '';
	
	getData()
		.then(data => {
			data.items.filter(item => {

				if(fruit === item.name) {

					if(selectedWeight === 'kg') {
						total = Math.floor(inputWeight / item.weight);
						output = `You weigh, rounded to the nearest ${item.icon} ${fruit}. ${total} ${fruit}s.`;
					}

					if(selectedWeight === 'pounds') {
						total = Math.floor((inputWeight / 2.205) / item.weight);
						output = `You weigh, rounded to the nearest ${item.icon} ${fruit}. ${total} ${fruit}s.`;
					}

					if(selectedWeight === 'stone') {
						total = Math.floor((inputWeight * 6.35029318) / item.weight);
						output = `You weigh, rounded to the nearest ${item.icon} ${fruit}. ${total} ${fruit}s.`;
					}
				}
			});

			// Create a div to display the message
			const div = document.createElement('div');

			// Add classes to div
			div.className = `fruit-output`;

			// Add text to div
			div.appendChild(document.createTextNode(`${output}`));

			// Get parent element
			const formSection = document.querySelector('.form__section');

			// Get form results
			const formResults = document.querySelector('#form-results');

			// Insert alert above form results div
			formSection.insertBefore(div, formResults);
	})    
}


// Class UI
class UI {

    showAlert(message, className) {

        // Create a div to display the message
        const div = document.createElement('div');

        // Add classes to div
        div.className = `alert ${className}`;

        // Add text to div
        div.appendChild(document.createTextNode(message));

        // Get Parent element
        const container = document.querySelector('.form__section');

        // Get form
        const form = document.querySelector('#fruit-form');

        // Insert above form
        container.insertBefore(div, form);

        // Remove alert after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 5000)

    }

    showOverlay() {

       // Hide it from display
        document.querySelector('#fruit-form').style.display = 'none';

        document.querySelector('#form-output-overlay').style.display = 'block';

    }

    showLoadingAnimation() {

        document.querySelector('#animation').style.display = 'block';

        setTimeout(() => {
            document.querySelector('#animation').style.display = 'none';
        }, 4000);

    }

    clearFields() {

        document.querySelector('#fruit-name').value = '';
        document.querySelector('#weight').value = '';
        document.querySelector('#inputWeight').value = '';

    }

    disableInput() {

        document.querySelector('#fruit-name').disabled = true;
        document.querySelector('#weight').disabled = true;
        document.querySelector('#inputWeight').disabled = true;

    }

    formReset() {

        document.querySelector('#submit__btn').value = `Enter new measurement?`;

        document.querySelector('#submit__btn').addEventListener('click', e => {

            location.reload();

            e.preventDefault();
        })
    }

}

// Get Form Values
document.querySelector('#fruit-form').addEventListener('submit', (e) => {

    const fruit = document.querySelector('#fruit-name').value;
    const selectedWeight = document.querySelector('#weight').value;
    const inputWeight = document.querySelector('#inputWeight').value;

    // Instantiate UI Object
    const ui = new UI();

    // Validate Form Entries
    if(fruit === '' || selectedWeight === '' || inputWeight === '') {

        // Show error alert
        ui.showAlert('Please fill in all fields!', 'error');

    } else {

        // Clear fields after submit
        ui.clearFields();

        // Show Output
				calcWeight(fruit, selectedWeight, inputWeight);

        // Disable input
        ui.disableInput();

        // Reset form for new measurement
        ui.formReset();

    }
    e.preventDefault();
})

