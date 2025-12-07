import { toPng } from 'html-to-image';

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

  await document.fonts.ready;

  try {
    // Small delay to ensure styles are stable
    await new Promise(resolve => setTimeout(resolve, 100));

    const dataUrl = await toPng(element, {
      pixelRatio: 3, // High quality
      backgroundColor: 'transparent',
    });

    const link = document.createElement('a');
    const cleanName = filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    link.download = `${cleanName || 'card'}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Could not generate image. Check console for details.");
  }
};
