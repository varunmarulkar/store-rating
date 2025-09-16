import React from "react";

const StoreTable = ({ stores }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {store.name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {store.email}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {store.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;