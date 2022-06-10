import { Card, Col } from "react-bootstrap";
import React from "react";

function EventCard(props) {

    return (
        <Col>
            <Card>
                <img className="card-img-top" src="https://picsum.photos/300/150" alt="Event cap" />
                <div className="card-body">
                    <h5 className="card-title">{ props.title }</h5>
                    <p className="card-text">{ props.description }</p>
                    <a href={ props.href } className="btn btn-primary">Details</a>
                </div>
            </Card>
        </Col>
    );
}

export default EventCard;
