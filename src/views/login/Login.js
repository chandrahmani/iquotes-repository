import axios from "axios";
import { useForm } from "react-hook-form";
import CaptchaTextGenerator from "captcha-text-generator";
import { useState, useEffect, useRef } from "react";

import "../../App.css";

import { Link, useNavigate } from "react-router-dom";
import { useAuthHook } from "hooks/useAuthHook";
import { API } from "utils/API_CONSTANT";
import { Button, Input, Paragraph } from "components/styled";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [txtCaptcha, setTxtCaptcha] = useState("");
  const textRefCaptcha = useRef();

  const result = (text) => {
    console.log(text);
    setTxtCaptcha(text);
  };

  const { auth, token } = useAuthHook();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    auth();
  }, []);

  const onSubmit = async (login) => {
    console.log("hooo", login);

    if (txtCaptcha === textRefCaptcha.current.value) {
      try {
        const { data: result } = await axios.post(`${API.BASE_URL}/login`, {
          email: login.email,
          password: login.password,
        });

        console.log(result);

        if (result.token) {
          localStorage.setItem("token", result.token);

          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        }

        setMsg(result.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMsg("Don`t Match ");
    }
  };
  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="myEmail">Email</label>

            <Input
              size="0.45rem"
              type="email"
              placeholder="Enter your email"
              id="myEmail"
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            {errors.email && <Paragraph>Enter Your Email Id</Paragraph>}
          </div>

          <div className="mb-3">
            <label> Password </label>
            <Input
              size="0.45rem"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            {errors.password && <Paragraph>Enter Your Password</Paragraph>}
          </div>

          <div className="mb-3 ">
            <CaptchaTextGenerator result={result} />
            <Input size="0.45rem" type="text" ref={textRefCaptcha} />
          </div>

          <div className="btn-wrapper">
            <Button type="submit" primary>
              Login
            </Button>

            <Link to="/signup">SignUp</Link>
          </div>
        </form>

        <div>
          {msg && (
            <>
              <div className="msg">
                <div className="alert alert-primary" role="alert">
                  <h2>{msg}</h2>
                  <button
                    type="button"
                    className="btn-close"
                    date-bs-dismiss="alert"
                    aria-label="close"
                    onClick={() => setMsg("")}
                  ></button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
