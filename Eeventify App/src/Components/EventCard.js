import { Card, Col, Badge } from "react-bootstrap";
import React from "react";

function EventCard(props) {

    return (
        <Col>
            <Card className="h-100">
                <img className="card-img-top" src="https://picsum.photos/300/150" alt="Event cap" />
                <div className="card-body">
                    <h5 className="card-title">
                        <strong>Title: { props.title } </strong>
                        { props.joined && <Badge pill>Joined</Badge>}
                    </h5>
                    <p className="card-text">Description: { props.description }</p>
                </div>
                <div className="card-footer">
                    <a href={ props.href } className="btn btn-primary">Details</a>
                </div>
            </Card>
        </Col>
    );
}

export default EventCard;
