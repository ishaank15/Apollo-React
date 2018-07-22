import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants'
import { timeDifferenceForDate } from '../../utils'
import { Card, Layout } from '@shopify/polaris'

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <Layout>
        <Layout.Section secondary>
          <Card title="Votes" sectioned>
          {authToken && (
              <div className="ml1 gray f13" onClick={() => this._voteForLink()}>
                ▲ {this.props.link.votes.length} votes
              </div>
            )}
            <Layout.Section>
            <Card sectioned>
              <span className="gray">{this.props.index + 1}.   </span>
              <b> {this.props.link.description} </b>
              <br/>
              Link: <u>({this.props.link.url})</u> 
              <br/>
              <div className="ml1 gray f11" >
                by{' '} {this.props.link.postedBy
                  ? this.props.link.postedBy.name
                  : 'Unknown'}{' '}
                  <br/>
                {timeDifferenceForDate(this.props.link.createdAt)}
              </div>
            </Card>
            </Layout.Section>
          </Card>
        </Layout.Section>

        
      </Layout>
      
    )
  }

  _voteForLink = async () => {
    const linkId = this.props.link.id

    await this.props.voteMutation({
      variables: {
        linkId,
      },
      update: (store, { data: { vote } }) => {
        this.props.updateStoreAfterVote(store, vote, linkId)
      },
    })
  }
}

export default Link