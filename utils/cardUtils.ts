import { toPng, toCanvas } from 'html-to-image';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

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

  // Wait for fonts to be ready to ensure text renders correctly
  await document.fonts.ready;

  try {
    // Wait a bit for images to fully render
    await new Promise(resolve => setTimeout(resolve, 200));

    const dataUrl = await toPng(element, {
      pixelRatio: 3, // High resolution
      backgroundColor: 'transparent', 
    });

    const link = document.createElement('a');
    const cleanName = filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    link.download = `${cleanName || 'card'}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Download failed:", error);
    alert("Could not generate image. If you are using a custom avatar, ensure the URL supports CORS, or upload a file directly.");
  }
};

export const downloadGif = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  await document.fonts.ready;

  try {
    const gif = new GIFEncoder();
    
    // Capture settings
    // Note: Due to browser limitations with DOM cloning, nested GIFs (like trophies)
    // might reset to frame 0 on each capture.
    const framesToCapture = 10; 
    const delay = 100; // 100ms = 10fps
    
    // Matting Strategy:
    // We set the backgroundColor to the app's background color (#050505).
    // This fills the transparent areas (outside the rounded corners) with dark pixels,
    // creating perfect anti-aliased rounded corners in the GIF.
    const captureOptions = {
      pixelRatio: 2, 
      backgroundColor: '#050505', 
    };

    for (let i = 0; i < framesToCapture; i++) {
      const canvas = await toCanvas(element, captureOptions as any);
      
      const { width, height } = canvas;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Quantize
      // format: 'rgba4444' ensures we handle colors correctly, but since we are matting
      // to black, standard quantization is robust.
      const palette = quantize(data, 256);
      const index = applyPalette(data, palette);
      
      gif.writeFrame(index, width, height, { 
        palette, 
        delay,
        repeat: 0 // Loop forever
      });
      
      // Wait for next frame
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    gif.finish();
    
    const blob = new Blob([gif.bytes()], { type: 'image/gif' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    const cleanName = filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    link.download = `${cleanName || 'card'}.gif`;
    link.href = url;
    link.click();
    
  } catch (error) {
    console.error("GIF generation failed:", error);
    alert("Could not generate GIF. Browser limitations may prevent capturing nested animations.");
  }
};
