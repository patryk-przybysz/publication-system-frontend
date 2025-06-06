/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './app/routes/__root'
import { Route as AppRouteImport } from './app/routes/app/route'
import { Route as IndexImport } from './app/routes/index'
import { Route as AppIndexImport } from './app/routes/app/index'
import { Route as AppSettingsImport } from './app/routes/app/settings'
import { Route as AppAuthenticatedRouteImport } from './app/routes/app/_authenticated/route'
import { Route as AppArticlesIndexImport } from './app/routes/app/articles/index'
import { Route as AppAccountsIndexImport } from './app/routes/app/accounts/index'
import { Route as AppArticlesArticleIdImport } from './app/routes/app/articles/$articleId'
import { Route as AppAuthenticatedProfileImport } from './app/routes/app/_authenticated/profile'

// Create/Update Routes

const AppRouteRoute = AppRouteImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppSettingsRoute = AppSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppAuthenticatedRouteRoute = AppAuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppArticlesIndexRoute = AppArticlesIndexImport.update({
  id: '/articles/',
  path: '/articles/',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppAccountsIndexRoute = AppAccountsIndexImport.update({
  id: '/accounts/',
  path: '/accounts/',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppArticlesArticleIdRoute = AppArticlesArticleIdImport.update({
  id: '/articles/$articleId',
  path: '/articles/$articleId',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppAuthenticatedProfileRoute = AppAuthenticatedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AppAuthenticatedRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/app/_authenticated': {
      id: '/app/_authenticated'
      path: ''
      fullPath: '/app'
      preLoaderRoute: typeof AppAuthenticatedRouteImport
      parentRoute: typeof AppRouteImport
    }
    '/app/settings': {
      id: '/app/settings'
      path: '/settings'
      fullPath: '/app/settings'
      preLoaderRoute: typeof AppSettingsImport
      parentRoute: typeof AppRouteImport
    }
    '/app/': {
      id: '/app/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppRouteImport
    }
    '/app/_authenticated/profile': {
      id: '/app/_authenticated/profile'
      path: '/profile'
      fullPath: '/app/profile'
      preLoaderRoute: typeof AppAuthenticatedProfileImport
      parentRoute: typeof AppAuthenticatedRouteImport
    }
    '/app/articles/$articleId': {
      id: '/app/articles/$articleId'
      path: '/articles/$articleId'
      fullPath: '/app/articles/$articleId'
      preLoaderRoute: typeof AppArticlesArticleIdImport
      parentRoute: typeof AppRouteImport
    }
    '/app/accounts/': {
      id: '/app/accounts/'
      path: '/accounts'
      fullPath: '/app/accounts'
      preLoaderRoute: typeof AppAccountsIndexImport
      parentRoute: typeof AppRouteImport
    }
    '/app/articles/': {
      id: '/app/articles/'
      path: '/articles'
      fullPath: '/app/articles'
      preLoaderRoute: typeof AppArticlesIndexImport
      parentRoute: typeof AppRouteImport
    }
  }
}

// Create and export the route tree

interface AppAuthenticatedRouteRouteChildren {
  AppAuthenticatedProfileRoute: typeof AppAuthenticatedProfileRoute
}

const AppAuthenticatedRouteRouteChildren: AppAuthenticatedRouteRouteChildren = {
  AppAuthenticatedProfileRoute: AppAuthenticatedProfileRoute,
}

const AppAuthenticatedRouteRouteWithChildren =
  AppAuthenticatedRouteRoute._addFileChildren(
    AppAuthenticatedRouteRouteChildren,
  )

interface AppRouteRouteChildren {
  AppAuthenticatedRouteRoute: typeof AppAuthenticatedRouteRouteWithChildren
  AppSettingsRoute: typeof AppSettingsRoute
  AppIndexRoute: typeof AppIndexRoute
  AppArticlesArticleIdRoute: typeof AppArticlesArticleIdRoute
  AppAccountsIndexRoute: typeof AppAccountsIndexRoute
  AppArticlesIndexRoute: typeof AppArticlesIndexRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppAuthenticatedRouteRoute: AppAuthenticatedRouteRouteWithChildren,
  AppSettingsRoute: AppSettingsRoute,
  AppIndexRoute: AppIndexRoute,
  AppArticlesArticleIdRoute: AppArticlesArticleIdRoute,
  AppAccountsIndexRoute: AppAccountsIndexRoute,
  AppArticlesIndexRoute: AppArticlesIndexRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof AppAuthenticatedRouteRouteWithChildren
  '/app/settings': typeof AppSettingsRoute
  '/app/': typeof AppIndexRoute
  '/app/profile': typeof AppAuthenticatedProfileRoute
  '/app/articles/$articleId': typeof AppArticlesArticleIdRoute
  '/app/accounts': typeof AppAccountsIndexRoute
  '/app/articles': typeof AppArticlesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/app': typeof AppIndexRoute
  '/app/settings': typeof AppSettingsRoute
  '/app/profile': typeof AppAuthenticatedProfileRoute
  '/app/articles/$articleId': typeof AppArticlesArticleIdRoute
  '/app/accounts': typeof AppAccountsIndexRoute
  '/app/articles': typeof AppArticlesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/app/_authenticated': typeof AppAuthenticatedRouteRouteWithChildren
  '/app/settings': typeof AppSettingsRoute
  '/app/': typeof AppIndexRoute
  '/app/_authenticated/profile': typeof AppAuthenticatedProfileRoute
  '/app/articles/$articleId': typeof AppArticlesArticleIdRoute
  '/app/accounts/': typeof AppAccountsIndexRoute
  '/app/articles/': typeof AppArticlesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/app'
    | '/app/settings'
    | '/app/'
    | '/app/profile'
    | '/app/articles/$articleId'
    | '/app/accounts'
    | '/app/articles'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/app'
    | '/app/settings'
    | '/app/profile'
    | '/app/articles/$articleId'
    | '/app/accounts'
    | '/app/articles'
  id:
    | '__root__'
    | '/'
    | '/app'
    | '/app/_authenticated'
    | '/app/settings'
    | '/app/'
    | '/app/_authenticated/profile'
    | '/app/articles/$articleId'
    | '/app/accounts/'
    | '/app/articles/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRouteRoute: typeof AppRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/app"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/app": {
      "filePath": "app/route.tsx",
      "children": [
        "/app/_authenticated",
        "/app/settings",
        "/app/",
        "/app/articles/$articleId",
        "/app/accounts/",
        "/app/articles/"
      ]
    },
    "/app/_authenticated": {
      "filePath": "app/_authenticated/route.tsx",
      "parent": "/app",
      "children": [
        "/app/_authenticated/profile"
      ]
    },
    "/app/settings": {
      "filePath": "app/settings.tsx",
      "parent": "/app"
    },
    "/app/": {
      "filePath": "app/index.tsx",
      "parent": "/app"
    },
    "/app/_authenticated/profile": {
      "filePath": "app/_authenticated/profile.tsx",
      "parent": "/app/_authenticated"
    },
    "/app/articles/$articleId": {
      "filePath": "app/articles/$articleId.tsx",
      "parent": "/app"
    },
    "/app/accounts/": {
      "filePath": "app/accounts/index.tsx",
      "parent": "/app"
    },
    "/app/articles/": {
      "filePath": "app/articles/index.tsx",
      "parent": "/app"
    }
  }
}
ROUTE_MANIFEST_END */
