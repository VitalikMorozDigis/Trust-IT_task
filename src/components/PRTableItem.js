import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import dayjs from "dayjs";

const PRTableItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    const { title, number, user, created_at, state, body, labels } = item;
    const { login, html_url, avatar_url } = user;

    const btnText = open ? 'Show less' : 'Show more';

    return (
        <Card className="card">
            <div className="card_container">
                <div>
                    <div className="card_header">
                        <h3 className="title">{title}</h3>
                        <div className="labels_container">
                            {labels.map((label) => (
                                <div
                                    key={label.id}
                                    className="label"
                                    style={{
                                        backgroundColor: `#${label.color}30`,
                                        borderColor: `#${label.color}`,
                                    }}
                                >
                                    {label.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className="info">
                        #{number} created by{" "}
                        <a href={html_url}>{login} </a>{" "}
                        <img
                            className="logo_img"
                            title={login}
                            src={avatar_url}
                            alt={login}
                        />
                        at {dayjs(created_at).format("DD/MM/YYYY H:mm")}
                    </span>
                </div>
                <div className="status_container">
                    <div className="status">Status: {state}</div>
                    <Button onClick={() => setOpen((prevState) => !prevState)}>{btnText}</Button>
                </div>
            </div>
            <div
                className={`description_container ${open ? 'description-open' : ''}`}
            >
                <p>{body}</p>
            </div>
        </Card>
    );
};

export default PRTableItem;
