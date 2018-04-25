Mobile view only for now.

App: https://laughing-goldberg-ab460a.netlify.com/

What's working:

* Cards addition/removal/editing
* Pages transition animations
* Swipeable cards 
* Typescripted redux state and actions

It's a good time to start looking into progressive web applications.

## App description

This app should provide a simple service that will allow user to add cards with words and their descriptions or translations.


User is expected to visit app on daily basis and going through an automatically created set of cards (learning process).
For each card user should choose if he remembers its meaning or not (it's done this way to provide faster user experience, but we have rely on user being honest with himself).
After some card has been succesfully remembered for several times in a row it will be considered as learned.


User should also be able to start a different process to check the quality of his knowledge where he is going through already learned cards once again.

## Key features
1. Service worker with app manifest
2. Cards should be stored locally (IndexedDB)
3. Transition animations and swipeable cards (for an ultimate native app feel)
4. Daily push notifications

## Tech notes
1. Typescript should be with as little `any` types as possible
2. Emotion for styling (lets see what all the hype is about)
3. Greensock for js animations
4. React definitely should be up to date ;) Don't forget to update it with new async API in the end of 2018!
5. Server setup with SSR (?? there is not much to render probably) and code splitting
