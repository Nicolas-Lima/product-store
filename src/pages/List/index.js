import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../contexts/store";
import { AuthContext } from '../../contexts/auth'

import Nav from "../../components/Nav";
import { sliceProductsIntoGroups } from "../../utils/productsUtils";
import ProductsGridRenderer from "../../components/ProductsGridRenderer";

function List() {
  const { userList, guestList } = useContext(StoreContext);
  const { userSigned } = useContext(AuthContext)
  const [slicedProductsIntoGroups, setSlicedProductsIntoGroups] = useState(
    []
  ); // We have to divide the products into groups of 3 so that the PICO.css grid to work better.

  useEffect(() => {
    if (userList?.length > 0) {
      setSlicedProductsIntoGroups(sliceProductsIntoGroups(userList));
    } else if (guestList?.length > 0 && !userSigned) {
      setSlicedProductsIntoGroups(sliceProductsIntoGroups(guestList))
    }
  }, [userList, guestList, userSigned]);

  return (
    <>
      <Nav />
      <main className="container mt-4">
        {sliceProductsIntoGroups?.length > 0 ? (
          <>
            <h1 className="mb-4 text-center text-secondary">
              Minha lista de produtos
            </h1>
            {ProductsGridRenderer({
              slicedProductsIntoGroups,
              isListPage: true,
            })}
          </>
        ) : (
          <h1 className="text-center text-secondary">
            Você não possui produtos em sua lista!
          </h1>
        )}
      </main>
    </>
  );
}

export default List;
