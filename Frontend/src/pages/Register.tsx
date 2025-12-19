import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailInputField from "../components/inputs/EmailInputField";
import PasswordInputField from "../components/inputs/PasswordInputField";
import { useRegister } from "../hooks/useRegister";
import AuthButton from "../components/buttons/AuthButton";
import { Link } from "react-router-dom";
import TextInputField from "../components/inputs/TextInputField";

const RegisterSchema = Yup.object({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),

    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
});

const registerInitialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Register = () => {
    const [loading, setLoading] = useState(false);
    const { mutateAsync } = useRegister();

    const registerForm = useFormik({
        initialValues: registerInitialValues,
        validationSchema: RegisterSchema,
        onSubmit: async (values, actions) => {
            try {
                setLoading(true);

                await mutateAsync({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });

                actions.resetForm();
            } catch (error) {
                console.error("Register error", error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4 sm:px-6">
            <div className="w-full max-w-sm sm:max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">
                        Register to get started
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={registerForm.handleSubmit}
                    className="space-y-4 sm:space-y-5"
                >
                    {/* Name */}
                    <TextInputField
                        required
                        label="Full Name"
                        name="name"
                        value={registerForm.values.name}
                        placeHolder="Enter your name"
                        changeHandler={registerForm.handleChange}
                        blurHandler={registerForm.handleBlur}
                        touched={registerForm.touched.name}
                        error={registerForm.errors.name}
                        errormessage={registerForm.errors.name}
                    />

                    {/* Email */}
                    <EmailInputField
                        required
                        label="Email"
                        name="email"
                        value={registerForm.values.email}
                        placeHolder="you@example.com"
                        changeHandler={registerForm.handleChange}
                        blurHandler={registerForm.handleBlur}
                        touched={registerForm.touched.email}
                        error={registerForm.errors.email}
                        errormessage={registerForm.errors.email}
                    />

                    {/* Password */}
                    <PasswordInputField
                        required
                        label="Password"
                        name="password"
                        value={registerForm.values.password}
                        placeHolder="••••••••"
                        changeHandler={registerForm.handleChange}
                        blurHandler={registerForm.handleBlur}
                        touched={registerForm.touched.password}
                        error={registerForm.errors.password}
                        errormessage={registerForm.errors.password}
                    />

                    {/* Confirm Password */}
                    <PasswordInputField
                        required
                        label="Confirm Password"
                        name="confirmPassword"
                        value={registerForm.values.confirmPassword}
                        placeHolder="••••••••"
                        changeHandler={registerForm.handleChange}
                        blurHandler={registerForm.handleBlur}
                        touched={registerForm.touched.confirmPassword}
                        error={registerForm.errors.confirmPassword}
                        errormessage={registerForm.errors.confirmPassword}
                    />

                    {/* Button */}
                    <div className="pt-2">
                        <AuthButton
                            text="Create Account"
                            clickHandler={registerForm.handleSubmit}
                            disabled={!registerForm.isValid || loading}
                            isLoading={loading}
                        />
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-gray-500">
                    Already have an account?{" "}
                    <Link to={"/"} className="cursor-pointer font-medium text-blue-600 hover:text-blue-700">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
