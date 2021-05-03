/* eslint-disable react/destructuring-assignment */
import React from 'react';
import axios from 'axios';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      toggledUsers: [],
    };
    this.getAllUsers = this.getAllUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitManageUser = this.handleSubmitManageUser.bind(this);

  }

  componentDidMount() {
    this.getAllUsers();
  }


  getAllUsers() {
    axios.get('http://54.173.19.52:3000/api/users')
    // axios.get('/api/User/reported')
      .then((res) => {
        console.log('RES DATA ===', res.data)
        this.setState({ allUsers: res.data });
      })
      .catch((err) => console.log('ERROR GETTING USERS: ', err));
  }

  handleChange(event) {
    const value = event.target.value;
    let tempArr = this.state.toggledUsers;

    if (tempArr.indexOf(value) === -1) {
      tempArr.push(value);
    } else {
      tempArr.splice(tempArr.indexOf(value), 1);
    }
    this.setState({ toggledUsers: tempArr });
  }

  handleSubmitManageUser(event) {
    console.log('CLICKED')
    event.preventDefault();
    var body = {
      "toggleHideUsers": this.state.toggledUsers
    };
    return axios.put('http://54.173.19.52:3000/api/users', body)
      .then(() => {
        alert('Users have been Updated!');
      })
      .then(() => {
        this.setState({
          toggledUsers:[]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const allUsers = this.state.allUsers;
    console.log('ALL USERS', allUsers, 'UPDATED USERS', this.state.toggledUsers);

    return (
      <div>
        <div className="manage-heading">MANAGE USERS</div>



        <div className="listItems">
          <ul className="no-bullets">
            {allUsers.map((user) => (

            <li key={user.id}>

              <div className="mytextdiv">
                <div className="mytexttitle manage-mytext">
                  {user.name_user + " " + user.last_name}&nbsp;</div>
                    <div className="divider"></div>
                </div>
                {user.address_user}
                <br></br>
                {user.email}
                <br></br>
                <br></br>
                <input id={`${user.id}-SupAdmin`} type="checkbox" value={`${user.id}-SupAdmin`} onChange={this.handleChange} />
                <label htmlFor={`${user.id}-SupAdmin`}>&nbsp;<span className="span-label">Is Super Admin?</span></label>

                <span className='groupText'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <input id={`${user.id}-ComAdmin`} type="checkbox" value={`${user.id}-ComAdmin`} onChange={this.handleChange} />
                <label htmlFor={`${user.id}-ComAdmin`}>&nbsp;<span className="span-label">Is Community Admin?</span></label>

                <span className='groupText'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <input id={`${user.id}-Prospect`} type="checkbox" value={`${user.id}-Prospect`} onChange={this.handleChange} />
                <label htmlFor={`${user.id}-Prospect`}>&nbsp;<span className="span-label">Is Prospect?</span></label>

                <span className='groupText'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <input id={`${user.id}-Member`} type="checkbox" value={`${user.id}-Member`} onChange={this.handleChange} />
                <label htmlFor={`${user.id}-Member`}>&nbsp;<span className="span-label">Is Member?</span></label>

                <span className='groupText'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <input id={`${user.id}-Banned`} type="checkbox" value={`${user.id}-Banned`} defaultChecked={user.banned ? "checked" : null} onChange={this.handleChange} />
                <label htmlFor={`${user.id}-Banned`}>&nbsp;<span className="span-label">Is Banned?</span></label>
            </li>
            ))}
          </ul>
          <button onClick={this.handleSubmitManageUser}>SUBMIT CHANGES</button>
        </div>
      </div>
    );
  }
}

export default ManageUsers;
