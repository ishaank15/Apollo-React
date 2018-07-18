import React, { Component } from 'react'
import Link from '../Link'
import gql from 'graphql-tag'
import { LINKS_PER_PAGE } from '../../../constants'
import { FEED_QUERY } from '../../Query/index'

import Loading from '../Loading'

class LinkList extends Component {
  componentDidMount() {
    this._subscribeToNewLinks()
    this._subscribeToNewVotes()
  }

  _subscribeToNewVotes = () => {
    this.props.feedQuery.subscribeToMore({
      document: gql`
        subscription {
          newVote {
            node {
              id
              link {
                id
                url
                description
                createdAt
                postedBy {
                  id
                  name
                }
                votes {
                  id
                  user {
                    id
                  }
                }
              }
              user {
                id
              }
            }
          }
        }
      `,
    })
  }

  _getLinksToRender = (isNewPage) => {
    if (isNewPage) {
      return this.props.feedQuery.feed.links
    }
    const rankedLinks = this.props.feedQuery.feed.links.slice()
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
    return rankedLinks
  }

  _nextPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page <= this.props.feedQuery.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/new/${nextPage}`)
    }
  }
  
  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/new/${previousPage}`)
    }
  }

  render() {
    const { feedQuery } = this.props;
    if (feedQuery && feedQuery.loading) {
      return <div><Loading/></div>
    }
  
    if (feedQuery && feedQuery.error) {
      return <div>Error</div>
    }
  
    const isNewPage = this.props.location.pathname.includes('new')
    const linksToRender = this._getLinksToRender(isNewPage)
  
    return (
      <div>
        <div>
          {linksToRender.map((link, index) => (
            <Link
              key={link.id}
              updateStoreAfterVote={this._updateCacheAfterVote}
              index={index}
              link={link}
            />
          ))}
        </div>
        {isNewPage &&
        <div className='flex ml4 mv3 gray'>
          <div className='pointer mr2' onClick={() => this._previousPage()}>Previous</div>
          <div className='pointer' onClick={() => this._nextPage()}>Next</div>
        </div>
        }
      </div>
    )
  
  }

  _subscribeToNewLinks = () => {
    this.props.feedQuery.subscribeToMore({
      document: gql`
        subscription {
          newLink {
            node {
              id
              url
              description
              createdAt
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                }
              }
            }
          }
        }
      `,
      // updateQuery: (previous, current) => {
        // console.log('updaaaaaaaaaaaaaaating', current)
        // if(subscriptionData.data.newLink) {
        //   const newAllLinks = [
        //     subscriptionData.data.newLink.node,
        //     ...previous.feed.links,
        //   ] ;
        //   console.log('........inside sucs.........');
        //   const result = {
        //     __typename: previous.feed.__typename,
        //     ...previous,
        //     feed: {
        //       links: newAllLinks,
        //     },
        //   }
        //   return result
        // }
        // else {
        //   console.log('.................');
        //   return 
        // }
      // },
    })
  }

  _updateCacheAfterVote = (store, createVote, linkId) => {
  const isNewPage = this.props.location.pathname.includes('new')
  const page = parseInt(this.props.match.params.page, 10)
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
  const first = isNewPage ? LINKS_PER_PAGE : 100
  const orderBy = isNewPage ? 'createdAt_DESC' : null
  const data = store.readQuery({ query: FEED_QUERY, variables: { first, skip, orderBy } })

  const votedLink = data.feed.links.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes
  store.writeQuery({ query: FEED_QUERY, data })
}
}

export default LinkList;