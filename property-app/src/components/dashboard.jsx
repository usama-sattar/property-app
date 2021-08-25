import React, { useRef, useContext, useEffect, useState } from "react";
import NavComponent from "./navbar";
import { Col, Row, Container, Button } from "react-bootstrap";
import axios from "axios";
import { authContext } from "../context/auth";
import Loader from "react-loader-spinner";

export default function Dashboard() {
  const [property, setProperty] = useState([{}]);
  const [isloading, setLoading] = useState(true);

  useEffect(async () => {
    const result = await axios.get("http://localhost:5000/properties");
    await setProperty(result.data);
    setLoading(false);
  }, []);

  return (
    <div>
      <NavComponent />
      {!isloading ? (
        <Container>
          <Row>
            {property.map((item, index) => (
              <DashboardView item={item} key={index} />
            ))}
          </Row>
        </Container>
      ) : (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}
    </div>
  );
}

function DashboardView({ item }) {
  const { user } = useContext(authContext) || {};

  const postInterest = async (p_id) => {
    const config = { headers: { "auth-token": user.token } };
    const newInterest = {
      property: p_id,
      interested: true,
    };
    const data = await axios.post(
      "http://localhost:5000/post/interest",
      newInterest,
      config
    );
    console.log(data);
  };
  return (
    <Col
      xs={6}
      md={3}
      style={{ margin: "8px", backgroundColor: "#fff767", borderRadius: "5px" }}
    >
      <h2>{item.title}</h2>
      <h2>{item.city}</h2>
      <h2>{item.price}</h2>
      <Button
        variant="danger"
        type="button"
        onClick={() => postInterest(item._id)}
      >
        Interested
      </Button>
    </Col>
  );
}
