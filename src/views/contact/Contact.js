import axios from "axios";
import CaptchaTextGenerator from "captcha-text-generator";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

import "App.css";
import { API } from "utils/API_CONSTANT";
import { Div, Input, Paragraph } from "components/styled";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [msg, setMsg] = useState("");

  const [txtCaptcha, setTxtCaptcha] = useState("");
  const txtRefCaptcha = useRef();

  const result = (text) => {
    console.log(text);
    setTxtCaptcha(text);
  };

  const onSubmit = async (contact) => {
    console.log("subj", contact);

    if (txtCaptcha === txtRefCaptcha.current.value) {
      try {
        const { data: result } = await axios.post(
          `${API.BASE_URL}/email/contact"`,
          {
            subject: contact.subject,
            text: contact.text,
          }
        );

        console.log(result);

        setMsg(result.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("not match");
    }
  };
  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>

            <Input
              type="text"
              className="form-control"
              placeholder="Enter your subject"
              {...register("subject", {
                required: true,
              })}
            />

            {errors.subject?.type === "required" && (
              <Paragraph role="alert">Enter your any subject</Paragraph>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label"> Text </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter any text"
              {...register("text", {
                required: true,
              })}
            ></textarea>
            {errors.text?.type === "required" && (
              <Paragraph role="alert">Enter any text</Paragraph>
            )}
          </div>

          <label className="form-label">Captcha</label>

          <CaptchaTextGenerator result={result} />
          <Div size="0.5rem">
            <Input size="0.20rem" type="text" ref={txtRefCaptcha} />
          </Div>

          <br />
          <button type="submit" className="btn btn-primary d-grid gap-2">
            Contact
          </button>
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

export default Contact;
