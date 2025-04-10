# Strapi plugin strapi-graphql-nonnulllists

Modifies the GraphQL schema to make lists and their contents non null. Some other fields that are never null are also made non null. 

The database layer of Strapi never returns null for relations and never has null entries in those lists, but this is not reflected by default in the GraphQL schema.

## Supported Strapi versions

- Strapi v4: Use plugin version 0.5.3
- Strapi v5: Use plugin version 1

## Installation

```sh
npm install strapi-graphql-nonnulllists
```

**or**

```sh
yarn add strapi-graphql-nonnulllists
```

The plugin is enabled automatically.
