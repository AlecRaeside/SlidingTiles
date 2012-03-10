/* Author:

*/
$(function() {
	var tiles = [],
		$tiles = $("#tiles"),
		num_tiles_wide = 3,
		num_tiles_high = 4,
		tile_width = 100,
		tile_height = 80,
		blank_x = Math.floor(Math.random()*num_tiles_wide),
		blank_y = Math.floor(Math.random()*num_tiles_high);
	for (var i=0;i<num_tiles_high;i++) {
		tiles[i]=[];
		for (var n=0;n<num_tiles_wide;n++) {
			if (blank_x!==n || blank_y !== i) {
				var tile = $("<div></div>")
				tile.css({"left":(n*tile_width),"top":(i*tile_height)});
				
				$tiles.append(tile);
				tiles[i][n]=tile;
			} else {
				tiles[i][n]="blank";
			}
		}
	}
	//log(typeof tiles[1][45]);
	var resetDragContainment = function() {
		$.each(tiles,function(i,row) {
			$.each(row,function(n,tile) {
					if (tile!=="blank") {
						var contain_rect = [0,0,0,0];
						if (i>0 && tiles[i-1][n]=="blank") {
							contain_rect = [tile.position().left , tile.position().top-tile_height , tile.position().left,tile.position().top ];	
						} else if (i<num_tiles_high-1 && tiles[i+1][n]=="blank") {
							contain_rect = [tile.position().left , tile.position().top , tile.position().left,tile.position().top+tile_height ];	
						} else if (n>0 && tiles[i][n-1]=="blank") {
							contain_rect = [tile.position().left-tile_width , tile.position().top , tile.position().left,tile.position().top ];	
						} else if (n<num_tiles_wide-1 && tiles[i][n+1]=="blank") {
							contain_rect = [tile.position().left , tile.position().top, tile.position().left+tile_width,tile.position().top ];	
						}					
						
						tile.draggable("option","containment", contain_rect )
					}
			})
		})
	}
	$tiles.find("div").draggable()
	resetDragContainment()
})



