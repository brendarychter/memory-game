/* Transforming the response: duplicating the images,
  saving only the data the front needs, and adding 
  the isFlipped property
*/
export const transformData = (entries) => {
  const cards = [...entries, ...entries];
  return cards
    .map((entry, index) => {
      const { meta, fields } = entry;
      return {
        name: meta.name,
        uuid: meta.uuid,
        image: fields.image.url,
        id: index, 
        isFlipped: false
      };
    })
};

/* Api call. Handling different types of errors */
export const getCards = async () => {
  try {
    const CARDS_URL =
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';
    const response = await fetch(CARDS_URL, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const entries = data?.entries;
    if (entries && data.entries.length > 0) {
      return transformData(entries);
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    throw new Error(error);
  }
};
