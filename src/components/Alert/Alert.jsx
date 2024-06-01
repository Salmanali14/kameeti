import React from 'react';

const Alert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#373737] rounded-lg shadow-lg p-6 max-w-sm w-full">
        <p className="text-white text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white py-2 px-4 rounded mr-2 hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#a87f0b] text-white py-2 px-4 rounded hover:bg-[#a87f0b]-10 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
