
//所有mui的初始化的函数全部封装在这个js文件里

//城市选择器
;(function($, doc) {
	mui.init();
	mui.ready(function() {
		//级联示例
		var cityPicker = new mui.PopPicker({
			layer: 2
		});
		cityPicker.setData(cityData);
		var showCityPickerButton = doc.getElementById('weather');
		var cityResult = doc.getElementById('weather-ct');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker.show(function(items) {
				cityResult.innerText = items[0].text + " " + items[1].text;
				//返回 false 可以阻止选择框的关闭
				//return false;
				var txt=items[1].text;
				if(items[0].text==("北京市"||"上海市"||"天津市"||"重庆"||"香港"||"澳门")){txt=items[0].text}else{txt=items[1].text};
				if(items[0].text=="海外"){
					$('#weather-ct').html("N/A");
					$('#weather').find('p').html("暂无")
				}
				$.ajax({
					type:"get",
					url: 'http://api.map.baidu.com/telematics/v3/weather?',
					dataType:"jsonp",
					data:{
						location:txt,
						output:"json",
						ak:"FK9mkfdQsloEngodbFl4FeY3"
					},
					jsonp:"callback",
					jsonpCallback:"myweather",
					async:true,
					success:function(result){
						var info_td = result.results[0].weather_data[0].date;
						var info_tmd = result.results[0].weather_data[1].date;
						var info_af_tmd = result.results[0].weather_data[2].date;
						var weather_td = result.results[0].weather_data[0].weather;
						var weather_tmd = result.results[0].weather_data[1].weather;
						var weather_af_tmd = result.results[0].weather_data[2].weather;
						var tep_td = result.results[0].weather_data[0].temperature;
						var tep_tmd = result.results[0].weather_data[1].temperature;
						var tep_af_tmd = result.results[0].weather_data[2].temperature;
						//console.log(info);
						//var ul=result.results[0].weather_data[0].dayPictureUrl;
						//$('#weather').find('img').attr('src',ul)
						$('#weather_td').find('span').html(info_td);
						$('#weather_tmd').find('span').html(info_tmd);
						$('#weather_af_tmd').find('span').html(info_af_tmd);
						$('#weather_td').find('p').html(weather_td+tep_td);
						$('#weather_tmd').find('p').html(weather_tmd+tep_tmd);
						$('#weather_af_tmd').find('p').html(weather_af_tmd+tep_af_tmd);
						
						var sun = /晴/;
						var cloud = /云/;
						var rain = /雨/;
						var thum = /雷/;
				        var snow = /雪/;
				        var cloudy = /阴/;
				        //遍历天气，获取图片信息
						$.each($('p'), function(i,v) {    
							var txt = $('p').eq(i).html();
							console.log(txt);
							if(sun.test(txt)){
								$('p').eq(i).parent('.weather_info').prev('img').attr('src','imgs/weather-sunny.png')
							};
							if (cloud.test(txt)) {
								$('p').eq(i).parent('.weather_info').prev('img').attr('src','imgs/weather-partlycloudy.png')
							};
							if (rain.test(txt)) {
								$('p').eq(i).parent('.weather_info').prev('img').attr('src','imgs/weather-rain.png')
							};
							if (thum.test(txt)) {
								$('p').eq(i).parent('.weather_info').prev('img').attr('src','imgs/weather-chancetstorms.png')
							};
							if (snow.test(txt)) {
								$('p').eq(i).parent('.weather_info').prev('img').attr('src','imgs/weather-rain-snow.png')
							};
							if (cloudy.test(txt)) {
								$('p').eq(i).parent('.weather_info').prev('img').attr('src','imgs/weather-cloudy.png')
							};
						});
						$('span').eq(0).css({display:'block', padding:'5px', color:'green'})
					}
				}); 
				
				
			});
		}, false);
	});
})(jQuery, document);
