import request from '@/utils/request'
export default {
    //查找一节列表
    /* return request({
        url: '/admin/product/getCategory1',
        method: 'get'
    }) */
    getCategory1(){
        return request.get('/admin/product/getCategory1')
    },


    //查找二级列表
    /* return request({
      url: '/admin/product/getCategory2/' + category1Id,
      method: 'get'
    }) */
    getCategory2(category1Id){
        return request.get('/admin/product/getCategory2/'+category1Id)
    },

    //查找三级列表
    /* return request({
      url: '/admin/product/getCategory3/' + category2Id,
      method: 'get'
    }) */
    getCategory3(category2Id){
        return request.get('/admin/product/getCategory3/'+category2Id)
    }
    
}


