# 📖 GSlides Slideshow Documentation

## Overview

The **GSlides** slideshow is a self-hosted, HTML/CSS/JS component that
lets you create animated presentations for the web.\
A slideshow is built from a root `<div class="slideshow">` that contains
**controls** (arrows) and multiple **slides**
(`<div class="slideSector">`).

------------------------------------------------------------------------

## Root Container

``` html
<div class="slideshow" id="slideShow1">
  ...
</div>
```

-   **`class="slideshow"`**: Required base class.\
-   **`id="slideShow1"`**: Unique ID for targeting via JS.

------------------------------------------------------------------------

## Navigation Controls

``` html
<div class="chevronLeftContainer">
  <div class="chevronLeftMask"></div>
</div>

<div class="chevronRightContainer">
  <div class="chevronRightMask"></div>
</div>
```

-   **Left/Right Containers** hold navigation arrows.\
-   Masks allow arrow styling/animation.

------------------------------------------------------------------------

## Slide Structure

Each slide is represented by a **`slideSector`**:

``` html
<div class="slideSector">
  <!-- Slide content goes here -->
</div>
```

-   The **first slide** is visible by default.\
-   **Subsequent slides** should include the `hiddenSlide` class:

``` html
<div class="slideSector hiddenSlide"></div>
```

------------------------------------------------------------------------

## Example: Title Slide

``` html
<div class="slideSector">
  <div class="widecenter" style="flex-direction: column;">
    <h1 class="titleSlide">GSlides</h1>
    <a class="goToSection fadeInScaleUpClass"
       href="GSlidesDemo.zip"
       style="background-color:#8f9cff; padding:10px;">
       See Git Hub
    </a>
  </div>
</div>
```

-   **`widecenter`**: Centers and aligns content.\
-   **`titleSlide`**: Large headline styling.\
-   **`goToSection`**: Button-style link.

------------------------------------------------------------------------

## Example: Section Grid

``` html
<div class="slideSector hiddenSlide">
  <div class="widecenter">
    <div class="sectionSquare" style="z-index:10;">
      <h1>What Is GSlides</h1>
      <button class="goToSection">See Section</button>
    </div>
    <!-- additional sectionSquare blocks -->
  </div>
</div>
```

-   **`sectionSquare`**: Styled square block with optional `z-index` and
    animation delay.\
-   Multiple `sectionSquare`s can be layered for staggered entrance
    effects.

------------------------------------------------------------------------

## JavaScript Initialization

Create a slideshow instance with:

``` js
let slideShow1 = new slideShow('slideShow1');
slideShow.activeShow = slideShow1;
```

-   Pass the slideshow `id` when creating.\
-   Set `activeShow` to track the current slideshow.

------------------------------------------------------------------------

## JavaScript API

### Navigation

``` js
slideShowClass.goToSlide(number);
slideShowClass.nextSlide();
slideShowClass.backSlide();
```

### Lifecycle

``` js
slideShowClass.destroyShow(slideShowId);
```

### Custom Animations

``` js
slideShowClass.forwardInAnimationClass  = 'slideInAnimationClass';
slideShowClass.forwardOutAnimationClass = 'slideOutAnimationClass';
slideShowClass.backOutAnimationClass    = 'slideOutAnimationReverseClass';
slideShowClass.backInAnimationClass     = 'slideInAnimationReverseClass';
```

------------------------------------------------------------------------

## Events

The slideshow dispatches a **`slideChanged`** event:

``` js
document.addEventListener('slideChanged', (event) => {
  console.log(event.detail);
});
```

`event.detail` contains: - `slideShowId` → ID of the slideshow\
- `slideNumber` → Current slide index\
- `changeDirection` → `"forward"` or `"backward"`

------------------------------------------------------------------------

## Installation

Include the stylesheet and script in your HTML:

``` html
<link rel="stylesheet" href="/GSlides/slideUi.css">
<script src="/GSlides/gslides.js"></script>
```
