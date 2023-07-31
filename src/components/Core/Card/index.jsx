import PropTypes from 'prop-types';

const Card = ({ card, selectCard }) => {
  const { image, id, name, isFlipped } = card;

  // When user clicks on a card, it executes the function sent by the parent
  const handleChange = () => selectCard(card);

  return (
    <div className={`flex relative ${isFlipped && `[transform:rotateY(180deg)]`} transition-all duration-500[transform-style:preserve-3d]`}>
      {isFlipped ? (
        <img
          className="object-cover border-2 border-solid rounded-md w-14 h-14 md:w-24 md:h-24 border-violet-500"
          key={id}
          src={image}
          alt={name}
          disabled={isFlipped}
          loading="lazy"
        />
      ) : (
        <div
          className="border-2 border-white border-solid rounded-md cursor-pointer w-14 h-14 md:w-24 md:h-24 bg-gradient-to-r from-indigo-500 to-violet-500"
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
