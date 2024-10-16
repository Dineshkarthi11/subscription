
export const lightenColor = (color, factor) => {
    // Remove '#' from the beginning of the color string
  color = color?.slice(1);
  
    // Parse the hex color to RGB
  let r = parseInt(color?.substr(0, 2), 16);
  let g = parseInt(color?.substr(2, 2), 16);
  let b = parseInt(color?.substr(4, 2), 16);
  
    // Scale each RGB component towards 255 (white)
    r = Math.round(r + (255 - r) * factor);
    g = Math.round(g + (255 - g) * factor);
    b = Math.round(b + (255 - b) * factor);
  
    // Convert the RGB values back to hex
    let newColor =
      "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  
    return newColor;
};
