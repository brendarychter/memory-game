import { useNavigate } from "react-router-dom";

export default function Modal({username, hits, shuffleCards}) {
    const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full py-10 bg-black bg-opacity-50">
      <div className="w-full max-w-xl max-h-full overflow-y-auto bg-white sm:rounded-2xl">
        <div className="w-full">
          <div className="m-8 my-20 max-w-[400px] mx-auto">
            <div className="mb-8">
              <h1 className="mb-4 text-3xl font-extrabold">
                Felicitaciones {username}
              </h1>
              <p className="text-gray-600">
                Ganaste el juego con {hits} aciertos
              </p>
            </div>
            <div className="space-y-4">
              <button onClick={()=>shuffleCards()} className="w-full p-3 font-semibold text-white bg-black rounded-full">
                Volver a jugar
              </button>
              <button onClick={()=>navigate('/')} className="w-full p-3 font-semibold bg-white border rounded-full">
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
