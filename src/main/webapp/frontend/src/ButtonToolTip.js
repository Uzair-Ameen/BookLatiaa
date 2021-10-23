import React from "react";
import {Tooltip} from "react-bootstrap";

export default function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Simple tooltip
        </Tooltip>
    );
}