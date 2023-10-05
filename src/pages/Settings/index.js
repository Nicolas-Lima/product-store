import { useContext, useState, useEffect, useMemo, useRef } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/auth'
import { StoreContext } from '../../contexts/store'
import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Nav from '../../components/Nav'
import UpdateDeliveryAddress from '../../components/UpdateDeliveryAddress'
import ImageUploader from '../../components/ImageUploader'
import {
  validateDeliveryAddressForm,
  validateFullNameWithMessage,
  validatePasswordWithMessage
} from '../../utils/validationUtils'
import './settings.css'

function Settings() {
  const {
    seller,
    user,
    changePassword,
    updateUserInfo,
    updateDeliveryAddress,
    deleteAccount
  } = useContext(AuthContext)

  const { deleteSellerAccount } = useContext(StoreContext)

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
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [showChangePasswordInput, setShowChangePasswordInput] =
    useState(false)
  const [fullName, setFullName] = useState(
    user?.profileConfiguration?.fullName
  )
  const [password, setPassword] = useState('')
  const [passwordInputStarted, setPasswordInputStarted] = useState(false)
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
  const [startedDeliveryForm, setStartedDeliveryForm] = useState(false)

  const [deliveryAddressErrorMessages, setDeliveryAddressErrorMessages] =
    useState({
      city: '',
      postalCode: '',
      state: '',
      streetAddress: ''
    })
  const [deletingAccount, setDeletingAccount] = useState(false)
  const [deletionMessage, setDeletionMessage] = useState('')

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
      !areDeliveryAddressesEqual ||
      password
    )
  }, [imageAvatar, fullName, user, areDeliveryAddressesEqual, password])

  const fullNameErrorMessage = useMemo(() => {
    const { errorMessage } = validateFullNameWithMessage(fullName)
    return errorMessage
  }, [fullName])

  const passwordErrorMessage = useMemo(() => {
    const { errorMessage } = validatePasswordWithMessage(password)
    if (passwordInputStarted) {
      return errorMessage
    } else {
      return ''
    }
  }, [password, passwordInputStarted])

  useEffect(() => {
    if (startedDeliveryForm) {
      const { errorMessages: deliveryAddressErrorMessages } =
        validateDeliveryAddressForm(newDeliveryAddress)

      setDeliveryAddressErrorMessages(deliveryAddressErrorMessages)
    } else {
      setDeliveryAddressErrorMessages({
        city: '',
        postalCode: '',
        state: '',
        streetAddress: ''
      })
    }
  }, [
    imageAvatar,
    fullName,
    user,
    password,
    areDeliveryAddressesEqual,
    newDeliveryAddress,
    startedDeliveryForm
  ])

  useEffect(() => {
    const userHasDeliveryAddress = Object.keys(deliveryAddress).every(
      key => !!deliveryAddress[key] === true
    )
    setUserHasDeliveryAddress(userHasDeliveryAddress)
  }, [deliveryAddress])

  useEffect(() => {
    const handleBeforeUnload = event => {
      if (hasUserModifiedData || deletingAccount) {
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
    password,
    user,
    hasUserModifiedData,
    deletingAccount
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
        setStartedDeliveryForm(false)
      }

      handleUpdateDeliveryAddress()
    }

    if (!passwordErrorMessage && password) {
      setUpdatingPassword(true)
      await changePassword(password)
        .then(() => {
          setPassword('')
          setPasswordInputStarted(false)
          setShowChangePasswordInput(false)
          toast.success('Senha atualizada com sucesso!')
          setUpdatingPassword(false)
        })
        .catch(e => {
          if (e === 'auth/requires-recent-login') {
            toast.error('Por favor, faça login novamente!')
          } else {
            toast.error('Um erro aconteceu, tente novamente!')
          }

          setUpdatingPassword(false)
        })
    }
  }

  const handleCancelChanges = () => {
    imageInputRef.current.value = null

    setImageAvatar(null)
    setAvatarImgUrl(user?.profileConfiguration?.imgUrl)
    setEmail(user?.email)
    setFullName(user?.profileConfiguration?.fullName)
    setPassword('')
    setPasswordInputStarted(false)
    setShowChangePasswordInput(false)
    setNewDeliveryAddress(user?.deliveryAddress)
    setShowDeliveryAddressForm(false)
    setStartedDeliveryForm(false)
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

          await updateUserInfo({
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

  const handleDeleteAccount = async () => {
    if (!window.confirm('🚫 Você realmente deseja excluir sua conta?')) {
      return
    }
    setDeletingAccount(true)
    await deleteAccount()
    setDeletingAccount(false)
  }

  const handleDeleteSellerAccount = async () => {
    if (
      !window.confirm(
        '🚫 Você realmente deseja excluir sua conta de vendedor e todos os seus produtos?'
      )
    ) {
      return
    }
    setDeletingAccount(true)
    await deleteSellerAccount(setDeletionMessage)
    setDeletingAccount(false)
  }

  document.title = 'Configurações'

  return (
    <>
      <Nav />
      <main className="container mt-4 mb-4">
        <h1 className="text-center text-secondary">Configurações</h1>
        <div className="mt-2-3rem d-flex flex-column align-items-center bg-light p-3 pt-0 rounded">
          <div className="avatar-uploader pe-2 ps-3 mt-4 mb-3">
            <ImageUploader
              imgUrl={avatarImgUrl}
              setImgUrl={setAvatarImgUrl}
              setImage={setImageAvatar}
              imageInputRef={imageInputRef}
              isAvatar={true}
            />
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
          {fullNameErrorMessage && (
            <div className="mb-3 mt-0 text-danger align-self-start ps-3">
              {fullNameErrorMessage}
            </div>
          )}
          <UpdateDeliveryAddress
            areDeliveryAddressesEqual={areDeliveryAddressesEqual}
            userHasDeliveryAddress={userHasDeliveryAddress}
            deliveryAddress={deliveryAddress}
            updatingDeliveryAddress={updatingDeliveryAddress}
            setNewDeliveryAddress={setNewDeliveryAddress}
            newDeliveryAddress={newDeliveryAddress}
            showDeliveryAddressForm={showDeliveryAddressForm}
            setShowDeliveryAddressForm={setShowDeliveryAddressForm}
            deliveryAddressErrorMessages={deliveryAddressErrorMessages}
            setStartedDeliveryForm={setStartedDeliveryForm}
          />
          <div className="d-flex align-items-center w-100 pe-2 ps-3 rounded mb-0 mt-1">
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
          <div className="d-flex align-items-center w-100 pe-2 ps-3 rounded mb-0 mt-1">
            <label htmlFor="change-password" className="w-100">
              Senha
              {!showChangePasswordInput && (
                <button
                  className="w-auto btn-blue-grey mt-1"
                  onClick={() =>
                    setShowChangePasswordInput(prevState => !prevState)
                  }>
                  Trocar senha
                </button>
              )}
              {showChangePasswordInput && (
                <input
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    setPasswordInputStarted(true)
                  }}
                  placeholder="Digite sua nova senha"
                  id="change-password"
                />
              )}
            </label>
          </div>
          {passwordErrorMessage && passwordInputStarted && (
            <div className="mb-3 mt-0 text-danger align-self-start ps-3">
              {passwordErrorMessage}
            </div>
          )}
          {updatingPhoto ||
          updatingName ||
          updatingDeliveryAddress ||
          updatingPassword ? (
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
              !passwordErrorMessage &&
              areDeliveryAddressErrorsEmpty &&
              !deletingAccount ? (
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
              {(hasUserModifiedData ||
                startedDeliveryForm ||
                passwordInputStarted ||
                showChangePasswordInput) && (
                <button
                  className="mt-4 ms-1 ms-md-3 px-3 py-2 btn-orange"
                  onClick={handleCancelChanges}>
                  Cancelar
                </button>
              )}
            </div>
          )}
          <div className="danger-zone w-100 mt-3 mb-2 px-3">
            <strong>
              <span className="me-2">🚫</span>Zona de perigo
            </strong>
            {deletingAccount ? (
              <h3 aria-busy={true} className="mt-4 text-danger">
                {deletionMessage ? deletionMessage : 'Deletando...'}
              </h3>
            ) : (
              <div className="grid w-auto mt-4">
                {user instanceof Object && (
                  <button
                    type="button"
                    className="btn-orange d-inline"
                    onClick={handleDeleteAccount}>
                    Excluir conta
                  </button>
                )}

                {seller instanceof Object && (
                  <button
                    type="button"
                    className="btn-orange d-inline"
                    onClick={handleDeleteSellerAccount}>
                    Excluir conta de vendedor
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Settings
