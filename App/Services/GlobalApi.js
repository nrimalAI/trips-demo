const BASE_URL= 'http://192.168.1.158:3000/api/bard'
const getBardApi = async (userMsg) => {
  try {
    const response = await fetch(`${BASE_URL}?ques=${userMsg}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default {
  getBardApi,
};
