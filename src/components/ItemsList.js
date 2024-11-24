const ItemsList = ({ data }) => {
  return (
    <div className="flex justify-between items-center bg-slate-800 rounded-lg shadow-md p-4 mb-4">
      <div className="w-9/12 text-gray-200">
        <h3 className="font-bold text-lg">{data.name}</h3>
      </div>
    </div>
  );
};

export default ItemsList;
