import PropTypes from 'prop-types';

const Card = ({ card, selectCard }) => {
  const { image, id, name, isFlipped } = card;
  //Evitar que clickee sobre si mismo
  // When user clicks on a card, it executes the function sent by the parent
  const handleChange = () => selectCard(card);

  return (
    <div className={`relative ${isFlipped && `[transform:rotateY(180deg)]`} transition-all duration-500[transform-style:preserve-3d]`}>
      {isFlipped ? (
        <img
          className="object-cover w-16 h-16 border-2 border-solid rounded-md md:w-24 md:h-24 border-violet-500"
          key={id}
          src={image}
          alt={name}
          disabled={isFlipped}
        />
      ) : (
        <div
          className="w-16 h-16 border-2 border-white border-solid rounded-md cursor-pointer md:w-24 md:h-24 bg-gradient-to-r from-indigo-500 to-violet-500"
          onClick={handleChange}
        ></div>
      )}
    </div>
  );
}
Card.propTypes = {
    card: PropTypes.object.isRequired,
    selectCard: PropTypes.func.isRequired
}
export default Card;
