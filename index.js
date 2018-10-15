const html = require('choo/html')
const css = require('sheetify')

module.exports = TagsInputComponent

function TagsInputComponent(settings, elementCss) {
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

  return html`
    <div class="form-control ${elementCss || controlCss}" onclick="${focusInput}">
      ${ options.tags.map((tag, index) => html`<span class="${badgeCss} badge badge-pill badge-info mr-2">${tag}<a href="#" onclick=${onRemoveTag(index)}>x</a></span>`) }
      <span class="${editableCss}" contenteditable="true" id="editable-${options.name}" onkeydown=${onKeyPress}></span>
      <input type="hidden" id="${options.id}" name="${options.name}" value="${ options.tags.join(',') }" />
    </div>
  `
}

const controlCss = css`:host {
  overflow: auto;
}`

const editableCss = css`
:host {
  display: inline-block;
  max-width: 100px;
}
`

const badgeCss = css`
:host {
  font-size: 1rem;
  line-height: 1.2;
  font-weight: normal;
}
:host a {
  color: #00a2b9;
  background: white;
  border-radius: 22px;
  width: 18px;
  height: 18px;
  display: inline-block;
  margin-left: 5px;
  line-height: 1;
}
`

