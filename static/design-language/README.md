# E*Design Language

## Contents
1. [Build Status](#build-status)
1. [Installation/Dependencies](#installation-and-dependencies)
	* Integrate with Xeon
    * Integrate with Other Projects
1. [The Playground](#the-playground)
1. [Components](#components)
	* Grid Structure
	* Spacing
	* Typography
	* Headings
	* Buttons
	* Text Fields
	* Dropdowns (Select)
	* Checkboxes
	* Radio Buttons
	* Toggle Buttons
	* Universal Messaging (Alerts)
	* Segmented Progress Bar
    * Tabs
	* Modals
    * Horizontal Rule
	* Toggles
    * Flyouts (Popovers)
	* Iconography
    * Loading Spinner
	* Toasts
1. [Standards](#standards)
	* Naming Scheme
	* Variables
	* Components
1. [Topics in Discussion](#topics-in-discussion)
1. [Contributing](#contributing)
1. [Documentation](#documentation)
	* Variables
	* Functions
    * Print
	* Mixins
	 * Breakpoints
	 * Centering
	 * Browser-Specific Hacks
	 * Typography Mixins
	    * Custom Font Face
	    * Material Icons
	    * Truncate Text
1. [Gitflow](#gitflow)
1. [Contributing](#contributing)

## Build Status

| DIT       | SIT       | UAT       | PRD       |
|-----------|-----------|-----------|-----------|
| [![Build Status](http://ci.etrade.com/buildStatus/icon?job=ET-XEON/DIT_edesign-language)](http://ci.etrade.com/job/ET-XEON/job/DIT_edesign-language) | [![Build Status](http://ci.etrade.com/buildStatus/icon?job=ET-XEON/SIT_edesign-language)](http://ci.etrade.com/job/ET-XEON/job/SIT_edesign-language/) | [![Build Status](http://ci.etrade.com/buildStatus/icon?job=ET-XEON/UAT_edesign-language)](http://ci.etrade.com/job/ET-XEON/job/UAT_edesign-language) | [![Build Status](http://ci.etrade.com/buildStatus/icon?job=ET-XEON/PRD_edesign-language&)](http://ci.etrade.com/job/ET-XEON/job/PRD_edesign-language) |

## Installation and Dependencies

Use `npm install` to retrieve all of the required packages and dependencies.

This repository is dependent on being part of the xeon structure, and should be checked out to follow the following directory structure. Each folder inside `node` represents a repository that must also be checked out.

```
xeon
│
└───node
│   edesign-language (https://bitbucket.etrade.com/projects/WEBC/repos/edesign-language/browse)
│   xeon-shared (https://bitbucket.etrade.com/projects/XEON/repos/xeon-shared/browse)
│   xeon-global (https://bitbucket.etrade.com/projects/XEON/repos/xeon-global/browse)
│   xeon-libs (https://bitbucket.etrade.com/projects/XEON/repos/xeon-libs/browse)
│   xeon-libsall (https://bitbucket.etrade.com/projects/XEON/repos/xeon-libsall/browse)
│   local-config (https://bitbucket.etrade.com/projects/XEON/repos/local-config/browse)
│   ...
│   
└───webapp
    │   ...
```

Running `grunt` inside of `xeon-global` will run the required tasks for this repostiory.

See "The Playground" for additional options, and to run this repository independently from xeon. To run the playground, execute the `npm run around` command in your terminal.

When integrating the design language into your projects, [autoprefixer](https://github.com/postcss/autoprefixer)
 is ***required***.

### Integrate with Xeon

Add edesign-language's `Gruntfile.js` to `local-config/grunt.config.hub.settings.js`

**Example (with Strummer)**

```js
'use strict';

module.exports = function(grunt) {

    var hubSettings = {

        src: [
            // list of paths to the Gruntfiles for the SPAs one is currently working on
            '../xeon-libsall/Gruntfile.js',
            '../xeon-strummer/Gruntfile.js',
            '../edesign-language/Gruntfile.js',

        ]

    };

    return hubSettings;

};
```

In your project, be sure to add the following import statement to the top of your projects' global SASS file:

```scss
/// Edesign Dependencies
@import "../../../edesign-language/src/styles/design-language";
```

In your project's `index.html` include the Design Language CSS file:

```html
<link rel="stylesheet" href="/xeon/edesign-language/edesign-language.css">
```

## Integrate with Other Projects

If you are running npm > 3:

`npm install --legacy-bundling --save git://bitbucket.etrade.com/scm/webc/edesign-language.git#pre-develop`

otherwise, you can run:

`npm install --save git://bitbucket.etrade.com/scm/webc/edesign-language.git#feature/heroku-packages`

In your project, be sure to add the following import statement to the top of your projects' global SASS file:

```scss
/// Edesign Dependencies
@import "node_modules/edesign-language/src/styles/design-language";
```

We also support Bower!

`bower install git://bitbucket.etrade.com/scm/webc/edesign-language.git#pre-develop`

**Bower Side Note**: You must do manual imports:

``scss
/// Edesign Dependencies
@import "bower_components/bootstrap-sass/assets/stylesheets/bootstrap/variables";
@import "bower_components/bootstrap-sass/assets/stylesheets/bootstrap/mixins";
@import "bower_components/edesign-language/src/styles/mixins/deprecate";
@import "bower_components/edesign-language/src/styles/variables";
@import "bower_components/edesign-language/src/styles/mixins";
```

## The Playground

The playground provides an informal look at the design language and what it offers. Play on the playground with `npm run around`. Do not use this as the definitive structure or usage of the E\*Design Language, as it may not always be up to date. It will, however, provide insight into the visual representation of elements.

The playground can be run independent from the xeon-specific grunt tasks. This will build the CSS in the project.

You can access the playground on `localhost:3000/playground`.

## Components

The E\*Design Language is the absolute source of truth for developing standard E\*TRADE pages.

This styles framework should be used hand in hand with design-delivered compositions. Any design discrepancies should be brought up, and this design language should take precedence over minor designs.

### Grid Structure

A fundamental change has been made to the container. When shrinking the page, bootstrap by default adds a huge gutter on medium viewports. This has been corrected and will show 100% width with proper padding until <920px then the grid is centered as normal.

The structure of the page should consist of `<section>` tags.

This should be used for each section, not to divide rows. Sections are most often divided by headings. Encapsulating design patterns. This structure will also allow for full-width backgrounds. Classes can be applied to the `section` tag to handle full width backgrounds.


Example

```html
<section>
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<button type="submit" class="btn btn-block btn-primary">My button</button>
			<div>
		</div>
	</div>
</section>
```

### Spacing

Spacing follows the Bootstrap sizing schema with t-shirt sizes, with a few extra nuances.

The available spacing is as follows:

```scss
$spacing-base: 20px;

$spacing-clear: 0;
$spacing-xxs: 5px;
$spacing-xs: 10px;
$spacing-sm: 15px;
$spacing-md: 25px;
$spacing-lg: 30px;
$spacing-xl: 40px;
$spacing-xxl: 60px;
```

Helper classes are available in E*Design, following the pattern: `.vertical-offset-SIZE`.

These classes apply a margin-bottom to the surrounding element. When accounting for spacing throughout
a design, assume the spacing comes from the top element:

```
--------------
|			 |
|  element   |
|            |
--------------
|		     |
|  addtl     |
|  spacing   |
|		     |
--------------
```

```html
<div class="vertical-offset-base"></div>
<div class="vertical-offset-clear"></div>
<div class="vertical-offset-xxs"></div>
<div class="vertical-offset-xs"></div>
<div class="vertical-offset-sm"></div>
<div class="vertical-offset-md"></div>
<div class="vertical-offset-lg"></div>
<div class="vertical-offset-xl"></div>
<div class="vertical-offset-xxl"></div>
```

### Typography

`.text-truncate` is used to automatically truncate long text. This requires `inline-block` or block for proper styling.

`.text-center` is used to center align text without any additional styling.

`.text-left` is used to left align text without any additional styling.

`.text-right` is used to right align text without any additional styling.

`.text-bold` used to apply bold styling.

`.text-disclaimer` or `.text-legal` used for legal text in footers.

`.text-white` for white text.

`.text-muted` for the ghost color text color.

`.text-brand-green` for green text on navy brand color only.

#### Headings

The `h1` through `h6` tags are styled, as well as classes `.h1` through `.h6` to allow for styling as a heading, when a heading tag may not be appropriate.

Helper classes have been established to allow custom font size specifications despite the heading classification.

`.extra-large-header`

`.large-header`

`.small-header`

`.subhead`

#### Targeted Experience

To target specific experiences, you must apply a class to the html or body tag. If using the html or body tag is not an available option, you can also add the class to a first-child element after the body. This will define the proper font stack and target other experience-specific options.

The customer font stack is default, and does not necessarily need a class. A class may be added for completeness and clarification if desired.

The allowed, specific font-stacks that are available are: `.prospect`, `.customer`, `.ios`, `.android`.

#### Example

```html
<html class="prospect">
...
</html>
```

```html
<html>
	<body class="prospect">
		...
	</body>
</html>
```

```html
<body>
	<div class="prospect">
		...
	</div>
</body>
```

The following is ***not applicable***:

```html
<body>
	<div class="container">
		<div class="row prospect">
			...
		</div>
	</div>
</body>
```


### Buttons

`.btn-block` is used for buttons that are 100% the column width.

```html
<button class="btn btn-primary btn-block">I take up 100%</button>
```

The two main button types are `.btn-primary` and `.btn-secondary`.

Button types have an outline variant by appending `-outline` to the classname.

```html
<button class="btn btn-secondary-outline">I am an outline button</button>
```

Buttons can appear the same as hyperlinks by using the `.btn.btn-link` class combination. `.btn-link` will not have a visited states even when used with anchor tags.

To have a button that appears as a link, use `.btn-link` in combination with the `.btn` class. The `.btn-link` will NOT have a visited state. Links have a "dark" variation using the `.dark` class:

```html
<button class="btn btn-link dark">
```

```html
<a href="//etrade.com" class="dark">E*TRADE</a>
```

Buttons have 3 different sizes: default, medium, and small.

`.btn-md` and `.btn-sm` can be used for the variation of button sizes.

Button dropdowns are available.
```html
<div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
  Dropdown
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
    <li><a href="#">Action</a></li>
    <li><a href="#">Another action</a></li>
    <li><a href="#">Something else here</a></li>
    <li role="separator" class="divider"></li>
    <li><a href="#">Separated link</a></li>
  </ul>
</div>
```
When the need arises split button dropdowns can also be used.
```html
<div class="btn-group">
	<button class="btn btn-primary">Spilt Button Dropdown</button>
		<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<i class="material-icons">keyboard_arrow_down</i>
			<span class="sr-only">Toggle Dropdown</span>
		</button>
		<ul class="dropdown-menu">
			<li><a href="#">Action</a></li>
			<li><a href="#">Another action</a></li>
			<li><a href="#">Something else here</a></li>
			<li role="separator" class="divider"></li>
			<li><a href="#">Separated link</a></li>
		</ul>
</div>
```

### Labels

Labels should use the `<label>` element primarily.

To display a timestamp, use the `<time>` element, or the `.timestamp` class.

Customer can use the "large label" variation with the `.label-lg` class coupled with a label element.

To display a label inline with a textfield, use the `.label-inline` class.

### Text Fields

Text fields have a label above the text, and if necessary, a label below the text.

```html
<div class="form-group has-error">
	<label for="for-text-field">Field label</label>
	<input type="text" class="form-control" id="for-text-field" placeholder="Ghosted text goes here">
	<label class="field-status">Your password must be at least 5 characters</label>
</div>
```

### Dropdowns (Select)

```html
<div class="form-group">
	<label>Field Label</label>
		<div class="select-wrapper">
			<select class="form-control">
				<option>Lorem</option>
				<option>Ipsum</option>
				<option>Dolor</option>
				<option>Sit amet</option>
			</select>
		</div>
	<label class="field-status">Error</label>
</div>
```

### Checkboxes

```html
<div class="checkbox">
	<input checked type="checkbox" id="all-or-none">
	<label for="all-or-none">Checkbox checked</label>
</div>
```

### Radio Buttons

```html
<div class="radio">
	<input checked type="radio" id="radio-all-or-none">
	<label for="radio-all-or-none">Radio checked</label>
</div>
```

### Toggle Buttons

Toggle buttons can have a single selection (radio alternate) or multiple (checkbox alternate). Markup is identical, and only requires changing the input to either `type=radio` or `type=checkbox`.

Toggle buttons can contain rich content, or labels.

#### Text only

```html
<div class="toggle-button">
    <input type="radio" id="radio-button-example-01" name="radio-button-example-button">
    <div class="toggle-button-wrapper">
        <label for="radio-button-example-01">Lorem ipsum dolor sit amet.</label>
    </div>
</div>
```

#### Rich text toggle

```html
<div class="toggle-button">
    <input type="radio" id="radio-button-example-02" name="radio-button-example-button">
    <div class="toggle-button-wrapper">
        <div role="label" for="radio-button-example-02">
            <div class="row">
                <div class="col-xs-12">
                    Hypothetical A
                </div>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    Best Case
                    <div style="background-color:lightgrey;width:100%;height:5px;position:relative;">
                        <div class="text-center" style="
                        background:lightblue;width:50%;height:5px;position:absolute;">
                        </div>
                    </div>
                    $115,500
                </div>
                <div class="col-xs-4">
                    Average
                    <div style="background-color:lightgrey;width:100%;height:5px;position:relative;">
                        <div class="text-center" style="
                        background:lightblue;width:50%;height:5px;position:absolute;">
                        </div>
                    </div>
                    $104,400
                </div>
                <div class="col-xs-4">
                    Worst Case
                    <div style="background-color:lightgrey;width:100%;height:5px;position:relative;">
                        <div class="text-center" style="
                        background:lightblue;width:50%;height:5px;position:absolute;">
                        </div>
                    </div>
                    $90,000
                </div>
            </div>
        </div>
    </div>
</div>
```

### Universal Messaging (Alerts)

There are 4 variations of universal messaging:

* Info : `.universal-message-info`
* Warning : `.universal-message-warning`
* Danger : `.universal-message-danger`
* Success : `.universal-message-success`

Universal messages must contain the `h4` heading, and define the class `.universal-message-heading`.

```html
<div class="universal-message universal-message-info" role="alert">
    <div class="universal-message-content">
        <h4 class="universal-message-heading">Information account notice</h4>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip.</p>
    </div>
</div>
```


All universal messages can be changed to dismissable by adding the `.universal-message-dissmissable` class to the `.universal-message` div. Adding a close button in addition to the dissmissable class is required:

```html
<div class="universal-message universal-message-info universal-message-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span class="material-icons">close</span>
    </button>
    <div class="universal-message-content">
        <h4 class="universal-message-heading">Information account notice</h4>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip.</p>
    </div>
</div>
```
### Segmented Progress Bar

The segmented progress bar shows progress in steps.

To adhere to the rule pertaining to a progress bar containing more than 10 segments, use the `.progress-segmented-labels-hidden` class in the same div with `.progress-segmented` to hide all labels by default.

Append `.active` to the `.progress-segment` element to show a fully activated segment.

Append `.active-half` to the `.progress-segment` element to show a half activated segment.


```html
<div class="progress progress-segmented">
    <div class="progress-segment active">
        <span class="progress-label">Account Selection</span>
    </div>
    <div class="progress-segment active">
        <span class="progress-label">Personal Information</span>
    </div>
    <div class="progress-segment active">
        <span class="progress-label">Verify Identity</span>
    </div>
    <div class="progress-segment active-half">
        <span class="progress-label">Investment Profile</span>
    </div>
    <div class="progress-segment">
        <span class="progress-label">Account Setup</span>
    </div>
    <div class="progress-segment">
        <span class="progress-label">Review Application</span>
    </div>
    <div class="progress-segment">
        <span class="progress-label">Create ID</span>
    </div>
    <div class="progress-segment">
        <span class="progress-label">Funding</span>
    </div>
</div>
```

You can show a portion of the segmented bar filled by using the `.active-partial` helper class and a `.active-partial-%` class where % = the amount of the segment to fill. This can be any number between 0 and 100.

```html
<div class="progress progress-segmented">
    <div class="progress-segment active active-partial active-partial-25">
        <span class="progress-label">Tell us about you</span>
    </div>
    <div class="progress-segment">
        <span class="progress-label">Review recommendations</span>
    </div>
    <div class="progress-segment">
        <span class="progress-label">Open your account</span>
    </div>
</div>
```

### Tabs

Navigation tabs have two variations. With a persistent bottom border, and without. Tabs also have three variations of sizes.

To include the persistent border, use the `.nav-tabs-border` class.

Small tabs are default. Append `.nav-tabs-md` or `.nav-tabs-lg` for the other variety of sizes.

To identify the active tab, use the `.active` class on the active `<li>`.

```html
<div class="row">
    <div class="col-xs-12">
        <div class="nav-tabs nav-tabs-md">
            <ul>
                <li class="active"><a href="#">Positions</a></li>
                <li><a href="#">Analysis</a></li>
                <li><a href="#">Gains &amp; Losses</a></li>
                <li><a href="#">Performance</a></li>
                <li><a href="#">Estimated Income</a></li>
            </ul>
```

If tabs are used on a dark background, you can append the `.nav-tabs-inverse` class to the `.nav-tabs-[size]`:

```html
<div class="nav-tabs nav-tabs-sm nav-tabs-inverse">
    ...
</div>
```

### Modals

Modals center horizontally and vertically on the screen on small screens and larger. Modals fix at the top on mobile.

```html
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="material-icons">close</span></button>
                <h4 class="modal-title large-header text-center vertical-offset-sm">Title</h4>
                <span class="subhead">Subhead</span>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-4 col-md-push-4 col-xs-6 col-xs-push-3">
                        <button type="button" class="btn btn-primary btn-block">Action</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

You may use the size classes to define a modal size. Keeping the modal size undefined will default to the medium size.

`.modal-lg`, `.modal-md`, and `.modal-sm` classes should be applied to the `.modal-dialog` class.

```html
<div class="modal fade" id="modalDefault" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-md" role="document">
        ...
```


### Horizontal Rule

Default:

```<hr>```

### Flyouts (Popovers)

Flyouts are to replace the default popovers, however popovers will still be supported for the long term due to the way Bootstrap dynamically generates the markup.

You can explicitly define a flyout size the class helpers `.flyout-sm`, `.flyout-md`, `.flyout-lg`, `.flyout-xl`.

```html
<div class="flyout flyout-md fade top in" role="tooltip">
    <div class="arrow" style="left: 50%;"></div>
    <h3 class="flyout-title">Flout title</h3>
    <div class="flyout-content">Default flyout text</div>
</div>
```

The popover markup is identical, replacing any `.flyout*` with `.popover*`

To make the flyout dimissible, append a close button to the flyout (in Bootstrap's default JavaScript, you can define a `data-template` attribute with your HTML template) below the `<div class="arrow">`.

```html
<button type="button" class="close" data-dismiss="popover" aria-label="Close"><span class="material-icons">close</span></button>
```

### Toggles

Toggles have an "on/off" state and utilize the checkbox input type.

**Inline Label with Toggle**

```html
<label for="block-do-you-like-html5">Default Toggle</label>
<div class="toggle">
	<input type="checkbox" id="block-do-you-like-html5">
	<label for="block-do-you-like-html5"></label>
</div>
```

**Block Label with Toggle**

```html
<label for="block-do-you-like-html5">Default Toggle</label>
<div class="toggle toggle-block">
	<input type="checkbox" id="block-do-you-like-html5">
	<label for="block-do-you-like-html5"></label>
</div>
```

**Large Variation Toggle**

```html
<label for="block-do-you-like-html5">Default Toggle</label>
<div class="toggle toggle-large">
	<input type="checkbox" id="block-do-you-like-html5">
	<label for="block-do-you-like-html5"></label>
</div>
```

### Iconography

The iconography is made up of three classes. `et-icon` defines the standard size and display enforcements, `.et-icon-NAME` defines the choice of icon to display, and `.et-icon-SIZE` defines the size of the icon. If no `.et-icon-SIZE` class is defined, then `.et-icon-medium` is applied by default.

```html
<span class="et-icon et-icon-alert-help et-icon-lg"></span>
```

White icons are available for use with the `.et-inverse` class.

```html
<span class="et-icon et-icon-alert-help et-icon-lg et-inverse"></span>
```

#### Iconography Sizes

`et-icon-xs`: 12px

`et-icon-sm`: 24px

`et-icon-md`: 48px

`et-icon-lg`: 96px

`et-icon-xl`: 192px

##### Iconography Icons

```
.et-research-awareness
.et-facts-research
.et-group-family
.et-money
.et-retirement
.et-home-lending
.et-graduation-gift
.et-gift
.et-computer
.et-smartphone
.et-money-investing
.et-goal
.et-cheque
.et-calendar
.et-gear-settings
.et-idea
.et-security
.et-faqs-fact-sheet
.et-help-more-info
.et-online-tutorial-laptop
.et-help-customer-svc
.et-top-five
.et-add-funds
.et-alert-help
.et-alert
.et-money-automatic-investing
.et-tool-box-welcome-kit
.et-growth
.et-downturn
.et-users
.et-user
.et-video
.et-anniversary
.et-anniversary-multiple
.et-savings
.et-clock
.et-stopwatch
.et-alarm-clock
.et-bank
.et-umbrella
```

### Loading Spinners

Spinners are used to display indeterminable progress.

The spinner will default to a 110px size, however it can be used at any size by adding additional CSS. We recommend using an additional class if you need to style multiple spinners on the same page with further customization.

```html
<div class="spinner">
    <svg class="circular" viewBox="25 25 50 50">
        <circle class="background" cx="50" cy="50" r="20" fill= "none" stroke-width="2" stroke-miterlimit="10"></circle>
        <circle class="path" cx="50" cy="50" r="20" fill= "none" stroke-width="2" stroke-miterlimit="10"></circle>
    </svg>
</div>
```

Spinners can also be used in modals:

```html
<!-- .modal-spinner-->
<div class="modal modal-spinner fade" id="spinnerModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="spinner">
                    <svg class="circular" viewBox="25 25 50 50">
                        <circle class="background" cx="50" cy="50" r="20" fill= "none" stroke-width="2" stroke-miterlimit="10"></circle>
                        <circle class="path" cx="50" cy="50" r="20" fill= "none" stroke-width="2" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal-spinner -->
```
### Toasts

Toasts can be used to display `success`, `error` or `info` messaging. Toasts must always be dynamically appended (for desktop) or prepended (for mobile) to the DOM.

This is the markup to be used for your toast. The variations are `success`, `error` and `info`.

```html
<div class="toast toast-sucsess">
		<div class="toast-close">
				<button class="btn btn-link"><span class="material-icons">close</span></button>
		</div>
		<div class="toast-content">
				"copy for toast"
		</div>
</div>
```

## Standards

### Naming Scheme

#### Variables

Variables should be named according to their purpose.

**NO**

```scss
$very-light-grey: #eeef;
```

**YES**

```scss
$legal-text: #efefef;
```

#### Componennts

Components and their variations should describe their purpose.

**NO**

```scss
.btn.btn-variation { background-color: $brand-purple; }
```

**YES**

```scss
.btn.btn-purple { background-color: $brand-purple; }
```

# Documentation

## Variables

You can customize the path of your iconography and typography by setting the `$iconography-path` and the `$fonts-path`.

```scss
///
/// @group primary_colors
/// @type Color
///

/// Lightest Grey - Background Color (Not for Text)
$background-color

/// Light Grey - Inactive State Background
$background-inactive-color

/// Border Grey - Borders, Lines for entry field's box
$border-color

/// Set Back Grey - Legal Copy, Timestamps, Labels, Null States, Disabled Text, Ghost Text
$ghost-color

/// Body Text Grey - Subhead and body
$body-text-color

/// Title Text Grey - for use with H1-H6
$header-text-color

///
/// @group highlight_colors
/// @type Color
///

/// E*TRADE Purple - Button background (not for text)
$brand-purple

/// E*TRADE Green - Current State, Selected State, Background (not for text)
$brand-green

/// E*TRADE Navy - Background
$brand-navy

/// Clickable Blue - Hyperlinks
$link-color
$link-hover-color
$link-hover-decoration
$link-active-color
$link-visited-color

/// Negative Red - Error state, data trending down
$negative

/// Positive Green - Success State, data trending up
$positive

// standard colors:
$white

//typography
//
$font-family-fallback
$font-family-customer
$font-family-ios
$font-family-android
$font-family-prospect


$font-size-base

$font-weight-lightest
$font-weight-lighter
$font-weight-light
$font-weight-normal
$font-weight-book
$font-weight-medium
$font-weight-bold
$font-weight-bolder
$font-weight-boldest
```
## Functions

### Chart Colors

Use the `chart-color` function inline with your style to access a specific shade of a chart color. There are `12` chart colors, each with the following available shades: `darker`, `base`, `lighter`, `lightest`.

`.class-name { background-color: chart-color(1, "lighter"); }`

#### Helper Classes

Helper classes for charts is also available.

```scss
 .chart-color-NUMBER {
  .chart-color-NUMBER.color-SHADE {
      color: SHADE-COLOR
  }
  .chart-color-NUMBER.backround-SHADE {
      background: SHADE-COLOR
  }
}
```

Example Usage:

```html
<div class="chart-color-1 chart-color-lighter"></div>
```

## Mixins

### Breakpoints

```scss
@include breakpoint-xs() {
	// xs-specific styles here. This should be used minimally if designing in a mobile-first scenario.
}

@include breakpoint-sm() {
	// sm-specific styles here. This usually targets tablets.
}

@include breakpoint-md() {
	// md-specific styles here. This usually targets desktops.
}

@include breakpoint-lg() {
	// lg-specific styles here. This usually targets larger desktops.
}

```

### Centering

```scss
@include center-xy();
@include center-x();
@include center-y();
```

Helper classes can also be used:

```html
<div class="center-x">
	...
</div>

<div class="center-y">
	...
</div>

<div class="center-xy">
	...
</div>
```

#### Example

```scss
.modal {
	@include center-xy();
	background-color: $background-grey;
}
```

### Browser-Specific Hacks

Media queries targeting Internet Explorer

```scss
@include gt-ie-9() {
	// target IE 9+
}
```

Media queries targeting Firefox

```scss
@include firefox() {
    // target Firefox all versions
}
```

### Typography Mixins


#### Custom Font face

This mixin makes the assumption that the font file name is in the following format: `FontFamily-FontVariant.otf` and that it is in the `fonts` folder.

It also assumes the following font file types are available: `eot`, `woff`, `ttf`, and `otf`.

```scss
$font-family-name : String;
$font-variant : String;
$font-weight : Integer (100-900);
$font-style : (normal | italic);

@include font-face($font-family-name, $font-variant, $font-weight, $font-style);
```

#### Material Icons

If you want to include a material icon, simply include the `@include material-icons()` in your selector.

##### Example
```scss
.security {
	@include material-icons();
	content: "\E123";
}
```

#### Truncate text

Include the text truncate mixin. Requires the element to have display of type block or inline-block.

##### Example
```scss
.account-number {
	@include text-truncate();
	display: inline-block;
	width: 100px;
	height: 40px;
	font-size: 14px;
}
```

#### Targeted Experiences

You can use the following mixins to target different experiences. Developers can target:

* Customer
* Prospect
* iOS
* Mobile

##### Examples
```scss

@include prospect() {
	// styles to target the prospect experience
}

@include customer() {
	// styles to target the customer experience
}

@include ios() {
	// styles to target the ios experience.
	// this should ONLY be used within the mobile app to provide a native-feeling experience
	// when inside a webview.
}

@include android() {
	// styles to target the android experience.
	// this should ONLY be used within the mobile app to provide a native-feeling experience
	// when inside a webview.
}

@include android-ios() {
	// styles to target BOTH the ios AND android experience.
	// this should ONLY be used within the mobile app to provide a native-feeling experience
	// when inside a webview.
}

```

## Git Flow

`Master`, `release`, `dev-integr`, and `qa-intgr` branches will all be used as intended and are not included in this gitflow diagram.

`pre-develop` represents a pristine branch. We are using it becuase it is not protected in the E*TRADE gitflow and allows us to keep a pristine branch that is not specifically deployed.

`feature/featureX` branches should be created off of `pre-develop`, and pull requests should be created for the `feature` branches to go back into `pre-develop`.

```
master ------------------------------------------------------------------------------
release -----------------------------------------------------------------------------
develop -------------------------------X----------------------------------------------
                                      /
pre-develop -------------X---X-------X-----------------------------------------------
                         /   \        \
feature/featureA -------X-----\--------X---------------------------------------------
feature/featureB --------------X-----------------------------------------------------
dev-integr --------------------------------------------------------------------------
qa-integr ---------------------------------------------------------------------------
```

# Contributing

To contribute to the E*Design Language, please make sure you are following the proper [Gitflow](#gitflow), the established [Standards](#standards), and passes all linting on the initial build.

Comment code: [https://github.com/DSSWG/DSS](https://github.com/DSSWG/DSS)

Create a [pull request](https://bitbucket.etrade.com/projects/WEBC/repos/edesign-language/pull-requests?create) for your `feature` branch into `pre-develop`, set the following as reveiwers:

`Josh Chaiken`, `Brian Scott`, `Cliff Jordan`, `Prasanna Manian`, `Rahul Chandrasekharan Premakumari`.
