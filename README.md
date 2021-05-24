# E-commerce site

A simple e-commerce site built as an exercise. The two only constraints where time and the usage of Next.js

## Technologies

- Next.js
- mongodb
- SWR
- react-intl
- styled-components

## Motivation

This exercise was great to lean Next.js. I don't claim that I know everything there is to know about this library, but I
certainly have a very good overview of its features. I also saw a couple of... let's call them issues with it. So I
would be very interested to write the same app in Gatsby, so I can experience the differences between these two popular
libraries.

## Technical considerations

I opted for [mongodb](https://www.mongodb.com/) for its ease of use: the query language being close to JavaScript.
Flexible data structures where also a plus.

[SWR](https://swr.vercel.app/) is developed by Zeit, the same company behind Next.js. I chose it for its convenience in
dealing with common task regarding data fetching: such as caching, handling pagination on the client side, etc.

[react-intl](https://formatjs.io/docs/getting-started/installation/) is my go-to library when it comes to i18n. Once
again ease-of-use was considered. This library provides all the i18n functionality/features required for a modern app,
and the industry standard.

I decided to use [styled components](https://styled-components.com/) because I love writing everything in JavaScript,
CSS included. It also provides further benefits such as: native mobile support, scoped styles and server side rendering
support.  
Having the ability to use props in my CSS code is just too good to pass up on.

## Improvements

There are a lot :), but to name a few:

- IMPROVE THE DESIGN!!!
- create a proper design-system (the current components in 'layout' folder are a good base, but they are single
  components, rather than a functioning system)
- extend filter functionality (filter on brand, product type, price range, etc.)
- create a test suite with react-testing-library
- create a CI/CD pipeline - possibly integrate CircleCI in github
