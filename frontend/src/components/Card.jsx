// Card.js
const Card = ({ title, children }) => {
    return (
      <div className="flex items-center justify-center mb-8 w-full md:w-1/2">
        <div className="rounded-lg  border border-gray-300 bg-white p-5 shadow-md dark:bg-gray-800 w-full">
          <h3 className="mb-4 text-lg font-semibold">{title}</h3>
          {children}
        </div>
      </div>
    );
  };
  
  export default Card;
  