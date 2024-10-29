import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logo from './assets/image/brose-logo.png';
import './assets/style/main.css';
import './assets/style/forms.css';

const componentInfo = {
  1: { description: 'Componente 1', value: 100 },
  2: { description: 'Componente 2', value: 200 },
  3: { description: 'Componente 3', value: 300 }
};

const FormQRCode = () => {
  const [formData, setFormData] = useState({
    name: '',
    componente: '',
    ordem: '',
    mododeFalha: '',
    quantidade: '',
    descricao: '',
    dataHora: '',
    custo: 0
  });
  const [qrCodeData, setQrCodeData] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      let updatedData = { ...prevData, [name]: value };
      
      if (name === 'componente' && componentInfo[value]) {
        const selectedComponent = componentInfo[value];
        updatedData = {
          ...updatedData,
          descricao: selectedComponent.description,
          custo: selectedComponent.value * prevData.quantidade
        };
      }

      if (name === 'quantidade' && componentInfo[prevData.componente]) {
        const selectedComponent = componentInfo[prevData.componente];
        updatedData = {
          ...updatedData,
          quantidade: value,
          custo: selectedComponent.value * value
        };
      }
      
      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleString();
    const formDataString = JSON.stringify({ ...formData, dataHora: currentDate });
    setQrCodeData(formDataString);
  };

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Brose Logo" />
        </div>
        <div className="forms">
          <h1>Formulário QR Code</h1>
          <p>Formulário Brose</p>
          <form onSubmit={handleSubmit}>
            <label className='responsavel'>
              Responsável:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className='componente'>
              Componente:
              <input
                type="number"
                name="componente"
                min="1"
                max="3"
                value={formData.componente}
                onChange={handleChange}
              />
            </label>
            <label className='descricao'>
              Descrição:
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                readOnly
              />
            </label>
            <label className='ordem'>
              Ordem:
              <input
                type="text"
                name="ordem"
                value={formData.ordem}
                onChange={handleChange}
              />
            </label>
            <label>
              Modo De Falha:
              <input
                type="text"
                name="mododeFalha"
                value={formData.mododeFalha}
                onChange={handleChange}
              />
            </label>
            <label>
              Quantidade:
              <input
                type="number"
                name="quantidade"
                min="1"
                value={formData.quantidade}
                onChange={handleChange}
              />
            </label>
            <p><strong>Custo:</strong> R$ {formData.custo}</p> {/* Mostra o custo calculado */}
            <button type="submit">Gerar QR Code</button>
          </form>
        </div>

        {qrCodeData && (
          <div className='QRCode'>
            <h3>QR Code:</h3>
            <QRCodeSVG value={qrCodeData} />
          </div>
        )}
      </div>
    </>
  );
};

export default FormQRCode;
