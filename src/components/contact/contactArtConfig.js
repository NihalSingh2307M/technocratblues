// Coordinates were measured off the 1254x706 reference design, so every x/y below
// only lines up inside this viewBox.
export const ART_VIEWBOX = '0 0 1254 706';

export const ACCENT_COLOR = '#5b5ff0';

// The plane's path, drawn as the dotted trail with the plane on top of its end. It enters from off the left
// edge (negative x, so 'slice' cropping never reveals the start), loops once clockwise and glides to the
// parking spot beside the card.
// The art is pinned to the top of the section (see FlightPathArt), so the whole route lives in y 25..125:
// that band is above the headline block at every width, and the trail never runs through the text.
export const FLIGHT_ROUTE = [
    'M -90 52',
    'C -60 51.7 -32.2 51.3 0 51',
    'C 37.1 50.6 80 50.3 120 50',
    'C 160 49.7 202.9 49.2 240 49',
    'C 272.2 48.9 300.3 49.3 330 49',
    'C 359.1 48.7 397.4 48.4 416.3 47.4',
    'C 425.6 46.9 430.4 44.5 436.9 45.6',
    'C 443.5 46.8 450.6 50.1 455.7 54.4',
    'C 460.8 58.6 465.3 65.1 467.6 71.3',
    'C 469.9 77.6 470.5 85.4 469.4 91.9',
    'C 468.2 98.5 464.9 105.6 460.6 110.7',
    'C 456.4 115.8 449.9 120.3 443.7 122.6',
    'C 437.4 124.9 429.6 125.5 423.1 124.4',
    'C 416.5 123.2 409.4 119.9 404.3 115.6',
    'C 399.2 111.4 394.7 104.9 392.4 98.7',
    'C 390.1 92.4 389.5 84.6 390.6 78.1',
    'C 391.8 71.5 394.8 65.4 399.4 59.3',
    'C 405.2 51.3 414.3 41 425 36',
    'C 437.2 30.3 452.8 30.8 470 30',
    'C 492.8 28.9 521.9 31.5 550 33',
    'C 581.5 34.7 615.9 37.3 650 40',
    'C 685.8 42.9 722.5 47 760 50',
    'C 799.1 53.1 840.9 54.2 880 58',
    'C 917.5 61.6 956.4 65.7 990 72',
    'C 1019 77.4 1045.7 89 1070 92',
    'C 1089.9 94.4 1108.6 96.2 1125 92',
    'C 1139.9 88.2 1151.7 77.3 1165 70',
].join(' ');

// Heading is in degrees with 0 pointing right, because the plane artwork is drawn along +x.
export const PLANE_FINAL_ANGLE = -30;

export const FLIGHT_DURATION = 5;