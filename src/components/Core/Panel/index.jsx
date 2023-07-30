import PropTypes from 'prop-types';

const Panel = ({ status }) => {
  const { hits, misses } = status;
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Memory game
      </h2>
      <h2>Game status</h2>
      <div>{hits}</div>
      <div>{misses}</div>
    </div>
  );
};

Panel.propTypes = {
  status: PropTypes.object.isRequired
};
export default Panel;
