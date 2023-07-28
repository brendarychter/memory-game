// eslint-disable-next-line react/prop-types
export default function Card(card) {
    console.log(card)
  return (
    <div key={card.id} className=" bg-blue-500 p-4 " >
      <img className="img h-10 w-10" src={card.image} />
    </div>
  );
}
