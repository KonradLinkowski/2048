export class Component {
  constructor($parent, $createFn) {
    this.$el = $createFn()
    this.$parent = $parent
    this.attach()
  }

  attach() {
    this.$parent.appendChild(this.$el)
    this.onAttach()
  }

  detach() {
    this.$el.remove()
    this.onDetach()
  }

  onAttach();
  onDetach();
}
