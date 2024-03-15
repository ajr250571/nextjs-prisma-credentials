"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
    // console.log(res);
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-2/3 md:w-1/3">
        <h1 className="text text-primary justify-center font-bold text-4xl flex items-center gap-2 mb-2">
          Login
        </h1>
        <div>
          <label className="label-text">Email</label>
          <input
            type="text"
            className="input input-bordered block w-full p-2.5 "
            placeholder="user@email.com"
            {...register("email", {
              required: { value: true, message: "Email is required." },
            })}
          />
        </div>
        {errors.email && (
          <div className="label">
            <div className="badge badge-warning gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              {errors.email.message}
            </div>
          </div>
        )}
        <div>
          <label className="label-text">Password</label>
          <input
            type="password"
            className="input input-bordered block w-full p-2.5 "
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required." },
            })}
          />
        </div>
        {errors.password && (
          <div className="label">
            <div className="badge badge-warning gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              {errors.password.message}
            </div>
          </div>
        )}
        <button className="btn btn-primary w-full mt-4" type="submit">
          Login
        </button>
        {error && (
          <div className="label">
            <span className="btn btn-error btn-xs">{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
