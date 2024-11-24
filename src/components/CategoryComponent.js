import { useEffect, useState } from "react";
import ItemsList from "./ItemsList";

const CategoryComponent = ({ acc, selectedEpisode }) => {
  const [showItems, setShowItems] = useState(false);
  const [items, setItems] = useState([]);
  const category = acc?.toLowerCase();

  const getAllItems = (acc) => {
    Promise.all(
      selectedEpisode[category]?.map((url) => fetch(url).then((r) => r.json()))
    )
      .then((res) => {
        setItems(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (showItems) {
      getAllItems(selectedEpisode[category]);
    }
  }, [showItems]);

  return (
    acc && (
      <div className="mb-4">
        {/* Accordion Header */}
        <div
          className="flex justify-between items-center bg-slate-700 rounded-lg shadow-md p-4 hover:bg-slate-600"
          onClick={() => {
            setShowItems((prev) => !prev);
          }}
        >
          <span className="font-bold text-lg text-white">
            {acc}: ({selectedEpisode[category]?.length || 0})
          </span>
          <span className="text-gray-300">{showItems ? "🔼" : "🔽"}</span>
        </div>

        {/* Items List */}
        {showItems && (
          <div className="mt-2 p-4 bg-slate-800 rounded-lg shadow-inner max-h-60 overflow-y-auto">
            {items.length > 0 ? (
              items.map((item, index) => (
                <ItemsList key={`${acc}-${index}`} data={item} />
              ))
            ) : (
              <p className="text-gray-400">No items available.</p>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default CategoryComponent;
