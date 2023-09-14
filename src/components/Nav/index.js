import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'
import box from '../../assets/box.png'

import {
  BsBoxArrowRight,
  BsGear,
  BsBox,
  BsCart3,
  BsListUl,
  BsBoxArrowInUp,
  BsPersonAdd,
  BsShop
} from 'react-icons/bs'

import './nav.css'

function NavContent() {
  const { logout, userSigned } = useContext(AuthContext)

  return (
    <>
      <ul>
        <>
          <Link
            to="/"
            className="link-secondary shadow-none bg-transparent">
            <li className="d-flex align-items-center">
              <img src={box} className="logo me-3" alt="logo" />
              <strong>Product Store</strong>
            </li>
          </Link>
        </>
      </ul>
      <ul>
        {!userSigned && (
          <li>
            <details role="list" dir="rtl">
              <summary
                aria-haspopup="listbox"
                role="link"
                className="link-secondary shadow-none bg-transparent">
                Opções
              </summary>
              <ul role="listbox">
                <li>
                  <Link to="/list" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Minha lista</span>
                      <BsListUl />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Fazer login</span>
                      <BsBoxArrowInUp />
                    </div>
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Registrar</span>
                      <BsPersonAdd />
                    </div>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        )}

        {userSigned && (
          <li>
            <details role="list" dir="rtl">
              <summary
                aria-haspopup="listbox"
                role="link"
                className="link-secondary shadow-none bg-transparent">
                Minha conta
              </summary>
              <ul role="listbox">
                <li>
                  <Link to="/orders" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Meus pedidos</span>
                      <BsBox />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Meu carrinho</span>
                      <BsCart3 />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/list" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Minha lista</span>
                      <BsListUl />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Configurações</span>
                      <BsGear />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/sell" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Vender</span>
                      <BsShop />
                    </div>
                  </Link>
                </li>
                <li onClick={logout}>
                  <Link to="" className="link-secondary">
                    <div className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Sair</span>
                      <BsBoxArrowRight />
                    </div>
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        )}
      </ul>
    </>
  )
}

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className={`${!isMobile ? 'container' : ''}`}>
      {isMobile ? (
        <aside className="mt-3 smallScreen m-0 p-0">
          <NavContent />
        </aside>
      ) : (
        <nav className="mt-3">
          <NavContent />
        </nav>
      )}
    </div>
  )
}

export default Nav
