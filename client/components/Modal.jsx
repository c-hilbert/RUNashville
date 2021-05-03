import React from 'react';
import axios from 'axios';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formName1: '',
      formName2: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitLinks = this.handleSubmitLinks.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmitLinks(event) {

    event.preventDefault();
    var body = {
      "formName1": this.state.formName1,
      "formName2": this.state.formName2,
    };
    return axios.post('http://54.173.19.52:3000/api/endpoint', body)
      .then(() => {
        alert('Record has been Added!');
      })
      .then(() => {
        this.setState({
          formName1: '',
          formName2: '',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (

      <div className="form-modal-wrapper">
        <div className="form-modal-backdrop" onClick={this.props.onModalOpen} />
        <div className="form-modal-box">
          <i className="far fa-times-circle fa-2x" onClick={this.props.onModalOpen}></i>
          <br></br>
          <form>
            <label>Form Name 1:
                <input name="formName1" type="text" value={this.state.formName1} onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Form Name 2:
                <input name="formName2" type="text" value={this.state.formName2} onChange={this.handleInputChange} />
            </label>
            <button onClick={this.handleSubmitLinks}>Add URL</button>
          </form>
        </div>
      </div>

    );
  }
}

export default Modal;