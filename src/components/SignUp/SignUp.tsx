import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
import { useEffect, useState } from "react";

const schema = z
  .object({
    name: z.string({ required_error: "Name field is required" }),
    email: z.string().email({ message: "Enter a valid email" }),
    pincode: z.string().length(6, { message: "Enter a valid Pincode" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .length(10, { message: "Enter a valid Phone Number" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;
interface PasswordInputState {
  isVisible: boolean;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    document.title = "Zaroor | Register";
  });

  const onSubmit = (data: FieldValues) => console.log(data);

  const [visibilityState, setVisibilityState] = useState<PasswordInputState>({
    isVisible: false,
  });

  const handleToggleVisibility = (): void => {
    setVisibilityState({
      ...visibilityState,
      isVisible: !visibilityState.isVisible,
    });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Sign Up </h3>
        <div className="form-floating mb-3">
          <input
            {...register("name")}
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Jack"
            required
          />
          {errors.name && "required" && (
            <p className="text-danger">{errors.name.message}</p>
          )}
          <label htmlFor="floatingName">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            {...register("email")}
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            required
          />
          {errors.email && "required" && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            {...register("pincode")}
            type="number"
            className="form-control no-spin"
            id="floatingPincode"
            placeholder="562157"
          />
          {errors.pincode && "required" && (
            <p className="text-danger">{errors.pincode.message}</p>
          )}
          <label htmlFor="floatingPincode">Pincode</label>
        </div>
        <div className="form-floating mb-3">
          <input
            {...register("phoneNumber")}
            type="number"
            className="form-control no-spin"
            id="floatingPhone"
            placeholder=""
            required
          />
          {errors.phoneNumber && "required" && (
            <p className="text-danger">{errors.phoneNumber.message}</p>
          )}
          <label htmlFor="floatingPhone">Phone Number</label>
        </div>
        <div className="form-floating password-container">
          <input
            {...register("password")}
            type={visibilityState.isVisible ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <span
            className="password-toggle-icon"
            onClick={handleToggleVisibility}
          >
            <FontAwesomeIcon
              icon={visibilityState.isVisible ? faEyeSlash : faEye}
            />
          </span>
          {errors.password && "required" && (
            <p className="text-danger">{errors.password.message}</p>
          )}
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            {...register("confirmPassword")}
            type="password"
            className="form-control"
            id="floatingConfirPmassword"
            placeholder="Password"
            required
          />
          {errors.confirmPassword && "required" && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
          <label htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
