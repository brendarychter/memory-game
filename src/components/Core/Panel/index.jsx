import PropTypes from 'prop-types';
const Panel = ( {user, status}) => {
  const {hits, misses} = status
  return (
    <div>
      <div>{user} a jugar!</div>
      <div>{hits}</div>
      <div>{misses}</div>
    </div>
  );
};

Panel.propTypes = {
  user: PropTypes.object,
  status: PropTypes.object
};
export default Panel;
