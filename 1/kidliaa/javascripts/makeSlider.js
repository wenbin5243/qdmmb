$(function() {
	$.fn.makeSlider = function(options) {

		// check the options if needed		


		//- Cache reference to JDOM elements
		var slider = this;
		var jdom = {
			slider: slider,
			imgs: slider.find('img'),
			placehoder: slider.find('img').eq(0)
		}

		//- global variable
		var turn = 0, /*播放照片的顺序*/
			c = 0, /*图片的数量*/
			imgSrcs=[], /*所有图片的Src值*/
			imgTitles=[],
			sliderTimer;

		//- Ongoing animations
		var sliderAnimation,
			sliderNavAnimation;


		//- Default options, gets extended by passed in arguments
		var config = {
			sliderNav: true,
			sliderNavStyle:'number'
		}

		//- Extend the default config object with the passed
		// in options
		
		



	/*-------------------functions--------------------*/
		function init () {
			extend(config, options);
			prepareElement();
			setupPosition();
			setupSlider();
			setupTitle();
			setupSliderNav();
			updateView();
		}

		// prepareElments is especially for the optional 
		// sliderNav option
		function prepareElement () {
			if(config.sliderNav && config.sliderNavStyle) {
				setupSliderNav();
			}
		}
		function setupPosition() {
			jdom.slider.css({position: "relative"});

		}

		function setupSlider () {
			//清空除所有元素
			jdom.slider.children().remove();
			//插入占位元素
			jdom.placehoder.appendTo(slider);
			//
			jdom.imgs.each(function() {
			imgSrcs.push($(this).attr('src'));
			imgTitles.push($(this).attr('title'));
			});
		}

		function setupTitle () {
			if(config.title) {
				jdom.title = $('<h2></h2>').appendTo(slider).css({
					position: 'absolute',
					left: config.titleX,
					top: config.titleY
				});
			}
		}
		function setupSliderNav () {
				switch(config.navType) {
					case 'number' :
						generateNumNav();
						break;
					case "dot" :
						generateDotNav();
						break;
				}
		}

			function generateDotNav () {
				jdom.sliderNav = $('<div class="slider-nav"></div>').appendTo(slider);
				jdom.sliderNav.css( 
				{
					position: "absolute",
					bottom:config.navY || 0,
					right: config.navX || 0,
					color: "#fff",
					font: "bold 0px arial"
					// backgroundColor: "#000",
				});

				//根据imgSrcs的长度生成数字控制器
				var c = imgSrcs.length;
				for (var i = 0; i < c; i++) {
					// create Ele and apply CSS
					$('<span>')
						.css({
							display: "inline", 
							float: "left",
							width: "10px",
							height: "10px",
							marginRight: "4px",
							'background-color': "#333",
							cursor: "pointer"
						}).appendTo(jdom.sliderNav);

				};
				// 为sliderNav添加鼠标控制
				jdom.sliderNav.click(function() {
					clearTimeout(sliderTimer);
					turn = $(event.target).index();
					updateView();
				});

			}
			function generateNumNav() {

				// create Ele
				jdom.sliderNav = $('<div class="slider-nav"></div>').appendTo(slider);
				// apply css
				jdom.sliderNav.css( 
				{
					position: "absolute",
					bottom: config.navY || 0,
					right: config.navX || 0,
					padding: "0 0 5px 5px",
					color: "#fff",
					font: "bold 11px arial",
					backgroundColor: "#000",
					borderRadius: "2px"
				});

				//根据imgSrcs的长度生成数字控制器
				var c = imgSrcs.length;
				for (var i = 0; i < c; i++) {
					// create Ele and apply CSS
					$('<span>').html(i+1)
						.css({
							float: "left",
							padding: "2px 10px",
							margin: "5px 5px 0 0",
							backgroundColor: "grey",
							borderRadius: "2px",
							cursor: "pointer"
						}).appendTo(jdom.sliderNav);

				};
				// 为sliderNav添加鼠标控制
				jdom.sliderNav.click(function() {
					clearTimeout(sliderTimer);
					turn = $(event.target).index();
					updateView();
				});
				
			} /*eo generateNumNav*/


		function sliderAnimation() {
			if (turn == imgSrcs.length) { turn = 0};
			// update placehoder's src
			jdom.placehoder.fadeOut(500,function() {jdom.placehoder.attr("src",imgSrcs[turn]).fadeIn(1000);});
			jdom.title.text(imgTitles[turn]);
		}

		function sliderNavAnimation() {
			switch( config.sliderNavStyle ){
				case "number":
					$('span',jdom.sliderNav).css("backgroundColor","grey").eq(turn).css("background","red");
					break;
				case "dot":
					/* todo */
					break;
				case "tumb":
					/* todo */
					break;
			}
		}

		function updateView () {
			if(turn==imgSrcs.length) turn=0;
			sliderAnimation();
			sliderNavAnimation();
			turn++;
			sliderTimer = setTimeout(updateView,3000);
		}

		function extend (dem,sup) {
			for (var i in sup){
				dem[i] = sup[i];
			}
		}

		init();

	} /*eo $.fn.makeSlider()*/

	
})