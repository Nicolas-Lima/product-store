import "./product.css";

function Product({ title, imgUrl, alt }) {
  return (
    <div className="product">
      <article>
        <header className="text-center">{title}</header>
        <div className="d-flex justify-content-center align-items-center">
          <img src={imgUrl} alt={alt} />
        </div>
      </article>
    </div>
  );
}

export default Product;
