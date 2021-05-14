export const bwText: (hex: string) => '#000000' | '#ffffff' = hex => {
  let r = '0', g = '0', b = '0'

  // 3 digits
  if (hex && hex.length === 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]

    // 6 digits
  } else if (hex && hex.length === 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }

  // http://stackoverflow.com/a/3943023/112731
  return (parseInt(r, 16) * 0.299 + parseInt(g, 16) * 0.587 + parseInt(b, 16) * 0.114) > 186
    ? '#000000'
    : '#ffffff'
}
