import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import { Button } from '@shopify/polaris'

class Header extends Component {
  // state = {
  //   selected: 0,
  // };

  // handleTabChange = (selectedTabIndex) => {
  //   this.setState({selected: selectedTabIndex});

  // };

  render() {
    // const {selected} = this.state;
    // const tabs = [
    //   {
    //     id: 'new-post',
    //     content: 'New',
    //   },
    //   {
    //     id: 'all-post',
    //     content: 'All',
    //   },
    //   {
    //     id: 'submit-post',
    //     content: 'Submit a post',
    //   }
    // ]
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
     
      <div className="flex pa1 justify-between nowrap orange">
       {/* <Tabs tabs={tabs} selected={selected} onSelect={this.handleTabChange} /> */}
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Post Page</div>
          <Link to="/" className="ml1 no-underline black">
            New
          </Link>
          <div className="ml1">|</div>
          <Link to="/top" className="ml1 no-underline black">
          Top
          </Link>
          <div className="ml1">|</div>
          {authToken && (
            <div className="flex">
              <Link to="/create" className="ml1 no-underline black">
                Submit
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <Button primary onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push(`/`)
            }} > Logout </Button>
          ) : (
            <Link to="/login" className="ml1 no-underline black">
              Login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)