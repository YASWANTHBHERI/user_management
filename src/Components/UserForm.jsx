/* eslint-disable react/prop-types */
import { useState } from "react";

export const UserForm = ({ user, onSubmit, onCancel, users }) => {
  const [formData, setFormData] = useState(
    user || {
      id: users.length + 1,
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "" },
      address: { city: "" },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e, operationType) => {
    console.log(user);
    e.preventDefault();
    if (operationType === "edit") {
      onSubmit(user?.id || null, formData);
    } else {
      onSubmit(formData);
    }
    setFormData({
      id: users.length + 1,
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "" },
      address: { city: "" },
    });
    onCancel();
  };

  return (
    <div className="user-form-container">
      <div className="user-form-wrapper">
        <h2>{user ? "Edit User" : "Add User"}</h2>
        <form
          onSubmit={(e) => handleSubmit(e, user ? "edit" : "add")}
          className="user-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company.name"
            placeholder="Company Name"
            value={formData.company.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address.city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleChange}
            required
          />
          <button className="btn-update-add" type="submit">
            {user ? "Update" : "Add"}
          </button>
          <button className="btn-cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
