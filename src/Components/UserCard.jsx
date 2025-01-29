/* eslint-disable react/prop-types */
export const UserCard = ({ userData, onEdit, onDelete }) => {
    return (
      <li className="user-card">
        <h1>{userData.name}</h1>
        <div className="user-info user-highlight">
          <p><span>{userData.username}</span><br /><span>{userData.email}</span></p>
        </div>
        <div className="grid-two-cols">
          <p className="user-info">
            <span className="underline">Phone</span> <br />
            {userData.phone?.slice(-10)}
          </p>
          <p className="user-info">
            <span className="underline">Website</span> <br />
            {userData.website}
          </p>
        </div>
        <div className="grid-two-cols">
          <p className="user-info">
            <span className="underline">Company</span> <br />
            {userData.company.name}
          </p>
          <p className="user-info">
            <span className="underline">City</span> <br />
            {userData.address.city}
          </p>
        </div>
        <div className="user-actions">
          <button className="btn-edit" onClick={() => onEdit(userData)}>Edit</button>
          <button className="btn-delete" onClick={() => onDelete(userData.id)}>Delete</button>
        </div>
      </li>
    );
  };
