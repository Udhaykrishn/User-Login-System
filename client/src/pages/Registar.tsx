import { useState } from "react";
import { Event, type Data } from "../types/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Label from "../components/Label";
import {
  buttonClassName,
  inputClassName,
  labelClassName,
} from "../components/ClassNames/ClassName";
import Button from "../components/Button";

const Registar = () => {
  const naviagte = useNavigate();

  const [data, setData] = useState<Data>({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: Event) => {
    e.preventDefault();

    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Register Successful, Welcome!");
        naviagte("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={registerUser}
                autoComplete="off"
              >
                <div>
                  <Label text="Your Name" className={labelClassName} />

                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    className={inputClassName}
                    placeholder="Enter Name"
                    setInputData={(value) =>
                      setData({ ...data, name: value as string })
                    }
                  />
                </div>
                <div>
                  <Label text="Your Email" className={labelClassName} />

                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className={inputClassName}
                    value={data.email}
                    setInputData={(value) =>
                      setData({ ...data, email: value as string })
                    }
                  />
                </div>
                <div>
                  <Label text="Your Password" className={labelClassName} />

                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className={inputClassName}
                    value={data.password}
                    setInputData={(value) =>
                      setData({ ...data, password: value as string })
                    }
                  />
                </div>

                <Button type="submit" className={buttonClassName}>
                  Create an Account
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                  <span> </span>Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registar;
