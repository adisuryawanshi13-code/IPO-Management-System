import React, { useState } from "react";
import "../Style/HomePageStyle.css";
import "../Style/AnimationStyle.css";

// ===============================
// SUCCESS ANIMATION COMPONENT
// ===============================

const SuccessAnimation = () => (
  <div className="success-overlay">
    <div className="success-checkmark">
      <div className="check-icon">
        <span className="icon-line line-tip"></span>
        <span className="icon-line line-long"></span>
        <div className="icon-circle"></div>
        <div className="icon-fix"></div>
      </div>
      <h3 className="success-message-text">Request Submitted!</h3>
    </div>
  </div>
);

// ===============================
// STATIC TABLE DATA (TEMP)
// ===============================

const statusColors = {
  Pending: { background: "#fffbe0", color: "#8a6500", border: "#fbe98a" },
  Approved: { background: "#e0fff1", color: "#00654e", border: "#8afbe9" },
  Live: { background: "#e0f1ff", color: "#004a8a", border: "#8ae9fb" },
};

const IPOApplications = [
  { company: "Acme Corp", status: "Pending", date: "2023-08-15" },
  { company: "Beta Industries", status: "Approved", date: "2023-07-20" },
  { company: "Gamma Solutions", status: "Live", date: "2023-06-05" },
];

// ===============================
// MAIN HOME PAGE
// ===============================

const HomePage = () => {

  const [formData, setFormData] = useState({
    companyName: "",
    companySymbol: "",
    issueSize: "",
    pricePerShare: "",
    totalShares: "",
    document: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // INPUT CHANGE HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto calculate total shares
    if (name === "issueSize" || name === "pricePerShare") {
      const size =
        parseFloat(name === "issueSize" ? value : formData.issueSize) || 0;
      const price =
        parseFloat(name === "pricePerShare" ? value : formData.pricePerShare) ||
        0;

      const shares = price > 0 ? (size / price).toFixed(0) : "0";

      setFormData((prev) => ({ ...prev, totalShares: shares }));
    }
  };

  // FILE UPLOAD
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, document: file }));
  };

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage("");

    try {
      console.log("IPO Form Submitted:", formData);

      // Simulate backend API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowSuccessAnimation(true);

      setTimeout(() => {
        setShowSuccessAnimation(false);
        setMessage("Application submitted successfully!");
      }, 1800);

      // Reset form
      setFormData({
        companyName: "",
        companySymbol: "",
        issueSize: "",
        pricePerShare: "",
        totalShares: "",
        document: null,
      });

      document.getElementById("file-upload-input").value = "";

    } catch (error) {
      console.error(error);
      setMessage("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="main-app-container">

      {showSuccessAnimation && <SuccessAnimation />}

      {/* HEADER */}
      <header className="header">

        <div className="logo-section">
          <span className="app-title">IPO Tracker</span>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>

      </header>

      {/* MAIN CONTENT */}
      <main className="main-content-area">

        {/* LEFT FORM PANEL */}
        <section className="form-card">

          <h2 className="section-title">Apply for New IPO</h2>

          <form onSubmit={handleSubmit} className="ipo-form">

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="input-field"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="companySymbol"
              placeholder="Company Symbol"
              className="input-field"
              value={formData.companySymbol}
              onChange={handleInputChange}
              required
            />

            <div className="input-group-row">

              <input
                type="number"
                name="issueSize"
                placeholder="Issue Size ($)"
                className="input-field"
                value={formData.issueSize}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                name="pricePerShare"
                placeholder="Price per Share ($)"
                className="input-field"
                value={formData.pricePerShare}
                onChange={handleInputChange}
                required
              />

            </div>

            <input
              type="text"
              name="totalShares"
              placeholder="Total Shares"
              className="input-field"
              value={formData.totalShares}
              readOnly
            />

            <input
              type="file"
              id="file-upload-input"
              onChange={handleFileChange}
            />

            {message && (
              <p className={message.includes("success") ? "main-success" : "main-error"}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit IPO"}
            </button>

          </form>

        </section>

        {/* RIGHT TABLE PANEL */}
        <section className="table-card">

          <h2 className="section-title">My IPO Applications</h2>

          <div className="applications-table">

            {IPOApplications.map((app, index) => (
              <div key={index} className="table-row">

                <div>{app.company}</div>

                <div>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: statusColors[app.status].background,
                      color: statusColors[app.status].color,
                      border: `1px solid ${statusColors[app.status].border}`,
                    }}
                  >
                    {app.status}
                  </span>
                </div>

                <div>{app.date}</div>

              </div>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
};

export default HomePage;

// import React, { useState } from "react";
// import "../Style/HomePageStyle.css";
// import "../Style/AnimationStyle.css";

// // Static IPO Data (later connect DB)
// const IPOApplications = [
//   { company: "Acme Corp", status: "Pending", date: "2023-08-15", price: 20 },
//   { company: "Beta Industries", status: "Approved", date: "2023-07-20", price: 35 },
//   { company: "Gamma Solutions", status: "Live", date: "2023-06-05", price: 42 },
// ];

// const HomePage = () => {

//   const [search, setSearch] = useState("");
//   const [showBell, setShowBell] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [selectedIPO, setSelectedIPO] = useState(null);

//   // LOGOUT
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   // SEARCH FILTER
//   const filteredIPO = IPOApplications.filter(item =>
//     item.company.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="main-app-container">

//       {/* HEADER */}
//       <header className="header">

//         <div className="logo-section">
//           <span className="app-title">IPO Tracker</span>
//         </div>

//         <div className="icon-group">

//           <input
//             className="search-input"
//             placeholder="Search IPO..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <span className="icon-btn" onClick={() => setShowBell(!showBell)}>🔔</span>
//           <span className="icon-btn" onClick={() => setShowProfile(!showProfile)}>👤</span>

//           <button className="btn-logout" onClick={handleLogout}>
//             Logout
//           </button>

//         </div>

//       </header>

//       {/* NOTIFICATION */}
//       {showBell && (
//         <div className="dropdown-box">
//           <p>New IPO Added</p>
//           <p>IPO Approved</p>
//           <p>Market Update</p>
//         </div>
//       )}

//       {/* PROFILE */}
//       {showProfile && (
//         <div className="dropdown-box">
//           <p>My Profile</p>
//           <p onClick={handleLogout}>Logout</p>
//         </div>
//       )}

//       {/* MAIN CONTENT */}
//       <main className="main-content-area">

//         {/* RIGHT TABLE PANEL */}
//         <section className="table-card">

//           <h2 className="section-title">My IPO Applications</h2>

//           <div className="applications-table">

//             <div className="table-header">
//               <div>Company Name</div>
//               <div>Status</div>
//               <div>Date</div>
//             </div>

//             {filteredIPO.map((app, index) => (

//               <div
//                 key={index}
//                 className="table-row clickable-row"
//                 onClick={() => setSelectedIPO(app)}
//               >

//                 <div>{app.company}</div>
//                 <div>{app.status}</div>
//                 <div>{app.date}</div>

//               </div>

//             ))}

//           </div>

//         </section>

//       </main>

//       {/* MODAL POPUP */}
//       {selectedIPO && (

//         <div className="modal-bg" onClick={() => setSelectedIPO(null)}>

//           <div className="modal-box" onClick={(e) => e.stopPropagation()}>

//             <h3>{selectedIPO.company}</h3>
//             <p>Status: {selectedIPO.status}</p>
//             <p>IPO Price: ${selectedIPO.price}</p>
//             <p>Date: {selectedIPO.date}</p>

//             <button onClick={() => setSelectedIPO(null)}>Close</button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default HomePage;
