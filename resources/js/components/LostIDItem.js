import * as React from "react";
import Popup from "reactjs-popup";
import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from "@material/react-card";

import {
    Headline6,
    Headline5,
    Subtitle2,
    Subtitle1,
    Body2,
    Button as ButtonTypography
} from "@material/react-typography";

// import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import List, {ListItem, ListItemText} from '@material/react-list';

import '@material/react-typography/dist/typography.css';
import '@material/react-card/dist/card.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-list/dist/list.css';
// import '@material/react-button/dist/button.css';
// import Button from '@material/react-button';

export default class LostIDItem extends React.Component {
    render() {
        return (
            <Card className={"mdc-card"}>
                <div className={"my-2 ml-2 mr-3"}>
                    <div className={"d-flex justify-content-between"}>
                        <div className={"flex-grow-1"}>
                            <div className={"d-flex"}>
                                <Subtitle2 className={"mr-1 m-0 text-primary"}
                                           style={{alignSelf: "center", color: "#646464"}}>{"ID number: "}</Subtitle2>
                                <Headline6 className={"mb-0"}
                                           style={{color: "#646464"}}>{this.props.IDNumber}</Headline6>
                            </div>
                            <div className={"d-flex"}>
                                <MaterialIcon className={"text-primary mr-2"} icon={"phone"}/>
                                <Subtitle2 style={{color: "#646464"}}>{this.props.finderPhoneNumber}</Subtitle2>
                            </div>
                        </div>
                        <div className="mdc-card__action-icons">
                            <Popup
                                trigger={open => (
                                    <button
                                        className="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded"
                                        title="More options" data-mdc-ripple-is-unbounded="true">more_vert</button>
                                )}
                                position="left center"
                                closeOnDocumentClick
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText primaryText='Remove Item'/>
                                    </ListItem>
                                </List>
                            </Popup>
                        </div>
                    </div>
                </div>
                <CardPrimaryContent>
                    <CardMedia wide imageUrl={"/storage/dummy.png"}/>
                </CardPrimaryContent>


                <CardActions className={"m-0 p-0"}>

                </CardActions>
            </Card>
        )
    }
}
