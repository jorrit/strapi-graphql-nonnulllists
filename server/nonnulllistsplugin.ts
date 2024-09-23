import type { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLList, GraphQLNonNull, GraphQLOutputType, isInterfaceType, isListType, isNonNullType, isObjectType, isUnionType, isWrappingType } from 'graphql';

const convertListsToNonNull = (seenTypes: Set<GraphQLOutputType>, type: GraphQLOutputType) => {
  // Only process unwrapped types.
  if (isWrappingType(type)) {
    convertListsToNonNull(seenTypes, type.ofType);
    return;
  }

  // Unwrap unions.
  if (isUnionType(type)) {
    type.getTypes().forEach(innerType => convertListsToNonNull(seenTypes, innerType));
    return;
  }

  // Skip seen and non-object/interface types.
  if (seenTypes.has(type) || (!isInterfaceType(type) && !isObjectType(type))) {
    return;
  }

  seenTypes.add(type);

  // Recurse and process list fields.
  const fields = type.getFields();
  Object.values(fields).forEach((field) => {
    convertListsToNonNull(seenTypes, field.type);
    if (isListType(field.type)) {
      let innerType = field.type.ofType;
      if (!isNonNullType(innerType)) {
        innerType = GraphQLNonNull(innerType);
      }
      field.type = GraphQLNonNull(GraphQLList(innerType));
    } else if (isNonNullType(field.type) && isListType(field.type.ofType)) {
      let innerType = field.type.ofType.ofType;
      if (!isNonNullType(innerType)) {
        innerType = GraphQLNonNull(innerType);
      }
      field.type = GraphQLNonNull(GraphQLList(innerType));
    } else if (field.type.name?.endsWith('ResponseCollection')) {
      if (!isNonNullType(field.type)) {
        field.type = GraphQLNonNull(field.type);
      }
    } else if (isObjectType(field.type) && field.type.name?.endsWith('Entity')) {
      const attributesField = field.type.getFields()['attributes'];
      if (attributesField && !isNonNullType(attributesField.type)) {
        attributesField.type = GraphQLNonNull(attributesField.type);
      }
    }
  });
};

export const NonNullListsPlugin: ApolloServerPlugin = {
  async serverWillStart({ schema }): Promise<void> {
    convertListsToNonNull(new Set(), schema.getQueryType());
  }
};
