export const state = () => ({
  list: [
    //历史列表是一个数组
    //数组里面每一个对象都能存储了一次搜索的全部信息（5个参数）
    // {
    //   departCity: '广州',
    //   departCode: 'CAN',
    //   destCity: '北京',
    //   destCode: 'BJS',
    //   departDate: '2020-3-10'
    // },
  ]
})
export const mutations={
    setHistory(state,data){
        state.list.push(data);
    }
}
