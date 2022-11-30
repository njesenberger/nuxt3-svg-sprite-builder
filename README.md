# nuxt3-svg-sprite-builder

Nitro plugin to inject SVG sprite from SVG files into your HTML

> ⚠️ This is experimental and currently only provided for testing and feedback. Use at your own risk!

#### From

```
📁 svg
├  📁 icons
│  └  📄 user.svg
├  📁 illustrations
│  └  📄 error.svg
└  📄 logo.svg
```

#### To
```html
<body>
  <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;" aria-hidden="true">
    <symbol id="icons/user" ...>...</symbol>
    <symbol id="illustrations/error" ...>...</symbol>
    <symbol id="logo" ...>...</symbol>
  </svg>
  ...
</body>
```

---

## Installation

Install module via npm:
```bash
npm install nuxt3-svg-sprite-builder
```

Create `svgSpriteBuilder.js` into `/server/plugins` and add the following code:

```js
import { svgSpriteBuilder } from 'nuxt3-svg-sprite-builder';

export default svgSpriteBuilder('./path/to/svg/folder');
```

Edit `./path/to/svg/folder/` to match your SVG folder, default is `./assets/svg` if omitted.

---

## Usage

### Rendering an SVG

Render `/svgDirectory/logo.svg`
```vue
<svg>
  <use href="#logo" />
</svg>
```
Render `/svgDirectory/icons/user.svg`
```vue
<svg>
  <use href="#icons/user" />
</svg>
```

### Creating a dynamic SVG component

`/components/SvgComponent.vue`
```vue
<template>
  <svg>
    <use :href="`#{href}`" />
  </svg>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
```
#### Dynamic SVG component usage
```vue
<SvgComponent :href="dynamicValue" />
```

---

Inspired by [vite-svg-plugin](https://github.com/Lstmxx/vite-svg-plugin) from [@Lstmxx](https://github.com/Lstmxx)
