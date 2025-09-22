// import React, { useState } from "react";
// import axiosInstance from "../axiosConfig";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [role, setRole] = useState("candidate");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     skills: "",
//     companyName: "",
//     companyDetails: "",
//   });
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const payload = { ...formData, role };
//       const res = await axiosInstance.post("/api/auth/register", payload);
//       login(res.data.user, res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-primary">
//           Create Your Account
//         </h2>

//         <div className="flex mb-6 justify-center space-x-4">
//           <button
//             type="button"
//             className={`px-4 py-2 rounded ${
//               role === "candidate" ? "btn-primary" : "btn-neutral"
//             }`}
//             onClick={() => setRole("candidate")}
//           >
//             Candidate
//           </button>
//           <button
//             type="button"
//             className={`px-4 py-2 rounded ${
//               role === "employer" ? "btn-primary" : "btn-neutral"
//             }`}
//             onClick={() => setRole("employer")}
//           >
//             Employer
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//             required
//             minLength={6}
//           />

//           {role === "candidate" && (
//             <input
//               type="text"
//               name="skills"
//               placeholder="Skills (comma separated)"
//               value={formData.skills}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//             />
//           )}

//           {role === "employer" && (
//             <>
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//               />
//               <textarea
//                 name="companyDetails"
//                 placeholder="Company Details"
//                 value={formData.companyDetails}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//               />
//             </>
//           )}

//           <button type="submit" className="btn-primary w-full">
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { User, Briefcase, ArrowRight, Eye, EyeOff } from "lucide-react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("candidate");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    companyName: "",
    companyDetails: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { ...formData, role };
      const res = await axiosInstance.post("/api/auth/register", payload, {
        withCredentials: true,
      });
      login(res.data.user, res.data.token);

      // Redirect based on role
      if (role === "candidate") navigate("/jobs");
      else if (role === "employer") navigate("/employer/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="relative w-full max-w-md">
        {/* Main signup card */}
        <div className="bg-white backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="mx-auto w-16 h-16 bg-gradient-to-r rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundImage: "linear-gradient(135deg, #ff5339, #F4A261)" }}
            >
              {role === "candidate" ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Briefcase className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Sign up as a {role} to get started
            </p>
          </div>

          {/* Role selection */}
          <div className="flex mb-6 justify-center space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                role === "candidate" ? "btn-primary" : "btn-neutral"
              }`}
              onClick={() => setRole("candidate")}
            >
              Candidate
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                role === "employer" ? "btn-primary" : "btn-neutral"
              }`}
              onClick={() => setRole("employer")}
            >
              Employer
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {role === "candidate" && (
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma separated)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary"
              />
            )}

            {role === "employer" && (
              <>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary"
                />
                <textarea
                  name="companyDetails"
                  placeholder="Company Details"
                  value={formData.companyDetails}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-primary"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center py-3 px-4 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Register
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Already have account */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: "#ff5339" }}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{" "}
            <button className="hover:underline" style={{ color: "#ff5339" }}>
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="hover:underline" style={{ color: "#ff5339" }}>
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
