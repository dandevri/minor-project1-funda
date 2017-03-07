(function() { // Iffe

	var app = {
		init: function() {
			routes.init();
		}
	};

	var request = {
		getHouseList: function() { // Request house list
			this.doRequest(
				`http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${config.API_KEY}/${config.HOUSE_PARAMETER}`,
				function(response) {
					console.log(response);
					sections.createHouseList(response.Objects);
				}
			);
		},

		doRequest: function(url, callbackFunction) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.addEventListener('load', function() {
				var response = JSON.parse(request.response);
				callbackFunction(response);
			});
			request.send();
		}

		// doJSONPRequest: function(url, callback) {
		// 	var script = document.createElement('script');
		// 	script.src = url;
		// 	document.body.appendChild(script);
		// }
	};

	var routes = {
		init: function() {
			routie({
				'': function() {
					request.getHouseList();
				}
			});
		}
	};

	var sections = {
		createHouseList: function(dataArray) {
			document.querySelector('.list').innerHTML = ' ';
			dataArray.forEach(function(house) {
				document.querySelector('.list').innerHTML += `
					<li>
						<p>${house.MakelaarNaam}</p>
					</li>
				`;
			});
		}
	};

	app.init();

})();

// window.doStuff = function(data) {
// 	console.log(JSON.parse(data));
// 	return data;
// };
