async function copyWithWriteText(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

async function copyWithClipboardItem(text: string): Promise<boolean> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
    return false;
  }

  try {
    const item = new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
    });
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
}

/** Copy text to the clipboard. Returns true only when copy actually succeeded. */
export async function copyText(text: string): Promise<boolean> {
  if (await copyWithWriteText(text)) {
    return true;
  }

  return copyWithClipboardItem(text);
}
