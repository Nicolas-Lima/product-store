import { toast } from 'react-toastify'
import { BsUpload, BsPersonCircle } from 'react-icons/bs'
import './imageUploader.css'

function ImageUploader({
  imageInputRef,
  imgUrl,
  setImgUrl,
  setImage,
  isAvatar,
  defaultImg
}) {
  const DefaultImg = () =>
    defaultImg ? defaultImg : <BsPersonCircle className="imgPhoto" />

  const handleFile = event => {
    let image = event.target.files[0]

    if (image?.type === 'image/jpeg' || image?.type === 'image/png') {
      if (isAvatar) {
        image = new File([image], 'avatar.jpg', {
          type: 'image/jpeg'
        })
      }

      setImage(image)
      setImgUrl(URL.createObjectURL(image))
    } else if (image?.type) {
      toast.error('Envie uma imagem do tipo PNG ou JPEG!')
      imageInputRef.current.value = ''
      setImage(null)
      return
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center w-100 rounded">
      <label htmlFor="imgUpload" className="label-img w-auto h-auto">
        <span>
          <BsUpload color="#fff" className="uploadSvg" size={25} />
        </span>

        <input
          type="file"
          id="imgUpload"
          accept="image/*"
          onChange={handleFile}
          ref={imageInputRef}
        />
        <br />
        {imgUrl ? (
          <img src={imgUrl} alt={`imgPhoto`} className="imgPhoto" />
        ) : (
          <DefaultImg />
        )}
      </label>
    </div>
  )
}

export default ImageUploader
