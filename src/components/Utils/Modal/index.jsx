import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Modal = ({ gameStatus, resetGame }) => {
  const navigate = useNavigate();
  const { hits, misses } = gameStatus;
  const USERNAME = localStorage.getItem('username');

  const exitGame = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full py-10 bg-black bg-opacity-50">
      <div className="w-full max-w-xl max-h-full overflow-y-auto text-center bg-white sm:rounded-2xl">
          <div className="m-8 max-w-[400px] mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 text-2xl font-extrabold">
                Congratulations {USERNAME}!!
              </h1>
              <p className="text-sm text-gray-600">
                You won the game with <span className="font-semibold">{hits} hits</span> and <span className="font-semibold"> {misses} missess</span>
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm ">
              <button
                onClick={() => resetGame()}
                className="w-1/3 p-3 font-semibold text-white bg-indigo-600 rounded-full shadow-sm enabled:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Play again
              </button>
              <button
                onClick={() => exitGame()}
                className="w-1/3 p-3 font-semibold bg-white border rounded-full shadow-sm enabled:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Exit game
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  gameStatus: PropTypes.object.isRequired,
  resetGame: PropTypes.func.isRequired
};
export default Modal;
