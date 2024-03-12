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
    <div className="grid-cols-1 gap-12 mb-12 md:grid-cols-1 justify-center items-center m-4">
      <form onSubmit={onSubmit}>
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
            <span className="btn btn-error btn-xs">
              {errors.username.message}
            </span>
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
            <span className="btn btn-error btn-xs">{errors.email.message}</span>
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
            <span className="btn btn-error btn-xs">
              {errors.password.message}
            </span>
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
            <span className="btn btn-error btn-xs">
              {errors.confirmPassword.message}
            </span>
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
