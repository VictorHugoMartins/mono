export default function scrollIntoView(id: string) {
  var element = document.getElementById(id);

  if (element) element.scrollIntoView();
}