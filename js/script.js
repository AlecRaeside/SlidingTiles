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
		var row = tiles[i];
		for (var n=0;n<num_tiles_wide;n++) {
			if (blank_x!==n || blank_y !== i) {
				var tile = $("<div></div>").css({"left":(n*tile_width)+n,"top":(i*tile_height)+i})
				$tiles.append(tile);
			}
		}
	}
	
})



