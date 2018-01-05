import React, { Component }  from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class Example extends Component{
  componentDidMount() {

  };
  render(){
  return (
    <div>
      Example
      <Link to={"/IndexPage"}>跳转下个页面</Link>
    </div>
    );
  }
};

export default Example;
