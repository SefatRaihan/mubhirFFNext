import React, { useState } from "react";
import mainLogo from "../../../assets/mainLogo.png";
import BG from "../../../assets/Vector.svg";
import FooterAr from "../../Shared/Footer/FooterAr";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePasswordAr = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // ✅ Phone number comes only from localStorage now
  const storedUser = JSON.parse(localStorage.getItem("signupData")) || {};
  const mobile_no =
    state?.phone ||
    storedUser.mobile_no ||
    storedUser.phone ||
    storedUser.phoneNumber ||
    "";

  const [formData, setFormData] = useState({
    enterNewPassword: "",
    reEnterNewPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordMatch: "",
    passwordStrength: "",
    apiError: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ passwordMatch: "", passwordStrength: "", apiError: "" });
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { passwordMatch: "", passwordStrength: "", apiError: "" };
    let valid = true;

    // Match check
    if (formData.enterNewPassword !== formData.reEnterNewPassword) {
      newErrors.passwordMatch = "Passwords do not match.";
      valid = false;
    }

    // Strength check
    if (!passwordRegex.test(formData.enterNewPassword)) {
      newErrors.passwordStrength =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    if (!mobile_no) {
      setErrors((prev) => ({
        ...prev,
        apiError: "Phone number not found. Please restart signup.",
      }));
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://sat.mubhir.ai/api/createNewPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_no,
            password: formData.enterNewPassword,
            password_confirmation: formData.reEnterNewPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          apiError: data?.message || "Something went wrong.",
        }));
      } else {
        // console.log("Password set successfully:", data);

        localStorage.clear();
        navigate("/ar-login");
        alert("Password set successfully! Please log in.");
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        apiError: "Network error. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white " dir="RTL">
      <div
        className="text-black m-4 rounded-2xl bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${BG})` }}
      >
        <div className="mx-auto px-4 max-w-[500px] w-full p-8">
          <div className="p-0 md:p-6 flex-1 flex flex-col">
            <div className="text-center mb-[40px]">
              <div className="flex items-center justify-center">
                <img
                  src={mainLogo}
                  alt="Mubhir Logo"
                  className="w-[100px] h-[100px]"
                />
                <h1 className="text-[66px] md:text-[88px] font-semibold text-[#28235B] tracking-[-0.07em]">
                  مبهر
                </h1>
              </div>
              <p className="text-[28px] md:text-4xl font-semibold tracking-[-1.5px] leading-[45px]">
                تم التحقق من حسابك <br /> يلا انطلق واستعد للقدرات بكل قوة
              </p>
              <p className="text-[16px] font-medium text-black tracking-[-0.5px] mt-[12px]">
                خطوتك الأخيرة، عين كلمة مرور وابدأ رحلتك الآن
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Enter New Password */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="enterNewPassword"
                  className="mb-1 font-medium text-black"
                >
                  أدخل كلمة مرور جديدة*
                </label>
                <input
                  type="password"
                  id="enterNewPassword"
                  name="enterNewPassword"
                  value={formData.enterNewPassword}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060]"
                />
                {errors.passwordStrength && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.passwordStrength}
                  </p>
                )}
              </div>

              {/* Re-enter New Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="reEnterNewPassword"
                  className="mb-1 font-medium text-black"
                >
                  أعد إدخال كلمة مرور جديدة*
                </label>
                <input
                  type="password"
                  id="reEnterNewPassword"
                  name="reEnterNewPassword"
                  value={formData.reEnterNewPassword}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7a2060]"
                />
                {errors.passwordMatch && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.passwordMatch}
                  </p>
                )}
              </div>

              <p className="text-base text-gray-500">
                يجب أن تتكون كلمة المرور من 8 أحرف على الأقل مع أحرف كبيرة
                وصغيرة وأرقام وأحرف خاصة
              </p>

              {errors.apiError && (
                <p className="text-red-500 text-sm">{errors.apiError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7A2060] text-white py-2 rounded-full font-semibold cursor-pointer disabled:opacity-70"
              >
                {loading
                  ? "Saving..."
                  : " تعيين كلمة مرور جديدة وتسجيل الدخول "}
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterAr />
    </div>
  );
};

export default CreatePasswordAr;
