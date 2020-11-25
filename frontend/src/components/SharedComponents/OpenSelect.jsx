import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class OpenSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: this.props.item.count
        }
    }

    handleIncrement = async () => {
        await this.setState({ counter: this.state.counter + 1 });
        this.props.updateOpenSelect(this.props.item, this.state.counter)
    };

    handleDecrement = async () => {
        console.log("DECR",this.props.item._id,this.props.item.count);
        if (this.props.item.count > 1) {
            await this.setState({ counter: this.state.counter - 1 });
            this.props.updateOpenSelect(this.props.item, this.state.counter)
        } else {
            this.props.removeCartItem(this.props.item)
        }
    };
    render() {
        // console.log(this.props);
        return (
            <ButtonGroup size="small" aria-label="small outlined button group" style={{ paddingLeft: "8px" }}>
                <Button onClick={this.handleDecrement}>-</Button>
                <Button style={{ cursor: 'default' }} >{this.props.item.count}</Button>
                <Button onClick={this.handleIncrement}>+</Button>
            </ButtonGroup>
        );
    }
}

export default OpenSelect;