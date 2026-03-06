from PIL import Image
import numpy as np
import subprocess

img = Image.open('public/images/pure-shape.png')
data = np.array(img)

# Find dark pixels (logo on white bg)
gray = np.mean(data[:,:,:3], axis=2)

# Gap is at rows 551-584, so pictogram is rows 0-550
# Crop to just the pictogram portion
pictogram = gray[:551, :]

# Convert to black & white bitmap (invert: dark logo = white in PBM for potrace)
bw = (pictogram < 180).astype(np.uint8)

# Find tight bounds and add padding
rows = np.any(bw, axis=1)
cols = np.any(bw, axis=0)
rmin, rmax = np.where(rows)[0][[0, -1]]
cmin, cmax = np.where(cols)[0][[0, -1]]

# Add some padding
pad = 10
rmin = max(0, rmin - pad)
rmax = min(bw.shape[0]-1, rmax + pad)
cmin = max(0, cmin - pad)
cmax = min(bw.shape[1]-1, cmax + pad)

cropped = bw[rmin:rmax+1, cmin:cmax+1]
h, w = cropped.shape
print(f'Cropped pictogram: {w}x{h}')

# Save as PBM (P4 format for potrace)
pbm_path = '/tmp/pictogram.pbm'
with open(pbm_path, 'wb') as f:
    f.write(f'P4\n{w} {h}\n'.encode())
    # Pack bits
    for row in range(h):
        row_bytes = bytearray()
        for col_start in range(0, w, 8):
            byte = 0
            for bit in range(8):
                col = col_start + bit
                if col < w and cropped[row, col]:
                    byte |= (128 >> bit)
            row_bytes.append(byte)
        f.write(bytes(row_bytes))

print(f'PBM saved to {pbm_path}')

# Run potrace to convert to SVG
svg_path = 'static/images/logo-icon.svg'
result = subprocess.run(
    ['potrace', pbm_path, '-s', '-o', svg_path, '--flat', '--turdsize', '5'],
    capture_output=True, text=True
)
print(f'potrace stdout: {result.stdout}')
print(f'potrace stderr: {result.stderr}')
print(f'SVG saved to {svg_path}')
