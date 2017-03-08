(function() { // Iffe moest van Rijk

	var app = {
		init: function() {
			this.listenToForm();
		},

		/**
		 * Array from all the houses
		 * @type {Array}
		 */
		store: [],

		/**
		 * All the values for the API url
		 * @type {Object}
		 */
		state: {
			stad: false,
			prijs: false,
			personen: false,
			energie: false,
			luxe: false
		},

		/**
		 * Listens to the fieldset
		 */
		listenToForm: function() {
			var form = document.querySelector('form');

			/**
			 * Property name of state to value of event
			 */
			form.addEventListener('change', function(event) {
				app.state[event.target.name] = event.target.value;

				/**
				 * Loop over property key
				 */
				Object.keys(app.state).every(function(propertyName, indexNumber) {
					var value = app.state[propertyName]; // Get value of current property

					// If the value hasn't been filled yet, toggle the corresponding fieldset
					if(value === false) {
						// Disable all fieldsets except the current one
						render.toggleFieldset(indexNumber);

						// Break the loop
						return false;
					}

					// Continue the loop
					return true;
				});
			});

			form.addEventListener('submit', function(event) {
				event.preventDefault(); // Don't reload on submit
			});
		}
	};

	var request = {
		/**
		 * Creates URL based on current state
		 * @param  {Object} stateObject Values of states
		 * @return {String} API url
		 */
		createURL: function(stateObject) {

		},
		/**
		 * Makes request based on state URL and fires callback when done.
		 * @param  {String} url API url
		 * @param {Function} callbackFunction
		 */
		get: function(url, callbackFunction) {

		}
	};

	var render = {

		/**
		 * Toggle individual fieldset based on name attribute.
		 * @param {Number} indexNumber nth fieldset to enable
		 */
		toggleFieldset: function(indexNumber) {
			var fieldsets = document.querySelectorAll('fieldset');

			fieldsets.forEach(function(fieldSet) {
				fieldSet.disabled = true;
			});

			fieldsets[indexNumber].disabled = false;
		},

		/**
		 * Converts array of objects to HTML string
		 * @param {Array} houseArray Array of objects which contain Funda houses.
		 * @return {String} HTML string
		 */
		list: function(houseArray) {

		},

		/**
		 * Convert house objects to HTML string
		 * @param  {Object} houseObject One house object
		 * @return {String} HTML output of single list item
		 */
		listItem: function(houseObject) {

		},

		/**
		 * Puts HTML string in a pre-defined element
		 * @param  {String} selectorString CSS selector
		 * @param  {String} HTMLString A string with HTML
		 */
		toDOM: function(selectorString, HTMLString) {

		}
	};

	app.init();

})();
