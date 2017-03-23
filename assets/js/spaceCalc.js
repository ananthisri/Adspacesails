$(document).ready(function() {

var total=0, count=0, amount = 0, csrf, id1 = 0;
var selected = [], disable = [], id=0, j=0, x=0;
var amt = [ 40, 50, 500, 50, 40, 20, 100, 100, 100, 30, 20, 100, 200, 100, 30, 20, 100, 100, 100, 30, 20, 10, 10, 10, 30];
 
$('button').click(function(){
	var flag = 0;
   	  $(this).toggleClass('red');
   	  id = $(this).attr('id');
   	  id1 = $(this).attr('id'); 
   	  id=id.substr(1,id.length-1);	
	  id = parseInt(id);
	  			
	  if(id != 26){

			  amount = parseInt(amt[id-1]);
			  for(var i=0; i<selected.length; i++){
			  	if(id == selected[i]) {
			  		flag = 1;
			  		pos = i;
			  		break;
			  	}
			  }
			  if(flag == 0) {
			  	selected[ j++ ] = id;
			  	disable[ x++ ] = id1;
			  //	console.log(selected);
			  	total += amount;
			  	count  += 1;
			  	$(this).prop("disabled" ,true);
			  }
			  else {
			  	selected.splice(pos, 1);
			  	disable.splice(pos, 1);
			  	j--;
			  	x--;
			  	//console.log(selected);
			  	total -= amount;
			  	count -= 1;
			  }
	}
	else{
      alert('The total cost is ' + total);
      alert('The total space bought is ' + count);
      	
		for(var i=0; i<disable.length; i++){
			//disable[i] = 'd' + disable[i];
			//alert(selected[i]); 
			console.log(disable[i]);
			disable[i].disabled = true;
			
			//console.log('disabled ' + selected[i]);
		}
		
		csrf= $(this).attr('value');
		
		$.ajax({
			url: '/user/update/'+$(this).attr('userid'),
			type: 'POST',
			data: { adspaceval:total, adspacecount:count, _csrf:csrf  
		},
		
			success: function(){
				location.href = '/user/show/'+$('#d26').attr('userid');
			},
			failure: function(msg) {
				alert("fail :" + msg);
			}
		});

		
	}
	  
});

});
/*$('#div2').click(function(){
  	  $(this).toggleClass('red');
	  value = parseInt($(this).attr('value'));
	  mod = value%10;
	  if ( mod === 0) {
	  	total += value;
	  	x = value + 1;
	  	$(this).prop('value', x);
	  	count += 1;	  }
	  else{
	  	value -= 1;
	  	total -= value;
	  	$(this).prop('value',value);
	  	count -= 1;	  }
});*/

