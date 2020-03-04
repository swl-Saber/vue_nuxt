import {
  Message
} from 'element-ui';
console.log('这里是插件');

export default function ({
  $axios
}) {
  //暴露出去的一个函数，插件机制会自动执行
  //并且会将整个nuxt对象当做参数传进来供你使用

  // 这个拦截器，是可以拦截所有响应，无论成败
  // $axios.interceptors.response.use(res=>{})
  $axios.onError(err => {
    console.dir(err);
    const {
      statusCode,
      message
    } = err.response.data;
    if (statusCode == 400) {
      Message.error({
        message
      })
    }
  })
}
