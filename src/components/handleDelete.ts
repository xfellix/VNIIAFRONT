import axios from 'axios';

const handleDelete = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/deleteDataById/${id}`);
    if (response.status === 200) {
      console.log(`Документ с ID ${id} успешно удален.`);
    } else {
      console.log('Произошла ошибка при удалении документа.');
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса на удаление документа:', error);
  }
};

export default handleDelete;