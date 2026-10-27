/**
 * Compresses and converts an uploaded image File into a compact JPEG Data URL
 * suitable for storing in Firestore documents and localStorage (< 350KB).
 */
export function processUploadedImageFile(
  file: File,
  maxWidth = 1400,
  quality = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (JPG, PNG, WEBP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error('Empty image data.'));
        return;
      }

      const img = new Image();
      img.onerror = () => {
        // Fallback to raw dataUrl if Image decode fails
        resolve(dataUrl);
      };
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(dataUrl);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
}
