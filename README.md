# Choo Tags Input

## Installation

```sh
npm install -S choo-tags-input
```

## Usage

```javascript
const html = require('choo/html')
const TagsInputComponent = require('choo-tags-input')

module.exports = FormComponent

const tagInput = TagsInputComponent('customInputId', 'customInputName', onTagsChange(emit))

function FormComponent(state, emit) {
  return html`
    <form>
      <div class="form-group">
        <label for="customInputId">Input label</label>
        ${ tagInput.render(state.tags) }
      </div>
    </form>
  `
}

// Change handler (for adding or removing tags)
function onTagsChange(emit) {
  return function (inputName, values) {
    emit('<eventName>', inputName, values)
  }
}
```

## License

[MIT](LICENSE)
