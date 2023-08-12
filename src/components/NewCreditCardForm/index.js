import { useState } from 'react'
import { toast } from 'react-toastify'

function NewCreditCardForm({
  addNewCreditCard,
  creditCardsInfo,
  setIsAddingNewCreditCard,
  setSelectedCardIndex,
  savedCreditCardsAmount
}) {
  const [ownerName, setOwnerName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [cvv, setCVV] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('BR')

  const handleAddNewCreditCard = async e => {
    e.preventDefault()

    const newCreditCardInfo = {
      ownerName,
      cardNumber,
      expirationDate,
      cvv,
      billingAddress,
      city,
      state,
      postalCode,
      country
    }
    await addNewCreditCard(newCreditCardInfo)

    creditCardsInfo.push(newCreditCardInfo)

    toast.success("Cartão adicionado com sucesso!")
    setIsAddingNewCreditCard(false)
    setSelectedCardIndex(savedCreditCardsAmount)
  }

  return (
    <div className="newCreditCardForm border rounded px-4 p-3 mb-4">
      <strong>Adicionar novo cartão de crédito</strong>
      <form onSubmit={handleAddNewCreditCard} className="mt-3">
        {/* Owner Name */}
        <label htmlFor="ownerName">
          Nome no cartão
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            placeholder="Nome no cartão"
            value={ownerName}
            onChange={e => setOwnerName(e.target.value)}
            required
          />
        </label>

        {/* Card Number */}
        <label htmlFor="cardNumber">
          Número do Cartão
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Número do Cartão"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            required
          />
        </label>

        {/* Expiration Date */}
        <label htmlFor="expirationDate">
          Data de Validade
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            placeholder="MM / AA"
            value={expirationDate}
            onChange={e => setExpirationDate(e.target.value)}
            required
          />
        </label>

        {/* CVV */}
        <label htmlFor="cvv">
          CVV
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="CVV"
            value={cvv}
            onChange={e => setCVV(e.target.value)}
            required
          />
        </label>

        {/* Billing Address */}
        <label htmlFor="billingAddress">
          Endereço de cobrança
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            placeholder="Endereço de cobrança"
            value={billingAddress}
            onChange={e => setBillingAddress(e.target.value)}
            required
          />
        </label>

        {/* City */}
        <label htmlFor="city">
          Cidade
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </label>

        {/* State */}
        <label htmlFor="state">
          Estado
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Estado"
            value={state}
            onChange={e => setState(e.target.value)}
            required
          />
        </label>

        {/* Postal Code */}
        <label
          htmlFor="postalCode"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}>
          Código Postal
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Código Postal"
            required
          />
        </label>

        {/* Country */}
        <label
          htmlFor="country"
          onChange={e => setCountry(e.target.value)}>
          País
          <select id="country" name="country" defaultValue="BR" required>
            <option value="AF">Afeganistão</option>
            <option value="ZA">África do Sul</option>
            <option value="AL">Albânia</option>
            <option value="DE">Alemanha</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguila</option>
            <option value="AG">Antígua e Barbuda</option>
            <option value="SA">Arábia Saudita</option>
            <option value="DZ">Argélia</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armênia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Austrália</option>
            <option value="AT">Áustria</option>
            <option value="AZ">Azerbaijão</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrein</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BE">Bélgica</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermudas</option>
            <option value="BY">Bielorrússia</option>
            <option value="BO">Bolívia</option>
            <option value="BA">Bósnia e Herzegovina</option>
            <option value="BW">Botsuana</option>
            <option value="BR">Brasil</option>
            <option value="BN">Brunei</option>
            <option value="BG">Bulgária</option>
            <option value="BF">Burquina Faso</option>
            <option value="BI">Burundi</option>
            <option value="BT">Butão</option>
            <option value="CV">Cabo Verde</option>
            <option value="KH">Camboja</option>
            <option value="CM">Camarões</option>
            <option value="CA">Canadá</option>
            <option value="QA">Catar</option>
            <option value="KZ">Cazaquistão</option>
            <option value="TD">Chade</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CY">Chipre</option>
            <option value="CO">Colômbia</option>
            <option value="KM">Comores</option>
            <option value="CG">Congo - Brazzaville</option>
            <option value="CD">Congo - Kinshasa</option>
            <option value="KP">Coreia do Norte</option>
            <option value="KR">Coreia do Sul</option>
            <option value="CI">Costa do Marfim</option>
            <option value="CR">Costa Rica</option>
            <option value="HR">Croácia</option>
            <option value="CU">Cuba</option>
            <option value="CW">Curaçao</option>
            <option value="DK">Dinamarca</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominicana</option>
            <option value="EG">Egito</option>
            <option value="SV">El Salvador</option>
            <option value="US">Estados Unidos</option>
            <option value="AE">Emirados Árabes Unidos</option>
            <option value="EC">Equador</option>
            <option value="ER">Eritreia</option>
            <option value="SK">Eslováquia</option>
            <option value="SI">Eslovênia</option>
            <option value="ES">Espanha</option>
            <option value="EE">Estônia</option>
            <option value="ET">Etiópia</option>
            <option value="FJ">Fiji</option>
            <option value="PH">Filipinas</option>
            <option value="FI">Finlândia</option>
            <option value="FR">França</option>
            <option value="GA">Gabão</option>
            <option value="GM">Gâmbia</option>
            <option value="GH">Gana</option>
            <option value="GE">Geórgia</option>
            <option value="GI">Gibraltar</option>
            <option value="GD">Granada</option>
            <option value="GR">Grécia</option>
            <option value="GL">Groenlândia</option>
            <option value="GP">Guadalupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GY">Guiana</option>
            <option value="GF">Guiana Francesa</option>
            <option value="GN">Guiné</option>
            <option value="GW">Guiné Bissau</option>
            <option value="GQ">Guiné Equatorial</option>
            <option value="HT">Haiti</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong, RAE da China</option>
            <option value="HU">Hungria</option>
            <option value="YE">Iêmen</option>
            <option value="BV">Ilha Bouvet</option>
            <option value="IM">Ilha de Man</option>
            <option value="NF">Ilha Norfolk</option>
            <option value="AX">Ilhas Aland</option>
            <option value="KY">Ilhas Cayman</option>
            <option value="CC">Ilhas Cocos (Keeling)</option>
            <option value="CK">Ilhas Cook</option>
            <option value="FO">Ilhas Faroe</option>
            <option value="HM">Ilhas Heard e McDonald</option>
            <option value="FK">Ilhas Malvinas</option>
            <option value="MP">Ilhas Marianas do Norte</option>
            <option value="MH">Ilhas Marshall</option>
            <option value="UM">Ilhas Menores Distantes dos EUA</option>
            <option value="PN">Ilhas Pitcairn</option>
            <option value="SB">Ilhas Salomão</option>
            <option value="TC">Ilhas Turks e Caicos</option>
            <option value="VG">Ilhas Virgens Britânicas</option>
            <option value="VI">Ilhas Virgens dos EUA</option>
            <option value="IN">Índia</option>
            <option value="ID">Indonésia</option>
            <option value="IR">Irã</option>
            <option value="IQ">Iraque</option>
            <option value="IE">Irlanda</option>
            <option value="IS">Islândia</option>
            <option value="IL">Israel</option>
            <option value="IT">Itália</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japão</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordânia</option>
            <option value="KW">Kuwait</option>
            <option value="LA">Laos</option>
            <option value="LS">Lesoto</option>
            <option value="LV">Letônia</option>
            <option value="LB">Líbano</option>
            <option value="LR">Libéria</option>
            <option value="LY">Líbia</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lituânia</option>
            <option value="LU">Luxemburgo</option>
            <option value="MO">Macau, RAE da China</option>
            <option value="MK">Macedônia do Norte</option>
            <option value="MG">Madagascar</option>
            <option value="MY">Malásia</option>
            <option value="MW">Malawi</option>
            <option value="MV">Maldivas</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MA">Marrocos</option>
            <option value="MQ">Martinica</option>
            <option value="MU">Maurício</option>
            <option value="MR">Mauritânia</option>
            <option value="YT">Mayotte</option>
            <option value="MX">México</option>
            <option value="MM">Mianmar (Birmânia)</option>
            <option value="FM">Micronésia</option>
            <option value="MZ">Moçambique</option>
            <option value="MD">Moldova</option>
            <option value="MC">Mônaco</option>
            <option value="MN">Mongólia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="NA">Namíbia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NI">Nicarágua</option>
            <option value="NE">Níger</option>
            <option value="NG">Nigéria</option>
            <option value="NU">Niue</option>
            <option value="NO">Noruega</option>
            <option value="NC">Nova Caledônia</option>
            <option value="NZ">Nova Zelândia</option>
            <option value="OM">Omã</option>
            <option value="NL">Países Baixos</option>
            <option value="PW">Palau</option>
            <option value="PA">Panamá</option>
            <option value="PG">Papua-Nova Guiné</option>
            <option value="PK">Paquistão</option>
            <option value="PY">Paraguai</option>
            <option value="PE">Peru</option>
            <option value="PF">Polinésia Francesa</option>
            <option value="PL">Polônia</option>
            <option value="PR">Porto Rico</option>
            <option value="PT">Portugal</option>
            <option value="KE">Quênia</option>
            <option value="KG">Quirguistão</option>
            <option value="KI">Quiribati</option>
            <option value="GB">Reino Unido</option>
            <option value="CF">República Centro-Africana</option>
            <option value="CZ">República Checa</option>
            <option value="DO">República Dominicana</option>
            <option value="RE">Reunião</option>
            <option value="RO">Romênia</option>
            <option value="RW">Ruanda</option>
            <option value="RU">Rússia</option>
            <option value="EH">Saara Ocidental</option>
            <option value="WS">Samoa</option>
            <option value="AS">Samoa Americana</option>
            <option value="SM">San Marino</option>
            <option value="SH">Santa Helena</option>
            <option value="LC">Santa Lúcia</option>
            <option value="BL">São Bartolomeu</option>
            <option value="KN">São Cristóvão e Nevis</option>
            <option value="MF">São Martinho</option>
            <option value="PM">São Pedro e Miquelão</option>
            <option value="ST">São Tomé e Príncipe</option>
            <option value="VC">São Vicente e Granadinas</option>
            <option value="SN">Senegal</option>
            <option value="SL">Serra Leoa</option>
            <option value="RS">Sérvia</option>
            <option value="SC">Seychelles</option>
            <option value="SY">Síria</option>
            <option value="SO">Somália</option>
            <option value="LK">Sri Lanka</option>
            <option value="SZ">Suazilândia</option>
            <option value="SD">Sudão</option>
            <option value="SS">Sudão do Sul</option>
            <option value="SE">Suécia</option>
            <option value="CH">Suíça</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard e Jan Mayen</option>
            <option value="TH">Tailândia</option>
            <option value="TW">Taiwan</option>
            <option value="TJ">Tajiquistão</option>
            <option value="TZ">Tanzânia</option>
            <option value="TF">Territórios Franceses do Sul</option>
            <option value="IO">
              Território Britânico do Oceano Índico
            </option>
            <option value="PS">Território Palestino</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Toquelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad e Tobago</option>
            <option value="TN">Tunísia</option>
            <option value="TM">Turcomenistão</option>
            <option value="TR">Turquia</option>
            <option value="TV">Tuvalu</option>
            <option value="UA">Ucrânia</option>
            <option value="UG">Uganda</option>
            <option value="UY">Uruguai</option>
            <option value="UZ">Uzbequistão</option>
            <option value="VU">Vanuatu</option>
            <option value="VA">Vaticano</option>
            <option value="VE">Venezuela</option>
            <option value="VN">Vietnã</option>
            <option value="WF">Wallis e Futuna</option>
            <option value="ZM">Zâmbia</option>
            <option value="ZW">Zimbábue</option>
          </select>
        </label>

        <button type="submit" className="btn-green mt-1">
          Adicionar cartão
        </button>
      </form>
    </div>
  )
}
export default NewCreditCardForm
