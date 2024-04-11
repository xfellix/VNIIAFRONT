import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataBase from '../interface/DataBase';
import './TableDoc.css';
import handleDelete from './handleDelete';
import fetchData from './fetchData';

function DataComponent() {
  const [data, setData] = useState<DataBase[]>([]);
  const [showSpecification, setShowSpecification] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    fetchData(setData);
  }, []);

  const toggleSpecification = (id: number) => {
    setShowSpecification(showSpecification === id ? null : id);
  };

  const handleEditFields = (id: number) => {
    setEditMode(id);
  };
  
  const handleSave = async (id: number) => {
    const itemToUpdate = data.find((item) => item.id === id);
    if (itemToUpdate) {
      try {
        const response = await axios.put(`http://localhost:3001/api/updateDataById/${id}`, updatedData);
        if (response.status === 200) {
          console.log(`Документ с ID ${id} успешно сохранен.`);
          setEditMode(null);
        } else {
          console.log('Произошла ошибка при сохранении документа.');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса на сохранение документа:', error);
      }
    } else {
      console.error('Объект для обновления не найден.');
    }
  };
  
  const [updatedData, setFormData] = useState<DataBase>({
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

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editMode !== null) {
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
          const newId = name === 'id' ? parseInt(value) : updatedData.id;
          const newInfonumber = name === 'infonumber' ? parseInt(value) : updatedData.infonumber;
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
    }
  };

	return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <table className='table-doc'>
            <caption>Документ {item.infonumber}</caption>
            <thead>
              <tr>
                <th className='table-cell'>Номер</th>
                <th className='table-cell'>Дата</th>
                <th className='table-cell'>Сумма</th>
                <th className='table-cell'>Примечание</th>
                <th className='table-cell'></th>
              </tr>
            </thead>
            <tbody>
                <td hidden className='table-cell'>{item.id}</td>
                <td className='table-cell'>{editMode === item.id ? (
                  <input type='number' name='infonumber' value={updatedData.infonumber} onChange={handleEditChange} />) : (item.infonumber)}</td>
                <td className='table-cell'>{editMode === item.id ? (
                  <input type='date' name='infodate' value={updatedData.infodate} onChange={handleEditChange} />) : (item.infodate)}</td>
                <td className='table-cell'>{editMode === item.id ? (
                  <input type='text' name='infosum' value={updatedData.infosum} onChange={handleEditChange} disabled/>) : (item.infosum)}</td>
                <td className='table-cell'>{editMode === item.id ? (
                  <input type='text' name='infonote' value={updatedData.infonote} onChange={handleEditChange} /> ) : (item.infonote)}</td>
                  <td className='table-cell'>
                    <button onClick={() => toggleSpecification(item.id)}>
                      {showSpecification === item.id ? 'Закрыть спецификацию' : 'Открыть спецификацию'}
                    </button>
                    {editMode !== item.id && (
                      <button onClick={() => handleEditFields(item.id)}>Редактировать</button>
                    )}
                    <button onClick={() => {handleDelete(item.id); window.location.reload()}}>Удалить</button>
                    </td>
                    </tbody>
                    <tr> 
                    {showSpecification === item.id && editMode === item.id && (
                      <>
                      <caption>Спецификация</caption>
                      <tr>
                        <th>Номер</th>
                          <td>{editMode === item.id ? (
                            <input type='number' name='infospecification.SpNumber' value={updatedData.infospecification.SpNumber} onChange={handleEditChange} />) : (item.infospecification.SpNumber)}
                          </td>
                      </tr>
                      <tr>
                        <th>Наименование</th>
                          <td>{editMode === item.id ? (
                            <input type='text' name='infospecification.SpName' value={updatedData.infospecification.SpName} onChange={handleEditChange} />) : (item.infospecification.SpName)}
                          </td>
                      </tr>
                      <tr>
                        <th>Сумма</th>
                          <td>{editMode === item.id ? (
                            <input type='number' name='infospecification.SpSumm' value={updatedData.infospecification.SpSumm} onChange={handleEditChange} />) : (item.infospecification.SpSumm)}
                          </td>
                      </tr>
                      <button onClick={() => {handleSave(item.id); window.location.reload()}}>Сохранить</button>
                      </>
                    )}
                  </tr>
          </table>
            {showSpecification === item.id && (
              <table className='table-doc'>
                <caption>Спецификация для Документа {item.infonumber}</caption>
                <thead>
                  <tr>
                    <th className='table-cell'>Номер</th>
                    <th className='table-cell'>Наименование</th>
                    <th className='table-cell'>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='table-cell'>{item.infospecification.SpNumber}</td>
                    <td className='table-cell'>{item.infospecification.SpName}</td>
                    <td className='table-cell'>{item.infospecification.SpSumm}</td>
                  </tr>
                </tbody>
              </table>
            )}            
          </div>
        ))}
      </div>
    )
  }
  

  export default DataComponent;