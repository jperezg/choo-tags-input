const html = require('choo/html')
const Component = require('choo/component')

module.exports = class TagsInputComponent extends Component {

  constructor (id = 'tagInput', name, onChange) {
    super(id)

    this.id = id
    this.name = name
    this.tags = []
    this.onChange = onChange
    this.onKeyPress = this.onKeyPress.bind(this)
    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.focusInput = this.focusInput.bind(this)
    this.showTag = this.showTag.bind(this)
  }

  onKeyPress (event) {
    if (['Comma', 'Enter', 'Tab'].indexOf(event.code) != -1 && event.currentTarget.innerText.trim()) {
      event.preventDefault()
      this.addTag(event)
    } else if (event.code == 'Enter') {
      event.preventDefault()
    }
  }

  addTag(event) {
    if (event.currentTarget.innerText.trim()) {
      this.onChange && this.onChange(this.name, this.tags.concat(event.currentTarget.innerText))
    }
  }

  removeTag (index) {
    return (event) => {
      event.preventDefault()

      if (this.tags.length && index >= 0) {
        const newTags = this.tags.filter((tag, i) => i != index)
        this.onChange && this.onChange(this.name, newTags)
      }
    }
  }

  focusInput () {
    document.getElementById('editable-' + this.name).focus()
  }

  showTag (tag, index) {
    return html`<span style="display: inline;" class="tag badge badge-pill badge-info mr-2" id="tag-${index}-${this.id}">
      ${tag}
      <a href="#" onclick=${this.removeTag(index)}>x</a>
    </span>`
  }

  createElement (tags) {
    this.tags = tags

    return html`
      <div
        class="form-control"
        style="overflow-x: auto; overflow-y: hidden; position: relative;"
        id="${this.id}"
        onclick="${this.focusInput}">
        <div style="position: absolute;">
          ${ this.tags.map(this.showTag) }
          <span
            class="editable-element"
            style="display: inline-block;"
            contenteditable="true"
            id="editable-${this.name}"
            onkeydown=${this.onKeyPress} onblur=${this.addTag}>
          </span>
        </div>
        <input type="hidden" id="${this.id}" name="${this.name}" value="${ this.tags.join(',') }" />
      </div>
    `
  }

  afterupdate (element) {
    element.scrollBy({top: 0, left: element.scrollWidth, behavior: 'smooth'})
  }

  update (tags) {
    return tags.length != this.tags.length
  }
}
