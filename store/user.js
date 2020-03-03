// 使用 es6 的 export方法暴露state数据状态
//这个state 是一个对象，跟组件中的data一样
//为了避免数据污染，他必须是一个函数返回一个数据对象
// export const state={}
export const state = () => ({
  userInfo: {
    token: "",
    user: {}
  }
});

//创建mutation进行数据的修改
export const mutations = {
  // mutations是一个对象
  // 里面的每一个属性都是一个函数
  //用来修改仓库state的数据
  setUserInfo(state, data) {
    //所有mutation函数都可以接受两个参数
    //第一个是state对象本身
    //第二是外面调用时传入的数据
    state.userInfo = data;
  }
};
// 使用action处理异步操作
export const actions = {
  login(store, data) {
    this.$axios({
      url: "/accounts/login",
      method: "post",
      data
    }).then(res => {
      if (res.data.token) {
        store.commit("setUserInfo", res.data);
        this.$message({
          type: "success",
          message: "登录成功"
        });
      }
    });
  }
};
