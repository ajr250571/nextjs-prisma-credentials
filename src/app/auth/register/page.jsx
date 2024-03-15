"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Password no esta confirmado correctamente.");
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/auth/login");
    }
    // console.log(res);
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-2/3 md:w-1/3">
        <h1 className="text text-primary justify-center font-bold text-4xl flex items-center gap-2 mb-2">
          Register
        </h1>

        <div>
          <label className="label-text">Username</label>
          <input
            type="text"
            className="input input-bordered block w-full p-2.5 "
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "Username is required." },
            })}
          />
        </div>
        {errors.username && (
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
              {errors.username.message}
            </div>
          </div>
        )}

        <div>
          <label className="label-text">Email</label>
          <input
            type="text"
            className="input input-bordered block w-full p-2.5 "
            placeholder="Email"
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

        <div>
          <label className="label-text">Confirm Password</label>
          <input
            type="password"
            className="input input-bordered block w-full p-2.5 "
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password is required.",
              },
            })}
          />
        </div>
        {errors.confirmPassword && (
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
              {errors.confirmPassword.message}
            </div>
          </div>
        )}

        <button className="btn btn-primary w-full mt-4" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
