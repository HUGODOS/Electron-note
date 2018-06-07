const remote = require('electron').remote
const {clipboard} = require('electron');
const moment = require('moment');
const customerName = $('#custName');
const copy = $('#copy');
const radio = $('input:radio');
const Store = require('electron-store');
const store = new Store

init();

function init() {

	radio.first().prop('checked', true)

	informed();

	$(radio).change(function(){
		informed();
	});

	$('#close-btn').on('click', e => {
    	remote.getCurrentWindow().close()
	});
	
	$('#informed > select').change(function(){
		if ($('#informed > select').val() === "Call Back In"){
			$('#informed > input').fadeIn();
		}else{
			$('#informed > input').fadeOut();
		}
	});

	copy.click(function(){
		if (customerName.val() !== ""){
			start();
		}
	});


	customerName.keypress(function(event){
		if (event.which === 13){
			start();
		}
	});
}

function proc(vm,date,t){
	if (vm === "No"){
		clipboard.writeText(customerName.val() + " : Could not get in contact no voicemail was left - " + date + " - " + store.get('userName.un'));
	} else{
		if ($('#informed > select').val() === "Asked To Give Us A Call"){
			clipboard.writeText(customerName.val() + " : Could not get in contact Voicemail was left - " + $('#informed > select').val() + " - " + date + " - " + store.get('userName.un'));
		}else{
			if ($('#informed > input').val() !== ""){
				clipboard.writeText(customerName.val() + " : Could not get in contact Voicemail was left - " + $('#informed > select').val() + ": " +$('#informed > input').val() +" - " + date + " - " + store.get('userName.un') + " Will try again around - " + t);
			}else{
				clipboard.writeText(customerName.val() + " : Could not get in contact Voicemail was left - " + $('#informed > select').val() +" - " + date + " - " + store.get('userName.un'));
			}
		}
	}
    	remote.getCurrentWindow().close()
}

function start(){
	if (customerName.val() !== ""){
			for (let i = 0; i < radio.length; i++) {
				if (radio[i].checked){
					let date = moment().format("ddd Do MMM hh:mm");
					let t = moment().add(parseInt($('#informed > input').val()), 'm').format("hh:mm");
					let radioValue = radio[i].value;
					proc(radioValue, date, t);
				}
			}
	}else {

	}
}

function informed(){
	for (let i = 0; i < radio.length; i++) {
		if (radio[i].checked){
			if(radio[i].value === "No"){
				$('#informed').hide();
				$('#informed > input').hide();
			}else{
				$('#informed').fadeIn();
				if ($('#informed > select').val() === "Call Back In"){
					$('#informed > input').fadeIn();
				}
			}
		}
	}
}