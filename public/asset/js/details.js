$(document).ready(function(){

$(function () {
            if (window.location.search.split('?').length > 1) {
                var params = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].split('=')[0];
                    var productID = decodeURIComponent(params[i].split('=')[1]);
                    console.log("productID is : "+productID);
                    display(productID);
         
                }
            }
 
    });


var display = function(product_id){
	var feed = window.localStorage.getItem("productFeed");
	var resFeed = JSON.parse(feed);
	var itemsArray = resFeed.items;

	// GET html elements

	for(var index in itemsArray){
		var title_Element = itemsArray[index]["title"];
		var id_Key = itemsArray[index]["id"];
		var disc_key = itemsArray[index]["discription"];
		if(id_Key == product_id)
		{
			console.log("idElement : "+title_Element+" id is : "+id_Key );
			$("#title").html(title_Element);
			$("#disc").html(disc_key);

			var variantArray = itemsArray[index]["variants"];
			for(var i in variantArray)
			{
				var objInVariant = variantArray[0]["price"];
				console.log("price is : "+objInVariant);
				$("#ProductPrice").html("€ "+objInVariant);
			}
			var imageArray = itemsArray[index]["image_link"];
			var image;
			for(var j in imageArray)
			{
				var image_link = imageArray[0];
				image = image_link.split('?')[0];
			}
			console.log("image key : "+image);
			var image_key = window.localStorage.getItem(image);	
			$("#img001").attr("src",image_key);

			var optionsArray = itemsArray[index]["options"];

			for(var k in optionsArray){
				var inside_object = optionsArray[k];
				var valueArray = inside_object["values"];
				console.log("values array : "+valueArray[0]);
				if(valueArray[0] == "Default Title"){
					$(".tobe_hidden_0").attr("hidden", true);
					$("#tobe_hidden_1").attr("hidden", true);

				}
			}

		}
		

		/*var variantArray = itemsArray[index]["variants"];
			for(var i in variantArray)
			{
				var objInVariant = variantArray[0]["price"];
				console.log("price is : "+objInVariant);
			}
		var imageArray = itemsArray[index]["image_link"];
			for(var j in imageArray)
			{
				var objInVariant = imageArray[0];
				console.log("Image link is : "+objInVariant.split("?")[0]);
			}*/

		
	}
}
	
$("#AddToCart").click(function(){
	alert("Sorry Can't Create Card Now.");
});

$("#back_button").click(function(){
	parent.history.back();
	return false;
});	

//original function............... 
	/*for(var index in itemsArray){
		//$("#container_for_boxs").append("<div id=myID"+i+">This is div tag No "+i+"</div>");
		var productID = itemsArray[index]["id"];
		var productTitle = itemsArray[index]["title"];

		var variantArray = itemsArray[index]["variants"];
		var price;
		for(var i in variantArray)
			{
				 price = variantArray[0]["price"];
			}

		var imageArray = itemsArray[index]["image_link"];
		var image;
			for(var j in imageArray)
			{
				var image_link = imageArray[0];
				image = image_link.split('?')[0];
			}	
		var image_key = window.localStorage.getItem(image);	
		$newDiv = $("<div class='flip3d'><div class='front hvr-border-fade hvr-fade'productid="+productID+">"+"<table><tr><td>"+
			"<img id=center src="+image_key+" height=300 width=300></td></tr><tr><td>"+
			"<ul>"+
					"<li><p id=title>"+productTitle+"</p></li>"+
					"<li><p id=price>"+"$ "+price+"</p></li>"+
			"</ul></td></tr></table>"		


			+"</div></div>");

		$("#container_for_boxs").append($newDiv);

	}


		$(".front").click(function(){
			 //window.location.href='detail.html';
			var value = $(this).attr("productid");
			var url = "detail.html?id="+value;
			window.location.href= url;
		});
*/
});