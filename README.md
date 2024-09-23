# Strapi plugin strapi-graphql-nonnulllists

Modifies the GraphQL schema to make lists and their contents non null. Some other fields that are never null are also made non null. 

The database layer of Strapi never returns null for relations and never has null entries in those lists, but this is not reflected by default in the GraphQL schema.

## Supported Strapi versions

- v4.x.x

## Installation

```sh
npm install strapi-graphql-nonnulllists
```

**or**

```sh
yarn add strapi-graphql-nonnulllists
```

Add the following to your `config/plugins.js` or `config/plugins.ts` file:

```js
  'strapi-graphql-nonnulllists': {
  },
```
