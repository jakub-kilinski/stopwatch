import React, {Component} from "react";

class SingleConfiguration extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : this.props.value,
            inEdit : false,
        };
        this.onClickAction = this.onClickAction.bind(this);
    }

    onClickAction = () => {
        if(!this.state.inEdit && !this.props.inEdit){
            this.props.changeEditState();
            this.setState({
                inEdit: !this.state.inEdit
            });
        } else if(this.state.inEdit && this.props.inEdit) {
            this.props.updateConfiguration(this.props.fieldName, this.state.value);
            this.props.changeEditState();
            this.setState({
                inEdit: !this.state.inEdit
            });
        }
    };

    onInputChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    render(){
        let editClazz = "button " + (this.state.inEdit ? "saveButton" : "editButton");
        return (
            <div className="singleConfigurationWrapper">
                <p>{this.props.fieldHeader}</p>
                <div className="inputWrapper">
                    <input type="text" defaultValue={this.props.value} disabled={!this.state.inEdit} onInput={this.onInputChange}/>
                    <span className={editClazz} onClick={this.onClickAction}>{this.state.inEdit ? "Save" : "Edit"}</span>
                </div>
            </div>
        );
    }
}

export default SingleConfiguration;