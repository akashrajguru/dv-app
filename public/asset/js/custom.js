/* Filename: custom.js */
$(document).ready(function(){
	var feed = window.localStorage.getItem("productFeed");
	var resFeed = JSON.parse(feed);
	var itemsArray = resFeed.items;

	for(var index in itemsArray){
		//$("#container_for_boxs").append("<div id=myID"+i+">This is div tag No "+i+"</div>");
		var productID = itemsArray[index]["id"];
		var productTitle = itemsArray[index]["title"];
		var product_discription = itemsArray[index]["discription"];

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
		/*$newDiv = $("<div class='flip3d'><div class='front hvr-border-fade hvr-fade'productid="+productID+">"+"<table><tr><td>"+
			"<img id=center src="+image_key+" height=300 width=300></td></tr><tr><td>"+
			"<ul>"+
					"<li><p id=title>"+productTitle+"</p></li>"+
					"<li><p id=price>"+"$ "+price+"</p></li>"+
			"</ul></td></tr></table>"		


			+"</div></div>");*/
		$newDiv = $("<div class='col-sm-4 feture'><div class='panel'><div class='panel-heading'><h3 class='panel-title'>"+productTitle+"</h3></div>"
			+"<img class='product_image' src="+image_key+" alt='HTML5'>"+
			"<h3 class='btn btn-warning btn-block select-btn' productid="+productID+">"+"€ "+price+"</h3></div></div>");



		$("#features").append($newDiv);
		/*<!-- <div class="col-sm-4 feture">
					<div class="panel">
						<div class="panel-heading">
							<h3 class="panel-title">Markup with HTML5</h3>
							
						</div>
						<img class="product_image" src="asset/images/image_2.png" alt="HTML5">
						<p>Soft and lightweight, the Logan HeatTec® Tee gets you through the long haul in total comfort. It boasts superior sweat-wicking performance to keep skin dry and cool, and strategic flat-lock seams to resist chafing.</p>
						<h3 class="btn btn-warning btn-block">€34.00</h3>
					</div>
				</div> --><!-- end  feature-->*/

	}



		$(".select-btn").click(function(){
			 //window.location.href='detail.html';
			var value = $(this).attr("productid");
			var url = "details.html?id="+value;
			window.location.href= url;
		});

});