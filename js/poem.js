$(function(){
	function rand(){
		var val = "black";
		var arr = ["#E9CD4C","#268785","#6D2E5B","#0B1013","#646A58","#0F2540","#877F6C","#E79460"]
		var num = Math.floor(Math.random()*(arr.length));
		var data_name = $("#poem_name").find("li");
		var data_def = $("#poem_def").find("li");
		$.each(data_def, function(i,v) { 
			console.log(i)
			$("#poem_def").find("li").eq(i).css({color:arr[Math.floor(Math.random()*(arr.length))]})                                                          
		});
		$.each(data_name, function(i,v) { 
			console.log(i)
			$("#poem_name").find("li").eq(i).css({color:arr[Math.floor(Math.random()*(arr.length))]})                                                          
		});
	}
	rand();
	
///////////////////////////////////////////////////////诗歌分类////////////////////////////////////
	$('#poem_def').find('li').children('h3').click(function(){
		var $this = $(this).text();
		$('#poem_catalog').fadeIn(300);
		$('#catalog_title').html($this);
		$('#poem_content').empty();
		$('.mui-slider-indicator').empty();
		$.ajax({
			type:"get",
			dataType:"json",
			url:"poem.json",
			async:true,
			success:function(data){
				$.each(data.poem, function(i,v) {    
					if(v.label==$this){
						$('#poem_content').append("<div class='mui-slider-item'><h4>"+v.title+"</h4><h5>"+v.poemer+"</h5><p>"+v.content+"</p></div>")
						$('.mui-slider-indicator').append("<div class='mui-indicator'></div>");
					}
				});
				$('.mui-slider-item').eq(0).addClass('mui-slider-item-duplicate');
				$('.mui-indicator').eq(0).addClass('mui-active')
			}
		});
	})
	
	$('#poem_name').find('li').children('h3').click(function(){
		var $this = $(this).text();
		$('#poem_catalog').fadeIn(300);
		$('#catalog_title').html($this);
		$('#poem_content').empty();
		$('.mui-slider-indicator').empty();
		$.ajax({
			type:"get",
			dataType:"json",
			url:"poem.json",
			async:true,
			success:function(data){
				$.each(data.poem, function(i,v) {    
					if(v.poemer==$this){
						$('#poem_content').append("<div class='mui-slider-item'><h4>"+v.title+"</h4><h5>分类："+v.label+"</h5><p>"+v.content+"</p></div>")
						$('.mui-slider-indicator').append("<div class='mui-indicator'></div>");
					}
				});
				$('.mui-slider-item').eq(0).addClass('mui-slider-item-duplicate');
				$('.mui-indicator').eq(0).addClass('mui-active')
			}
		});
	})
	
	//分类页面关闭按钮
	$('.mui-icon-close').click(function(){
		$(this).parent('div').fadeOut(300);
		$('.mui-slider-item').eq(0).addClass('mui-slider-item-duplicate')
	})
	
	
	
	
})