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

function FormComponent(state, emit) {
  const tagInput = TagsInputComponent({
    name: 'customInputName',
    id: 'customInputId',
    onChange: onTagsChange(emit),
    tags: state.tags
  }, 'classCss')

  return html`
    <form>
      <div class="form-group">
        <label for="customInputId">Input label</label>
        ${ tagInput }
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
