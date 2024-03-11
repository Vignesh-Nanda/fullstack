import { useState, useEffect } from "react";
import axios from "axios";

const Institutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [instituteId, setInstituteId] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [instituteDescription, setInstituteDescription] = useState("");
  const [instituteAddress, setInstituteAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    await searchInstitutions();
  };
  const handleCancelSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };
  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/get/institute",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setInstitutions(response.data);
    } catch (error) {
      console.error("Error fetching institutions:", error);
    }
  };

  const addInstitute = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/admin/add/institute",
        {
          instituteId,
          instituteName,
          instituteDescription,
          instituteAddress,
          mobile,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchInstitutions();
      setInstituteId("");
      setInstituteName("");
      setInstituteDescription("");
      setInstituteAddress("");
      setMobile("");
      setEmail("");
    } catch (error) {
      console.error("Error adding institute:", error);
    }
  };

  const deleteInstitute = async (instituteId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/delete/${instituteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchInstitutions();
    } catch (error) {
      console.error("Error deleting institute:", error);
    }
  };

  const editInstitute = (institute) => {
    setSelectedInstitute(institute);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/admin/put/${selectedInstitute.instituteId}`,
        selectedInstitute,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchInstitutions();
      setShowModal(false);
    } catch (error) {
      console.error("Error editing institute:", error);
    }
  };

  const searchInstitutions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/admin/get/${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFilteredInstitutions([response.data]);
    } catch (error) {
      console.error("Error searching institutions:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedInstitute((prevInstitute) => ({
      ...prevInstitute,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#C4CAD0",
        maxHeight:'auto',
        // height: "100vh",
        width: "90vw",
        margin:"0 auto"
      }}
    >
      <h1 style={{ marginTop: "30px", textAlign: "center" }}>
        <strong>Institutions</strong>
      </h1>
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Institute ID"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        {isSearching ? (
          <>
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Search
            </button>
            <button
              onClick={handleCancelSearch}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        )}
      </div>
      {isSearching ? (
        filteredInstitutions.map((institute) => (
          <div
            key={institute.instituteId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              backgroundColor: "#fff",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              
            }}
          >
            <h4>
              <strong>Institute ID: </strong>
              {institute.instituteId}
            </h4>
            <h3>
              <strong>Name: </strong>
              {institute.instituteName}
            </h3>
            <p>
              <strong>Description: </strong>
              {institute.instituteDescription}
            </p>
            <p>
              <strong>Address: </strong>
              {institute.instituteAddress}
            </p>
            <p>
              <strong>Mobile: </strong>
              {institute.mobile}
            </p>
            <p>
              <strong>Email: </strong>
              {institute.email}
            </p>
          </div>
        ))
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <input
              type="number"
              value={instituteId}
              placeholder="Institute ID"
              onChange={(e) => setInstituteId(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={instituteName}
              placeholder="Institute Name"
              onChange={(e) => setInstituteName(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={instituteDescription}
              placeholder="Institute Description"
              onChange={(e) => setInstituteDescription(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={instituteAddress}
              placeholder="Institute Address"
              onChange={(e) => setInstituteAddress(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={mobile}
              placeholder="Mobile"
              onChange={(e) => setMobile(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                margin: "5px",
              }}
            />
            <button
              onClick={addInstitute}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 15px",
                cursor: "pointer",
                margin: "5px",
              }}
            >
              Add Institute
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {institutions.map((institute) => (
              <div
                key={institute.instituteId}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  width: "70vw",
                  margin: "10px",
                }}
              >
                <h4>
                  <strong>Institute ID: </strong>
                  {institute.instituteId}
                </h4>
                <h3 style={{ marginTop: "0", marginBottom: "10px" }}>
                  <strong>Name: </strong>
                  {institute.instituteName}
                </h3>
                <p>
                  <strong>Description: </strong>
                  {institute.instituteDescription}
                </p>
                <p>
                  <strong>Address: </strong>
                  {institute.instituteAddress}
                </p>
                <p>
                  <strong>Mobile: </strong>
                  {institute.mobile}
                </p>
                <p>
                  <strong>Email: </strong>
                  {institute.email}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={() => editInstitute(institute)}
                    style={{
                      backgroundColor: "#ffc107",
                      color: "#000",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteInstitute(institute.instituteId)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 15px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
              padding: "20px",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0 }}>Edit Institute</h2>
              <span
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={handleCancelEdit}
              >
                &times;
              </span>
            </div>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Institute ID:</strong>
              <input
                type="number"
                name="instituteId"
                value={selectedInstitute.instituteId}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Institute Name:</strong>
              <input
                type="text"
                name="instituteName"
                value={selectedInstitute.instituteName}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Description:</strong>
              <input
                type="text"
                name="instituteDescription"
                value={selectedInstitute.instituteDescription}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Address:</strong>
              <input
                type="text"
                name="instituteAddress"
                value={selectedInstitute.instituteAddress}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Mobile:</strong>
              <input
                type="text"
                name="mobile"
                value={selectedInstitute.mobile}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              <strong>Email:</strong>
              <input
                type="text"
                name="email"
                value={selectedInstitute.email}
                onChange={handleChange}
                style={{
                  marginLeft: "10px",
                  width: "100%",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleCancelEdit}
                style={{
                  marginRight: "10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Institutions;