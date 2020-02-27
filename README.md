# Tweeter Project

Tweeter is a simple, single-page Twitter clone. This will allow user to compose and view tweets.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Functionalities

1. User can click on the animating double down arrow in the nav bar to create new tweet.
2. Once user click on the double down arrow, a form appears. User can create tweet using that.
3. Message will be validated. It will throw error unless user enters data of size ranging from 1 to 140.
4. Once the tweet is posted. It will be shown in the same page.
5. Application is designed with responsive layout with a two column layout for desktop and single column layout for devices with lower width.

## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- md5
