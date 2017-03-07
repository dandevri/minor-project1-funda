(function() { // Iffe

	var app = {
		init: function() {
			routes.init();
			sections.listen();

			var $jsonp = (function(){
				var that = {};

				that.send = function(src, options) {
					var options = options || {},
						callback_name = options.callbackName || 'callback',
						on_success = options.onSuccess || function(){},
						on_timeout = options.onTimeout || function(){},
						timeout = options.timeout || 10;

					var timeout_trigger = window.setTimeout(function(){
						window[callback_name] = function(){};
						on_timeout();
					}, timeout * 1000);

					window[callback_name] = function(data){
						window.clearTimeout(timeout_trigger);
						on_success(data);
					};

					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.async = true;
					script.src = src;

					document.getElementsByTagName('head')[0].appendChild(script);
				};

				return that;
			})();

			$jsonp.send('http://zb.funda.info/frontend/geo/suggest/?query=/' + inputTextValue + '/&max=7&type=koop&callback=callback', {
				onSuccess: function(json) {
					console.log('succes!', json);
				},
				onTimeout: function() {
					console.log('timeout!');
				},
				timeout: 5
			})


		}
	};

	var request = {
		getBuurten: function() {
			this.doRequest(
				`http://zb.funda.info/frontend/geo/suggest/?query=amsterdam&max=7&type=koop&callback=callback`,
				function(response) {
				console.log(response);
					sections.createBuurten(response.Objects);
				}
			);
		},

		getHouseList: function() { // Request house list
			this.doRequest(
				`http://funda.kyrandia.nl/feeds/Aanbod.svc/json/${config.API_KEY}/${config.HOUSE_PARAMETER}`,
				function(response) {
					// console.log(response);
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
	};

	var routes = {
		init: function() {
			routie({
				'': function() {
				},
				'start': function() {
					request.getBuurten();
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
		},

		createBuurten: function(dataArray) {
			document.querySelector('.list').innerHTML = ' ';
			dataArray.forEach(function(buurt) {
				document.querySelector('.list').innerHTML += `
					<li>
						<p>${buurt.AantalKamers}</p>
					</li>
				`;
			});
		},

		listen: function() {
			document.querySelector('.zoek').addEventListener('click', function() {
				sections.inputTextValue(event);
			});
		},

		inputTextValue: function(event) {
			event.preventDefault();
			// document.getElementById('buurt').value;
			console.log(document.getElementById('buurt').value);
		}
	};

	app.init();

})();
