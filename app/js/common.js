$(function() {

	$('.open-popup').on('click', function(e) {
		e.preventDefault();
		let id = $(this).attr('href');
		if ( $(this).is('button') ) {
			id = `#${$(this).data('id')}`
		}
		$(id).fadeIn(400);
		setTimeout(function() {
			$(id).addClass('opened')
		}, 10);
		checkLocationHeight();
	});

	function closePopup() {
		$('.popup-wrapper').removeClass('opened');
		setTimeout(function() {
			$('.popup-wrapper').fadeOut(400)
		}, 10)
	};

	$('.popup-close').on('click', closePopup);
	$('.popup-bg').on('click', closePopup);
	$('.close-confirm-btn').on('click', closePopup);

	$('.best-selling').owlCarousel({
		items: 1,
		dots: false,
		nav: true
	});

	$('.recently-searched-slider').owlCarousel({
		items: 4,
		dots: false,
		nav: true,
		responsive: {
			0: {
				items: 1
			},
			375: {
				items: 2
			},
			1200: {
				items: 3
			},
			1365: {
				items: 4
			}
		}
	});

	function openSearch() {
		$('.search-form').addClass('autocomplete');
		$('.search-results-dropdown').addClass('fade');
		$('.body-overlay').addClass('fade');
		$('.search-product-input').focus();
	}

	$('.search-product-input').on('input', function() {
		if ( $(this).val().trim().length > 0 ) {
			openSearch()
		}
		else {
			closeSearch()
		}
	});

	function closeSearch() {
		$('.search-form').removeClass('autocomplete');
		$('.search-results-dropdown').removeClass('fade');
		$('.body-overlay').removeClass('fade')
	}

	$('.close-search-autocomplete').on('click', closeSearch);

	$('.body-overlay').on('click', closeSearch);

	$('.phone-mask').inputmask({
		'mask': "+7 999 999 99 99",
		'showMaskOnHover': false
	});
	$('.date-mask').inputmask({
		'alias': 'datetime',
		'inputFormat': "dd/mm/yyyy",
		'showMaskOnHover': false
	});

	$('.open-sign-form').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('.account-dropdown').toggleClass('visible');
	});

	$('.order-status-link').on('click', function(e) {
		e.preventDefault();
		$('.order-status .account-dropdown').toggleClass('visible');
	});


	function codeTimerFunc() {
		let time = 59;
		$('.code-time-text').text('59')
		let code_timer = setInterval(function() {
			time--;
			if ( time <= 0 ) {
				clearInterval(code_timer)
			}
			$('.code-time-text').text(time)
		}, 1000);
	};

	$('.open-code-form').on('click', function(e) {
		e.preventDefault();
		$('.phone-code-wrapper').fadeIn(400);
		codeTimerFunc()
	});

	$('.basket-link').on('click', function(e) {
		if ( $(window).width() >= 768 ) {
			e.preventDefault();
			$(this).parent().find('.account-dropdown').toggleClass('visible');
		}
	});

	$(document).on('click', function(e) {
		if (!$(e.target).closest(".person-link").length) {
			$('.person-link .account-dropdown').removeClass('visible');
		}
		if (!$(e.target).closest(".order-status").length) {
			$('.order-status .account-dropdown').removeClass('visible');
		}
		if (!$(e.target).closest(".header-basket").length) {
			$('.header-basket .account-dropdown').removeClass('visible');
		}
		if (!$(e.target).closest(".header-basket").length) {
			$('.header-basket .account-dropdown').removeClass('visible');
		}
		if (!$(e.target).closest(".second-menu").length) {
			if ( $('.menu-burger-dropdown').hasClass('fade') ) {
				$('.menu-burger-dropdown').removeClass('fade');
				$('.body-overlay').removeClass('fade')
			}
		}
		e.stopPropagation();
	});

	function dropdownMenuHeight(item) {
		var height = 0,
				menu_item = item;
		item.find('.menu-list ul').each(function() {
			var sub_height = $(this).height();
			if ( sub_height > height ) {
				height = sub_height;
			}
			item.find('.menu-list > ul').css('min-height', height);
		});
	};

	function checkHeight() {
		$('.menu-item').each(function() {
			let ths = $(this);
			if ( $(window).width() >= 768 ) {
				dropdownMenuHeight(ths);
			}
		});
	}checkHeight();

	$('.menu-item').hover(
		function() {
			$('.menu-burger-dropdown').removeClass('fade');
			$('.body-overlay').addClass('fade');
			dropdownMenuHeight($(this).find('.menu-dropdown'))
		},
		function() {
			$('.body-overlay').removeClass('fade')
		}
	);

	$('.menu-news').owlCarousel({
		items: 1,
		loop: true,
		nav: false,
		dots: true,
		margin: 10
	});

	$('.open-second-menu').on('click', function(e) {
		e.preventDefault();
		$('.menu-burger-dropdown').toggleClass('fade');
		$('.body-overlay').toggleClass('fade')
	});

	$('.timer').each(function() {
		let timer = $(this),
				hour_block = timer.find('.hour'),
				minute_block = timer.find('.minute'),
				second_block = timer.find('.second'),
				time = parseInt(timer.data('time')),
				time_hour = 0;
				time_minute = 0;
				time_second = 0;
		function timerCounter() {
			if ( time > 0 ) {
				time--;
				time_hour = parseInt(time / 60 / 60);
				time_minute = parseInt( ( time - ( time_hour * 60 * 60 ) ) / 60 );
				time_second = time - ( time_hour * 60 * 60 ) - ( time_minute * 60 );
				if ( time_hour.toString().length < 2 ) {
					hour_block.text('0' + time_hour);
				} else {
					hour_block.text(time_hour);
				}
				if ( time_minute.toString().length < 2 ) {
					minute_block.text('0' + time_minute);
				} else {
					minute_block.text(time_minute);
				}
				if ( time_second.toString().length < 2 ) {
					second_block.text('0' + time_second);
				} else {
					second_block.text(time_second);
				}
			}
		}timerCounter();
		setInterval(timerCounter, 1000);
	});

	$('.video-wrapper').each(function() {
		let ths = $(this),
				poster = ths.find('.video-poster'),
				video = document.getElementById(poster.data('for')),
				play_btn = ths.find('.video-play-btn');
		play_btn.on('click', function() {
			poster.fadeOut()
			video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
		});
	});

	$('.article-slider').owlCarousel({
		items: 4,
		nav: true,
		dots: false,
		margin: 38,
		responsive: {
			0: {
				items: 1,
				margin: 10
			},
			375: {
				items: 2,
				margin: 19
			},
			992: {
				items: 3,
				margin: 38
			},
			1365: {
				items: 4
			}
		}
	});

	$('.open-tablet-search').on('click', function(e) {
		e.preventDefault();
		openSearch()
	});

	function addBackArrowMenu() {
		if ( $('.menu-dropdown').hasClass('show') ) {
			$('.menu-go-back').addClass('show')
		}
		else {
			$('.menu-go-back').removeClass('show')
		}
		$('.menu-dropdown').scrollTop(0);
		$('.main-menu-body').scrollTop(0)
	}addBackArrowMenu();

	function addLink() {
		let id = $('.menu-list ul.show').parent().find('> a').attr('href'),
				text = $('.menu-list ul.show').last().parent().find('> a').text(),
				main_link = $('.menu-dropdown.show').parent().find('> a');
		if ( $('.menu-list ul.show').length !== 0 ) {
			$('.main-menu-catalog-link a').attr('href', id).text(text);
		}
		else {
			$('.main-menu-catalog-link a').attr('href', main_link.attr('href')).text(main_link.text());
		}
	}

	$('.menu-item > a').on('click', function(e) {
		e.preventDefault();
		let id = $(this).attr('href'),
				text = $(this).text();
		$('.main-menu-catalog-link a').attr('href', id).text(text);
		$('.main-menu-catalog-link').addClass('show');
		$(this).parent().find('.menu-dropdown').addClass('show');
		addBackArrowMenu()
	});

	$('.menu-list .has-child').on('click', function() {
		$(this).find('> ul').addClass('show');
		$('.menu-dropdown').scrollTop(0);
		$('.main-menu-body').scrollTop(0);
		addLink();
	});

	$('.menu-go-back').on('click', function(e) {
		e.preventDefault();
		if ( $('.menu-list .has-child ul.show').length == 0 ) {
			$('.menu-dropdown').removeClass('show');
			$('.menu-go-back').removeClass('show');
			$('.main-menu-catalog-link').removeClass('show');
		}
		$('.menu-list .has-child ul.show').last().removeClass('show')
		addLink();
	});

	$('.open-mob-menu').on('click', function(e) {
		e.preventDefault();
		$('.main-menu').addClass('slide');
		closeSearch();
	});

	$('.menu-close').on('click', function(e) {
		e.preventDefault();
		$('.main-menu').removeClass('slide');
	});

	$('.dropdown-close').on('click', function() {
		$('.account-dropdown').removeClass('visible')
	});

	$('.product-liked').on('click', function() {
		$(this).toggleClass('liked');
	});

	$('.footer-toggle .footer-item-title').on('click', function() {
		if ( $(window).width() < 768 ) {
			$(this).toggleClass('active');
			$(this).parent().find('.footer-item-body').slideToggle();
		}
	});

	$('.info-banners').owlCarousel({
		items: 1,
		nav: false,
		dots: true,
		loop: true
	});

	function checkLocationHeight() {
		if ( $(window).width() < 768 ) {
			$('.location-list-col-wrapper').css('height', $('.location-list-row').height() - $('.location-search').height() )
		}
		else {
			$('.location-list-col-wrapper').css('height', '')
		}
	}checkLocationHeight();

	$(window).on('resize', function() {
		checkLocationHeight();
	});

	$('.quantity-group-input input').on('input', function() {
		if ( $(this).val().trim().length > 0 ) {
			$(this).addClass('focus')
		} else {
			$(this).removeClass('focus')
		}
	});

	$(".only-number").keypress(function(event){
		event = event || window.event;
		if (event.charCode && event.charCode!=0 && (event.charCode < 48 || event.charCode > 57) ) {
			return false;
		}
	});

	$('.select-style').select2({
		minimumResultsForSearch: -1
	});

	$('.sale-block').each(function() {
		let ths = $(this);
		ths.find('.sale-block-remove-btn').on('click', function(e) {
			e.preventDefault();
			ths.slideUp(300);
		});
	});

	$('.catalog-sidebar-open-link').on('click', function(e) {
		e.preventDefault();
		$('.catalog-sidebar').addClass('visible');
	});

	$('.close-catalog-sidebar').on('click', function(e) {
		e.preventDefault();
		$('.catalog-sidebar').removeClass('visible');
	});

	$('.sort-open-link').on('click', function(e) {
		e.preventDefault();
		$('.catalog-sorting').slideToggle()
	});

	function fixedHeader() {
		if ( $(window).scrollTop() > 0 && $(window).width() < 768 ) {
			$('.header').addClass('fixed')
		}
		else {
			$('.header').removeClass('fixed')
		}
	}fixedHeader();

	$(window).on('scroll', function() {
		fixedHeader()
	});

	$('.product-images').owlCarousel({
		items: 1,
		nav: false,
		dots: false,
		startPosition: 'URLHash',
		responsive: {
			0: {
				dots: true,
				touchDrag: true,
				mouseDrag: true
			},
			576: {
				dots: false,
				touchDrag: false,
				mouseDrag: false,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn',
			}
		}
	});


	$('.thumbnails-item').each(function() {
		if ( $(this).attr('href').slice(1) == $('.product-images .owl-item.active').find('.product-images-item').data('hash') ) {
			$(this).addClass('active')
		}
	});

	$('.thumbnails-item').on('click', function() {
		$('.thumbnails-item').removeClass('active');
		$(this).addClass('active')
	});


	function bgSizeProduct() {
		$('.product-images-item').each(function() {
			let ths = $(this);
			ths.find('.product-magnify').css('background-size', ths.width());
		});
	}bgSizeProduct();
	

	$('.product-magnify').on('click', function() {
		openFullImg($(this).parent().css('background-image').replace('url(','').replace(')','').replace(/\"/gi, ""))
	});

	$('.up-btn').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		},1000);
	});

	$('.tabs-wrapper').each(function() {
		let ths = $(this);
		ths.find('.tabs-link').on('click', function(e) {
			e.preventDefault();
			let id = $(this).attr('href');
			ths.find('.tabs-link').removeClass('active');
			$(this).addClass('active');
			if ( $(id).is(':hidden') ) {
				ths.find('.tab-item').hide();
				$(id).fadeIn();
			}
		});
	});
	

	$('.open-full-img').on('click', function(e) {
		e.preventDefault();
		openFullImg($(this).attr('href'))
	});

	function openFullImg(url) {
		let img_url = url,
				view_popup = $('#popup-image-view');
		$('.image-view').attr('src', img_url);
		view_popup.fadeIn(400);
		setTimeout(function() {
			view_popup.addClass('opened')
		}, 10);
	}

	let products_plus_slider = $('.products-plus');
	products_plus_slider.owlCarousel({
		items: 4,
		nav: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			375: {
				items: 2
			},
			800: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});

	function eqSliderWidth(slider_item) {
		let slider = slider_item;
		if ( slider_item.length > 0 ) {
			let item_width = parseFloat(slider_item.find('.owl-stage .owl-item')[0].style.width);
			slider_item.find('.owl-item').css('min-width', item_width);
		}
	};

	products_plus_slider.on('changed.owl.carousel', function(event) {
		setTimeout(function() {eqSliderWidth(products_plus_slider)}, 10)
	});

	eqSliderWidth(products_plus_slider);

	$('.products-plus .owl-item').each(function() {
		$(this).css('z-index', $('.products-plus .owl-item').length - $(this).index())
	});

	let products_slider = $('.prod-slider');
	products_slider.owlCarousel({
		items: 3,
		nav: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			375: {
				items: 2
			},
			800: {
				items: 3
			}
		}
	});

	products_slider.on('changed.owl.carousel', function(event) {
		setTimeout(function() {eqSliderWidth(products_slider)}, 10)
	});

	eqSliderWidth(products_slider);

	$('.tab-item').each(function() {
		let ths = $(this);
		ths.find('.tab-mob-title').on('click', function() {
			$(this).toggleClass('active');
			ths.find('.tab-body').slideToggle()
		});
	});

	$('.product-compare').on('click', function() {
		$(this).toggleClass('added');
		$('.compare-modal').addClass('visible')
	});

	$('.compare-modal-close').on('click', function() {
		$('.compare-modal').removeClass('visible')
	});

	$('.product-preview').each(function() {
		let ths = $(this);
		ths.find('.replace-product-btn').on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('active')
			ths.toggleClass('active');
		});
	});

	$('.select-quantity').each(function() {
		let ths = $(this),
				minus = ths.find('.minus'),
				plus = ths.find('.plus'),
				input = ths.find('input'),
				value = parseInt(input.val());
		plus.on('click', function(e) {
			e.preventDefault();
			value++;
			input.val(value);
		});
		minus.on('click', function(e) {
			if ( value > 1 ) {
				e.preventDefault();
				value--;
				input.val(value);
			}
		});
	});

	$('.basket-item').each(function() {
		let ths = $(this),
				open_gift = ths.find('.basket-open-link'),
				gift = ths.find('.basket-select-gift'),
				close_gift = ths.find('.close-basket-gift');
		open_gift.on('click', function(e) {
			e.preventDefault();
			gift.slideToggle();
		});
		close_gift.on('click', function(e) {
			e.preventDefault();
			gift.slideUp();
		});
	});

	$('.open-promocode-form').on('click', function(e) {
		e.preventDefault();
		$('.promocode-form').toggleClass('open')
	});

	$('.input-style').on('input', function() {
		let ths = $(this);
		if ( $(this).val().trim().length > 0 ) {
			ths.addClass('focused')
		}
		else {
			ths.removeClass('focused')
		}
	});

	$('.input-style').each(function() {
		if ( $(this).val().trim().length > 0 ) {
			$(this).addClass('focused')
		}
	});

	$('.delivery-checkbox-item').each(function() {
		let ths = $(this);
		ths.find('.open-del-info').on('click', function(e) {
			e.preventDefault();
			ths.find('.del-company-info').fadeToggle()
		});
	});

	let acc_del_slider = $('.acc-del-slider');
	acc_del_slider.owlCarousel({
		items: 3,
		nav: true,
		dots: false,
		mouseDrag: false,
		responsive: {
			0: {
				items: 1
			},
			375: {
				items: 2
			},
			660: {
				items: 3
			}
		}
	});
	acc_del_slider.on('changed.owl.carousel', function(event) {
		setTimeout(function() {eqSliderWidth(acc_del_slider)}, 10)
	});

	eqSliderWidth(acc_del_slider);

	$('.copy-promocode-link').on('click', function(e) {
		e.preventDefault();
		$('.promocode-link').select();
		document.execCommand('copy');
		$(this).text('Промокод скопирован в буфер обмена');
		setTimeout(function() {
			$('.copy-promocode-link').text('Скопировать ссылку')
		}, 2000)
	});

	$('.del-time-checkbox-label input').on('change', function() {
		let id = $(this).data('open');
		if ( typeof id !== typeof undefined && id !== false ) {
			$(id).addClass('active')
		} else {
			$('.del-other-time').removeClass('active')
		}
	});

	$('.del-other-time-select input').on('input', function() {
		let min = parseInt($(this).attr('min')),
				max = parseInt($(this).attr('max'));
		if ( parseInt($(this).val()) <= min ) {
			$(this).val(min)
		}
		if ( parseInt($(this).val()) >= max ) {
			$(this).val(max)
		}
	});

	$('.exp-img-descr').each(function() {
		let ths = $(this),
				open = ths.find('.exp-img-descr-open'),
				close = ths.find('.exp-img-descr-close');
		open.on('click', function() {
			ths.addClass('opened');
		});
		close.on('click', function(e) {
			e.preventDefault();
			ths.removeClass('opened');
		});
	});

	let prod_create_slider = $('.product-create-slider');

	prod_create_slider.owlCarousel({
		items: 3,
		autoWidth: true,
		nav: true,
		dots: false,
		margin: 23
	});

	function checkLastSlide() {
		prod_create_slider.each(function() {
			let ths = $(this);
			ths.find('.owl-item.active').removeClass('last');
			ths.find('.owl-item.active').last().addClass('last');
		});
	}checkLastSlide();

	prod_create_slider.on('changed.owl.carousel', function(event) {
		setTimeout(checkLastSlide, 10)
	});

});
