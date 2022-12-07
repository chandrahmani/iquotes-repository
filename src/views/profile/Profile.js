import axios from "axios";
import Modal from "components/core/modal/Modal";
import { useAPIConfig } from "hooks/useAPIConfig";
import { useAuthHook } from "hooks/useAuthHook";
import { useMe } from "hooks/useMe";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Hooks

import { API } from "utils/API_CONSTANT";

import { Button, Div, Input, Main, Paragraph } from "components/styled";
import { useAppContext } from "store/contexts/contexts";

const Profile = () => {
  const { me, updateMe } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { noAuth } = useAuthHook();
  const { getConfig } = useAPIConfig();
  const { getMe } = useMe();

  const [isShowForms, setIsShowForms] = useState(false);

  const [gender, setGender] = useState(me?.gender);

  if (!me) {
    const handleGetMe = async () => {
      const { data } = await getMe();
      updateMe({ me: data });
    };
    handleGetMe();
  }

  useEffect(() => {
    noAuth();
  }, []);

  const updatePro = () => {
    const handleGetMe = async () => {
      const { data } = await getMe();
      updateMe({ me: data });
    };
    handleGetMe();
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.url,
        gender,
      };

      const { data: result } = await axios.post(
        `${API.BASE_URL}/user`,

        payload,

        getConfig()
      );
      updatePro();

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsShowForms(false);
    }
  };

  console.log("err", errors);

  if (!me) {
    return (
      <>
        <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" />
      </>
    );
  }

  return (
    <>
      <Main>
        <div>
          <div id="img-div">
            <img src={me.avatar} id="image" alt="abc" />
            <p id="img-caption"></p>
          </div>

          <div className="align" id="tribute-info">
            <p>
              <b> Hi</b> - {me.firstName} {me.lastName}
            </p>

            <p>
              <b>Date</b> - {me.createdDate}{" "}
            </p>

            <p>
              <b>Email</b> - {me.email}
            </p>

            <p>
              <b>Gender </b>- {me.gender}
            </p>
          </div>

          <Button primary onClick={() => setIsShowForms(true)}>
            Edit Profile
          </Button>
        </div>
      </Main>

      {isShowForms && (
        <Modal
          onConfirm={handleSubmit(onSubmit)}
          onConfirms={onSubmit}
          closeBtn="Cancel"
          confirmBtn="Update"
          onClose={() => {
            setIsShowForms(false);
          }}
        >
          <h3>Update Profile</h3>
          <Div size="0.5rem">
            <Input
              size="0.45rem"
              type="text"
              placeholder="Enter your  name"
              defaultValue={me.firstName}
              {...register("firstName", {
                required: true,
              })}
            />
            {errors.firstName?.type === "required" && (
              <Paragraph>FirstName is required </Paragraph>
            )}

            <Input
              size="0.45rem"
              type="text"
              placeholder="Enter your last name"
              defaultValue={me.lastName}
              {...register("lastName", {
                required: true,
              })}
            />

            {errors.lastName?.type === "required" && (
              <p className="alert alert-danger">LastName is required </p>
            )}

            <Input
              size="0.45rem"
              type="url"
              placeholder="Enter your URL"
              defaultValue={me.avatar}
              {...register("url", {
                required: true,
              })}
            />
          </Div>

          {errors.url?.type === "required" && <span>Enter Url </span>}

          <div className="gender">
            <h6 className="m-2">Gander</h6>
            <div className="form-check m-3">
              <input
                className="form-check-input "
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                defaultChecked={me.gender === "male"}
                onClick={() => setGender("male")}
                {...register("gender", {
                  required: true,
                })}
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check m-3 ">
              <input
                className="form-check-input "
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={() => setGender("female")}
                defaultChecked={me.gender === "female"}
                {...register("gender", {
                  required: true,
                })}
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default Profile;
