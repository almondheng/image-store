import React, { Component } from 'react'; 
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '../ckeditor5/build/ckeditor'

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      editor: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.loadData = this.loadData.bind(this);
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
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }

  loadData() {
    fetch("http://localhost:3030/img/5ea71b168e436a1b5cb6cf10", { method: 'GET'})
      .then(response => response.json())
      .then(result => {
        console.log(result.img)
        this.state.editor.setData(result.img.img)
      })
      .catch(error => console.log('error', error));
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
        data={ '' }
        onInit={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
          this.state.editor = editor;
          this.loadData();
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

      <button onClick={this.loadData}>Show</button>
      <button style={primary} onClick={this.handleClick}>Upload</button>
    </div>
    )
  }
  
}

export default Editor;