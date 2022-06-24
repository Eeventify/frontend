import { Card, Col, Badge } from "react-bootstrap";
import React from "react";

function EventCard(props) {

    return (
        <Col>
            <Card className="h-100">
                <img className="card-img-top" src={ props.imgSrc } alt="Event cap" height="200px" />
                <div className="card-body">
                    <h5 className="card-title">
                        <strong>{ props.title } </strong>
                        { props.joined && <Badge pill>Joined</Badge> }
                        { props.owned && <Badge pill bg="success">My event</Badge> }
                    </h5>
                    <p className="card-text">{ props.description }</p>
                </div>
                <div className="card-footer">
                    <a href={ props.href } className="btn btn-primary">Details</a>
                </div>
            </Card>
        </Col>
    );
}

export default EventCard;
