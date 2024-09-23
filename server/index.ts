import type { Plugin } from '@strapi/types';
import type { Config } from 'apollo-server-core';
import { NonNullListsPlugin } from './nonnulllistsplugin';

const plugin: Partial<Plugin.LoadedPlugin> = {
  register: ({ strapi }) => {
    const graphQlPlugin = strapi.plugin('graphql');
    const apolloServerConfig: Config = graphQlPlugin.config('apolloServer');

    if (!apolloServerConfig.plugins) {
      apolloServerConfig.plugins = [];
    }

    apolloServerConfig.plugins.push(NonNullListsPlugin);
  }
};

export default plugin;
