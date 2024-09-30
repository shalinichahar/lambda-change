const imageToBase64 = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.onerror = reject;

    // Check if the image is a Blob/File or a URL
    if (typeof image === 'string') {
      // If it's a URL, fetch the image first
      fetch(image)
        .then((response) => response.blob())
        .then((blob) => reader.readAsDataURL(blob))
        .catch(reject);
    } else {
      // If it's a File or Blob, read it directly
      reader.readAsDataURL(image);
    }
  });
};

export default imageToBase64;
