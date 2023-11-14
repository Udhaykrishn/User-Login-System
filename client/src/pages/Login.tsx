import axios from "axios";
import { useState } from "react";
import { Event, type Data } from "../types/utils";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Label from "../components/Label";
import {
  buttonClassName,
  inputClassName,
  labelClassName,
} from "../components/ClassNames/ClassName";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });
  const loginUser = async (e: Event) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login in to your account
            </h1>
            <form
              onSubmit={loginUser}
              className="space-y-4 md:space-y-6"
              autoComplete="off"
            >
              <div>
                <Label text="Your Email" className={labelClassName} />

                <Input
                  type="email"
                  value={data.email}
                  className={inputClassName}
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  setInputData={(value) =>
                    setData({ ...data, email: value as string })
                  }
                />
              </div>
              <div>
                <Label text="Your Password" className={labelClassName} />

                <Input
                  id="passowrd"
                  className={inputClassName}
                  type="password"
                  placeholder="Enter Password"
                  value={data.password}
                  name="password"
                  setInputData={(value) =>
                    setData({ ...data, password: value as string })
                  }
                />
              </div>
              <Button type="submit" className={buttonClassName}>
                Login
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  <span> </span>Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
