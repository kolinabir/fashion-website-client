const ConfirmServices = ({ booking, handleBookingConfirm }) => {
  // console.log(booking);
  const {
    _id,
    district,
    thana,
    address,
    phoneNumber,
    price,
    status,
    email,
    customerName,
  } = booking;

  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    if (dropdown) {
      if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
      } else {
        dropdown.style.display = "block";
      }
    }
  }
  return (
    <tr>
      <td></td>

      <td>{customerName}</td>
      {booking.products.map((product, index) => (
        <td key={index}>{product.productId}</td>
      ))}

      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{district}</td>
      <td>{thana}</td>
      <td>{address}</td>
      <td>৳{price}</td>
      <td className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            id={`statusDropdown_${_id}`}
            onClick={() => toggleDropdown(`statusDropdownOptions_${_id}`)}
          >
            {status === "pending"
              ? "Pending"
              : status === "processing"
              ? "processing"
              : "delivered"}
          </button>
        </div>
        <div
          id={`statusDropdownOptions_${_id}`}
          className="dropdown-options hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`statusDropdown_${_id}`}
          tabIndex="-1"
        >
          <button
            onClick={() => handleBookingConfirm(_id, "pending")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
          >
            Pending
          </button>
          <button
            onClick={() => handleBookingConfirm(_id, "processing")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
          >
            In Progress
          </button>
          <button
            onClick={() => handleBookingConfirm(_id, "delivered")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
          >
            Complete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ConfirmServices;
