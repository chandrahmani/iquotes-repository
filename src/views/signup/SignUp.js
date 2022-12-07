import axios from "axios";
import { Button, Input } from "components/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Paragraph } from "components/styled/index";
import "../../App.css";

const SignUp = () => {
  const [quotes, setQuotes] = useState([]);
  const [msg, setMsg] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);

    const { data: result } = await axios.post(
      "https://iquotes-app-22.herokuapp.com/signup",
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }
    );

    console.log(result);
    setMsg(result.message);
  };

  console.log(errors);
  const password = watch("password");
  const passwordV = watch("reVPassword");
  console.log(errors);
  return (
    <>
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">First Name *</label>
          <Input
            size="0.20rem"
            type="text"
            className="form-control"
            {...register("firstName", {
              required: true,
            })}
          />
          {errors.firstName?.type === "required" && (
            <Paragraph role="alert">First name is required</Paragraph>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Last name</label>
          <Input size="0.20rem" type="text" {...register("lastName")} />
          {/* {errors.lastName && <p role="alert">{errors.lastName?.message}</p>} */}
        </div>

        <div className="mb-3">
          <label className="form-label">Email *</label>
          <Input
            type="email"
            size="0.20rem"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />

          {errors.email?.type === "required" && (
            <Paragraph>Email id is required</Paragraph>
          )}

          {errors.email?.type === "pattern" && (
            <Paragraph>Invalid email</Paragraph>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password *</label>
          <Input
            size="0.20rem"
            type="password"
            {...register("password", {
              required: true,
            })}
          />

          {errors.password?.type === "x" && (
            <Paragraph>Password is required</Paragraph>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Re verify *</label>
          <Input
            size="0.20rem"
            type="password"
            onPaste={(e) => {
              e.preventDefault();
              alert("don`t past password");
            }}
            {...register("reVPassword", {
              required: true,
            })}
          />
          {errors.password?.type === "required" && (
            <>
              <Paragraph>Re verify password is required</Paragraph>
            </>
          )}

          {!(password === passwordV) && " do not match password"}
        </div>

        <div className="btn-wrapper">
          <Button type="submit" primary>
            SingUp
          </Button>

          <Link to="/login">Login</Link>
        </div>

        {msg && (
          <>
            <div className="alert-msg alert alert-danger msg-show">
              <h3>{msg}</h3>
            </div>
          </>
        )}
      </form>

      <div>
        {quotes.map((item, index) => (
          <>
            <h2>{item.firstName}</h2>
            <h2>{item.lastName}</h2>
            <h2>{item.email}</h2>
            <h2>{item.password}</h2>
          </>
        ))}
      </div>
    </>
  );
};

export default SignUp;
