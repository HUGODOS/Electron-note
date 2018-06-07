const fs = require('fs');

init();

function init(){
	
	if (fs.existsSync("./history.json")) {
		$.getJSON('./history.json', function(data){
			$.each(data, function(index, value){
					for (var i = value.length - 1; i >= 0; i--) {
						$("#feed").append("<li>" + value[i].name + " : <span>" + value[i].notes + "</span> : " + value[i].date + "</li>")
					}
			});
		});
	}else{
		console.log("nothing to load");
	}

	//backup
	// $('input').keypress(function(event){
	// 	if (event.which === 13){
	// 		$("#feed > li").remove()
	// 			if (fs.existsSync("./history.json")){
	// 				$.getJSON('./history.json', function(data){
	// 					$.each(data, function(index, value){
	// 						for (var i = value.length - 1; i >= 0; i--) {
	// 							if (value[i].name  === $('input').val() || value[i].notes == $('input').val()){
	// 								$("#feed").append("<li>" + value[i].name + " : " + value[i].notes + " : " + value[i].date + "</li>");
	// 							}
	// 						}
	// 					});
	// 				});
	// 			}else{
	// 				console.log("nothing to load");
	// 			}
	// 	}
	// });

	$('input').on('input',function(){
		$('#feed > li').remove();
			if (fs.existsSync("./history.json")) {
				$.getJSON('./history.json', function(data){
					$.each(data, function(index, value){
						for (var i = value.length - 1; i >= 0; i--) {
							let test = $('input').val().toLowerCase();
							let name = value[i].name.toLowerCase();
							let notes = value[i].notes.toLowerCase();
							let a = name.search(test);
							let b = notes.search(test);
							if (a !== -1 || b !== -1){
									$("#feed").append("<li>" + value[i].name + " : <span>" + value[i].notes + "</span> : " + value[i].date + "</li>");
							}
						}
				});
			});
			}else{
				console.log("nothing to load");
			}
	});
}