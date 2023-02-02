import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TimeAgo from './TimeAgo';

const MainHome = () => {
  const { user } = useSelector((state) => state.auth);

  const [conversations, setConversations] = useState([]);
  const [lastConvoClicked, setLastConvoClicked] = useState('');
  const [messages, setMessages] = useState('');
  const [message, setMessage] = useState('');

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
    setMessage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/message/${lastConvoClicked}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(res.data);
    };
    fetchData();
  }, [lastConvoClicked]);
  return (
    <div>
      <Container className="py-5">
        <Row>
          <Col>
            {conversations.map((c) => (
              <div
                className="mb-2 bg-warning"
                onClick={() => setLastConvoClicked(c._id)}
                key={c._id}
              >
                <div>John</div>
              </div>
            ))}
          </Col>
          <Col>
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
            {lastConvoClicked && (
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
          <Col>3</Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainHome;
