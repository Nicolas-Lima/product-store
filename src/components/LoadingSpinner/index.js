function LoadingSpinner() {
  return (
    <div>
      <article
        aria-busy="true"
        className="fs-4 m-0 p-0 pt-5 text-center text-cyan vh-100">
        <span className="ms-2">Carregando, por favor espere!</span>
      </article>
    </div>
  );
}

export default LoadingSpinner;
