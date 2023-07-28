import PropTypes from 'prop-types';
const Panel = ({ name, hits, misses }) => {
  console.log(hits)
  return (
    <div>
      <div>{name} a jugar!</div>
      <div>{hits}</div>
      <div>{misses}</div>
      <div>Nuevo juego</div>
    </div>
  );
};

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  hits: PropTypes.number.isRequired,
  misses: PropTypes.number.isRequired
};
export default Panel;
