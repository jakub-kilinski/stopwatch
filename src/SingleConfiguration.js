import React, {Component} from "react";

class SingleConfiguration extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : this.props.value,
            inEdit : false
        };
    }

    render(){
        let editClazz = this.state.inEdit ? "saveButton" : "editButton";
        return (
            <div className="singleConfigurationWrapper">
                <p>{this.props.fieldName}</p>
                <div>
                    <input type="text" defaultValue={this.state.value} disabled={!this.state.inEdit}/>
                    <span className={editClazz}>{this.state.inEdit ? "Save" : "Edit"}</span>
                </div>
            </div>
        );
    }
}

export default SingleConfiguration;