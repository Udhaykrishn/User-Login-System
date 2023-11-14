import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Event } from "../types/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import Label from "../components/Label";
import {
  buttonClassName,
  labelClassName,
  userInputClassName,
} from "../components/ClassNames/ClassName";
import Input from "../components/Input";
import Button from "../components/Button";

type Email = {
  email?: string;
  subject?: string;
  message?: string;
};

const DashBard = () => {
  const [data, setData] = useState<Email>({
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    const { email, subject, message } = data;
    try {
      const { data } = await axios.post("/email", {
        email,
        subject,
        message,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Email Successfully Sended,Please check your Email");
        setData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useContext(UserContext) || {};

  return (
    <div>
      {user ? (
        <section className="bg-white dark:bg-gray-900 w-full h-screen ">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md ">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Contact Us
            </h2>
            <form
              className="space-y-8"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div>
                <Label
                  className={labelClassName}
                  text="Please Enter Valid Email"
                />
                <Input
                  className={userInputClassName}
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={data.email}
                  setInputData={(value) =>
                    setData({ ...data, email: value as string })
                  }
                />
              </div>
              <div>
                <Label
                  className={labelClassName}
                  text="Let us know how we can help you"
                />
                <Input
                  className={userInputClassName}
                  type="text"
                  id="subject"
                  placeholder="Enter Subject"
                  value={data.subject}
                  setInputData={(value) =>
                    setData({ ...data, subject: value as string })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label className={labelClassName} text="Enter Your Subject" />
                <textarea
                  id="message"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Leave a comment..."
                  value={data.message}
                  onChange={(e) =>
                    setData({ ...data, message: e.target.value })
                  }
                ></textarea>
              </div>
              <Button type="submit" className={buttonClassName}>
                Login
              </Button>
            </form>
          </div>
        </section>
      ) : (
        <>
          <h2>Please Login</h2>
        </>
      )}
    </div>
  );
};

export default DashBard;
