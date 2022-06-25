/**
 *
 * @param blob Blob object of image
 * @param setB64 a React setState hook
 */

const blobToBase64 = (blob: Blob, setB64: React.Dispatch<React.SetStateAction<string>>) => {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onloadend = () => {
    const base64data = reader.result
    typeof base64data === 'string' && setB64(base64data)
  }
}

export default blobToBase64
