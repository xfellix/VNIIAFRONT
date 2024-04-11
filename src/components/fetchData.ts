import DataBase from '../interface/DataBase';

const fetchData = async (setData: React.Dispatch<React.SetStateAction<DataBase[]>>) => {
  try {
    const response = await fetch(`http://localhost:3001/api/getDataFromDatabase`);
    if (!response.ok) {
      throw new Error();
    }
    const receivedData: DataBase[] = await response.json();
    setData(receivedData);
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;