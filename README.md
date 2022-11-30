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
  <svg xmlns="xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;" aria-hidden="true" />
    <symbol id="icons/user" ...>...</symbol>
    <symbol id="illustrations/error" ...>...</symbol>
    <symbol id="logo" ...>...</symbol>
  </svg>
  ...
</body>
```

## Installation

- Place [svgSpriteBuilder.js](https://github.com/njsen/nuxt3-svg-sprite-builder/blob/main/svgSpriteBuilder.js) into `/server/plugins`, you can rename it as you wish.

- Change `svgDirectory` value on `line 4` to match your SVG Directory, **__be careful to keep the trailing slash !__**
```js
// svgSpriteBuilder.js
const svgDirectory = './assets/svg/'; // <-- Change this value
```

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
#### Dynamic component usage
```vue
<SvgComponent :href="dynamicValue" />
```
