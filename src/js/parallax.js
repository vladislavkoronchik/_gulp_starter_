/* ====================================================================== */
try {
	const parallax = document.querySelector('.header');
	if (parallax.hasAttribute('data-parallax')) {
		const parallaxContainer = parallax.querySelector('.header__container');
		const parallaxBack = parallax.querySelector('.header__back');
		const parallaxBg = parallax.querySelector('.header__bg');
		const isParallax = parallax.getAttribute('data-parallax');

		const coeffitient = 10;
		const speed = 0.15;

		let positionX = 0;
		let positionY = 0;
		let coordXpercent = 0;
		let coordYpercent = 0;

		let minHeightParallax = 500;

		const setParallaxParams = function(e) {
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			coordXpercent = coordX / parallaxWidth * 100;
			coordYpercent = coordY / parallaxHeight * 100;
		}

		function checkParallax() {
			if (window.innerHeight > minHeightParallax) {
				parallax.classList.add('parallax');
				parallaxContainer.classList.add('parallax__container');
				parallaxBack.classList.add('parallax__back');
				parallaxBg.classList.add('parallax__bg');
				parallax.setAttribute('data-parallax-hide', false);
				goParallax();
			} else {
				parallax.classList.remove('parallax');
				parallaxContainer.classList.remove('parallax__container');
				parallaxBack.classList.remove('parallax__back');
				parallaxBg.classList.remove('parallax__bg');
				parallax.setAttribute('data-parallax-hide', true);
				if (typeof obs === 'undefined') {
					let obs = goParallax()
				}
				obs = goParallax()
				stopParallax(obs);
			}
		}

		function stopParallax(arr) {
			let { observer, requestID } = arr;

			parallax.removeEventListener('mousemove', setParallaxParams);
			cancelAnimationFrame(requestID);
			// observer.unobserve(document.querySelector('.main'));

			parallaxContainer.style.cssText = `transform: translate(0%, 0%)`;
			parallaxBg.parentElement.style.cssText = `transform: translate(0%, 0%)`;
			parallaxBg.style.cssText = `transform: translate(0%, 0%)`;
		}

		function setMouseParallaxStyle() {
			const distX = coordXpercent - positionX;
			const distY = coordYpercent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			parallaxBg.style.cssText = `transform: translate(${positionX / coeffitient}%, ${positionY / coeffitient}%)`;

			return requestAnimationFrame(setMouseParallaxStyle);
		}

		function setMouseParallaxItemsStyle(scrollTopPercent, flag) {
			if (flag === 'false') {
				parallaxContainer.style.cssText = `transform: translate(0%, -${scrollTopPercent / 2}%)`;
				parallaxBg.parentElement.style.cssText = `transform: translate(0%, -${scrollTopPercent / 9}%)`;
			} else {
				parallaxContainer.style.cssText = `transform: translate(0%, 0%)`;
				parallaxBg.parentElement.style.cssText = `transform: translate(0%, 0%)`;
			}
		}

		function goParallax() {
			const requestID = setMouseParallaxStyle();

			parallax.addEventListener("mousemove", setParallaxParams);

			let thresholdSets = [];
			for (let i = 0; i <= 1.0; i += 0.005) {
				thresholdSets.push(i);
			}

			const callback = function(entries, observer) {
				const scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
				const flag = parallax.getAttribute('data-parallax-hide');
				setMouseParallaxItemsStyle(scrollTopPercent, flag);
			};

			const observer = new IntersectionObserver(callback, {
				threshold: thresholdSets
			});

			observer.observe(document.querySelector('.main section'));

			return { observer, requestID };

		}

		if (isParallax === 'true') {
			checkParallax();

			window.addEventListener('resize', checkParallax);
		}

	}

} catch {
	console.log('error');
}
/* ====================================================================== */
