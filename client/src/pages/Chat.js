import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useMutation } from "@apollo/react-hooks";
import { GET_MESSAGES_SUBSCRIPTION, POST_MESSAGE } from "../utils/graphql";
import { Button, Form, Grid, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import {useSubscription} from "@apollo/client"
import MenuBar from "../components/MenuBar"

function Chat() {
  const history = useNavigate();
  const [msgValue, setMsgValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const receiver = location?.state?.id;
  const username = location?.state?.username;
  const sender = user?.id;
  const { data} = useSubscription(GET_MESSAGES_SUBSCRIPTION);
  useEffect(() => {
    if (!user) {
      history("/");
    }
  }, []);
  useEffect(() => {
    setMessages(
      data?.newMessages?.length > 0 ? data?.newMessages : []
    );
  }, [data]);

  const [postMessage] = useMutation(POST_MESSAGE, {
    variables: {sender,content : msgValue,receiver},
  });

  const onSendMessage = async () => {
    await postMessage()
    setMsgValue("")
  };

  return (
    <div>
      <MenuBar/>
      <Message messages={messages} user={user} username={username} />
      <Grid style={{ position: "fixed", bottom: "10px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingBottom: "1em",
            width: "1000px",
          }}
        >
          <Form.Input
            style={{ width: "1000px" }}
            placeholder="Message!"
            onChange={(e) => setMsgValue(e.target.value)}
            value={msgValue}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "1em",
            marginLeft: "10px",
          }}
        >
          <Button color="teal" basic onClick={onSendMessage}>
            <Icon name="send" />
          </Button>
        </div>
      </Grid>
    </div>
  );
}

export default Chat;
