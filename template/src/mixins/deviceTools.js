export const deviceTools = {
	methods: {

		/**
		 * Define regras de statusbar em geral
		 * @return {void}
		 */
		defineStatusBar: function () {
			if(window.cordova && process.env.NODE_ENV == 'prod') {
		  		if(window.device && window.device.platform && window.device.platform.toLowerCase() == 'ios') {
			  		if(window.device.model == 'iPhone10,3' || window.device.model == 'iPhone10,6' || window.device.model == 'x86_64') {

			  			// Configurações de statusbar
			  			if(typeof(StatusBar) !== 'undefined') {
			  				// Coloca a statusbar padrão
				  			StatusBar.styleDefault();

				  			// Mostra satusbar
				  			StatusBar.show();
				  			StatusBar.overlaysWebView(false);

				  			// Executa novamente
				  			setTimeout(function() {
				  				StatusBar.show();
				  				StatusBar.overlaysWebView(false);
				  			}, 2000)

			  			}

			  		}
			  	}
			}
		},

		/**
		 * Resolve problema de Keyboard no Android quando Input Focus
		 * Deve-se adaptar para o framework sendo usado atualmente
		 * @return {void}
		 */
		keyboardAdapt: function() {
			if(window.device && window.device.platform && window.device.platform.toLowerCase() == 'android') {
				window.addEventListener('keyboardDidShow', function (e) {

				});

			  	window.addEventListener('keyboardDidHide', function (e) {
				    setTimeout(function() {
						$('.application--wrap').css('padding-bottom', '0')
						$('.modal-card-body').each(function() {
							$(this).css('padding-bottom', '20px')
						})
						$('input, textarea, select').each(function() {
							$(this).blur()
						})
					}, 100)
				});

				$(document).on('focus', 'input, textarea', function(e) {
					setTimeout(function() {
						$('.application--wrap').css('padding-bottom', '220px')
						$('.modal-card-body').each(function() {
							$(this).css('padding-bottom', '220px')
						})

						document.body.scrollTop = 0;
						$('.modal-card-body').each(function() {
							this.scrollTop = 0
						})

						setTimeout(function() {
							document.body.scrollTop = $(e.target).offset().top-148;
							$('.modal-card-body').each(function() {
								this.scrollTop = 30
							})
						}, 100)
					}, 100)
				});

				$(document).on('blur', 'input, textarea', function(e) {
					setTimeout(function() {
						$('.application--wrap').css('padding-bottom', '0')
						$('.modal-card-body').css('padding-bottom', '20px')
					}, 100)
				});
			}
		},

		/**
		 * Mostra diálog nativo de notificação
		 * @param  {string} message
		 * @param  {string} title
		 * @param  {string} button
		 * @return {void}
		 */
		dialogNotification: function(message, title, button) {
			var self = this
			if (typeof(navigator.notification) !== 'undefined') {
				navigator.notification.alert(message, () => { self.$root.loadingApp = false }, title, button)
			} else {
				alert(message)
				self.$root.loadingApp = false
			}
		},

		/**
		 * Checa se existe conexão
		 * @return {void}
		 */
		checkConnection: function() {
			if (typeof(window.cordova) !== 'undefined' && typeof(navigator.connection) !== 'undefined') {
				var networkState = navigator.connection.type;
				if (networkState === Connection.NONE) {
					this.$root.noConnection = true
				}
			}
		},

		/**
		 * Mostra splash screen
		 * @return {void}
		 */
		showSplash: function() {
			if (typeof(window.cordova) !== 'undefined'){
	          navigator.splashscreen.show();
	        }
		},

		/**
		 * Esconde splash screen
		 * @return {void}
		 */
		hideSplash: function() {
			if (typeof(window.cordova) !== 'undefined'){
	          navigator.splashscreen.hide();
	        }
		}
	}
};