import React from "react";
import parse from "html-react-parser";
const ShowHtml = ({ HtmlText }) => {
  const changeHtmlData = () => {
    return parse(HtmlText, {
      replace: (node) => {
        //Change the data
        if (node.name === "table") {
          return (node.attribs.class +=
            "table table-bordered table-hover table-striped");
        }
      },
    });
  };

  return <div>{changeHtmlData()}</div>;
};

export default ShowHtml;
