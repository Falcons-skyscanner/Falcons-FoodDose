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
        this.props.addItem(this.props.item)
        await this.setState({ counter: this.props.item.count });
        // this.props.updateOpenSelect(this.props.item, this.state.counter)
    };

    handleDecrement = async () => {
        this.props.removeItem(this.props.item)
        await this.setState({ counter: this.props.item.count });
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