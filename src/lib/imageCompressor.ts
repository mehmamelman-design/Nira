/**
 * Reads image file directly as Data URL preserving 100% original dimensions, quality, and resolution.
 */
export async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Seçilən fayl şəkil formatında deyil!'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Fayl oxunarkən xəta baş verdi.'));
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        resolve(result);
      } else {
        reject(new Error('Fayl oxunarkən boş məlumat alındı.'));
      }
    };
    reader.readAsDataURL(file);
  });
}
