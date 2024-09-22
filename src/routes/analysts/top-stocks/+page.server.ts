export const load = async ({ locals, setHeaders }) => {
  const getTopAnalystStocks = async () => {
    const { apiURL, apiKey, user } = locals;

    const response = await fetch(apiURL + "/top-analysts-stocks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

    let output = await response.json();

    output = user?.tier !== "Pro" ? output?.reverse()?.slice(0, 6) : output;

    setHeaders({ "cache-control": "public, max-age=3000" });
    return output;
  };

  // Make sure to return a promise
  return {
    getTopAnalystStocks: await getTopAnalystStocks(),
  };
};