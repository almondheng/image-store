import React, { Component } from 'react';
import parse from 'html-react-parser';

export default class Image extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
		this.loadData = this.loadData.bind(this);
		this.loadData()
	}

	loadData() {
		fetch("http://localhost:3030/img", { method: 'GET' })
			.then(response => response.json())
			.then(result => {
				console.log(result.data);
				this.setState({data: result.data})
			})
			.catch(error => console.log('error', error));
	}

	render() {
		return (
			<div className="flex-container">
				{
					this.state.data.map((value, index) => parse('<div>'+value.img+'</div>'))
				}

			<style jsx>{`
				.flex-container {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
				}
			`}</style>
			</div>
		)
	}
}