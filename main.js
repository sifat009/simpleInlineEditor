const textContainer = document.querySelector(".textContainer");

const getEditorPosition = () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectionRect = range.getBoundingClientRect();
  return selectionRect;
};

const showEditor = () => {
  const inlineEditor = document.querySelector(".inline-editor");
  const inlineEditorRect = inlineEditor.getBoundingClientRect();
  const { left, top } = getEditorPosition();
  inlineEditor.style.top = `${top - inlineEditorRect.height}px`;
  inlineEditor.style.left = `${left}px`;
  inlineEditor.style.opacity = 1;
  handleClick();
};

const hideEditor = () => {
  const inlineEditor = document.querySelector(".inline-editor");
  inlineEditor.style.left = "-10000px";
  inlineEditor.style.top = "-10000px";
  inlineEditor.style.opacity = 0;
};

const handleClick = () => {
  const inlineItems = document.querySelectorAll(".inline-editor-item");
  inlineItems.forEach(inlineItem => {
    inlineItem.addEventListener("mousedown", e => e.preventDefault());
    inlineItem.addEventListener("click", editText);
  });
};

const editText = e => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("bold")) {
    document.execCommand("bold", false, null);
  } else if (target.classList.contains("italic")) {
    document.execCommand("italic", false, null);
  } else if (target.classList.contains("underline")) {
    document.execCommand("underline", false, null);
  }
};

const isEditor = item => {
  return (
    item.classList.contains("inline-editor") ||
    item.classList.contains("inline-editor-item") ||
    item.classList.contains("bold") ||
    item.classList.contains("italic") ||
    item.classList.contains("underline") ||
    item.getAttribute("contenteditable") ||
    ["B", "I", "U"].includes(item.tagName)
  );
};

window.addEventListener("mouseup", e => {
  e.preventDefault();
  const target = e.target;
  if (
    target.getAttribute("contenteditable") ||
    ["B", "I", "U"].includes(target.tagName)
  ) {
    showEditor();
  }
  if (!isEditor(target)) {
    hideEditor();
  }
});
