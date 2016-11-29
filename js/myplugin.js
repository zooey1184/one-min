;(function($, window, document, undefinded){
	var Base = function(ele, opt){
		this.$element = ele;
		this.options = $.extend({}, this.$element, opt)
	}
	Base.prototype = {
		btn: function(){
			this.$element.click(function(e){
				var w = $(this).width();
				var h = $(this).height();
				var l = $(this).offset().left;
				var t = $(this).offset().top;
				var x = e.pageX - l - w/2;
				var y = e.pageY - t - h/2;
				$(this).children().remove('.wave');
				$(this).append("<div class='wave'></div>")
				if(w>h){
					h = w
				}else{
					w = h
				}
				$('div.wave').css({
					left: x+'px',
					top: y+'px',
					width: w+'px',
					height: h+'px'
				}).addClass('wave_af')
			})
		}
		
	}
	$.fn.myBtnWave = function(opt){
			var base = new Base(this, opt);
			return base.btn()
	}
})(jQuery, window, document)