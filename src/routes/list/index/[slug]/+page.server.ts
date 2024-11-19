export const load = async ({ locals, params }) => {
  const getParams = async () => {
    return params.slug;
  };
  const getIndexCategory = async () => {
    const { apiKey, apiURL } = locals;
    const postData = { filterList: params.slug };

    const response = await fetch(apiURL + "/list-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(postData),
    });

    const output = await response.json();

    return output;
  };

  // Make sure to return a promise
  return {
    getIndexCategory: await getIndexCategory(),
    getParams: await getParams(),
  };
};