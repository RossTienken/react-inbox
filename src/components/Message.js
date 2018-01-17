import { Route, Link } from 'react-router-dom'
import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: []
    }
  }
  async componentDidMount() {
    const response = await this.request(`/api/messages/${this.props.message.id}`)
    const json = await response.json()
    this.setState({body: json.body})
  }
  async request(path, method = 'GET', body = null) {
    if (body) body = JSON.stringify(body)
    return await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body
    })
  }
  render() {
    let isSelected = ""
    let isRead
    let check = ""
    let isStarred = ""
    if(this.props.message.read === true) {
      isRead = "read"
    }
    else {
      isRead = "unread"
    }
    if(this.props.message.selected === true) {
      check = "checked"
    }
    if(this.props.message.starred === true) {
      isStarred = "star fa fa-star"
    }
    else {
      isStarred = "star fa fa-star-o"
    }
    if(this.props.message.selected === true) {
      isSelected = "selected"
    }
    return(
        <div className={`row message ${isRead} ${isSelected}` }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2" onClick={()=>this.props.toggleSelect(this.props.message)}>
                <input type="checkbox" checked={`${check}`} />
              </div>
              <div className="col-xs-2" id={this.props.id} onClick={()=> this.props.toggleStar(this.props.message)}>
                <i className={`${isStarred}`} id={this.props.id}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.props.message.labels.map((ele,i)=> {
              return(
                <span key= {i} className="label label-warning">{ele}</span>
              )
            })}
              <Link to= {`/messages/${this.props.message.id}`}>
                <span onClick={this.props.markRead} id={this.props.message.id}> {this.props.message.subject}</span>
              </Link>
          </div>
          <Route path={`/messages/${this.props.message.id}`} render={ () => (
            <div className="row message-body">
              <div className="col-xs-11 col-xs-offset-1">
                <br></br>
                 {this.state.body}
              </div>
            </div>
          )}/>
        </div>
    )
  }
}
export default Message
