const editorDiv = document.querySelector("#editor");

const editor = ace.edit(editorDiv, {
  theme: "ace/theme/monokai",
  mode: "ace/mode/javascript",
});

const frame = document.getElementById("frame");

const doc = frame.contentDocument;

const updatejs = document.querySelector("#updatejs");
const updateScript = updatejs.innerHTML;

const v4 = `
function v4(options, buf, offset) {
  var i = (buf && offset) || 0;
  if (typeof options == "string") {
    buf = options == "binary" ? new Array(16) : null;
    options = null;
  }
  options = options || {};
  var rnds = options.random || (options.rng || _rng)();
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }
  return buf || buff_to_string(rnds);
}
`;

const style = doc.createElement("style");
style.innerHTML = `
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 320px;
  min-height: 100vh;
}
#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  place-items: center;
}

#app > * {
  grid-column-start: 1;
  grid-column-end: 2;

  grid-row-start: 1;
  grid-row-end: 2;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

@keyframes popin {
  from {
    scale: 0;
  }
  to {
    scale: 1;
  }
}

.new {
  animation: popin 0.5s ease;
  /* scale: 0.5; */
  transform-origin: 50% 50%;
}

.value {
  /* scale: 0.5; */
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightseagreen;
  border-radius: 50%;
  position: relative;
  --w: 0px;
  &::after {
    /* transition: all 0.5s ease; */
    content: "";
    position: absolute;
    /* background-color: lightseagreen; */
    background-color: white;
    left: 50%;
    top: 50%;
    width: var(--w);
    rotate: var(--angle);
    height: 2px;
    transform-origin: 0 0;
    /* scale: 0.8 1; */
    /* translate: 1.5rem 0; */
  }
}

.line {
  position: absolute;
  top: calc(var(--y) + 1.5rem);
  left: calc(var(--x) + 1.5rem);
  width: var(--r);
  transform-origin: 0% 50%;
  rotate: var(--angle);
  height: 2px;
  background-color: red;

  z-index: -1;
}

.children {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-columns: max-content max-content; */
  grid-template-areas: "leftNode rightNode";
  gap: 1.5rem;
  /* place-items: center; */

  align-items: start;
  place-content: center;

  /* display: flex;
  justify-content: space-between; */
}

.left {
  grid-area: leftNode;
}

.right {
  grid-area: rightNode;
}

/* .left,
.right {
  min-width: 3rem;
  min-height: 3rem;
} */

`;
// doc.body.appendChild(updatejs);

doc.head.appendChild(style);

const run = document.getElementsByTagName("button")[0];
run.addEventListener("click", () => {
  const script = document.createElement("script");
  // script.type = "text/javascript";

  const app = doc.createElement("div");
  app.id = "app";

  script.textContent = v4 + updateScript + editor.getSession().getValue();
  doc.body.innerHTML = "";

  doc.body.appendChild(app);
  doc.body.appendChild(script);
  console.log("asdkjahslkdasd");
  //   doc.write(`

  //   <div id='app'></div>

  //   <p>
  //     ${editor.getSession().getValue()}
  //   </p>

  //   <script>
  //     ${editor.getSession().getValue()}
  //   <\/script>

  // `);
});

// console.log(frame.contentDocument);
