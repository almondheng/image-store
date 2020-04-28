import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '../ckeditor5/build/ckeditor'
import { toast, ToastContainer } from 'react-nextjs-toast'

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || '',
      editor: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.data) {
      console.log("uploading")
      var formdata = new FormData();
      formdata.append("img", this.state.data);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://localhost:3030/upload", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          toast.notify('Yeah!', {
            duration: 5,
            type: "success"
          });
        })
        .catch(error => {
          console.log('error', error);
          toast.notify('Oh shit...', {
            duration: 5,
            type: "error"
          });
        });
    }
  }

  render() {
    const primary = {
      float: "right",
      marginTop: "5px"
    }

    return (
      <div>
        <ToastContainer />
        <CKEditor
          editor={ClassicEditor}
          data={this.state.data}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
            this.state.editor = editor;
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            this.state.data = data
            console.log(this.state.data)
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor)
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor)
          }}
        />

        <button style={primary} onClick={this.handleClick}>Upload</button>
      </div>
    )
  }

}
