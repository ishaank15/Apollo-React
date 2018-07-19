
import { graphql } from 'react-apollo'
import { VOTE_MUTATION } from '../Query/index'
import Link from './Link'

export default graphql(VOTE_MUTATION, {
  name: 'voteMutation',
})(Link)
