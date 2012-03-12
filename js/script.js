
var initGame = function(opts) {
		log(opts)
	var tiles = [],
		$tiles = $("#tiles"),
		num_tiles_wide = opts.columns,
		num_tiles_high = opts.rows,
		tile_width = opts.tile_size,
		tile_height = opts.tile_size,
		blank_x = Math.floor(Math.random()*num_tiles_wide),
		blank_y = Math.floor(Math.random()*num_tiles_high);
	for (var i=0;i<num_tiles_high;i++) {
		tiles[i]=[];
		for (var n=0;n<num_tiles_wide;n++) {
			
				var tile = $("<div></div>")
				if (blank_x==n && blank_y ==i) {
					tile.addClass("blank");
				} else {
					tile.append(opts.canvases[i][n])
				}
				tile.css({"left":(n*tile_width),"top":(i*tile_height)});
				tile.data("coords",{"row":i,"column":n});
				
				$tiles.append(tile);
				tiles[i][n]=tile;
			
		}
	}
	//log(typeof tiles[1][45]);
	var resetDragContainment = function() {
		$.each(tiles,function(i,row) {
			$.each(row,function(n,tile) {
				if (!tile.hasClass("blank")) {
					var contain_rect = [0,0,0,0];
					if (i>0 && tiles[i-1][n].hasClass("blank")) {
						contain_rect = [tile.position().left , tile.position().top-tile_height , tile.position().left,tile.position().top ];	
					} else if (i<num_tiles_high-1 && tiles[i+1][n].hasClass("blank")) {
						contain_rect = [tile.position().left , tile.position().top , tile.position().left,tile.position().top+tile_height ];	
					} else if (n>0 && tiles[i][n-1].hasClass("blank")) {
						contain_rect = [tile.position().left-tile_width , tile.position().top , tile.position().left,tile.position().top ];	
					} else if (n<num_tiles_wide-1 && tiles[i][n+1].hasClass("blank")) {
						contain_rect = [tile.position().left , tile.position().top, tile.position().left+tile_width,tile.position().top ];	
					} else {
						contain_rect = [tile.position().left , tile.position().top, tile.position().left,tile.position().top ];	
					}	
					
					tile.draggable("option","containment", contain_rect )
						
				}
			})
		})
	}
	log(tiles);
	$tiles.find("div:not(.blank)").draggable({
		snapTolerance:10,
		snap:".blank",
		stop:function(event,ui) {
			var blank = $(".blank")
			if (ui.offset.left == blank.position().left && ui.offset.top == blank.position().top) {
				//tiles switched

				var blank_coords = blank.data("coords");
				var this_coords = $(this).data("coords")
				blank.data("coords",this_coords);
				$(this).data("coords",blank_coords);
				tiles[blank_coords.row][blank_coords.column] = $(this);
				tiles[this_coords.row][this_coords.column] = blank;
				//log(this_coords.left,tile_width)
				blank.css({"left":this_coords.column*tile_width,"top":this_coords.row*tile_height});

				resetDragContainment();
			}
		}
	})
	resetDragContainment()
};

function generateImageTiles(num_horizontal_tiles,imgsrc,callback) {
	var elem = document.createElement('canvas'),
		context = elem.getContext('2d');
	if (!context || !context.getImageData || !context.putImageData || !context.drawImage) {
		return;
	}
 
	var img = new Image();

	img.addEventListener('load', function() {
		context.drawImage(this, 0, 0);
	 
		//var tile_size = Math.floor((this.width/num_horizontal_tiles)/9)*;
		var tile_size = Math.floor(this.width/num_horizontal_tiles);
		var num_vertical_tiles = parseInt(this.height/tile_size);
		log(tile_size,num_horizontal_tiles,num_vertical_tiles)
		var canvases = []
		for (var i = 0; i < num_vertical_tiles; i += 1) {
			canvases[i]=[]
			for (var n = 0; n < num_horizontal_tiles; n += 1) {

				var c = document.createElement("canvas");
				c.width = tile_size;
				c.height = tile_size;
				var ctx = c.getContext("2d");
				log(img,n*tile_size, i*tile_size, tile_size,tile_size,0,0,tile_size,tile_size)
				ctx.drawImage(img,n*tile_size, i*tile_size, tile_size,tile_size,0,0,tile_size,tile_size);
				canvases[i][n]=c;
				
			}	
			
		}
		
		callback({
			"canvases":canvases,
			"rows":num_vertical_tiles,
			"columns":num_horizontal_tiles,
			"tile_size":tile_size
		});

	}, false);
	img.src = imgsrc;
}
generateImageTiles(4,"cessnock.jpg",initGame);

