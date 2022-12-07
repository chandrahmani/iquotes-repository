import axios from "axios";
import { useContext, useState } from "react";
import { API } from "utils/API_CONSTANT";
import Modal from "components/core/modal/Modal";

import { useAPIConfig } from "hooks/useAPIConfig";
import { Button, ListGroup } from "components/styled";
import { Trash } from "phosphor-react";
import { useAppContext } from "store/contexts/contexts";

const QuotesList = ({ quotes, setMsg }) => {
  const { me } = useAppContext();

  const { getConfig } = useAPIConfig();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedQuote, setSelectedQuote] = useState(null);

  const deleteHandle = async () => {
    try {
      const { data: result } = await axios.delete(
        `${API.BASE_URL}/quote/${selectedQuote._id}`,

        getConfig()
      );

      console.log(result);

      setMsg(result.message);
    } catch ({ response: { data } }) {
      console.log(data);

      setMsg(data.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const deleteHandler = (_id) => {
    setIsDeleteModalOpen(true);

    setSelectedQuote({
      _id,
    });
  };

  return (
    <>
      <div className="container list-wrapper">
        {quotes?.map((quote) => (
          <div key={quote._id}>
            <ListGroup>
              <a
                href="#"
                className="list-group-item list-group-item-action d-flex gap-3 "
                aria-current="true"
              >
                <img
                  src={quote.author?.avatar}
                  alt="twb"
                  width="32"
                  height="32"
                  className="rounded-circle flex-shrink-0"
                />
                <div className="d-flex w-100 justify-content-between">
                  <div className="text-wrapper">
                    <h6 size="small" className="mb-0">
                      {quote.author?.firstName}
                    </h6>
                    <p className="mb-0 opacity-75">{quote.text}</p>
                  </div>
                  <small className="opacity-50 text-nowrap">
                    {quote.createdDate}
                  </small>

                  {quote.author?._id == me?._id && (
                    <div>
                      <Button danger onClick={() => deleteHandler(quote?._id)}>
                        <Trash size={25} />
                      </Button>
                    </div>
                  )}
                </div>
              </a>
            </ListGroup>
          </div>
        ))}
      </div>

      {isDeleteModalOpen && (
        <Modal
          onConfirm={deleteHandle}
          closeBtn="Cancel"
          confirmBtn="Delete"
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
        >
          <div>
            <h3>Delete quote</h3>
            <div>
              <p className="txt">Are you sure delete quote </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default QuotesList;
