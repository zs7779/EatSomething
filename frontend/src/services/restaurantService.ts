import axios from 'axios';


const frontendURL = '/place';
const backendURL = '/api/restaurant';

const getAllRestaurants = async () => {
  const response = await axios.get(backendURL, {
    headers: {
        "Content-type": "application/json"
    }
  });
  return response.data;
}

const getRestaurant = async (id: string) => {
  const response = await axios.get(`${backendURL}/${id}`, {
      headers: {
          "Content-type": "application/json"
      }
    });
    return response.data;
}

const searchRestaurantByKeywords = async (location: string, keywords: string) => {
  const response = await axios.get(`${backendURL}/location/${location}/query/${keywords}`);
  return response.data;
}

const routeToRestaurant = (id?: string) => {
  return `${frontendURL}/${id}`;
}

export default { getAllRestaurants, getRestaurant, searchRestaurantByKeywords, routeToRestaurant };