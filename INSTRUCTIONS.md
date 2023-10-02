# Module 3 Assignment: Render Book Search Results

(**NOTE:** View a rendered version of this file in VS Code with `ctrl-shift-v` or `cmd-shift-v`)

&nbsp;
## Introduction

For this assignment, you will be working on a book searching application that integrates with the Google Books API. You will use React and the Fetch API to request and display Book information.

&nbsp;
## Setup

Copy the starter files inside of `unsolved` into the root directory of your GitHub repository.

Run `npm i` in the root directory of your repository (your `package.json` should be in the root directory).

To start developing, run `npm run dev`.

&nbsp;
## Instructions

To complete this assignment:

- Navigate to `/src/pages/search.jsx`.
- Set up two-way binding on the `input` element. Set the initial state of the input element to "React".
- Implement a form submit handler (don't forget `e.preventDefault()`) that calls: `https://www.googleapis.com/books/v1/volumes?langRestrict=en&maxResults=16&q=YOUR_QUERY`
    - Note that the books API requires a query parameter `q` that will need to reflect the user's query.
- Search results should be stored to `bookSearchResults` and rendered using the `BookPreview` component.
- Use the `useEffect` hook to load books from the URL above with the query "React" when the Search component initially loads.

&nbsp;
## App Behavior

Your site should behave in the same manner as [this example site](https://booker-search.vercel.app/).

&nbsp;
## Requirements for full credit

To receive full credit for this assignment, your program MUST:

  * Be implemented according to the above [instructions](#instructions).
  * Pass all [automated tests](#testing).
  * Be [deployed](#deployment) correctly.
  * Be [submitted](#submission) correctly. 

&nbsp;
## Testing

Automated tests are included with this assignment. To receive full credit, all automated tests must pass.

To run the tests, run:

```
npm test
```

To run the tests only once, run:

```
npm test -- run
```

&nbsp;
## Deployment

This assignment may be deployed for free with [Vercel](https://vercel.com/docs).

To deploy, make an account with Vercel and either [attach Vercel to your GitHub repository](https://vercel.com/docs/concepts/get-started/deploy#create-and-deploy-a-project) or [use the Vercel CLI](https://vercel.com/docs/cli) to [deploy](https://vercel.com/docs/cli/deploy) your site.

Vercel is pre-configured to be able to recognize and deploy Vite/React websites. That said, some additional configuration is required for Single Page Applications using client-side routing. These sites must include redirect instructions for Vercel to serve the `index.html` regardless of the requested path.

This file is included in the `/unsolved` folder of the assignment as `vercel.json`. Its contents are:

&nbsp;
```json
{
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

This code tells vercel to redirect all requests to `/`, which will allow the user to download the static files required for React/React Router to render based on the URL. 

&nbsp;
## Submission

When submitting this assignment, please include **ALL** of the following:

  * A link to the assignment's GitHub repository.
  * A link to the deployed application.
  * A screenshot of the automated test results.

Please verify that your links are correct when submitting.
