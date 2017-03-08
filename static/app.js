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
			energie: false
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
				 * Loop over property key. Every returns boolean
				 */
				var allDone = Object.keys(app.state).every(function(propertyName, indexNumber) {
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
				/**
				 * If allDone = do request
				 */
				if(allDone) {
					// Disable all fieldsets
					render.toggleFieldset();

					var url = request.createURL(app.state);

					var callbackFunction = function(results) { // Async, only fire callbackFunction if data is fetched.
						app.store = results.Objects; // save objects for eventual later use

						render.toDOM('.house-list', render.list(results.Objects));
					};

					request.get(url, callbackFunction);
				}
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
			return `http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${config.API_KEY}/?type=koop&zo=/${stateObject.stad}/${stateObject.prijs}/${stateObject.personen}`;
		},
		/**
		 * Makes request based on state URL and fires callback when done.
		 * @param  {String} url API url
		 * @param {Function} callbackFunction
		 */
		get: function(url, callbackFunction) {
			// Fetch (request) the url
			fetch(url)
				.then(function(res) {
					// Convert the response to usable json
					return res.json();
				})
				.then(function(res) {
					// Fire the callbackFunction with the result as parameter
					callbackFunction(res);
				})
				.catch(function(error) {
					console.error(error);
				});
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

			if(indexNumber) {
				fieldsets[indexNumber].disabled = false;
			}
		},

		/**
		 * Converts array of objects to HTML string
		 * @param {Array} houseArray Array of objects which contain Funda houses.
		 * @return {String} HTML string
		 */
		list: function(houseArray) {
			return `
				<ul>
					${houseArray
						.map(function(houseObject) {
							return render.listItem(houseObject);
						})
						.reduce(function(html, string) {
							return html += string;
						})
					}
				</ul>
			`;
		},

		/**
		 * Convert house objects to HTML string
		 * @param  {Object} houseObject One house object
		 * @return {String} HTML output of single list item
		 */
		listItem: function(houseObject) {
			return `
				<li>
					<p>${houseObject.Adres}</p>
				</li>
			`;
		},

		/**
		 * Puts HTML string in a pre-defined element
		 * @param  {String} selectorString CSS selector
		 * @param  {String} HTMLString A string with HTML
		 */
		toDOM: function(selectorString, HTMLString) {
			document.querySelector(selectorString).innerHTML = HTMLString;
		}
	};

	app.init();

})();
