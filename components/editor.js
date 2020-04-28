import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '../ckeditor5/build/ckeditor'
import { toast, ToastContainer } from 'react-nextjs-toast'

import client from "../graphql";
import { gql } from "apollo-boost";

const CREATE_NEW_IMAGE = gql`
mutation imageCreateOne($img: String) {
  imageCreateOne(record: {
    img: $img
  }) {
    recordId
    record {
      img
    }
  } 
}
`

const UPDATE_IMAGE_BY_ID = gql`
mutation imageUpdateById($img: String, $id: MongoID!) {
  imageUpdateById(record: {
    _id: $id
    img: $img
  }) {
    recordId
    record {
      img
    }
  } 
}
`

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
      if (this.props.data) {
        const id = this.props.data._id
        client.mutate({
          mutation: UPDATE_IMAGE_BY_ID,
          variables: {
            img: this.state.data,
            id: id
          }
        }).then(res => {
          console.log(res)
          toast.notify('Yeah!', {
            duration: 5,
            type: 'success'
          })
          
        }).catch(err => {
          console.error(err)
          toast.notify('ERROR', {
            duration: 5,
            type: "error"
          })
        })
      } else {

        client.mutate({
          mutation: CREATE_NEW_IMAGE,
          variables: {
            img: this.state.data
          }
        }).then(res => {
          console.log(res)
          toast.notify('Yeah!', {
            duration: 5,
            type: 'success'
          })

        }).catch(err => {
          console.error(err)
          toast.notify('ERROR', {
            duration: 5,
            type: "error"
          })
          
        })
      }

    } else {
      toast.notify('No data', {
        duration: 5,
        type: "warning"
      })
    }
  }

  render() {
    const primary = {
      float: "right",
      marginTop: "5px"
    }

    let button;
    if (this.props.data) {
      button = <button style={primary} onClick={this.handleClick}>Update</button>
    } else {
      button = <button style={primary} onClick={this.handleClick}>Upload</button>
    }

    return (
      <div>
        <ToastContainer />
        <CKEditor
          editor={ClassicEditor}
          data={this.state.data.img}
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

        {button}
      </div>
    )
  }

}
