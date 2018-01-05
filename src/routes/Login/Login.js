import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import request from '../../utils/request';
import styles from './Login.css';
import $ from 'jquery';
const FormItem = Form.Item;

class login extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ loading: true });
        let formData = new FormData();
        formData.append("userName", values.userName);
        formData.append("password", values.password);
        request('http://localhost:8080/lecheng/public/index/index/loginAction',{
          method:'POST',
          body:formData,
        }).then((data)=>{
          this.setState({ loading: false });
          console.log(data.data.code)
            if(data.data.code==='1'){
              this.props.history.push('/admin');
            }else{
              notification.open({
                message: 'LECHENG 提示',
                description: data.data.message,
                icon: <Icon type="close-circle-o" style={{ color: '#F5222D' }} />,
                duration: 0,
              });
            }
        })
        }
      });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={styles.normal}>
        <div className={styles.loginLeft}></div>
        <div className={styles.loginRight}>
          <div className={styles.RightName}>LE CHENG</div>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{width:'45%',margin:'0 auto'}}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{required: true, message: 'Please input your username!'}],
              })(
                <Input style={{height:'45px'}} prefix={<Icon type="user" style={{color: 'rgba(0,0,0,1)'}}/>} placeholder="Username"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your Password!'}],
              })(
                <Input style={{height:'45px'}} prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,1)'}}/>} type="password"
                       placeholder="Password"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
            </FormItem>
            <Button loading={this.state.loading}  style={{width:'100%',height:'38px',lineHeight:'38px',marginBottom:'15px'}} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            If you do not have an account ,<a style={{display:'inline-block',marginLeft:'5px'}} href="">register now!</a>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}
const Login = Form.create()(login);

export default connect(mapStateToProps)(Login);
