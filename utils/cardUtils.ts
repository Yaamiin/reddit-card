import html2canvas from 'html2canvas';

// Parse text to identify highlights
// {text} = Yellow
// [text] = Cyan
export const parseContent = (text: string) => {
  const parts: { text: string; type: 'normal' | 'yellow' | 'cyan' }[] = [];
  let buffer = '';
  let i = 0;

  while (i < text.length) {
    if (text[i] === '{') {
      if (buffer) parts.push({ text: buffer, type: 'normal' });
      buffer = '';
      i++;
      while (i < text.length && text[i] !== '}') {
        buffer += text[i];
        i++;
      }
      parts.push({ text: buffer, type: 'yellow' });
      buffer = '';
      i++; // skip }
    } else if (text[i] === '[') {
      if (buffer) parts.push({ text: buffer, type: 'normal' });
      buffer = '';
      i++;
      while (i < text.length && text[i] !== ']') {
        buffer += text[i];
        i++;
      }
      parts.push({ text: buffer, type: 'cyan' });
      buffer = '';
      i++; // skip ]
    } else {
      buffer += text[i];
      i++;
    }
  }
  if (buffer) parts.push({ text: buffer, type: 'normal' });
  return parts;
};

export const downloadCard = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 3, // High resolution
      allowTaint: true,
      useCORS: true,
      logging: false,
    });

    const link = document.createElement('a');
    const cleanName = filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    link.download = `${cleanName || 'card'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Could not generate image. If you are using a custom avatar, ensure the URL supports CORS, or upload a file directly.");
  }
};