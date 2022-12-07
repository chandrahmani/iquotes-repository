import axios from "axios";
import { useState, useEffect } from "react";

import "../../App.css";

import { API } from "utils/API_CONSTANT";
import QuotesList from "components/quotes/quoteList/QuotesList";
import AddQuote from "components/quotes/addQuote/AddQuote";

import { useMe } from "hooks/useMe";
import { Button, Title } from "components/styled";
import { useAppContext } from "store/contexts/contexts";

const Quotes = () => {
  const { me, updateMe } = useAppContext();

  const { getMe } = useMe();

  const [quotes, setQuotes] = useState([]);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!me) {
      const handleGetMe = async () => {
        const { data } = await getMe();

        updateMe({ me: data });
      };
      handleGetMe();
    }

    const getQuote = async () => {
      try {
        const { data } = await axios.get(`${API.BASE_URL}/quotes`);

        setQuotes(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuote();
  }, [msg]);

  return (
    <>
      <AddQuote setMsg={setMsg} />

      <div>
        {msg && (
          <>
            <div className="alert-msg alert alert-danger msg-show">
              <Title>
                {msg}

                <Button
                  danger
                  type="button"
                  className="btn-close"
                  date-bs-dismiss="alert"
                  aria-label="close"
                  onClick={() => setMsg("")}
                ></Button>
              </Title>
            </div>
          </>
        )}
      </div>

      <QuotesList quotes={quotes} setMsg={setMsg} />
    </>
  );
};

export default Quotes;
