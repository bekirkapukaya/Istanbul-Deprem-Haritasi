import axios from 'axios';
const API_ENDPOINT =
  'https://data.ibb.gov.tr/api/3/action/datastore_search?resource_id=32904f60-8091-4dc3-b527-351dca6c1c22';

export const getPointsApi = async () =>
  await axios.get(API_ENDPOINT, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
