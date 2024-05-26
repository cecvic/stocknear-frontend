import { userRegion, getCache, setCache } from '$lib/store';


const usRegion = ['cle1','iad1','pdx1','sfo1'];

let apiURL;

userRegion.subscribe(value => {

  if (usRegion.includes(value)) {
    apiURL = import.meta.env.VITE_USEAST_API_URL;
  } else {
    apiURL = import.meta.env.VITE_EU_API_URL;
  }
});


export const load = async () => {
  const getSPConstituentsStocks = async () => {
    let output;

    // Get cached data for the specific tickerID
    const cachedData = getCache('', 'getSPConstituentsStocks');
    if (cachedData) {
      output = cachedData;
    } else {
      
      const postData = {'filterList': 'sp500Constituent'}

      const response = await fetch(apiURL + '/exchange-constituents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      output = await response.json();

      setCache('', output, 'getSPConstituentsStocks');
    }

    return output;
  };

  // Make sure to return a promise
  return {
    getSPConstituentsStocks: await getSPConstituentsStocks()
  };
};