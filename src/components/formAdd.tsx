import axios from 'axios';
import React, { useState } from 'react';
import DataBase from '../interface/DataBase';

function FormAdd() {

    const [formData, setFormData] = useState<DataBase>({
        id: 1,
        infonumber: 0,
        infodate: '',
        infosum: 0,
        infonote: '',
        infospecification: {
          SpNumber: 0,
          SpName: '',
          SpSumm: 0,
        },
      });

    const handleFormADD = async (e:any) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`http://localhost:3001/api/addData/`, formData);
    
          if (response.status === 200) {
            console.log('Документ и спецификация успешно добавлены');
          } else {
            console.log('Произошла ошибка при добавлении документа и спецификации');
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса на добавление документа и спецификации:', error);
        }
      };

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
          if (name.startsWith('infospecification.')) {
            const specName = name.split('.')[1];
            setFormData((prevData) => ({
              ...prevData,
              infospecification: {
                ...prevData.infospecification,
                [specName]: value,
              },
            }));
        } else {
            if (name === 'infonumber' || name === 'id') {
              const newId = name === 'id' ? parseInt(value) : formData.id;
              const newInfonumber = name === 'infonumber' ? parseInt(value) : formData.infonumber;
              const newInfosum = (newId + newInfonumber) * 10 + Math.floor(Math.random() *10);
              setFormData((prevData) => ({
                ...prevData,
                id: newId,
                infonumber: newInfonumber,
                infosum: newInfosum,
                [name]: value,
              }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          }
        }
      };

      return (
		<div>
			<h2>Добавление документа и спецификации</h2>
      <form onSubmit={handleFormADD}>
        <label>Документ: Номер:</label>
        <input type='number' name='infonumber' value={formData.infonumber} onChange={handleInputChange} />
        <label>Дата:</label>
        <input type='date' name='infodate' value={formData.infodate} onChange={handleInputChange} />
        <label>Сумма:</label>
        <input type='text' name='infosum' value={formData.infosum} onChange={handleInputChange} disabled/>
        <label>Примечание:</label>
        <input type='text' name='infonote' value={formData.infonote} onChange={handleInputChange} />
        <tr></tr>
        <label>Спецификация: Номер:</label>
        <input type='number' name='infospecification.SpNumber' value={formData.infospecification.SpNumber} onChange={handleInputChange} />
        <label>Наименование:</label>
        <input type='text' name='infospecification.SpName' value={formData.infospecification.SpName} onChange={handleInputChange} />
        <label>Сумма:</label>
        <input type='number' name='infospecification.SpSumm' value={formData.infospecification.SpSumm} onChange={handleInputChange} />
        <tr></tr>
        <button type='submit' onClick={() => window.location.reload()}>Добавить документ и спецификацию</button>
      </form>
      </div>
      )

}

export default FormAdd;