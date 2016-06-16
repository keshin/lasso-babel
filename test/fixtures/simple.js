$(function() {
  let a = {
    test: [],
    fun(a) {
      console.log(a);
    },
    text: "text"
  }

  let str = `I'm a template string
  ${a.text}
`
});
