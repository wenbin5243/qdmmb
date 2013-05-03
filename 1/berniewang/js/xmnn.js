var tabUtil = {
	init: function (rootId, tabSelector, contentSelector) {
		var $rootEl = $('#'+rootId);
		var $tabEls = $rootEl.find(tabSelector);
		var $contentEls = $rootEl.find(contentSelector);

		$tabEls.each(function () {
			var $this = $(this);
			$this.mouseover(function () {
				if (!$this.hasClass('active')) {
					$tabEls.removeClass('active');
					$this.addClass('active');
					$contentEls.css('display', 'none');
					$contentEls.filter('#'+$this.attr('id')+'content').css('display', '');
				}
			});
		});
	}
}

var slideUtil = {
	slideArray: [],
	numNavArray: [],
	slideWidth: 0,
	lock: false,
	currentSide: undefined,
	intervalHandler: undefined,
	init: function (rootId, slideSelector, numNavSelector) {
		var $rootEl = $('#'+rootId);
		var self = this;
		var $numNav = $rootEl.find(numNavSelector);
		this.slideWidth = $rootEl.width();
		$rootEl.find(slideSelector).each(function () {
			var $this = $(this);
			self.slideArray[parseInt($this.attr('data-index'))] = $this;
			if (!self.currentSide && $this.hasClass('active')) {
				self.currentSide = $this;
			}
		});
		$numNav.each(function () {
			var $this = $(this);
			self.numNavArray[parseInt($this.attr('data-index'))] = $this;
			$this.click(function () {
				if (!self.lock) {
					clearInterval(self.intervalHandler);
					$numNav.removeClass('active-num')
					$this.addClass('active-num')
					self.move(parseInt($this.attr('data-index')));
					self.startMove();
				}
			});
		});
		this.startMove();
		// for (var i =0; i < this.slideArray.length; i++) {
		// 	console.log(this.slideArray[i].attr('data-index'))
		// }
	},
	startMove: function () {
		var self = this;

		this.intervalHandler = setInterval(function () {
			var index = parseInt(self.currentSide.attr('data-index'));
			if (index == self.slideArray.length-1) {
				index = 0;
			} else {
				index++
			}
			self.move(index);
		}, 3000);
	},
	move: function (index) {
		//要移动已经是当前页的页面
		if (this.currentSide && parseInt(this.currentSide.attr('data-index')) == index) {
			return;
		}
		//-- 开始移动slide的逻辑 ---
		//如果没有锁则加锁
		var self = this;
		if (!this.lock) {
			this.lock = true;
		}
		var numNav = this.numNavArray[index];
		var inSlide= this.slideArray[index];
		var inSlideLeft = inSlide.position().left;
		var outSlide = this.currentSide;
		var outSlideLeft = outSlide.position().left;
		inSlideLeft = inSlideLeft - 40 <0 ? 0 : inSlideLeft - 40;
		outSlideLeft -= 40;

		inSlide.css('left', inSlideLeft+'px');
		outSlide.css('left', outSlideLeft+'px');
		if (!numNav.hasClass('active-num')) {
			for (var i = 0; i < this.numNavArray.length; i++) {
				this.numNavArray[i].removeClass('active-num');
				numNav.addClass('active-num');
			}
		}

		if (inSlideLeft == 0) {
			this.currentSide.css('left', this.slideWidth+'px');
			this.currentSide = inSlide;
			this.lock = false;
		} else {
			setTimeout(function () {
				self.move(index);
			}, 20)
		}
	}
}