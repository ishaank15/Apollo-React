import { graphql } from 'react-apollo'
import { POST_MUTATION } from '../Query/index'
import CreateLink from './CreateLink'

export default graphql(POST_MUTATION, { name: 'postMutation' })(CreateLink)
