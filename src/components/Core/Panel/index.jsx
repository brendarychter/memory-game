import PropTypes from 'prop-types';

const Panel = ({ status }) => {
  const { hits, misses } = status;
  return (
    <div className="flex flex-col my-6 space-y-4 text-center m-x-8">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Memory game
      </h2>
      <h3 className="font-medium tracking-tight text-white">
        Hits: {hits} | Misses: {misses}
      </h3>
    </div>
  );
};

Panel.propTypes = {
  status: PropTypes.object.isRequired
};
export default Panel;
