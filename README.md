# vite-plugin-dns-prefetch-super

## Description
A Vite plugin to add dns-prefetch link tag in HTML.

# How to use

## Install

```shell
pnpm install vite-plugin-dns-prefetch-super -D
or yarn add vite-plugin-dns-prefetch-super -D
or npm install vite-plugin-dns-prefetch-super -D
```

## Vite config
```js
import { defineConfig } from 'vite'
import VitePluginDnsPrefetchSuper from 'vite-plugin-dns-prefetch-super'

export default defineConfig({
  plugins: [
    VitePluginDnsPrefetchSuper({
      limit: 20, // limit the max dns count, default 20
      excludeDnsPrefetchUrl: [], // exclude urls  default []
      includeDnsPrefetchUrl: [] // include urls  default []
    })
  ],
})
```
