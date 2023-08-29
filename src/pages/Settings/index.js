import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth'

import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { BsPersonCircle, BsUpload } from 'react-icons/bs'

import Nav from '../../components/Nav'
import { toast } from 'react-toastify'

import './settings.css'

function Settings() {
  const { user, updateUserInfo } = useContext(AuthContext)

  const [avatarImgUrl, setAvatarImgUrl] = useState(
    user?.profileConfiguration?.imgUrl
  )
  const [imageAvatar, setImageAvatar] = useState(null)
  const [email, setEmail] = useState(user?.email)
  const [updatingName, setUpdatingName] = useState(false)
  const [updatingPhoto, setUpdatingPhoto] = useState(false)
  const [fullName, setFullName] = useState(
    user?.profileConfiguration?.fullName
  )

  const handleSave = async () => {
    if (imageAvatar != null) {
      setUpdatingPhoto(true)
      handleUpload()
    }

    if (user?.profileConfiguration?.fullName !== fullName) {
      setUpdatingName(true)
      await updateUserInfo({
        profileConfiguration: {
          ...user?.profileConfiguration,
          fullName
        }
      })

      toast.success('Nome atualizado com sucesso!')
      setUpdatingName(false)
    }
  }

  function handleFile(event) {
    const image = event.target.files[0]

    if (image?.type === 'image/jpeg' || image?.type === 'image/png') {
      setImageAvatar(image)
      setAvatarImgUrl(URL.createObjectURL(image))
    } else {
      toast.error('Envie uma imagem do tipo PNG ou JPEG!')
      setImageAvatar(null)
      return
    }
  }

  async function handleUpload() {
    const currentUid = user?.uid

    const uploadRef = ref(
      storage,
      `images/${currentUid}/${imageAvatar.name}`
    )

    const uploadTask = await uploadBytes(uploadRef, imageAvatar)
      .then(snapshot => {
        getDownloadURL(snapshot.ref).then(async downloadURL => {
          const imgUrl = downloadURL
          const docRef = doc(db, 'users', user?.uid)
          await updateDoc(docRef, {
            profileConfiguration: {
              imgUrl,
              fullName
            }
          })

          toast.success('Foto de perfil atualizada com sucesso!')
          setImageAvatar(null)
          setUpdatingPhoto(false)
        })
      })
      .catch(error => {
        toast.error('Erro ao enviar sua imagem, tente novamente!')
      })
  }

  return (
    <>
      <Nav />
      <main className="container mt-4 mb-4">
        <h1 className="text-center text-secondary">Configurações</h1>
        <div className="mt-2-3rem d-flex flex-column align-items-center bg-light p-3 pt-0 rounded">
          <div className="d-flex justify-content-center align-items-center w-100 pe-2 ps-3 mt-4 mb-3 rounded">
            <label
              htmlFor="avatarUpload"
              className="label-avatar w-auto h-auto">
              <span>
                <BsUpload color="#fff" size={25} />
              </span>

              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleFile}
              />
              <br />
              {avatarImgUrl ? (
                <img
                  src={avatarImgUrl}
                  alt={`profilePhoto`}
                  className="profilePhoto"
                />
              ) : (
                <BsPersonCircle className="profilePhoto" />
              )}
            </label>
          </div>
          <div className="d-flex align-items-center w-100 pe-2 ps-3 py-0 rounded  mb-0">
            <label htmlFor="fullName" className="w-100">
              Nome
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                id="fullName"
                placeholder="Nome inteiro"
              />
            </label>
          </div>
          <div className="d-flex align-items-center w-100 pe-2 ps-3 rounded mb-3 mt-1">
            <label htmlFor="email" className="w-100">
              E-mail
              <input
                type="text"
                value={email}
                id="email"
                className="disabled-input"
                disabled
              />
            </label>
          </div>
          {updatingPhoto || updatingName ? (
            <button
              className="w-auto align-self-start mt-4 ms-1 ms-md-3 px-3 py-2 secondary disabled-input"
              disabled
              aria-busy={true}>
              Salvando...
            </button>
          ) : (
            <>
              {imageAvatar != null ||
              user?.profileConfiguration?.fullName !== fullName ? (
                <button
                  className="w-auto align-self-start mt-4 ms-1 ms-md-3 px-3 py-2 secondary"
                  onClick={handleSave}>
                  Salvar
                </button>
              ) : (
                <button
                  className="w-auto align-self-start mt-4 ms-1 ms-md-3 px-3 py-2 secondary disabled-input"
                  disabled>
                  Salvar
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default Settings
