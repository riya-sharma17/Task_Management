import { useState } from "react";
import { useFormik } from "formik";
import EmailInputField from "../components/inputs/EmailInputField";
import PasswordInputField from "../components/inputs/PasswordInputField";
import AuthButton from "../components/buttons/AuthButton";
import { loginSchema } from "../utils/validationSchema";
import { useLogin } from "../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { mutate: login } = useLogin();
  const [loading, setLoading] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      setLoading(true);

      login(values, {
        onSuccess: () => {
          setLoading(false);
          actions.resetForm();
          navigate("/dashboard");
        },
        onError: () => {
          setLoading(false);
        }
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4 sm:px-6">
      <div
        className="
      w-full
      max-w-sm sm:max-w-md
      rounded-2xl
      bg-white
      p-6 sm:p-8
      shadow-xl
      border border-gray-100
    "
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1
            className="
          text-2xl sm:text-3xl
          font-bold
          text-gray-900
          tracking-tight
        "
          >
            Welcome Back
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={loginForm.handleSubmit}
          className="space-y-4 sm:space-y-5"
        >
          {/* Email */}
          <EmailInputField
            required
            label="Email"
            name="email"
            value={loginForm.values.email}
            placeHolder="you@example.com"
            changeHandler={loginForm.handleChange}
            blurHandler={loginForm.handleBlur}
            touched={loginForm.touched.email}
            error={loginForm.errors.email}
            errormessage={loginForm.errors.email}
          />

          {/* Password */}
          <PasswordInputField
            required
            label="Password"
            name="password"
            value={loginForm.values.password}
            placeHolder="••••••••"
            changeHandler={loginForm.handleChange}
            blurHandler={loginForm.handleBlur}
            touched={loginForm.touched.password}
            error={loginForm.errors.password}
            errormessage={loginForm.errors.password}
          />

          {/* Button */}
          <div className="pt-2">
            <AuthButton
              text="Sign In"
              clickHandler={loginForm.handleSubmit}
              disabled={!loginForm.isValid || loading}
              isLoading={loading}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-gray-500">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="cursor-pointer font-medium text-blue-600 hover:text-blue-700"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
