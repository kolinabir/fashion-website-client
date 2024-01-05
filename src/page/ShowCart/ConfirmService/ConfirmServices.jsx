const ConfirmServices = ({ booking, handleBookingConfirm }) => {
  console.log(booking);
  const { _id, serviceName, price, image, status, email } = booking;

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
  <td>
    <label>
      <input type="checkbox" className="checkbox" />
    </label>
  </td>
  <td>
    <div className="avatar">
      <div className="rounded w-24 h-24">
        {image && <img src={image} alt="Avatar Tailwind CSS Component" />}
      </div>
    </div>
  </td>
  <td>{serviceName}</td>
  <td>{email}</td>
  <td>${price}</td>
  <td className="relative inline-block text-left">
    <div>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        id={`statusDropdown_${_id}`}
        onClick={() => toggleDropdown(`statusDropdownOptions_${_id}`)}
      >
        {status === "pending" ? "Pending" : status === "in-progress" ? "In Progress" : "Complete"}
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
        onClick={() => handleBookingConfirm(_id, "in-progress")}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
      >
        In Progress
      </button>
      <button
        onClick={() => handleBookingConfirm(_id, "complete")}
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
