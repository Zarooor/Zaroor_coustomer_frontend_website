import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./SignUp.css";
import { useEffect, useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;
interface PasswordInputState {
  isVisible: boolean;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    document.title = "Zaroor | Sign In";
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
        <h3>Sign In </h3>
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
        <button className="btn btn-primary" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
