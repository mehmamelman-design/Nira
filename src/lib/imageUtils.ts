/**
 * Helper to convert various cloud storage share links (Google Drive, Dropbox, Imgur, Postimg, etc.)
 * into direct displayable image URLs that render correctly inside <img> tags.
 */
export function formatImageUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return '';
  
  let cleanUrl = url.trim();

  if (!cleanUrl) return '';

  // Data URLs (base64) or Blob URLs - pass through directly
  if (cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) {
    return cleanUrl;
  }

  // 1. Google Drive Links
  // Share link patterns:
  // - https://drive.google.com/file/d/1AbC.../view?usp=sharing
  // - https://drive.google.com/open?id=1AbC...
  // - https://drive.google.com/uc?id=1AbC...
  // - https://drive.google.com/thumbnail?id=1AbC...
  if (cleanUrl.includes('drive.google.com')) {
    let fileId = '';
    const matchD = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const matchId = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    
    if (matchD && matchD[1]) {
      fileId = matchD[1];
    } else if (matchId && matchId[1]) {
      fileId = matchId[1];
    }

    if (fileId) {
      // Return high-res thumbnail endpoint which bypasses drive viewer
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w4000`;
    }
  }

  // Google User Content Direct
  if (cleanUrl.includes('lh3.googleusercontent.com')) {
    return cleanUrl;
  }

  // 2. Dropbox Links
  // Pattern: https://www.dropbox.com/scl/fi/abc123/image.jpg?rlkey=xyz&dl=0
  if (cleanUrl.includes('dropbox.com')) {
    cleanUrl = cleanUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    cleanUrl = cleanUrl.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
    if (!cleanUrl.includes('raw=1') && !cleanUrl.includes('dl.dropboxusercontent.com')) {
      cleanUrl += cleanUrl.includes('?') ? '&raw=1' : '?raw=1';
    }
    return cleanUrl;
  }

  // 3. Imgur Links
  // Pattern: https://imgur.com/ABC -> https://i.imgur.com/ABC.jpg
  if (cleanUrl.includes('imgur.com') && !cleanUrl.includes('i.imgur.com')) {
    const parts = cleanUrl.split('/');
    const id = parts[parts.length - 1].split('.')[0];
    if (id && id !== 'a' && id !== 'gallery') {
      return `https://i.imgur.com/${id}.jpg`;
    }
  }

  // 4. Postimages / Postimg
  if (cleanUrl.includes('postimg.cc') && !cleanUrl.includes('i.postimg.cc')) {
    const parts = cleanUrl.split('/');
    const id = parts[parts.length - 1];
    if (id) {
      return `https://i.postimg.cc/${id}/image.jpg`;
    }
  }

  return cleanUrl;
}
