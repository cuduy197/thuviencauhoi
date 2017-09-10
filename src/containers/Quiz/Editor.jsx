import React from "react";

/*eslint-disable */
export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsLoaded: false
    };

    this.baseId = props.baseId || "froala-editor";
  }

  //INIT
  componentDidMount() {
    this.setState({ jsLoaded: true }, () => {
      $(() => {
        /*
		______   .______   .___________. __    ______   .__   __.      _______.
	 /  __  \  |   _  \  |           ||  |  /  __  \  |  \ |  |     /       |
	|  |  |  | |  |_)  | `---|  |----`|  | |  |  |  | |   \|  |    |   (----`
	|  |  |  | |   ___/      |  |     |  | |  |  |  | |  . `  |     \   \    
	|  `--'  | |  |          |  |     |  | |  `--'  | |  |\   | .----)   |   
	 \______/  | _|          |__|     |__|  \______/  |__| \__| |_______/    
																																					 */
        let config = [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "specialCharacters",
          "quote",
          "|",
          "subscript",
          "superscript",
          "|",
          "color",
          "|",
          "insertTable",
          "|",
          "fontSize",
          ,
          "paragraphFormat",
          "align",
          "formatOL",
          "formatUL",
          "indent",
          "outdent",
          "|",
          "insertImage",
          "insertLink",
          "insertFile",
          "insertVideo",
          "|",
          "selectAll",
          "clearFormatting",
          "|",
          "undo",
          "redo",
          "fullscreen"
          // "help"
        ];

        $(`#${this.baseId}`).froalaEditor(
          this.props.options || {
            theme: "royal",
            //toolbarInline: true,
            language: "vi",
            heightMin: 300,
            imageInsertButtons: ["imageByURL"],
            videoInsertButtons: ["videoByURL", "|", "videoEmbed"],
            toolbarButtons: config,
            //mobile
            toolbarButtonsXS: [
              "bold",
              "italic",
              "underline",
              "specialCharacters",
              "quote",
              "subscript",
              "superscript",
              "color",
              "insertTable",
              "insertImage",
              "insertLink",
              "insertFile",
              "insertVideo",
              "|",
              "selectAll",
              "undo",
              "fullscreen",
              "redo"
            ],
            //Medium
            toolbarButtonsMD: config,
            //Small
            toolbarButtonsSM: config
          }
        );
        this.setState({ visible: true });

        $("a:contains(Unlicensed Froala Editor)").css("background-color", "white");
      });
    });
  }

  getHtml() {
    return $(`#${this.baseId}`).froalaEditor("html.get");
  }

  setHtml(e) {
    return $(`#${this.baseId}`).froalaEditor("html.set", e);
  }

  render() {
    var style = { display: "none" };
    if (this.state.visible === true) {
      style = {};
    }
    return this.state.jsLoaded ? (
      <div
        id={`${this.baseId}`}
        className="fr-view"
        style={style}
        dangerouslySetInnerHTML={{ __html: this.props.valueHTML || "" }}
      />
    ) : null;
  }
}

/*eslint-enable */
