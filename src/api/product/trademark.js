import request from '@/utils/request'

export default {
    //删除
    delete(id){
        return request.delete(`/admin/product/baseTrademark/remove/${id}`)
    },
    //新增或者修改
    addOrUpdate(trademark){
        if(trademark.id){
            return request.put('/admin/product/baseTrademark/update',trademark)
        }else{
            return request.post('/admin/product/baseTrademark/update',trademark)
        }
    },
    //获取
    getPageList(page,limit){
        return request.get(`/admin/product/baseTrademark/${page}/${limit}`)
    }
}