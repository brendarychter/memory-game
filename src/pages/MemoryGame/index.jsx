import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function MemoryGame() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username')

  useEffect(() => {
    if(localStorage.getItem('username') == null){
      // add loading
      navigate(`/`);
    }
  })

  return (
    <>
      <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Memory game
        </h2>
        <h3>{username} a jugar!</h3>
      </div>
    </>
  );
}
