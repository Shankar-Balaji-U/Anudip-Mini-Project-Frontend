export function convertFileToUrl(file: File): Promise<string | null> {
	if (file !== null) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (event: any) => {
				if (event.target.readyState === 2) {
					resolve(event.target.result);
				}
			});
			reader.readAsDataURL(file);
		});
	} else {
		return Promise.resolve(null);
	}
}

export function convertUrlToFile(uri: string, filename: string = ''): File | null {
  const dataz = uri.split(',');
  if (dataz.length !== 0) {

	  const mime = dataz[0].match(/:(.*?);/)?.[1];
	  const b_str = atob(dataz[1]);
	  const len = b_str.length;
	  const u8arr = new Uint8Array(len);

	  for (let i = 0; i < len; i++) {
	    u8arr[i] = b_str.charCodeAt(i);
	  }

	  return new File([u8arr], filename, { type: mime });
  } else {
  	return null;
  }
}