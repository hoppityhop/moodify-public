export const fetchSynonyms = async (word) => {
    const options = {
      method: "GET",
      url: "https://api.api-ninjas.com/v1/thesaurus?word=" + word,
      headers: { "X-Api-Key": "D+jEBoAWGz2DQSKn8pkIqw==YXVt9q7oPlHWz9Pi" },
      contentType: "application/json"
    };
    const url = "https://api.api-ninjas.com/v1/thesaurus?word=" + word;
  
    try {
      const data = await fetch(url, options);
      const json = await data.json();
      return json;
    } catch (errors) {
      console.warn("ERRORS,", errors);
    }
  };
  