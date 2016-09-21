
$(function(){
	(function($) {
		$('#scroll').scroll({
			indicators: false //是否显示滚动条
		});
		$('#myscroll').scroll({
			indicators: false //是否显示滚动条
		});
//		var segmentedControl = document.getElementById('segmentedControl');
//		$('.mui-input-group').on('change', 'input', function() {
//			if (this.checked) {
//				var styleEl = document.querySelector('input[name="style"]:checked');
//				var colorEl = document.querySelector('input[name="color"]:checked');
//				if (styleEl && colorEl) {
//					var style = styleEl.value;
//					var color = colorEl.value;
//					segmentedControl.className = 'mui-segmented-control' + (style ? (' mui-segmented-control-' + style) : '') + ' mui-segmented-control-' + color;
//				}
//			}
//		});
	})(mui);
	
	
	//提示语的方法
	function toast(info,time){
		var info = info||"成功！";
		var time = time||1000;
		$('#toast').empty();
		$('#toast').append("<p>"+info+"</p>").fadeIn(200);
		setTimeout(function(){
			$('#toast').fadeOut(500);
		},time)
	}
	
	//原生获取id
	var audio = document.getElementById('audio');
	//播放方法
	function playAudio(){
		audio.play()
	}
	//暂停方法
	function pauseAudio(){
		audio.pause()
	}
	//切换播放暂停键
	$('#music').find('i').click(function(){
		if($(this).hasClass('play')){
			$('.play').html('&#xe602;');
			$('.play').removeClass('play').addClass('pause');
			playAudio()
		}else{
			$('.pause').html('&#xe659;');
			$('.pause').removeClass('pause').addClass('play');
			pauseAudio()
		}
	})
	
	//底部导航栏的链接
	$('#main_page').click(function(){
		location.href="index.html"
	})
	$('#music_page').click(function(){
		location.href="music.html"
	})
	$('#poem_page').click(function(){
		location.href="poem.html"
	})
	$('#weather_page').click(function(){
		location.href="weather.html"
	})
	
//	/////////////////////////////////搜索页面/////////////////////////////////////////
	$('#searchicon').click(function(){
		$('#search_article').fadeIn(100)
	})
	$('#search_back').click(function(){
		$('#search_article').fadeOut(100)
	})
	
	//点击效果
	$('#my_list').find('div').myBtnWave()
	$('#bot_nav').find('li').myBtnWave()
	
	//点击获取图书信息
	$('.book').click(function(){
		var val = $(this).find('h4').html();
		var book_id;
		$('#nav').css({backgroundColor:"#F9BF45"});
		$('#nav').find('.mui-icon-back').removeClass('mui-hidden')
		$('#article').removeClass('mui-active');
		$('#result_article').addClass('mui-active')
		$.ajax({
			type:"get",
			dataType:'jsonp',
			url:"https://api.douban.com/v2/book/search",
			async:true,
			data:{
				q:$(this).find('h4').html()
			},
			success:function(result){
				$('#book_label').empty();
				console.log(result.books[0].author_intro);
				$('#result_article').find('img').attr('src',result.books[0].image)
				$('#book_title').html("书名："+result.books[0].title);
				$('#book_author').html("作者："+result.books[0].author[0]);
				$('#book_price').html("定价："+result.books[0].price);
				$.each(result.books[0].tags, function(i,v) {    
					console.log(v.name); 
					$('#book_label').append("<span>"+v.name+"</span>")
				});
				$('#author_info').html("<p>作者简介</p>"+"<p>"+result.books[0].author_intro+"</p>");
				
				//console.log(result.books[0].id);
				$.ajax({
					type:"get",
					dataType:"jsonp",
					url:"https://api.douban.com/v2/book/"+result.books[0].id+"/annotations",
					async:true,
					success:function(data){
						$('#book_note').html("<p>笔记</p>"+data.annotations[0].content)
					}
				});
			}
		});
	})
	
//	/////////////////////搜索图书//////////////////////////////////////////////////////////////////////////////////
	$('#search_btn').click(function(){
		var val = $('#search_val').val();
		$('#result_books').find('ul').empty();
		$.ajax({
			type:"get",
			dataType:"jsonp",
			url:"https://api.douban.com/v2/book/search",
			async:true,
			data:{
				q:$('#search_val').val()
			},
			success:function(result){
				$.each(result.books, function(i,v) {    
					  $('#result_books').find('ul').append("<li class='mui-table-view-cell'><h4>"+v.title+"</h4><p>"+v.author+"</p></li>")                                                        
				});
			}
		});
	})
	//点击搜素的图书记录
	 $('#result_books').find('ul').on('click','li',function(){
	 	var val = $(this).find('h4').html();
	 	console.log(val);
	 	$('#nav').css({backgroundColor:"#F9BF45"});
		$('#nav').find('.mui-icon-back').removeClass('mui-hidden')
		$('#article').removeClass('mui-active');
		$('#result_article').addClass('mui-active')
		$.ajax({
			type:"get",
			dataType:'jsonp',
			url:"https://api.douban.com/v2/book/search",
			async:true,
			data:{
				q:$(this).find('h4').html()
			},
			success:function(result){
				$('#book_label').empty();
				//console.log(result.books[0].author_intro);
				$('#result_article').find('img').attr('src',result.books[0].image);
				$('#book_title').html("书名："+result.books[0].title);
				$('#book_author').html("作者："+result.books[0].author[0]);
				$('#book_price').html("定价："+result.books[0].price);
				$.each(result.books[0].tags, function(i,v) {    
					console.log(v.name); 
					$('#book_label').append("<span>"+v.name+"</span>")
				});
				$('#author_info').html("<p>作者简介</p>"+"<p>"+result.books[0].author_intro+"</p>");
				
				//console.log(result.books[0].id);
				$.ajax({
					type:"get",
					dataType:"jsonp",
					url:"https://api.douban.com/v2/book/"+result.books[0].id+"/annotations",
					async:true,
					success:function(data){
						$('#book_note').html("<p>笔记</p>"+data.annotations[0].content)
					}
				});
			}
		});
		$('#search_article').fadeOut(300)
	 })
	
	//点击分类的项目
	$('#my_list').find('.tag_label').click(function(){
		var val = $(this).text();
		$('#result_books').find('ul').empty();
		console.log(val);
		$.ajax({
			type:"get",
			dataType:"jsonp",
			url:"https://api.douban.com/v2/book/search",
			async:true,
			data:{
				tag:$(this).text()
			},
			success:function(result){
				$.each(result.books, function(i,v) {    
					  $('#result_books').find('ul').append("<li class='mui-table-view-cell'><h4>"+v.title+"</h4><p>"+v.author+"</p></li>")                                                        
				});
			}
		});
		return toast("在结果页中查看!",1500)
	})
	
//	//////////////////////////////////////////关闭详情页////////////////////////////////
	$('#nav').find('.mui-icon-back').click(function(){
		$('#article').addClass('mui-active');
		$('#result_article').removeClass('mui-active');
		$(this).addClass('mui-hidden')
		$('#nav').css({backgroundColor:"white"})
	})
	
	
	
	
	
})