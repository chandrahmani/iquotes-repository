import axios from "axios";
import { useRef } from "react";

import { API } from "utils/API_CONSTANT";

import { useAPIConfig } from "hooks/useAPIConfig";
import { Button, Title, Wrapper } from "components/styled/index";
import { useAppContext } from "store/contexts/contexts";

const AddQuote = ({ setMsg }) => {
  const { me } = useAppContext();
  const { getConfig } = useAPIConfig();

  const txtRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        text: txtRef.current.value,
      };

      const { data: result } = await axios.post(
        `${API.BASE_URL}/quote`,
        payload,
        getConfig()
      );

      console.log("result", result);

      setMsg(result.message);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      setMsg(error.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Title size="medium">Welcome To Quotes App</Title>

          <div className="mb-3">
            <h4>Text</h4>
            <textarea className="form-control" rows="3" ref={txtRef}></textarea>
          </div>

          <Button primary>Add Quote</Button>
        </Wrapper>
      </form>
    </>
  );
};

export default AddQuote;
