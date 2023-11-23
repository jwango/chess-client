# Garden Sketch

## Setup

### Installation
1. Install Node 18 (recommend managing versions via a manager like `asdf` or `nvm`)
2. `npm install --global yarn`
3. `yarn install`

### Development
* Develop via `yarn start`
* Build for production via `yarn build` - make sure `NODE_ENV=production`

## Configuration

Environment Variables

| Variable Name        | Usage (* = required)                           | Example                       |
| -------------------- | ---------------------------------------------- | ----------------------------- |
| COGNITO_CLIENT_ID    | *Cognito User Pool App Client Id               | 3rsrgovgffhrtrcvstlc83pk5s    |
| COGNITO_DOMAIN       | *Cognito User Pool Auth Domain                 | https://auth.chess.jwango.com |
| COGNITO_REDIRECT_URI | *Cognito User Pool App Client Allowed Callback | http://localhost:3000/login   |

## Misc.

App goals
- [ ] Progressive Web App
- [ ] Accessiblity first
- [ ] i18n support
- [ ] Help beginner gardeners who intend to use SQF Gardening

Personal goals
- [ ] Practice Domain Modelling
- [ ] Learn Golang
- [ ] Practice setting up a Webpack 5 / React / Tailwind project
- [ ] Project theming CSS
