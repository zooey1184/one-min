

$(function(){
	
	//默认进入音乐页面的播放选项
	function music(){
		$.ajax({
		     type:"get",
		     dataType:"jsonp",
		     //callback:"callback",
		     //jsonpCallback:"loft.w.g.cbFuncSearchMusic",
		     url:"http://s.music.163.com/search/get/",
		     async:true,
		     data:{
		          //src:"lofter",
		          type:1,
		          //filterDj:true,
		          s:"人来人往",
		          limit:10,
		          offset:0,
		          //callback:"loft.w.g.cbFuncSearchMusic"
		     },
		     success:function(results){
		          console.log(results.result.songs[1].audio);
		          $(".mui-title").find("h4").html(results.result.songs[1].name);
		          $(".mui-title").find("h6").html(results.result.songs[1].artists[0].name);
		     }
		});
	}
	music();
	
	////////////////////返回主页/////////////////////////////////////////////////
	$('#back_home').click(function(){
		location.href="index.html"
	})
	
	//获取控件audio并设置方法
	var audio = document.getElementById('audio');
	var probar;   //定义一个定时变量，用于进度条的实时变化
	var turnoff = 'false';    //设置一个开关，可以开启或关闭进度条的实时开关
	function playAudio(){
		audio.play()
		turnoff='true'
	}
	function pauseAudio(){
		audio.pause();
		turnoff='false'
	}
	
	//暂停播放音乐
	$('#playpause').click(function(){
		var $img = $('#playpause').find('img');
		var sc = $img.attr('src');
		if(sc=='imgs/music_play.png'){
			$img.attr('src','imgs/music_pause.png');
			playAudio();
			
		}else{
			$img.attr('src','imgs/music_play.png');
			pauseAudio()
		}
		
	})
	
	
	//添加音频监听事件，可以在播放时候设置进度条
	audio.addEventListener("play", function (){
		turnoff='true';
		var musictime = audio.duration;
		var musicinp = $('#music_progess').find('input');
		var step = 100/musictime;
		//console.log(step);      //测试断点
		if(turnoff =='false'){
			clearInterval(probar);
			return true;
		}
		if(turnoff =='true'){
			probar = setInterval(function(){
				var nowbar = audio.currentTime*step;
				console.log(nowbar);
				musicinp.val(nowbar);
			},200)
		}
		
	})
	
	//添加音频监听事件，可以在暂停的时候设置进度条
	audio.addEventListener("pause", function (){
		pauseAudio();
		clearInterval(probar);
		turnoff='false'              //关闭定时器
	})
	
	//进度条       这个有bug，就是不能关闭定时器，使得几次点击暂停播放的时候进度条闪烁卡顿
//	function musicpro(){
//		var musictime = audio.duration;
//		var musicinp = $('#music_progess').find('input');
//		var step = 100/musictime;
//		var probar = setInterval(function(){
//			var nowbar = audio.currentTime*step;
//			musicinp.val(nowbar);
//		},100);
//		if (audio.ended) {
//			$('#playpause').find('img').attr('src','imgs/music_play.png');
//			clearInterval(probar)
//		}
//	}
//	

	//修改音量
	$('#voice').on('input', function(){
		var voice = $('#voice').val();
		console.log(voice);
		var pv = voice/100;
		audio.volume = pv
	})
	
	//	播放模式，循环，单曲或随机播放
	$('#music_play_modal').click(function(){
		if ($('#sj_play')[0]) {
			$('#music_play_modal').empty();
			$('#music_play_modal').append("<i id='xh_play' class='icon iconfont'>&#xe871;</i>")
		}else if($('#xh_play')[0]){
			$('#music_play_modal').empty();
			$('#music_play_modal').append("<i id='dq_play' class='icon iconfont'>&#xe603;</i>")
		}else{
			$('#music_play_modal').empty();
			$('#music_play_modal').append("<i id='sj_play' class='icon iconfont'>&#xe67c;</i>")
		}
	})
	
//---------------------------	歌曲搜索部分    ------------------------------------------------


	//显示歌曲搜索页面
	$('#searchicon').click(function(){
		$('#music_search').fadeIn(100);
		$('#result_songs').addClass('mui-active');
		$('#my_list').removeClass('mui-active')
	})
	//隐藏歌曲搜索页面
	$('#music_search_top').find('.mui-icon-arrowleft').click(function(){
		$('#music_search').fadeOut(300)
	})
	
	//搜索关键字
	$('#music_search_top').find('span.mui-icon-search').click(function(){
		var $inp = $('#music_search_top').find('input');
		var val = $inp.val();
		var reg = new RegExp(val);
		$.ajax({
		     type:"get",
		     dataType:"jsonp",
		     url:"http://s.music.163.com/search/get/",
		     async:true,
		     data:{
		          type:1,
		          s:$inp.val(),
		          limit:10,
		          offset:0,
		     },
		     success:function(results){
		          console.log(results.result.songs[1].audio);
		          $('#result_songs').find('ul').empty();
		          $('#search_list_url').empty();
		          $.each(results.result.songs, function(i,v) {
		          	$('#result_songs').find('ul').append("<li class='mui-table-view-cell'><h4>"+v.name+"</h4><span class='music_singer'>"+v.artists[0].name+"</span> - <span>"+v.album.name+"</span><span class='hide_info'>"+v.audio+"</span><span class='hide_imgurl'>"+v.album.picUrl+"</span></li>")
		          	$('#search_list_url').append("<li'>"+v.audio+"</li>")
		          
		          });
		     }
		});
	})
	
	$('#result_songs').on("click", "li", function(){
		var index = $(this).find('.hide_info').text();
		clearInterval(probar);
		audio.src = index;
		audio.autoplay = "autoplay";   //点击后自动播放
		$('#playpause').find('img').attr('src','imgs/music_pause.png');
		$('#music_search').fadeOut(300);
//		if(audio.played){
//			$('#music_progess').find('input').val(audio.currentTime*(100/audio.duration))
//		}
		$('#music-name').text($(this).find('h4').text());
		$('#music-singer').text($(this).find('.music_singer').text())
		$('.singer').attr('src', $(this).find('.hide_imgurl').text())
	})
	
	
})
