import React, { Component } from 'react'
import './App.css'
import { APIURL, callApi } from './lib.js'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showpopup: false,
      userdata: null
    };
    this.getData = this.getData.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.closeUserInfo = this.closeUserInfo.bind(this);
  }

  componentDidMount() {
    callApi("GET", APIURL, "", this.getData);
  }

  getData(res) {
    this.setState({ data: res });
  }

  showUserInfo(user) {
    this.setState({ showpopup: true, userdata: user });
  }

  closeUserInfo() {
    this.setState({ showpopup: false, userdata: null });
  }

  render() {
    const { data, showpopup, userdata } = this.state;

    return (
      <div className='app-container'>
        <div className='header'>
          Example for APIs, Fetch Function
        </div>

        <div className='section-header'>
          <h2>User Information</h2>
          </div>

        <div className='section'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => this.showUserInfo(user)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showpopup && userdata && (
  <div className="popup-overlay">
    <div className="popup">

      {/* Profile Image */}
      <img
        className="profile-pic"
        src={`https://ui-avatars.com/api/?name=${userdata.name}&size=128&background=6366f1&color=fff`}
        alt="profile"
      />

      <h2>User Details</h2>

      <p><b>ID:</b> {userdata.id}</p>
      <p><b>Name:</b> {userdata.name}</p>
      <p><b>Username:</b> {userdata.username}</p>

      {/* Email with icon */}
      <p className="email-row">
        <img
          className="email-icon"
          src={`https://ui-avatars.com/api/?name=@&size=32&background=22c55e&color=fff`}
          alt="email"
        />
        {userdata.email}
      </p>

      <p><b>Phone:</b> {userdata.phone}</p>
      <p><b>Website:</b> {userdata.website}</p>
      <p><b>Company:</b> {userdata.company.name}</p>

      <button onClick={this.closeUserInfo}>Close</button>
    </div>
  </div>
)}

        <div className='footer'>
          Copyright © 2026. All rights reserved – Hardik – KL University
        </div>
      </div>
    );
  }
}