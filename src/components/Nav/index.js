import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'
import box from '../../assets/box.png'

import {
  BsBoxArrowRight,
  BsGear,
  BsBox,
  BsCart3,
  BsListUl
} from 'react-icons/bs'

import './nav.css'

function Nav() {
  const { logout, userSigned } = useContext(AuthContext)

  return (
    <div className="container">
      <nav className="mt-3">
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
              <Link to="/login" className="link-secondary">
                Fazer login
              </Link>
            </li>
          )}

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
                    <div
                      onClick={() => console.log('Meus pedidos')}
                      className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Meus pedidos</span>
                      <BsBox />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="link-secondary">
                    <div
                      onClick={() => console.log('Meus pedidos')}
                      className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Meu carrinho</span>
                      <BsCart3 />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/list" className="link-secondary">
                    <div
                      onClick={() => console.log('Meus pedidos')}
                      className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Minha lista</span>
                      <BsListUl />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="link-secondary">
                    <div
                      onClick={() => console.log('configurações')}
                      className="d-flex justify-content-end align-items-center">
                      <span className="ms-custom-1">Configurações</span>
                      <BsGear />
                    </div>
                  </Link>
                </li>
                {userSigned && (
                  <li onClick={logout}>
                    <Link to="" className="link-secondary">
                      <div className="d-flex justify-content-end align-items-center">
                        <span className="ms-custom-1">Sair</span>
                        <BsBoxArrowRight />
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
