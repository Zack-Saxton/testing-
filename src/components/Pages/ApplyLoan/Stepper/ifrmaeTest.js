
import { Iframe } from "../../../FormsUI/iframe"

//Component to load the iframe 
function IframeTest() {

  //vie part
  return (
    <div className="App">
     <p>Hello World</p>
      <div>
          <p>1 </p>
        <iframe title="iframeTest" height="500px" width="100%" frameborder="0" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-presentation allow-modals allow-forms" src="/ssweb/eo_security_check?authCode=7fF5YzFzywBj2zZGLHWgD3AmtFUJMweseF3PPlWj6u3qTEYbHlQgO1dMsE7T0y0ONQtbY4z6qLpfLq1P86RZYBKd0ADXaJDGKJhVH2iT8iiB0x1OGbVHmABERv0AiM5W"/>

      </div>
      <div>
      <p>2 </p>
       <Iframe />
      </div>
    </div>
  ); 
}

export default IframeTest;