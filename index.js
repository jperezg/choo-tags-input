const html = require('choo/html')

module.exports = TagsInputComponent

function TagsInputComponent(settings, elementClass) {
  let options = Object.assign({
    type: 'text',
    id: 'tagInput',
    name: '',
    value: '',
    tags: []
  }, settings)

  const onKeyPress = function(event) {
    if (['Comma', 'Enter', 'Tab'].indexOf(event.code) != -1 && event.currentTarget.innerText.trim()) {
      event.preventDefault()
      options.tags.push(event.currentTarget.innerText)
      options.onChange && options.onChange(options.name, options.tags)
    } else if (event.code == 'Enter') {
      event.preventDefault()
    }
  }

  const onRemoveTag = function(index) {
    return function(event) {
      event.preventDefault()
      removeTag(index)
    }
  }

  const removeTag = function(index) {
    if (options.tags.length && index >= 0) {
      options.tags.splice(index, 1)
      options.onChange && options.onChange(options.name, options.tags)
    }
  }

  const focusInput = function() {
    document.getElementById('editable-' + options.name).focus()
  }

  const showTag = function(tag, index) {
    return html`<span style="display: inline;" class="tag badge badge-pill badge-info mr-2">${tag}<a href="#" onclick=${onRemoveTag(index)}>x</a></span>`
  }

  return html`
    <div class="form-control ${elementClass || ''}" onclick="${focusInput}" style="overflow-x: auto; overflow-y: hidden; position: relative;">
      <div style="position: absolute;">
        ${ options.tags.map(showTag) }
        <span class="editable-element" contenteditable="true" id="editable-${options.name}" onkeydown=${onKeyPress}></span>
      </div>
      <input type="hidden" id="${options.id}" name="${options.name}" value="${ options.tags.join(',') }" />
    </div>
  `
}

