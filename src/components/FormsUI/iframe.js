import React from "react";
function Iframe(props) {
        // return (<div dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.youtube.com/embed/cWDJoK8zw58' />"}} />);
        // return (<div dangerouslySetInnerHTML={{ __html: "<iframe style=\"overflow:hidden;height:500px;width:100%;\" height=\"1000px\" width=\"100%\" frameborder=\"0\" allowtransparency=\"true\" sandbox=\"allow-same-origin allow-scripts allow-popups allow-presentation allow-modals allow-forms\" src=\"/ssweb/eo_security_check?authCode=t8Jf88vNcCEQsGPXs8FT4yrjMBRupC8ZXHl3g2PSIyVGTkCFJ9saSztdnEkXmCCAbGtuohNB1Ky6WGOHQYdfqUooTcdq5QrjF40v4GWbIr9r2eWRbqR1zaTXfgKBerrh\" />" }} />);
        return (<div dangerouslySetInnerHTML={props.src} />);

    // return <div><p>Hello</p></div>
    }
export default Iframe;
