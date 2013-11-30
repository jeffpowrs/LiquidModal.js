# Liquid Modal

A Responsive jQuery Modal, that is vertically and horizontally centered using only CSS. No need to update css proprties via javascript.

## How to use Liquid Modal.

#### Reference the CSS and JS in your project.

#### Create an options object
```javascript
var options = {
  closeSelector: '.close-button',    // The selector to close the modal.
  buttonSelector: '.modal-button',   // The selector to open this modal.
  interiorSelector: '.modal',        // Clicking outside this container will close the modal.
  classToShow: 'active'              // The class that shows the modal.
};
```

#### Instantiate the plugin on your modal container.

This could be the same as your "interiorSelector." Now, remember to pass in your options object or a reference to it if you want to customize the modals configurations.

```javascript
$('.modal').liquidModal({...});
```
#### That's it...

Now any element with that matches the "buttonSelector" property will open the modal once it's clicked!