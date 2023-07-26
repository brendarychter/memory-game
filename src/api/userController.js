// Call to service method.
// TODO: pass param to paginate service
export const getCards = async () => {
  try {
    const CARDS_URL =
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20';
    const response = await fetch(CARDS_URL, {mode:'cors'});
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const entries = data?.entries;
    if (entries && data.entries.length > 0) {
      return entries.map((entry) => {
        const { meta, fields } = entry;
        return {
          name: meta.name,
          uuid: meta.uuid,
          image: fields.image.url
        };
      });
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    throw new Error(error);
  }
};
