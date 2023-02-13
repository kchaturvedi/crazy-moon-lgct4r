import clsx from "clsx";

const Card = ({ route }) => (
  <div className={clsx(`flex flex-col bg-white border border-t-4 p-4 rounded-lg border-${route.color}`)}>
    <div className='flex justify-between'>
      <span className='text-gray-500'>{route.WAITING_TIME === 'Arriving' ? `Boarding at ${route.STATION}` : `${route.WAITING_TIME} to ${route.STATION}`}</span>
      <span className='text-gray-500'>
        {route.LINE} Line — {route.DIRECTION}
      </span>
    </div>
    <div className='flex justify-between'>
      <span className='text-lg font-semibold'>ETA {route.NEXT_ARR}</span>
      <span className='text-lg font-semibold'>Destination: {route.DESTINATION}</span>
    </div>
  </div>
)

export default Card;
