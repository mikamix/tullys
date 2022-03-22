function isIpadOS() {
    var ratio = window.devicePixelRatio || 1;
    var screen = {
        width : window.screen.width * ratio,
        height : window.screen.height * ratio
    };
	return (
		// iPad 12.9 inch - Portrait/Landscape
		screen.width === 2048 && screen.height === 2732) ||
		(screen.width === 2732 && screen.height === 2048) ||
		// iPad 9.7 inch - Portrait/Landscape
		(screen.width === 1536 && screen.height === 2048) ||
		(screen.width === 2048 && screen.height === 1536) ||
		// iPad 11 inch - Portrait/Landscape
		(screen.width === 1668 && screen.height === 2388) ||
		(screen.width === 2388 && screen.height === 1668) ||
		// iPad Air 3, 10.5 inch - Portrait/Landscape
		(screen.width === 1668 && screen.height === 2224) ||
		(screen.width === 2224 && screen.height === 1668);
}