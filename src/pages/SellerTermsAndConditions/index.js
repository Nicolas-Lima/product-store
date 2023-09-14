import Nav from '../../components/Nav'

function SellerTermsAndConditions() {
  document.title = 'Termos e condições'
  return (
    <>
      <Nav />
      <main className="container mt-3 d-flex flex-column align-items-center pb-4">
        <h1>
          Termos e Condições de vendedor da{' '}
          <span className="text-primary opacity-75">Loja Fictícia</span>
        </h1>
        <div>
          <ol>
            <li>
              <strong>Elegibilidade</strong>
              <ul>
                <li>
                  Você deve ser um adulto legalmente capaz e ter a
                  autoridade necessária para celebrar este contrato.
                </li>
                <li>
                  Você deve fornecer informações precisas e completas ao se
                  inscrever como vendedor.
                </li>
              </ul>
            </li>

            <li>
              <strong>Listagem de Produtos</strong>
              <ul>
                <li>
                  Você é responsável por criar e manter listagens de
                  produtos, incluindo descrições precisas, preços e
                  imagens.
                </li>
                <li>
                  Não é permitido listar produtos ilegais, fraudulentos ou
                  proibidos por lei.
                </li>
              </ul>
            </li>

            <li>
              <strong>Taxas e Pagamentos</strong>
              <ul>
                <li>
                  Cobraremos taxas de acordo com nosso modelo de preços, ao
                  qual você concorda em obedecer.
                </li>
                <li>
                  Você é responsável por fornecer informações de pagamento
                  precisas para receber os pagamentos das vendas.
                </li>
              </ul>
            </li>

            <li>
              <strong>Responsabilidades do Vendedor</strong>
              <ul>
                <li>
                  Você é responsável por garantir que os produtos estejam
                  em estoque e prontos para envio quando um pedido for
                  feito.
                </li>
                <li>
                  Você concorda em oferecer bom atendimento ao cliente e
                  responder prontamente às consultas dos compradores.
                </li>
              </ul>
            </li>

            <li>
              <strong>Envio e Entrega</strong>
              <ul>
                <li>
                  Você deve seguir nossas políticas de envio e garantir que
                  os produtos sejam entregues aos compradores dentro dos
                  prazos especificados.
                </li>
              </ul>
            </li>

            <li>
              <strong>Cancelamentos e Devoluções</strong>
              <ul>
                <li>
                  Você concorda em cumprir nossa política de cancelamento e
                  devolução, conforme estabelecido em nosso site.
                </li>
              </ul>
            </li>

            <li>
              <strong>Propriedade Intelectual</strong>
              <ul>
                <li>
                  Você garante que possui todos os direitos necessários
                  para listar e vender produtos em nossa plataforma.
                </li>
              </ul>
            </li>

            <li>
              <strong>Rescisão</strong>
              <ul>
                <li>
                  Nos reservamos o direito de encerrar sua conta de
                  vendedor a qualquer momento se você violar estes termos e
                  condições ou se sua conta estiver inativa por um período
                  prolongado.
                </li>
              </ul>
            </li>
          </ol>

          <p>
            Ao se tornar um vendedor em nossa loja, você concorda com estes
            termos e condições. Certifique-se de lê-los com atenção e
            cumprir todas as obrigações estabelecidas. Estes termos podem
            ser atualizados periodicamente, portanto, verifique-os
            regularmente para estar ciente de quaisquer alterações.
          </p>

          <p>Data da última atualização: 11 de setembro de 2023</p>
        </div>
      </main>
    </>
  )
}

export default SellerTermsAndConditions
