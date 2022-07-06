# ThatWord

**Check it out on** [thatword-sidnet.vercel.app](https://thatword-sidnet.vercel.app/)

The goal is to have a website where you can **search for good synonyms** for your text/article/email before sending it to that important guy.
It is a simple project made on free-time for exploring good practicies of coding in ReactJS + Typescript. There is no commercial use intended.

## How to use:
It's very simple, 
1. Type or paste your text in the input (You can also use the button on the right side);
2. The text will appear in the box below;
3. Select the words you want to search for a synonym;
4. The popup will show the synonyms found for that word;
5. Select one of the synonyms;
6. The word will be replaced by the synonym.

## How it works:
Even more simple,
1. When you select the word, the listener gets the selected word and it is sent to [wordsapi](https://www.wordsapi.com/) REST API;
2. Once the request is sent, the `Popover` component will show up and wait for success/failed status for changing it's variant and content;
3. With the feedback from the API, it fetches the response retrieving the synonyms (_success_), or the error message (_HTTP error or no synonyms found_).

## How to run it locally
1. Clone the [project](https://github.com/rcstudiossa/words_sidnet)
2. Open the terminal in the project folder
3. Run `yarn` or `npm install`
4. Run `yarn dev` or `npm run dev`

## Scope
As it is a very small project made on free time of 3 days, some things are priority but others are not :D
###### Priorities
- UI/UX
- Components scalability
- Theming scalability
- Testing

###### Non-priorities
- Security
- Responsivity
- Robust state management (_e.g. Redux_)
- Browser compatibility
- Robust errors/exceptions handling
- Linting (_e.g. ESLint_)

## Stack:
###### Main stack
- Typescript
- ReactJS
- Vite
- Styled-components

###### Other dependencies
- Axios
- Polished
- Prettier

## Customization
For putting your vibe into it, go to the theme folder and there you have:
- `colors.ts`: For defining every **color** used in the app
- `spacing.ts`: For defining **margins** and **paddings**
- `sizing.ts`: For defining **font sizes**, etc.
- `global.ts`: For font-family and **override the base styling** (e.g. `<li>` without bullet-points :D)

###### Example
How the `/components/Popover` container styling looks:
```css
[...]
  border-radius: ${({ theme }) => theme.sizing.xxxsmall};
  font-size: ${({ theme }) => theme.sizing.large};
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xxsmall};
  padding: ${({ theme }) => theme.spacing.xxxsmall} 0;
[...]
```
How the `/theme/sizing` looks:
```js
const sizes = {
  xxxsmall: "0.25em",
  xxsmall: "0.5em",
  xsmall: "0.625em",
  small: "0.75em",
  regular: "1em",
  large: "1.25em",
  xlarge: "1.5em",
  xxlarge: "2em",
  xxxlarge: "3.5em",
};
```

The Figma file will be available soon.


Thank you!

Rodrigo.
