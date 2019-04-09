import React, { useEffect, useState } from 'react'
import Amplify, { I18n } from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import _PubSub from '@aws-amplify/pubsub'
import API, { graphqlOperation } from '@aws-amplify/api'
import { withAuthenticator } from 'aws-amplify-react'
import logo from './logo.svg'
import './App.css'
import JSONPretty from 'react-json-pretty'
import awsExports from './aws-exports-link'
import 'react-json-pretty/themes/monikai.css'
import * as queries from './graphql/queries'
import * as subscriptions from './graphql/subscriptions'

Amplify.configure(awsExports)

// AWS Amplify Auth
// The userpool uses a UsernameAttributes: [email] setting, so the Username is
// really an email address. With Amplify React, only the sign up form currently
// allows you to set labels, so instead we use I18n
const authScreenWords = {
  en: {
    Username: 'Email',
    'Enter your username': 'Enter your email'
  }
}
I18n.setLanguage('en')
I18n.putVocabularies(authScreenWords)

const logout = () => Auth.signOut({ global: false })

let subscription

const App = () => {
  const [themeColour, setThemeColour] = useState('blue')
  const [themeTitle, setThemeTitle] = useState('My React App')
  const [themeVersion, setThemeVersion] = useState('0.1.0')
  const [themeSpeed, setThemeSpeed] = useState(10)
  const [themeDirection, setThemeDirection] = useState('right')

  const updateHandlers = {
    '/app/theme/title': setThemeTitle,
    '/app/theme/version': setThemeVersion,
    '/app/theme/colour': setThemeColour,
    '/app/theme/speed': setThemeSpeed,
    '/app/theme/direction': setThemeDirection
  }

  useEffect(
    () => {
      // TODO: replace with Suspense et. al.
      API.graphql(
          graphqlOperation(queries.searchFeatures, {
            filter: { id: { matchPhrasePrefix: '/app/theme/*' } }
          })
        )
        .then(x => {
          for (let { id, value } of x.data.searchFeatures.items) {
            if (updateHandlers[id]) {
              updateHandlers[id](value)
            }
          }
        })

      // Subscribe to update of feature
      subscription = API.graphql(
          graphqlOperation(subscriptions.onUpdateFeature)
        )
        .subscribe({
          next: x => {
            const { id, value } = x.value.data.onUpdateFeature
            if (updateHandlers[id]) {
              updateHandlers[id](value)
            }
          }
        })

      return () => {
        // unmount handler
        subscription.unsubscribe()
      }
    },
    []
  )

  const {
    sub,
    'cognito:groups': cognitoGroups,
    tenants
  } = Auth.user.signInUserSession.accessToken.payload

  const headerStyle = {
    backgroundColor: themeColour
  }

  const logoStyle = {
    animation: 'App-logo-spin infinite' +
      ` ${(themeDirection === 'right' && 'normal') || 'reverse'}` +
      ` ${themeSpeed}s linear`
  }

  return (
    <div className='App'>
      <header className='App-header' style={headerStyle}>
        <img src={logo} className='App-logo' alt='logo' style={logoStyle} />
        <p>
          {themeTitle}
        </p>
        <p>
          Version: {themeVersion}
        </p>
        <JSONPretty
          id='json-pretty'
          style={{ textAlign: 'left' }}
          data={{ sub, cognitoGroups, tenants }}
        />
        <p>
          <button onClick={logout}>
            Logout
          </button>
        </p>
      </header>
    </div>
  )
}

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Username',
      key: 'username',
      required: true,
      placeholder: 'Username',
      type: 'email',
      displayOrder: 1
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2
    }
  ]
}

export default withAuthenticator(App, {
  includeGreetings: false,
  signUpConfig
})
