import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Button, Form, Container, ToastHeader } from "react-bootstrap";
import { authContext } from "../context/auth";
import NavComponent from "./navbar";
import axios from "axios";

export default function Ads() {
  const [usersProperty, setUsersProperty] = useState([]);
  const [newAd, setNewAd] = useState(false);
  const titleRef = useRef();
  const descRef = useRef();
  const cityRef = useRef();
  const priceRef = useRef();
  const { user } = useContext(authContext);

  const getUserProperty = () => {
    const config = { headers: { "auth-token": user.token } };
    axios
      .get("http://localhost:5000/user/property", config)
      .then((result) => setUsersProperty(result.data));
  };

  const postAd = async () => {
    const config = { headers: { "auth-token": user.token } };
    const newAd = {
      title: titleRef.current.value,
      description: descRef.current.value,
      city: cityRef.current.value,
      price: priceRef.current.value,
    };
    const data = await axios.post("http://localhost:5000/post", newAd, config);
    console.log(data);
  };

  return (
    <div>
      <NavComponent />
      <Container>
        <Button variant="warning" onClick={() => setNewAd(!newAd)}>
          {newAd ? "Cancel" : "Post New Ad"}
        </Button>
        {newAd ? (
          <Form>
            <Form.Group className="mb-3" controlId="formtitle">
              <Form.Label className="text-light">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                ref={titleRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formdescription">
              <Form.Label className="text-light">description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                ref={descRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label className="text-light">City</Form.Label>
              <Form.Control type="text" placeholder="City" ref={cityRef} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label className="text-light">Price</Form.Label>
              <Form.Control type="text" placeholder="Price" ref={priceRef} />
            </Form.Group>
            <Button variant="danger" onClick={() => postAd()}>
              Post Ad
            </Button>
          </Form>
        ) : null}

        <Button variant="warning" onClick={() => getUserProperty()}>
          Click to see your Ads
        </Button>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>price</th>
              <th>Interested</th>
            </tr>
          </thead>
          <tbody>
            {usersProperty.length > 0
              ? usersProperty.map((item, index) => (
                  <AdView prop={item} key={index} />
                ))
              : null}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

function AdView({ prop }) {
  const { user } = useContext(authContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const config = { headers: { "auth-token": user.token } };
    let p_id = prop._id;
    axios
      .get(`http://localhost:5000/interest/${p_id}`, config)
      .then((result) => setCount(result.data.count))
      .catch((err) => console.log(err));
  }, []);
  return (
    <tr>
      <td>{prop.title}</td>
      <td>{prop.price}</td>
      <td>{count}</td>
    </tr>
  );
}
