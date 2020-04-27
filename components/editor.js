import React, { Component } from 'react'; 
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '../ckeditor5/build/ckeditor'

class Editor extends Component {
  constructor(props) {

    super(props);

    this.state = {
      data: ''
    } 

  } 

  render() {
    const primary = {
      float: "right",
      marginTop: "5px"
    }

    return (
    <div>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData()
          this.state.data = data
          console.log( this.state.data)
        } }
        onBlur={ ( event, editor ) => {
          console.log( 'Blur.', editor )
        } }
        onFocus={ ( event, editor ) => {
          console.log( 'Focus.', editor )
        } }
      />

      <button style={primary} onClick={() => this.state.data}>Upload</button>
    </div>
    )
  }
  
}

export default Editor;