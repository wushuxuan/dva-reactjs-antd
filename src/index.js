import dva from 'dva';
import './index.css';

// 1. 用来做dva初始化的部分,在这里 你可以设置全局state 全部error 还有包括router的事件 state的事件 等等
const app = dva();

// 2. 这个是用来加载插件的
// app.use({});

// 3. 这个是用来接收你发送的action的
// app.model(require('./models/example'));

// 4. 在这里面 进行你所有页面的初始化路由设置
app.router(require('./router'));

// 5. Start
app.start('#root');
