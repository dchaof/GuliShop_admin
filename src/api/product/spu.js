import request from '@/utils/request'

export default {
/* 
  获取销售属性列表
  GET /admin/product/baseSaleAttrList
  */
  getSaleAttrList () {
    return request.get('/admin/product/baseSaleAttrList')
  },

  /* 
  删除指定的SPU
  DELETE /admin/product/deleteSpu/{spuId}
  */
  remove(spuId) {
    return request.delete(`/admin/product/deleteSpu/${spuId}`)
  },

  /* 
  根据id获取SPU信息
  GET /admin/product/getSpuById/{spuId}
  spuList: 包含多个spu简单信息的数组
  spuInfo: 包含一个spu详细信息的对象
  */
  get (spuId) {
    return request.get(`/admin/product/getSpuById/${spuId}`)
  },

  /* 
  添加SPU详情信息
  POST /admin/product/saveSpuInfo
  POST /admin/product/updateSpuInfo
  */
  addUpdate(spuInfo) {
    // return request.post(`/admin/product/${spuInfo.id ? 'update' : 'save'}SpuInfo`, spuInfo)
    return request({
      url: `/admin/product/${spuInfo.id ? 'update' : 'save'}SpuInfo`,
      method: 'POST',
      data: spuInfo
    })
  },

  /* 
  GET /admin/product/{page}/{limit}
    query参数: category3Id
  */
  getList (page, limit, category3Id) {
    // return request.get(`/admin/product/${page}/${limit}`, {params: {category3Id}})

    return request({
      url: `/admin/product/${page}/${limit}`,
      method: 'GET',
      params: {category3Id}
    })
  },

  findSpuInfoByKeyword(keyword) {
    return request({
      url: `/admin/product/findSpuInfoByKeyword/${keyword}`,
      method: 'get'
    })
  },

  //获取图片列表数据
  getSpuImageList(spuId){
    return request.get(`/admin/product/spuImageList/${spuId}`)
  },
  //获取所有品牌列表数据
  getTrademarkList(){
    return request.get('/admin/product/baseTrademark/getTrademarkList')
  },

  //获取sku列表数据
  reqSkuList(spuId){
    return request.get(`/admin/product/findBySpuId/${spuId}`)
  }

}