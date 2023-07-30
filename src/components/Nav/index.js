import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import box from "../../assets/box.png";

import { BsBoxArrowRight, BsGear, BsBox, BsCart3 } from "react-icons/bs";

import "./nav.css";

function Nav() {
  const { logout } = useContext(AuthContext);

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
          <li>
            <Link to="/login" className="link-secondary">
              Login
            </Link>
          </li>
          <li>
            <details role="list" dir="rtl">
              <summary
                aria-haspopup="listbox"
                role="link"
                className="link-secondary shadow-none bg-transparent">
                Conta
              </summary>
              <ul role="listbox">
                <li>
                  <div
                    onClick={() => console.log("Meus pedidos")}
                    className="d-flex justify-content-end align-items-center link-secondary">
                    <span className="ms-custom-1">Meus pedidos</span>
                    <BsBox />
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => console.log("Meus pedidos")}
                    className="d-flex justify-content-end align-items-center link-secondary">
                    <span className="ms-custom-1">Meu carrinho</span>
                    <BsCart3 />
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => console.log("configurações")}
                    className="d-flex justify-content-end align-items-center link-secondary">
                    <span className="ms-custom-1">Configurações</span>
                    <BsGear />
                  </div>
                </li>
                <li onClick={logout}>
                  <div className="d-flex justify-content-end align-items-center link-secondary">
                    <span className="ms-custom-1">Sair</span>
                    <BsBoxArrowRight />
                  </div>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
