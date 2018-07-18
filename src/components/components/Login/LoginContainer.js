import { graphql, compose } from 'react-apollo'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../Query/index'
import Login from './Login'

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login)
