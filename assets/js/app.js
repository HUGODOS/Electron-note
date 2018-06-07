const {clipboard} = require('electron');
const fs = require('fs');
const moment = require('moment');
const Store = require('electron-store');
const notesValue = $("#notes");
const customerName = $("#custName");
const user = $("#userName");
const store = new Store({
  defaults: {
    userName: { un: ""}
  }
});

init();

function copy(){
	let format = moment().format("ddd Do MMM hh:mm");
	clipboard.writeText(customerName.val() + " - " + notesValue.val() + " - " + format + " - " + user.val());
	customerName.focus();
	storage(format);
}

function storage(date){
	if (fs.existsSync("./history.json")) {
		fs.readFile('history.json', 'utf8', function readFileCallback(err, data){
    		if (err){
	    		console.log(err);
    		} else {
	    		obj = JSON.parse(data);
				obj.table.push({name: customerName.val(), notes: notesValue.val(), date: date});
	    		json = JSON.stringify(obj);
	    		fs.writeFile('history.json', json, 'utf8', function(err){
	    			if(err) throw err;
	    		});
			clear();
		}});
	}else{
		obj.table.push({name: customerName.val(), notes: notesValue.val(), date: date});
		fs.writeFile('history.json', JSON.stringify(obj), 'utf8', function(err){
			if (err) throw err;
			}); 
	clear();   
	}
}

function clear(){
	notesValue.val("");
	customerName.val("")
}
function  load(){
	$(".fade").hide()
	$(".hidden").fadeIn();
	customerName.focus();
}
function init(){

	var obj = {
		table : []
	}

	if (store.get("userName.un") === ""){
		$(".hidden").hide();
		$(".fade").fadeIn();
	}else{
		load();
		user.val(store.get("userName.un"));
	}

	user.keypress(function(event){
		if (event.which === 13){
			if (user.val() !== ""){
				load();
				store.set("userName.un", user.val())
			}else {

			}
		}
	});

	customerName.keypress(function(event){
		if (event.which === 13){
			if (customerName.val() !== ""){
				notesValue.focus();
			}else{

			}
		}
	});

	notesValue.keypress(function(event){
		if (event.which === 13){
			if (notesValue.val() !== "" && customerName.val() !== ""){
				copy();
			}else{

			}
		}
	});

	$("#copy").click(function(){
		if (customerName.val() !== "" && notesValue.val() !== ""){
			copy();
		}else{

		}
	});

	$("#reset").click(function(){
		store.set("userName.un", "");
		$(".hidden").hide();
		$(".fade").fadeIn();
		clear();
	});

}