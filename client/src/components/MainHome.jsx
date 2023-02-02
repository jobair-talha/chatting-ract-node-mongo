import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TimeAgo from "./TimeAgo";

const MainHome = () => {
  const { user } = useSelector((state) => state.auth);

  const [conversations, setConversations] = useState([]);
  const [lastConvoClicked, setLastConvoClicked] = useState({});
  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/conversation/find/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setConversations(res.data);
    };
    fetchData();
  }, [user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `http://localhost:5000/api/v1/message`,
      {
        conversationId: lastConvoClicked,
        messageText: message,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setMessages((prev) => [...prev, res.data]);
    setMessage("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/message/${lastConvoClicked._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(res.data);
    };

    lastConvoClicked && fetchData();
  }, [lastConvoClicked]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        const otherUserId = lastConvoClicked?.members?.find(
          (member) => member !== user._id
        );
        const res = await axios.get(
          `http://localhost:5000/api/v1/users/${otherUserId}`
        );
        setOtherUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    lastConvoClicked && fetchOtherUser();
  }, [lastConvoClicked]);

  console.log(otherUser);

  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col lg={4}>
            {conversations.map((c) => (
              <div
                className="mb-2 bg-warning"
                onClick={() => setLastConvoClicked(c)}
                key={c._id}
              >
                <div>John</div>
              </div>
            ))}
          </Col>

          <Col lg={8}>
            {messages ? (
              <>
                {messages.length > 0 ? (
                  messages.map((m) => (
                    <div key={m._id}>
                      <div>{m.messageText}</div>
                      <TimeAgo timeStamp={m.createdAt} />
                    </div>
                  ))
                ) : (
                  <h5>No Message yet, be the first on to send</h5>
                )}
              </>
            ) : (
              <h1>Please Select Message</h1>
            )}

            {lastConvoClicked.members && (
              <>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Control
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      type="text"
                      placeholder="Message here"
                    />
                    <Button type="submit">Send</Button>
                  </Form.Group>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainHome;
