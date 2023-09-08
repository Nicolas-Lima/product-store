import { useContext, useState, useEffect, useMemo, useRef } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/auth'
import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { BsPersonCircle, BsUpload } from 'react-icons/bs'
import Nav from '../../components/Nav'
import UpdateDeliveryAddress from '../../components/UpdateDeliveryAddress'
import {
  validateDeliveryAddressForm,
  validateFullNameWithMessage
} from '../../utils/validationUtils'

import './settings.css'

function Settings() {
  const { user, updateUserInfo, updateDeliveryAddress } =
    useContext(AuthContext)

  const imageInputRef = useRef(null)
  const [avatarImgUrl, setAvatarImgUrl] = useState(
    user?.profileConfiguration?.imgUrl
  )
  const [imageAvatar, setImageAvatar] = useState(null)
  const [email, setEmail] = useState(user?.email)
  const [updatingName, setUpdatingName] = useState(false)
  const [updatingPhoto, setUpdatingPhoto] = useState(false)
  const [updatingDeliveryAddress, setUpdatingDeliveryAddress] =
    useState(false)
  const [fullName, setFullName] = useState(
    user?.profileConfiguration?.fullName
  )

  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.deliveryAddress
  )
  const [newDeliveryAddress, setNewDeliveryAddress] = useState(
    user?.deliveryAddress
  )

  const [userHasDeliveryAddress, setUserHasDeliveryAddress] =
    useState(false)
  const [showDeliveryAddressForm, setShowDeliveryAddressForm] =
    useState(false)

  const [deliveryAddressErrorMessages, setDeliveryAddressErrorMessages] =
    useState({
      city: '',
      postalCode: '',
      state: '',
      streetAddress: ''
    })

  const areDeliveryAddressErrorsEmpty = useMemo(() => {
    return Object.keys(deliveryAddressErrorMessages).every(
      key => !deliveryAddressErrorMessages[key]
    )
  }, [deliveryAddressErrorMessages])

  const areDeliveryAddressesEqual = useMemo(() => {
    const areDeliveryAddressesEqual =
      Object.keys(deliveryAddress).filter(
        key => deliveryAddress[key] === newDeliveryAddress[key]
      ).length === Object.keys(deliveryAddress).length
    return areDeliveryAddressesEqual
  }, [newDeliveryAddress, deliveryAddress])

  const hasUserModifiedData = useMemo(() => {
    return (
      imageAvatar != null ||
      user?.profileConfiguration?.fullName !== fullName ||
      !areDeliveryAddressesEqual
    )
  }, [imageAvatar, fullName, user, areDeliveryAddressesEqual])

  const fullNameErrorMessage = useMemo(() => {
    const { errorMessage } = validateFullNameWithMessage(fullName)
    return errorMessage
  }, [fullName])

  useEffect(() => {
    const { errorMessages: deliveryAddressErrorMessages } =
      validateDeliveryAddressForm(newDeliveryAddress)

    setDeliveryAddressErrorMessages(deliveryAddressErrorMessages)
  }, [
    imageAvatar,
    fullName,
    user,
    areDeliveryAddressesEqual,
    newDeliveryAddress
  ])

  useEffect(() => {
    const userHasDeliveryAddress = Object.keys(deliveryAddress).every(
      key => !!deliveryAddress[key] === true
    )
    setUserHasDeliveryAddress(userHasDeliveryAddress)
  }, [deliveryAddress])

  useEffect(() => {
    const handleBeforeUnload = event => {
      if (hasUserModifiedData) {
        event.preventDefault()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () =>
      window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [
    areDeliveryAddressesEqual,
    imageAvatar,
    fullName,
    user,
    hasUserModifiedData
  ])

  const handleSave = async () => {
    if (imageAvatar != null) {
      setUpdatingPhoto(true)
      handleUpload()
    }

    if (!areDeliveryAddressErrorsEmpty) {
      return
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

    if (!areDeliveryAddressesEqual) {
      const handleUpdateDeliveryAddress = async () => {
        setUpdatingDeliveryAddress(true)
        setShowDeliveryAddressForm(false)

        await updateDeliveryAddress(newDeliveryAddress)
        setUpdatingDeliveryAddress(false)
        setDeliveryAddress(newDeliveryAddress)
        toast.success('Endereço de entrega atualizado com sucesso!')
      }

      handleUpdateDeliveryAddress()
    }
  }

  const handleCancelChanges = () => {
    imageInputRef.current.value = null

    setImageAvatar(null)
    setAvatarImgUrl(user?.profileConfiguration?.imgUrl)
    setEmail(user?.email)
    setFullName(user?.profileConfiguration?.fullName)
    setNewDeliveryAddress(user?.deliveryAddress)
  }

  function handleFile(event) {
    const image = event.target.files[0]

    if (image?.type === 'image/jpeg' || image?.type === 'image/png') {
      const renamedImage = new File([image], 'avatar.jpg', {
        type: 'image/jpeg'
      })
      setImageAvatar(renamedImage)
      setAvatarImgUrl(URL.createObjectURL(renamedImage))
    } else if (image?.type) {
      toast.error('Envie uma imagem do tipo PNG ou JPEG!')
      imageInputRef.current.value = ''
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
                ref={imageInputRef}
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
          <div className="mb-3 mt-0 text-danger">
            {fullNameErrorMessage && fullNameErrorMessage}
          </div>
          <UpdateDeliveryAddress
            userHasDeliveryAddress={userHasDeliveryAddress}
            deliveryAddress={deliveryAddress}
            updatingDeliveryAddress={updatingDeliveryAddress}
            setNewDeliveryAddress={setNewDeliveryAddress}
            newDeliveryAddress={newDeliveryAddress}
            showDeliveryAddressForm={showDeliveryAddressForm}
            setShowDeliveryAddressForm={setShowDeliveryAddressForm}
            deliveryAddressErrorMessages={deliveryAddressErrorMessages}
          />
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
          {updatingPhoto || updatingName || updatingDeliveryAddress ? (
            <button
              className="w-auto align-self-start mt-4 ms-1 ms-md-3 px-3 py-2 secondary disabled-input"
              disabled
              aria-busy={true}>
              Salvando...
            </button>
          ) : (
            <div className="d-flex align-self-start">
              {hasUserModifiedData &&
              !fullNameErrorMessage &&
              areDeliveryAddressErrorsEmpty ? (
                <button
                  className="mt-4 ms-1 ms-md-3 px-3 py-2 btn-green"
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
              {hasUserModifiedData && (
                <button
                  className="mt-4 ms-1 ms-md-3 px-3 py-2 btn-orange"
                  onClick={handleCancelChanges}>
                  Cancelar
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Settings
