//copyright UTDXI 2017

$(document).ready(function() {
	
	Pace.on("done", function(){
		$(".list").fadeIn();
	    var viewportHeight = $(window).height();
	    $('.panel').each(function() {
			$(this).css("min-height", viewportHeight+"px").css("height", viewportHeight+"px");
		});
		$("#container").fadeIn(2000);
	
	
		window.onresize = function(event) {
		    var viewportHeight = $(window).height();
		    $('.panel').each(function() {
				$(this).css("min-height", viewportHeight+"px").css("height", viewportHeight+"px");
			});
		};
		
	    $('#menu-btn').bind('click', function() {
			$('.list').css("left", "-100%");
			$('#menu').css("left", "0");
		});
		
		//close list
			
		$('.list-return').bind('click', function() {
			$('.selected-player').each(function() {
				if ($(this).children('.active-player').val() == 1) {
					$(this).children('.active-player').val(0);
				}
			});
			$('.list').css("left", "-100%");
			$('#container').css("overflow-y", "scroll");
			$('#container').css("-webkit-overflow-scrolling", "touch");
		});
	    
	    //select
	    if ($('body').attr('id') == 'page-select') {
		    
		    Pace.on("done", function(){
			    var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
			});
		    
		    window.onresize = function(event) {
				var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
			};
					
			$('#submit-selection').bind('click', function(){
				$('#line-up-error').css("display", "none");
				$('#form-submit').validate();
				$('#form-submit').submit();
			});
			
			//formation
			
			$('#formation-button').bind('click', function() {
				$('.list').css("left", "-100%");
				$('#formation-list').css("left", "0");
				$('#container').css("overflow-y", "hidden");
			});
			
			$('.select-formation').bind('click', function() {
				$('#formation').removeClass('formation_442').removeClass('formation_433').removeClass('formation_352').removeClass('formation_343');
				$('#formation').addClass('formation_'+this.id);
				$('#input-formation').val(this.id);
				$('.list').css("left", "-100%");
				$('#container').css("overflow-y", "scroll");
			});
			
			//kit
			
			$('#kit-button').bind('click', function() {
				$('.list').css("left", "-100%");
				$('#kit-list').css("left", "0");
				$('#container').css("overflow-y", "hidden");
			});
			
			$('.select-kit').bind('click', function() {
				var id = this.id;
				$('.kit-img').each(function() {
					var old_kit = $(this).attr("src");
					var last_five = old_kit.substr(old_kit.length - 7);
					if (last_five.substr(0, 3) == '-gk') $(this).attr("src",$('#base_url').val()+"img/kits/"+id+"-gk.png");
					else $(this).attr("src",$('#base_url').val()+"img/kits/"+id+".png");
				});
				$('#input-kit').val(id);
				$('.list').css("left", "-100%");
				$('#container').css("overflow-y", "scroll");
			});
			
			//player
			
			$('.selected-player').each(function() {
				var session_value = $(this).children('.player-selected').val();
				if (session_value != '') {
					$(this).children('.card-person').attr("src",$('#base_url').val() + "img/players/"+session_value+".png");
					$("#"+session_value).addClass('disabled');
					$("#"+session_value).parent().css("-webkit-filter", "grayscale(100%)").css("filter", "grayscale(100%)");
					$("#"+session_value).parent().css("opacity", "0.5").css("filter", "alpha(opacity=50)");
				}
			});
			
			$('.selected-player').bind('click', function(e) {
				$('.selected-player').each(function() {
					$(this).removeClass('active');
					$(this).children('.active-player').val(0);
				});
				$(this).children('.active-player').val(1);
				$(this).addClass('active');
				$('#container').css("overflow-y", "hidden");
				if ($(this).children('.player-selected').val() !== '') {
					$('#selected-card-btns').html('<a class="btn btn-change-player" onclick="btn_change_player(0)">Change</a><a class="btn btn-remove-player" onclick="btn_remove_player()">Remove</a>');
					$('#selected-card .card-person').attr("src",$(this).children('.card-person').attr("src"));
					$('#selected-card .kit-img').css("display", "block").attr("src",$(this).children('.kit-img').attr("src"));
					$('#selected-card').css("left", "0");
				} else {
					$('#player-list').css("left", "0");
				}
				e.stopPropagation();
			});
			
			$('.select-player').bind('click', function() {
				if (!$(this).hasClass('disabled')) {
					var id = this.id;
					var total_cost = parseFloat($('#costs_poster').val());
					var gk = $(this).children('.gk').val();
					$('.selected-player').each(function() {
						if ($(this).children('.active-player').val() == 1) {
							if ($(this).children('.player-selected').val() !== '') {
								var old_id = $(this).children('.player-selected').val();
								$("#"+old_id).removeClass('disabled');
								$("#"+old_id).parent().css("-webkit-filter", "grayscale(0%)").css("filter", "grayscale(0%)");
								$("#"+old_id).parent().css("opacity", "1").css("filter", "alpha(opacity=100)");
							}
							$(this).children('.player-selected').val(id);
							if (gk == true) $(this).children('.kit-img').attr("src",$('#base_url').val() + "img/kits/"+$('#input-kit').val()+"-gk.png");
							else $(this).children('.kit-img').attr("src",$('#base_url').val() + "img/kits/"+$('#input-kit').val()+".png");
							$(this).children('.card-person').attr("src",$('#base_url').val() + "img/players/"+id+".png");
							$(this).children('.active-player').val(0);
							$(this).removeClass('active');
						}
					});
					$(this).addClass('disabled');
					$(this).parent().css("-webkit-filter", "grayscale(100%)").css("filter", "grayscale(100%)");
					$(this).parent().css("opacity", "0.5").css("filter", "alpha(opacity=50)");
					var total_cost = parseFloat($('#costs_poster').val());
					var manager_cost = parseFloat(0);
					if ($('#selected-manager').val() !== '') manager_cost = parseFloat($('#costs_manager').val());
					var subs_cost = parseFloat(0);
					$('#substitutes .player-selected').each(function() {
						if ($(this).val() !== '') subs_cost += parseFloat($('#costs_sub').val());
					});
					var delivery_cost = parseFloat(0);
					if ($('#delivery-country').val() !== 'United Kingdom') delivery_cost = parseFloat($('#costs_worldwide').val());
					var new_total_cost = parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2);
					$('.total-cost-text').html(new_total_cost);
					$('.list').css("left", "-100%");
					$('#container').css("overflow-y", "scroll");
					$('.basket').fadeIn(1000).delay(2000).fadeOut(1000);
				}
			});
			
			//manager
			
			var session_value = $('.selected-manager').children('.manager-selected').val();
			if (session_value != '') {
				$('.selected-manager').children('.card-person').attr("src",$('#base_url').val() + "img/managers/"+session_value+".png");
				$("#"+session_value).addClass('disabled');
				$("#"+session_value).parent().css("-webkit-filter", "grayscale(100%)").css("filter", "grayscale(100%)");
				$("#"+session_value).parent().css("opacity", "0.5").css("filter", "alpha(opacity=50)");
			}
			
			$('.selected-manager').bind('click', function(e) {
				$('.selected-manager').each(function() {
					$(this).removeClass('active');
				});
				$(this).addClass('active');
				$('#container').css("overflow-y", "hidden");
				if ($(this).children('.manager-selected').val() !== '') {
					$('#selected-card-btns').html('<a class="btn btn-change-manager" onclick="btn_change_manager()">Change</a><a class="btn btn-remove-manager" onclick="btn_remove_manager()">Remove</a>');
					$('#selected-card .card-person').attr("src",$(this).children('.card-person').attr("src"));
					$('#selected-card .kit-img').css("display", "none");
					$('#selected-card').css("left", "0");
				} else $('#manager-list').css("left", "0");
				e.stopPropagation();
			});
			
			$('.select-manager').bind('click', function() {
				if (!$(this).hasClass('disabled')) {
					var id = this.id;
					if ($('.selected-manager').children('.manager-selected').val() !== '') {
						var old_id = $('.selected-manager').children('.manager-selected').val();
						$("#"+old_id).removeClass('disabled');
						$("#"+old_id).parent().css("-webkit-filter", "grayscale(0%)").css("filter", "grayscale(0%)");
						$("#"+old_id).parent().css("opacity", "1").css("filter", "alpha(opacity=100)");
					}
					$('.selected-manager').children('.manager-selected').val(id);
					$('.selected-manager').children('.card-person').attr("src",$('#base_url').val() + "img/managers/"+id+".png");
					$(this).removeClass('active');
					$(this).addClass('disabled');
					$(this).parent().css("-webkit-filter", "grayscale(100%)").css("filter", "grayscale(100%)");
					$(this).parent().css("opacity", "0.5").css("filter", "alpha(opacity=50)");
					var total_cost = parseFloat($('#costs_poster').val());
					var manager_cost = parseFloat(0);
					if ($('#selected-manager').val() !== '') manager_cost = parseFloat($('#costs_manager').val());
					var subs_cost = parseFloat(0);
					$('#substitutes .player-selected').each(function() {
						if ($(this).val() !== '') subs_cost += parseFloat($('#costs_sub').val());
					});
					var delivery_cost = parseFloat(0);
					if ($('#delivery-country').val() !== 'United Kingdom') delivery_cost = parseFloat($('#costs_worldwide').val());
					var new_total_cost = parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2);
					$('.total-cost-text').html(new_total_cost);
					$('.list').css("left", "-100%");
					$('#container').css("overflow-y", "scroll");
					$('.basket').fadeIn(1000).delay(2000).fadeOut(1000);
				}
			});
			
			$('#delivery-country').bind('change', function(){
				var total_cost = parseFloat($('#costs_poster').val());
				var manager_cost = parseFloat(0);
				if ($('#selected-manager').val() !== '') manager_cost = parseFloat($('#costs_manager').val());
				var subs_cost = parseFloat(0);
				$('#substitutes .player-selected').each(function() {
					if ($(this).val() !== '') subs_cost += parseFloat($('#costs_sub').val());
				});
				var delivery_cost = parseFloat(0);
				if ($('#delivery-country').val() !== 'United Kingdom') delivery_cost = parseFloat($('#costs_worldwide').val());
				var new_total_cost = parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2);
				$('.total-cost-text').html(new_total_cost);
				$('.basket').fadeIn(1000).delay(2000).fadeOut(1000);
			});
			
		}
		
		//preview
	    if ($('body').attr('id') == 'page-preview') {
		    
		    Pace.on("done", function(){
				var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
				$('.preview-no-subs .card-resize').each(function() {
					$(this).css("height", (height/2)+"px");
				});
			});
			
			window.onresize = function(event) {
				var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
				$('.preview-no-subs .card-resize').each(function() {
					$(this).css("height", (height/2)+"px");
				});
			};
			
			$('#enter-code').bind('click', function(){
				
				var total_cost = parseFloat($('#costs_poster').val());
				var manager_cost = parseFloat(0);
				if ($('#manager').val() !== '') manager_cost = parseFloat($('#costs_manager').val());
				var subs_cost = parseFloat(0);
				if ($('#sub1').val() !== '') subs_cost += parseFloat($('#costs_sub').val());
	            if ($('#sub2').val() !== '') subs_cost += parseFloat($('#costs_sub').val());
	            if ($('#sub3').val() !== '') subs_cost += parseFloat($('#costs_sub').val());
	            if ($('#sub4').val() !== '') subs_cost += parseFloat($('#costs_sub').val());
				var delivery_cost = parseFloat(0);
				if ($('#country').val() !== 'United Kingdom') delivery_cost = parseFloat($('#costs_worldwide').val());
				$("#basket_total").html(parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2));
				$('#amount').val(parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2));
				
				var promo_code = $('#promo-code').val();
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
		            if (this.readyState == 4 && this.status == 200) {
		                if (this.responseText == 'error') {
			                $("#promo-code-error").html('Sorry that is not a valid code.');
			                $('#promo-code').val('');
			                $('#promo-code-error').css('display', 'block');
			                $('#promo-code-correct').css('display', 'none');
			                $('#payment_button').html('<button id="purchase" onclick="submit_order()" class="btn" value="submit" name="submit">Purchase with PayPal</button>');
			            }
			            else {
				            $('#promo-code-error').css('display', 'none');
				            $('#promo-code-correct').css('display', 'inline-block');
				            var discount = parseFloat(this.responseText);
				            $("#basket_total").html(parseFloat($("#basket_total").html()-discount).toFixed(2));
				            $('#amount').val(parseFloat($("#amount").val()-discount).toFixed(2));
				            if ($("#amount").val() > 0) $('#payment_button').html('<button id="purchase" onclick="submit_order()" class="btn" value="submit" name="submit">Purchase with PayPal</button>');
				            else $('#payment_button').html('<a id="purchase_zero" href="/success" onclick="submit_order()" class="btn">Complete your order</a>');
			            }
		            } else {
			            return false;
		            }
		        };
		        
				var query = encodeURI("http://www.utdxi.com/ajax/promocode.php?promo_code="+promo_code+"&manager="+$('#manager').val()+"&sub1="+$('#sub1').val()+"&sub2="+$('#sub2').val()+"&sub3="+$('#sub3').val()+"&sub4="+$('#sub4').val()+"&country="+$('#country').val());
		        xmlhttp.open("GET",query,true);
		        xmlhttp.send();
			});
			
			//if ($("#amount").val() > 0) $('#payment_button').html('<button id="purchase" onclick="submit_order()" class="btn" value="submit" name="submit">Purchase with PayPal</button>');
			if ($("#amount").val() > 0) $('#payment_button').html('<a id="purchase" onclick="submit_order()" class="btn">Purchase with PayPal</a>');
			else $('#payment_button').html('<a id="purchase_zero" href="/success" onclick="submit_order()" class="btn">Complete your order</a>');
		    
		}
		
		//gift
		if ($('body').attr('id') == 'page-gift') {
			
			Pace.on("done", function(){
			    var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
			});
		    
		    window.onresize = function(event) {
				var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
			};
			
			$('#submit-gift').bind('click', function(){
				$('#form-submit').validate();
				$('#form-submit').submit();
			});
			
			$('#manager').bind('change', function(){
				var total_cost = parseFloat($('#costs_poster').val());
				var manager_cost = parseFloat(0);
				if ($('#manager').val() == 1) manager_cost = parseFloat($('#costs_manager').val());
				var subs_cost = parseFloat(0);
				if ($('#subs').val() == 1) subs_cost = parseFloat($('#costs_sub').val()*4);
				var delivery_cost = parseFloat(0);
				if ($('#delivery').val() == 1) delivery_cost = parseFloat($('#costs_worldwide').val());
				$("#basket_total").html(parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2));
			});
			
			$('#subs').bind('change', function(){
				var total_cost = parseFloat($('#costs_poster').val());
				var manager_cost = parseFloat(0);
				if ($('#manager').val() == 1) manager_cost = parseFloat($('#costs_manager').val());
				var subs_cost = parseFloat(0);
				if ($('#subs').val() == 1) subs_cost = parseFloat($('#costs_sub').val()*4);
				var delivery_cost = parseFloat(0);
				if ($('#delivery').val() == 1) delivery_cost = parseFloat($('#costs_worldwide').val());
				$("#basket_total").html(parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2));
			});
			
			$('#delivery').bind('change', function(){
				var total_cost = parseFloat($('#costs_poster').val());
				var manager_cost = parseFloat(0);
				if ($('#manager').val() == 1) manager_cost = parseFloat($('#costs_manager').val());
				var subs_cost = parseFloat(0);
				if ($('#subs').val() == 1) subs_cost = parseFloat($('#costs_sub').val()*4);
				var delivery_cost = parseFloat(0);
				if ($('#delivery').val() == 1) delivery_cost = parseFloat($('#costs_worldwide').val());
				$("#basket_total").html(parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2));
			});
		
		}
		
		//stats
	    if ($('body').attr('id') == 'page-stats') {
		    
		    Pace.on("done", function(){
			    var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
			});
		    
		    window.onresize = function(event) {
				var height = $('.card-resize .card-bg').height();
				$('.card-resize').each(function() {
					$(this).css("height", height+"px");
				});
			};
			
		}
		
		//contact
		if ($('body').attr('id') == 'page-contact') {
			
			$('#submit-contact').bind('click', function(){
				$('#form-contact').validate();
				$('#form-contact').submit();
			});
			
		}
	
	});
    
});

function btn_change_player (type) {
	$('.list').css("left", "-100%");
	$('#player-list').css("left", "0");
}
		
function btn_remove_player() {
	$('.selected-player').each(function() {
		if ($(this).children('.active-player').val() == 1) {
			var old_id = $(this).children('.player-selected').val();
			$("#"+old_id).removeClass('disabled');
			$("#"+old_id).parent().css("-webkit-filter", "grayscale(0%)").css("filter", "grayscale(0%)");
			$("#"+old_id).parent().css("opacity", "1").css("filter", "alpha(opacity=100)");
			$(this).children('.player-selected').val('');
			if ($(this).parent().attr('id') == 'card-1') $(this).children('.kit-img').attr("src",$('#base_url').val() + "img/kits/"+$('#input-kit').val()+"-gk.png");
			else $(this).children('.kit-img').attr("src",$('#base_url').val() + "img/kits/"+$('#input-kit').val()+".png");
			$(this).children('.card-person').attr("src",$('#base_url').val() + "img/players/blank.png");
			$(this).removeClass('active');
			$(this).children('.active-player').val(0);
		}
	});
	var total_cost = parseFloat($('#costs_poster').val());
	var manager_cost = parseFloat(0);
	if ($('#selected-manager').val() !== '') manager_cost = parseFloat($('#costs_manager').val());
	var subs_cost = parseFloat(0);
	$('#substitutes .player-selected').each(function() {
		if ($(this).val() !== '') subs_cost += parseFloat($('#costs_sub').val());
	});
	var delivery_cost = parseFloat(0);
	if ($('#delivery-country').val() !== 'United Kingdom') delivery_cost = parseFloat($('#costs_worldwide').val());
	var new_total_cost = parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2);
	$('.total-cost-text').html(new_total_cost);
	$('.list').css("left", "-100%");
	$('#container').css("overflow-y", "scroll");
	$('.basket').fadeIn(1000).delay(2000).fadeOut(1000);
}

function btn_change_manager() {
	$('.list').css("left", "-100%");
	$('#manager-list').css("left", "0");
}
		
function btn_remove_manager() {
	$('.selected-manager').each(function() {
		var old_id = $(this).children('.manager-selected').val();
		$("#"+old_id).removeClass('disabled');
		$("#"+old_id).parent().css("-webkit-filter", "grayscale(0%)").css("filter", "grayscale(0%)");
		$("#"+old_id).parent().css("opacity", "1").css("filter", "alpha(opacity=100)");
		$(this).children('.manager-selected').val('');
		$(this).children('.card-person').attr("src",$('#base_url').val() + "img/managers/blank.png");
		$(this).removeClass('active');
		$(this).children('.active-manager').val(0);
	});
	var total_cost = parseFloat($('#costs_poster').val());
	var manager_cost = parseFloat(0);
	if ($('#selected-manager').val() !== '') manager_cost = parseFloat($('#costs_manager').val());
	var subs_cost = parseFloat(0);
	$('#substitutes .player-selected').each(function() {
		if ($(this).val() !== '') subs_cost += parseFloat($('#costs_sub').val());
	});
	var delivery_cost = parseFloat(0);
	if ($('#delivery-country').val() !== 'United Kingdom') delivery_cost = parseFloat($('#costs_worldwide').val());
	var new_total_cost = parseFloat(total_cost + manager_cost + subs_cost + delivery_cost).toFixed(2);
	$('.total-cost-text').html(new_total_cost);
	$('.list').css("left", "-100%");
	$('#container').css("overflow-y", "scroll");
	$('.basket').fadeIn(1000).delay(2000).fadeOut(1000);
}

function submit_order() {
	var ref = $('#ref').val();
	var first_name = encodeURIComponent($('#first_name').val());
	var last_name = encodeURIComponent($('#last_name').val());
	var email = encodeURIComponent($('#email').val());
	var address1 = encodeURIComponent($('#address1').val());
	var address2 = encodeURIComponent($('#address2').val());
	var city = encodeURIComponent($('#city').val());
	var postcode = encodeURIComponent($('#postcode').val());
	var country = encodeURIComponent($('#country').val());
	var title = encodeURIComponent($('#title').val());
	var formation = $('#formation').val();
	var kit = $('#kit').val();
	var player1 = $('#player1').val();
	var player2 = $('#player2').val();
	var player3 = $('#player3').val();
	var player4 = $('#player4').val();
	var player5 = $('#player5').val();
	var player6 = $('#player6').val();
	var player7 = $('#player7').val();
	var player8 = $('#player8').val();
	var player9 = $('#player9').val();
	var player10 = $('#player10').val();
	var player11 = $('#player11').val();
	var manager = $('#manager').val();
	var sub1 = $('#sub1').val();
	var sub2 = $('#sub2').val();
	var sub3 = $('#sub3').val();
	var sub4 = $('#sub4').val();
	var promo_code = $('#promo-code').val();
	var amount = $('#amount').val();
	
	var proceed = false;
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == false) location.reload();
            else $('#paypal_form').submit();
        }
    };
    
	var query = encodeURI("http://www.utdxi.com/ajax/order.php?ref="+ref+"&first_name="+first_name+"&last_name="+last_name+"&email="+email+"&address1="+address1+"&address2="+address2+"&city="+city+"&postcode="+postcode+"&country="+country+"&title="+title+"&formation="+formation+"&kit="+kit+"&player1="+player1+"&player2="+player2+"&player3="+player3+"&player4="+player4+"&player5="+player5+"&player6="+player6+"&player7="+player7+"&player8="+player8+"&player9="+player9+"&player10="+player10+"&player11="+player11+"&manager="+manager+"&sub1="+sub1+"&sub2="+sub2+"&sub3="+sub3+"&sub4="+sub4+"&promo_code="+promo_code+"&amount="+amount);
    xmlhttp.open("GET",query,true);
    xmlhttp.send();
}

function submit_gift_order() {
	var ref = $('#ref').val();
	var code = $('#code').val();
	var first_name = encodeURIComponent($('#first_name').val());
	var last_name = encodeURIComponent($('#last_name').val());
	var email = encodeURIComponent($('#email').val());
	var recipient = encodeURIComponent($('#recipient').val());
	var manager = $('#manager').val();
	var subs = $('#subs').val();
	var delivery = $('#delivery').val();
	var amount = $('#amount').val();
	
	var proceed = false;
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == false) location.reload();
            else $('#paypal_form').submit();
        }
    };
    
	var query = encodeURI("http://www.utdxi.com/ajax/giftorder.php?ref="+ref+"&code="+code+"&first_name="+first_name+"&last_name="+last_name+"&email="+email+"&recipient="+recipient+"&manager="+manager+"&subs="+subs+"&delivery="+delivery+"&amount="+amount);
    xmlhttp.open("GET",query,true);
    xmlhttp.send();
}